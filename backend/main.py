from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.db.database import engine, Base
from app.core.config import settings
from app.routes import auth, habits, dashboard, community
from app.routes.websocket import websocket_endpoint

# Create tables on startup
Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables
    Base.metadata.create_all(bind=engine)
    print("✓ Database initialized")
    yield
    # Shutdown
    print("✓ App shutdown")

app = FastAPI(
    title="Aura Premium Health API",
    description="Backend API for Aura habit tracking app",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(habits.router)
app.include_router(dashboard.router)
app.include_router(community.router)

# WebSocket endpoint
@app.websocket("/ws")
async def websocket_handler(websocket: WebSocket):
    await websocket_endpoint(websocket)

# Health check
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Aura Backend API",
        "version": "1.0.0"
    }

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to Aura API",
        "docs": "/docs",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
