from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class Habit(Base):
    __tablename__ = "habits"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    name = Column(String, index=True)
    description = Column(String, nullable=True)
    icon = Column(String, default="leaf")
    frequency = Column(String)  # daily, weekly
    time_of_day = Column(String, nullable=True)  # morning, afternoon, evening
    goal = Column(Float, default=0)
    current = Column(Float, default=0)
    streak = Column(Integer, default=0)
    progress = Column(Float, default=0)  # 0-100
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = relationship("User", back_populates="habits")
    logs = relationship("HabitLog", back_populates="habit", cascade="all, delete-orphan")

class HabitLog(Base):
    __tablename__ = "habit_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    habit_id = Column(Integer, ForeignKey("habits.id"), index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    value = Column(Float)
    date = Column(DateTime, default=datetime.utcnow)
    
    habit = relationship("Habit", back_populates="logs")
