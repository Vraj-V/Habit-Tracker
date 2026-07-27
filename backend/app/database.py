import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()


MONGO_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("MONGO_DB_NAME", "habit_tracker")

class Database:
    client : AsyncIOMotorClient = None
    db = None

db_instance = Database()


async def connect_to_mongo():
    db_instance.client = AsyncIOMotorClient(MONGO_URI)
    db_instance.db = db_instance.client[DB_NAME]
    print(f"Connected to MongoDB database: {DB_NAME}")


async def close_mongo_connection():
    db_instance.client.close()
    print("MongoDB connection closed")

def get_database():
    return db_instance.db