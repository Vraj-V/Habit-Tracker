from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import Optional
from app.db.database import get_db
from app.models.user import User
from app.models.stats import UserStats
from app.core.security import decode_token

router = APIRouter(prefix="/api/dashboard", tags=["dashboard"])

def get_current_user(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)) -> User:
    if not authorization:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    token = authorization.replace("Bearer ", "") if authorization.startswith("Bearer ") else authorization
    
    payload = decode_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user_id = payload.get("sub")
    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/stats")
async def get_dashboard_stats(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Get or create stats
    stats = db.query(UserStats).filter(UserStats.user_id == current_user.id).first()
    
    if not stats:
        stats = UserStats(user_id=current_user.id)
        db.add(stats)
        db.commit()
        db.refresh(stats)
    
    return {
        "user": {
            "id": current_user.id,
            "name": current_user.full_name,
            "email": current_user.email
        },
        "activity": {
            "calories": stats.calories or 0,
            "unit": "KCAL"
        },
        "sleep": {
            "hours": stats.sleep_hours or 0,
            "minutes": int((stats.sleep_hours or 0) * 60) % 60,
            "quality": stats.sleep_quality or 0
        },
        "stress": {
            "level": stats.stress_level or "Unknown",
            "message": "No data available yet. Start tracking your habits."
        }
    }

@router.post("/stats/update")
async def update_stats(stats_data: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    stats = db.query(UserStats).filter(UserStats.user_id == current_user.id).first()
    if not stats:
        stats = UserStats(user_id=current_user.id)
        db.add(stats)
    
    if "calories" in stats_data:
        stats.calories = stats_data["calories"]
    if "sleep_hours" in stats_data:
        stats.sleep_hours = stats_data["sleep_hours"]
    if "sleep_quality" in stats_data:
        stats.sleep_quality = stats_data["sleep_quality"]
    if "stress_level" in stats_data:
        stats.stress_level = stats_data["stress_level"]
    if "exercise_streak" in stats_data:
        stats.exercise_streak = stats_data["exercise_streak"]
    if "impact_score" in stats_data:
        stats.impact_score = stats_data["impact_score"]
    
    db.commit()
    return {"message": "Stats updated successfully"}
