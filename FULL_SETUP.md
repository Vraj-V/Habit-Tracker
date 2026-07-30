# Aura Premium Health - Complete Setup Guide

## 🎯 Overview

Complete full-stack application:
- **Frontend**: React 18 + React Router (HTML-based, port 5173)
- **Backend**: FastAPI + SQLAlchemy + SQLite (Python, port 8000)
- **Communication**: REST API + WebSocket

---

## 📋 Quick Setup (5 minutes)

### Terminal 1: Start Frontend
```bash
cd /vercel/share/v0-project

# Open in browser or use the preview
# Frontend at: http://localhost:5173
```

### Terminal 2: Start Backend
```bash
cd /vercel/share/v0-project/backend
python main.py

# Backend at: http://localhost:8000
# Docs at: http://localhost:8000/docs
```

### Test the app:
1. Open http://localhost:5173
2. Login with any email/password (e.g., test@aura.com / password)
3. See dashboard, habits, community pages
4. All data syncs with backend in real-time

---

## 🏗️ Project Structure

```
/vercel/share/v0-project/
├── index.html              # React frontend (main app)
├── public/
│   └── logo.png           # Aura logo
├── README.md              # Frontend docs
├── QUICKSTART.md          # Frontend quick start
├── IMPLEMENTATION.md      # Frontend implementation
├── PROJECT_SUMMARY.md     # Frontend summary
├── FULL_SETUP.md          # This file
│
└── backend/               # Python FastAPI backend
    ├── main.py            # FastAPI entry point
    ├── requirements.txt   # Python dependencies
    ├── .env.example       # Environment template
    ├── Dockerfile         # Docker configuration
    ├── docker-compose.yml # Docker Compose setup
    ├── README.md          # Backend documentation
    ├── QUICKSTART.md      # Backend quick start
    │
    └── app/
        ├── models/        # Database models
        │   ├── user.py
        │   ├── habit.py
        │   ├── activity.py
        │   └── stats.py
        ├── schemas/       # Pydantic schemas
        ├── routes/        # API endpoints
        │   ├── auth.py
        │   ├── habits.py
        │   ├── dashboard.py
        │   ├── community.py
        │   └── websocket.py
        ├── core/          # Security & config
        └── db/            # Database setup
```

---

## 🚀 Starting the Application

### Method 1: Direct Python + Browser

**Terminal 1 - Backend:**
```bash
cd /vercel/share/v0-project/backend
python main.py
```

**Terminal 2 - Frontend (automatic):**
```bash
# Frontend already running on http://localhost:5173
# Or navigate to the directory and open index.html in browser
```

### Method 2: Using Docker

**Backend:**
```bash
cd /vercel/share/v0-project/backend
docker-compose up
```

**Frontend:**
```bash
# Open in browser
http://localhost:5173
```

---

## 📚 API Endpoints Reference

### Authentication
```bash
# Signup
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@aura.com",
    "full_name": "User Name",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@aura.com",
    "password": "password123"
  }'
```

### Habits (with token)
```bash
TOKEN="your-access-token"

# Create habit
curl -X POST http://localhost:8000/api/habits/create \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Morning Run",
    "frequency": "daily",
    "time_of_day": "morning",
    "goal": 5.0
  }'

# Get habits
curl http://localhost:8000/api/habits/ \
  -H "Authorization: Bearer $TOKEN"

# Log progress
curl -X POST http://localhost:8000/api/habits/1/log \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value": 2.5}'
```

### Dashboard
```bash
# Get stats
curl http://localhost:8000/api/dashboard/stats \
  -H "Authorization: Bearer $TOKEN"
```

### Community
```bash
# Get challenges
curl http://localhost:8000/api/community/challenges \
  -H "Authorization: Bearer $TOKEN"

# Join challenge
curl -X POST http://localhost:8000/api/community/challenges/1/join \
  -H "Authorization: Bearer $TOKEN"

# Get leaderboard
curl http://localhost:8000/api/community/leaderboard \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🔌 WebSocket Connection

### JavaScript Example

```javascript
// Connect to WebSocket
const ws = new WebSocket('ws://localhost:8000/ws');

ws.onopen = () => {
  console.log('Connected');
  
  // Send habit update
  ws.send(JSON.stringify({
    type: 'habit-update',
    habit_id: 1,
    progress: 75,
    streak: 5
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
  
  // Update UI with real-time data
  if (data.type === 'habit-update') {
    console.log(`Habit ${data.habit_id} progress: ${data.progress}%`);
  }
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = () => {
  console.log('Disconnected');
};
```

---

## 💾 Database

### View Database

```bash
# List all data
sqlite3 /vercel/share/v0-project/backend/aura.db

# Query users
sqlite> SELECT * FROM users;

# Query habits
sqlite> SELECT * FROM habits;

# Exit
sqlite> .quit
```

### Database Schema

**users**
- id, email, full_name, hashed_password, is_active, created_at

**habits**
- id, user_id, name, description, icon, frequency, time_of_day
- goal, current, streak, progress, created_at, updated_at

**habit_logs**
- id, habit_id, user_id, value, date

**challenges**
- id, title, description, icon, participants_count, duration_days

**challenge_participants**
- id, challenge_id, user_id, points, joined_at

**user_stats**
- id, user_id, calories, sleep_hours, sleep_quality, stress_level
- exercise_streak, impact_score, updated_at

---

## 🔐 Authentication Flow

1. **User Signs Up**
   ```
   Frontend → POST /api/auth/signup → Backend
   ↓
   Backend creates user with hashed password
   ↓
   Backend returns JWT token
   ↓
   Frontend stores token in localStorage
   ```

2. **User Logs In**
   ```
   Frontend → POST /api/auth/login → Backend
   ↓
   Backend verifies password
   ↓
   Backend returns JWT token
   ↓
   Frontend stores token
   ```

3. **Protected Requests**
   ```
   Frontend sends: Authorization: Bearer <token>
   ↓
   Backend verifies token
   ↓
   Backend returns user data
   ```

---

## 🧪 Testing

### Using Swagger UI

1. Open http://localhost:8000/docs
2. Click on endpoint
3. Click "Try it out"
4. Fill in parameters
5. Click "Execute"

### Using cURL

```bash
# Health check
curl http://localhost:8000/health

# List all endpoints
curl http://localhost:8000/docs/
```

### Using Frontend

1. Open http://localhost:5173
2. Click "Create Account" or "Sign In"
3. Enter credentials
4. Navigate to Dashboard, Habits, Community
5. All features work with live backend

---

## ⚙️ Configuration

### Backend .env

```env
# Database (SQLite)
DATABASE_URL=sqlite:///./aura.db

# Security (CHANGE IN PRODUCTION!)
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend Configuration

No configuration needed! Frontend automatically connects to:
- Backend API: `http://localhost:8000`
- WebSocket: `ws://localhost:8000/ws`

---

## 🚀 Deployment

### Deploy Backend to Railway

```bash
cd backend
railway link
railway up
```

### Deploy Backend to Vercel

```bash
# Create vercel.json in backend/
{
  "buildCommand": "pip install -r requirements.txt",
  "outputDirectory": ".",
  "framework": "python-fastapi"
}

vercel deploy
```

### Deploy Backend to Heroku

```bash
cd backend
heroku create aura-backend
git push heroku main
```

### Deploy Frontend to Vercel

```bash
vercel deploy
```

---

## 🐛 Troubleshooting

### Frontend not connecting to backend

**Check:**
- Backend running on http://localhost:8000
- CORS enabled (check .env FRONTEND_URL)
- Browser console for errors

**Fix:**
```bash
# Edit backend/.env
FRONTEND_URL=http://localhost:5173
```

### Database locked error

```bash
# Stop all processes
pkill -f python
pkill -f node

# Delete database and restart
rm backend/aura.db
python backend/main.py
```

### Port already in use

**Backend:**
```bash
# Use different port
cd backend
uvicorn main:app --port 8001
```

**Frontend:**
```bash
# Modify index.html to connect to different port
# Search for "localhost:8000" and update
```

### WebSocket not connecting

```bash
# Check backend logs
# Look for: "Uvicorn running on"

# Test connection
curl ws://localhost:8000/ws -i
```

---

## 📖 Documentation

### Frontend
- `README.md` - Overview & features
- `QUICKSTART.md` - 2-minute setup
- `IMPLEMENTATION.md` - Technical details
- `PROJECT_SUMMARY.md` - Complete guide

### Backend
- `backend/README.md` - Overview & setup
- `backend/QUICKSTART.md` - Quick start
- Swagger UI: http://localhost:8000/docs

### Full Stack
- `FULL_SETUP.md` - This file

---

## ✅ Checklist

- [ ] Backend running on http://localhost:8000
- [ ] Frontend running on http://localhost:5173
- [ ] Can sign up and login
- [ ] Can create and update habits
- [ ] Can view dashboard stats
- [ ] Can see community challenges
- [ ] Can view leaderboard
- [ ] WebSocket updates working
- [ ] Database has user data

---

## 🎉 You're All Set!

### Next Steps:
1. ✅ Explore the frontend at http://localhost:5173
2. ✅ Check backend docs at http://localhost:8000/docs
3. ✅ Customize models and endpoints
4. ✅ Add your own features
5. 🚀 Deploy to production

---

## 🔗 Quick Links

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Database**: sqlite3 backend/aura.db

---

**Built with ❤️ for health and wellness**

Questions? Check the documentation files or the Swagger UI!
