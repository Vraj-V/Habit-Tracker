from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from typing import List, Optional
from app.db.database import get_db
from app.models.user import User
from app.models.activity import Challenge, ChallengeParticipant
from app.schemas.habit import ChallengeResponse, LeaderboardEntry
from app.core.security import decode_token

router = APIRouter(prefix="/api/community", tags=["community"])

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

@router.get("/challenges", response_model=List[ChallengeResponse])
async def get_challenges(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    challenges = db.query(Challenge).all()
    return [ChallengeResponse.from_orm(c) for c in challenges]

@router.post("/challenges/{challenge_id}/join")
async def join_challenge(challenge_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    challenge = db.query(Challenge).filter(Challenge.id == challenge_id).first()
    
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    
    # Check if already joined
    existing = db.query(ChallengeParticipant).filter(
        ChallengeParticipant.challenge_id == challenge_id,
        ChallengeParticipant.user_id == current_user.id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Already joined this challenge")
    
    participant = ChallengeParticipant(challenge_id=challenge_id, user_id=current_user.id)
    challenge.participants_count += 1
    
    db.add(participant)
    db.commit()
    
    return {"message": "Successfully joined challenge"}

@router.get("/leaderboard")
async def get_leaderboard(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    # Get top participants with most points
    top_users = db.query(
        ChallengeParticipant.user_id,
        ChallengeParticipant.points
    ).order_by(ChallengeParticipant.points.desc()).limit(10).all()
    
    leaderboard = []
    for rank, (user_id, points) in enumerate(top_users, 1):
        u = db.query(User).filter(User.id == user_id).first()
        badge = None
        if rank == 1:
            badge = "gold"
        elif rank == 2:
            badge = "silver"
        elif rank == 3:
            badge = "bronze"
        
        leaderboard.append({
            "rank": rank,
            "user_id": user_id,
            "name": u.full_name if u else "Unknown",
            "points": points or 0,
            "badge": badge
        })
    
    return {
        "leaderboard": leaderboard,
        "your_rank": next((entry for entry in leaderboard if entry["user_id"] == current_user.id), None)
    }

@router.get("/activities")
async def get_community_activities(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    from app.models.activity import Activity
    
    activities = db.query(Activity).order_by(Activity.created_at.desc()).limit(20).all()
    
    return [
        {
            "id": a.id,
            "user_id": a.user_id,
            "username": db.query(User).filter(User.id == a.user_id).first().full_name,
            "activity_type": a.activity_type,
            "title": a.title,
            "description": a.description,
            "icon": a.icon,
            "created_at": a.created_at
        }
        for a in activities
    ]

@router.post("/activities/log")
async def log_activity(activity_data: dict, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    from app.models.activity import Activity
    
    activity = Activity(
        user_id=current_user.id,
        activity_type=activity_data.get("activity_type"),
        title=activity_data.get("title"),
        description=activity_data.get("description"),
        icon=activity_data.get("icon")
    )
    db.add(activity)
    db.commit()
    
    return {"message": "Activity logged"}
