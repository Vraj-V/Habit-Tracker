from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class Activity(Base):
    __tablename__ = "activities"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    activity_type = Column(String)  # completed, milestone, challenge
    title = Column(String)
    description = Column(String)
    icon = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    user = relationship("User", back_populates="activities")

class Challenge(Base):
    __tablename__ = "challenges"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    icon = Column(String)
    participants_count = Column(Integer, default=0)
    duration_days = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    participants = relationship("ChallengeParticipant", back_populates="challenge", cascade="all, delete-orphan")

class ChallengeParticipant(Base):
    __tablename__ = "challenge_participants"
    
    id = Column(Integer, primary_key=True, index=True)
    challenge_id = Column(Integer, ForeignKey("challenges.id"), index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    points = Column(Integer, default=0)
    joined_at = Column(DateTime, default=datetime.utcnow)
    
    challenge = relationship("Challenge", back_populates="participants")
