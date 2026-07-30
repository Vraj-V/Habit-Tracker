from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class HabitBase(BaseModel):
    name: str
    description: Optional[str] = None
    icon: str = "leaf"
    frequency: str  # daily, weekly
    time_of_day: Optional[str] = None
    goal: float = 0

class HabitCreate(HabitBase):
    pass

class HabitUpdate(BaseModel):
    name: Optional[str] = None
    current: Optional[float] = None
    progress: Optional[float] = None

class HabitResponse(HabitBase):
    id: int
    user_id: int
    current: float
    streak: int
    progress: float
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class HabitLogCreate(BaseModel):
    value: float

class ChallengeResponse(BaseModel):
    id: int
    title: str
    description: str
    icon: str
    participants_count: int
    duration_days: int
    
    class Config:
        from_attributes = True

class LeaderboardEntry(BaseModel):
    rank: int
    user_id: int
    name: str
    points: int
    badge: Optional[str] = None
