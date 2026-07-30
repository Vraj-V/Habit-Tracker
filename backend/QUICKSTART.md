# Backend Quick Start Guide

Get the Aura backend running in 2 minutes!

## Option 1: Direct Python (Recommended for Development)

### Step 1: Setup Environment
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Configure
```bash
cp .env.example .env
```

### Step 4: Run
```bash
python main.py
```

✅ Backend is now running at: http://localhost:8000

## Option 2: Docker (Recommended for Production)

### One Command:
```bash
cd backend
docker-compose up
```

✅ Backend is now running at: http://localhost:8000

## Testing the Backend

### 1. Open Interactive Docs
Visit: http://localhost:8000/docs

### 2. Test Signup
```json
POST /api/auth/signup
{
  "email": "test@aura.com",
  "full_name": "Test User",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "test@aura.com",
    "full_name": "Test User",
    "is_active": true,
    "created_at": "2024-01-15T10:00:00"
  }
}
```

### 3. Test Login
```json
POST /api/auth/login
{
  "email": "test@aura.com",
  "password": "password123"
}
```

### 4. Get Dashboard Stats
Copy the `access_token` from login response, then:

```
GET /api/dashboard/stats
Header: Authorization: Bearer <access_token>
```

Response:
```json
{
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@aura.com"
  },
  "activity": {
    "calories": 640,
    "unit": "KCAL"
  },
  "sleep": {
    "hours": 7,
    "minutes": 42,
    "quality": 85
  },
  "stress": {
    "level": "Low",
    "message": "HRV is stable. You are recovered and ready."
  }
}
```

## Connecting Frontend

The frontend (React app) is already configured to connect to this backend!

Make sure:
1. Backend running on: `http://localhost:8000`
2. Frontend running on: `http://localhost:5173`

The frontend will automatically:
- Call your API endpoints
- Stream WebSocket updates
- Display real-time data

## Common Tasks

### Create a Habit
```
POST /api/habits/create
Authorization: Bearer <token>

{
  "name": "Morning Run",
  "description": "5km run every morning",
  "icon": "run",
  "frequency": "daily",
  "time_of_day": "morning",
  "goal": 5.0
}
```

### Get All Habits
```
GET /api/habits/
Authorization: Bearer <token>
```

### Log Habit Progress
```
POST /api/habits/1/log
Authorization: Bearer <token>

{
  "value": 2.5
}
```

### Get Community Challenges
```
GET /api/community/challenges
Authorization: Bearer <token>
```

### Join Challenge
```
POST /api/community/challenges/1/join
Authorization: Bearer <token>
```

### Get Leaderboard
```
GET /api/community/leaderboard
Authorization: Bearer <token>
```

## WebSocket Connection

### JavaScript Example:
```javascript
const ws = new WebSocket('ws://localhost:8000/ws');

ws.onopen = () => {
  console.log('Connected to WebSocket');
  
  // Send habit update
  ws.send(JSON.stringify({
    type: 'habit-update',
    habit_id: 1,
    progress: 75,
    streak: 5
  }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Received:', message);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};
```

## Database Access

The database is SQLite stored at `backend/aura.db`

View the database:
```bash
# Using SQLite CLI
sqlite3 aura.db

# List tables
.tables

# Query users
SELECT * FROM users;
```

## Environment Variables

Edit `.env` to customize:

```env
# Database
DATABASE_URL=sqlite:///./aura.db

# Security (CHANGE IN PRODUCTION)
SECRET_KEY=your-super-secret-key-change-this
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

## Debugging

### View Logs
```bash
# Terminal will show all requests
# Look for incoming requests and responses
```

### Check Database
```bash
# See what's in the database
sqlite3 backend/aura.db ".dump"
```

### Test Health Endpoint
```bash
curl http://localhost:8000/health
```

## Next Steps

1. ✅ Backend running locally
2. ✅ Frontend connecting to backend
3. 📝 Customize models and endpoints as needed
4. 🚀 Deploy to production (Vercel, Railway, Heroku)

## Troubleshooting

**Port 8000 already in use?**
```bash
# Use different port
uvicorn main:app --port 8001
```

**Module not found?**
```bash
# Make sure you're in the backend directory
cd backend
pip install -r requirements.txt
```

**CORS error from frontend?**
Edit `.env`:
```env
FRONTEND_URL=http://localhost:5173
```

**WebSocket not connecting?**
- Check backend is running
- Check frontend URL in .env
- Check browser console for errors

---

Need help? Check:
- Full documentation: `README.md`
- API docs: http://localhost:8000/docs
- Frontend setup: `../README.md`
