from app.database import get_database
from datetime import datetime

async def add_water_entry(amount_ml: int):
    db = get_database()
    entry = {
        "amount_ml": amount_ml,
        "timestamp": datetime.utcnow()
    }
    result = await db["water_logs"].insert_one(entry)
    return str(result.inserted_id)


async def get_today_water_enteries():
    db = get_database()
    records = db["water_logs"].find().sort("timestamp", 1)
    entries = []
    async for doc in records:
        doc["_id"] = str(doc["_id"])   # convert ObjectId -> string
        entries.append(doc)
    return entries