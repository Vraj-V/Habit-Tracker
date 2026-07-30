from fastapi import WebSocket, WebSocketDisconnect
from typing import Set
import json
from datetime import datetime

class ConnectionManager:
    def __init__(self):
        self.active_connections: Set[WebSocket] = set()
    
    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.add(websocket)
    
    def disconnect(self, websocket: WebSocket):
        self.active_connections.discard(websocket)
    
    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                pass
    
    async def send_personal(self, websocket: WebSocket, message: dict):
        try:
            await websocket.send_json(message)
        except Exception:
            pass

manager = ConnectionManager()

async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Handle different message types
            if message["type"] == "habit-update":
                await manager.broadcast({
                    "type": "habit-update",
                    "habit_id": message["habit_id"],
                    "progress": message["progress"],
                    "streak": message["streak"],
                    "timestamp": datetime.utcnow().isoformat()
                })
            
            elif message["type"] == "community-activity":
                await manager.broadcast({
                    "type": "community-activity",
                    "user_id": message["user_id"],
                    "username": message["username"],
                    "action": message["action"],
                    "timestamp": datetime.utcnow().isoformat()
                })
            
            elif message["type"] == "stats-update":
                await manager.broadcast({
                    "type": "stats-update",
                    "user_id": message["user_id"],
                    "stats": message["stats"],
                    "timestamp": datetime.utcnow().isoformat()
                })
    
    except WebSocketDisconnect:
        manager.disconnect(websocket)
