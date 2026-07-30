from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey, String
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class UserStats(Base):
    __tablename__ = "user_stats"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True, unique=True)
    calories = Column(Float, default=0)
    sleep_hours = Column(Float, default=0)
    sleep_quality = Column(Float, default=0)  # 0-100
    stress_level = Column(String, default="low")  # low, medium, high
    exercise_streak = Column(Integer, default=0)
    impact_score = Column(Integer, default=0)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="stats")
