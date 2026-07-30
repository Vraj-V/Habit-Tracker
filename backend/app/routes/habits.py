from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.habit import Habit, HabitLog
from app.models.user import User
from app.schemas.habit import HabitCreate, HabitResponse, HabitUpdate, HabitLogCreate
from app.core.security import decode_token

router = APIRouter(prefix="/api/habits", tags=["habits"])

def get_current_user(token: str, db: Session = Depends(get_db)) -> User:
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/create", response_model=HabitResponse)
async def create_habit(habit_data: HabitCreate, token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    
    db_habit = Habit(
        user_id=user.id,
        name=habit_data.name,
        description=habit_data.description,
        icon=habit_data.icon,
        frequency=habit_data.frequency,
        time_of_day=habit_data.time_of_day,
        goal=habit_data.goal
    )
    db.add(db_habit)
    db.commit()
    db.refresh(db_habit)
    return HabitResponse.from_orm(db_habit)

@router.get("/", response_model=List[HabitResponse])
async def get_habits(token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    habits = db.query(Habit).filter(Habit.user_id == user.id).all()
    return [HabitResponse.from_orm(h) for h in habits]

@router.get("/{habit_id}", response_model=HabitResponse)
async def get_habit(habit_id: int, token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    habit = db.query(Habit).filter(Habit.id == habit_id, Habit.user_id == user.id).first()
    
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    return HabitResponse.from_orm(habit)

@router.put("/{habit_id}", response_model=HabitResponse)
async def update_habit(habit_id: int, habit_data: HabitUpdate, token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    habit = db.query(Habit).filter(Habit.id == habit_id, Habit.user_id == user.id).first()
    
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    
    if habit_data.name:
        habit.name = habit_data.name
    if habit_data.current is not None:
        habit.current = habit_data.current
    if habit_data.progress is not None:
        habit.progress = habit_data.progress
    
    db.commit()
    db.refresh(habit)
    return HabitResponse.from_orm(habit)

@router.post("/{habit_id}/log")
async def log_habit(habit_id: int, log_data: HabitLogCreate, token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    habit = db.query(Habit).filter(Habit.id == habit_id, Habit.user_id == user.id).first()
    
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    
    log = HabitLog(habit_id=habit_id, user_id=user.id, value=log_data.value)
    db.add(log)
    
    # Update habit progress
    habit.current += log_data.value
    if habit.goal > 0:
        habit.progress = min(100, (habit.current / habit.goal) * 100)
    
    db.commit()
    return {"message": "Logged successfully"}

@router.delete("/{habit_id}")
async def delete_habit(habit_id: int, token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)
    habit = db.query(Habit).filter(Habit.id == habit_id, Habit.user_id == user.id).first()
    
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    
    db.delete(habit)
    db.commit()
    return {"message": "Habit deleted"}
