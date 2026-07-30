## Aura Premium Health - FastAPI Backend

Complete Python backend for the Aura health and habit tracking application built with FastAPI, SQLAlchemy, and SQLite.

### 🚀 Features

- **Authentication**: JWT-based user authentication
- **Database**: SQLAlchemy ORM with SQLite
- **REST API**: Complete REST endpoints for all features
- **WebSocket**: Real-time data streaming
- **Database Models**:
  - Users with authentication
  - Habits with progress tracking
  - Community challenges & leaderboards
  - User activity feed
  - Performance stats

### 📁 Project Structure

```
backend/
├── app/
│   ├── models/           # SQLAlchemy models
│   │   ├── user.py       # User model
│   │   ├── habit.py      # Habit & HabitLog models
│   │   ├── activity.py   # Activity, Challenge models
│   │   └── stats.py      # UserStats model
│   ├── schemas/          # Pydantic schemas
│   │   ├── user.py       # User schemas
│   │   └── habit.py      # Habit schemas
│   ├── routes/           # API routes
│   │   ├── auth.py       # Authentication endpoints
│   │   ├── habits.py     # Habit endpoints
│   │   ├── dashboard.py  # Dashboard endpoints
│   │   ├── community.py  # Community endpoints
│   │   └── websocket.py  # WebSocket handlers
│   ├── core/
│   │   ├── config.py     # Configuration
│   │   └── security.py   # Security utilities
│   └── db/
│       └── database.py   # Database setup
├── main.py               # FastAPI app entry point
├── requirements.txt      # Python dependencies
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose setup
├── .env.example          # Environment variables template
└── README.md             # This file
```

### 🔧 Installation

#### 1. Using Python (Development)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Run server
python main.py
```

The server will start at `http://localhost:8000`

#### 2. Using Docker

```bash
cd backend

# Build and run
docker-compose up

# Or build separately
docker build -t aura-backend .
docker run -p 8000:8000 aura-backend
```

### 📚 API Endpoints

#### Authentication

```
POST   /api/auth/signup          # Create new account
POST   /api/auth/login           # Login with email/password
GET    /api/auth/me              # Get current user
```

#### Habits

```
POST   /api/habits/create        # Create new habit
GET    /api/habits/              # Get all user habits
GET    /api/habits/{id}          # Get specific habit
PUT    /api/habits/{id}          # Update habit
POST   /api/habits/{id}/log      # Log habit activity
DELETE /api/habits/{id}          # Delete habit
```

#### Dashboard

```
GET    /api/dashboard/stats      # Get user stats (calories, sleep, stress)
POST   /api/dashboard/stats/update  # Update user stats
```

#### Community

```
GET    /api/community/challenges      # Get all challenges
POST   /api/community/challenges/{id}/join  # Join challenge
GET    /api/community/leaderboard     # Get leaderboard
GET    /api/community/activities      # Get activity feed
POST   /api/community/activities/log  # Log activity
```

#### WebSocket

```
WS     /ws                        # Real-time updates
```

### 🔐 Authentication

The API uses JWT tokens for authentication. When logging in or signing up:

1. Receive `access_token` in response
2. Include in Authorization header for protected endpoints:
   ```
   Authorization: Bearer <access_token>
   ```

### 💾 Database Models

#### User
- id, email, full_name, hashed_password, is_active, created_at

#### Habit
- id, user_id, name, description, icon, frequency, time_of_day
- goal, current, streak, progress, created_at, updated_at

#### Challenge
- id, title, description, icon, participants_count, duration_days

#### UserStats
- id, user_id, calories, sleep_hours, sleep_quality, stress_level
- exercise_streak, impact_score, updated_at

### 🔌 WebSocket Events

Connect to `ws://localhost:8000/ws` and send/receive messages:

```json
// Send: Log habit update
{
  "type": "habit-update",
  "habit_id": 1,
  "progress": 75,
  "streak": 5
}

// Send: Community activity
{
  "type": "community-activity",
  "user_id": 1,
  "username": "John",
  "action": "completed Deep Focus Session"
}

// Receive: Real-time updates
{
  "type": "habit-update",
  "habit_id": 1,
  "progress": 75,
  "streak": 5,
  "timestamp": "2024-01-15T10:30:00"
}
```

### 📖 API Documentation

Interactive docs available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

### ⚙️ Configuration

Edit `.env` file:

```env
DATABASE_URL=sqlite:///./aura.db
SECRET_KEY=your-super-secret-key-change-this
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:5173
```

### 🧪 Testing Endpoints

Use the Swagger UI or curl:

```bash
# Signup
curl -X POST "http://localhost:8000/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@aura.com",
    "full_name": "Test User",
    "password": "password123"
  }'

# Login
curl -X POST "http://localhost:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@aura.com",
    "password": "password123"
  }'

# Get habits (replace TOKEN)
curl -X GET "http://localhost:8000/api/habits/" \
  -H "Authorization: Bearer TOKEN"
```

### 📦 Deployment

#### Vercel
```bash
# Create vercel.json
{
  "buildCommand": "pip install -r requirements.txt",
  "outputDirectory": ".",
  "framework": "python-fastapi",
  "functions": {
    "main.py": {
      "memory": 1024,
      "maxDuration": 60
    }
  }
}
```

#### Heroku
```bash
heroku create aura-backend
git push heroku main
```

#### Railway
```bash
railway link
railway up
```

### 📝 Development

Run with auto-reload:
```bash
uvicorn main:app --reload --port 8000
```

### 🐛 Troubleshooting

**ImportError: No module named 'app'**
```bash
# Add backend directory to PYTHONPATH
export PYTHONPATH="${PYTHONPATH}:/path/to/backend"
```

**Database locked**
```bash
# Remove and recreate
rm aura.db
python main.py
```

### 🤝 Contributing

Feel free to modify and extend the backend for your needs!

### 📄 License

This is part of the Aura Premium Health application.

### 🔗 Frontend

React frontend located in parent directory (`../index.html`)

---

**Backend Status**: ✅ Ready for production
**Last Updated**: 2024
