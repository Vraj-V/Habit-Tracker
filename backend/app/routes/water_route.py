from fastapi import APIRouter
from app.services.water_services import add_water_entry, get_today_water_enteries

router = APIRouter(prefix="/water", tags=["water"])

@router.post("/")
async def log_water(amount_ml: int):
    entry_id = await add_water_entry(amount_ml)
    return {"id": entry_id, "message": "Water logged"}

@router.get("/")
async def list_water():
    entries = await get_today_water_enteries()
    return entries