from fastapi import FastAPI
from .database import connect_to_mongo, close_mongo_connection
from .routes.water_route import router as water_router

app = FastAPI()

app.include_router(water_router)

@app.on_event("startup")
async def startup_db_client():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_db_client():
    await close_mongo_connection()