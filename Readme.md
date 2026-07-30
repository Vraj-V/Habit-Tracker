# Aura - Premium Health & Habit Tracking

A beautiful, modern React frontend application for health and habit tracking with real-time updates via WebSocket and API integration.

## 🚀 Features

- **Authentication System**: Login/Signup with email and OAuth support
- **Dashboard**: Real-time habit tracking with completion rings and streaks
- **Habit Management**: Create, edit, and track daily habits
- **Community**: Challenges, leaderboards, and social features
- **Analytics**: Detailed insights and performance metrics
- **Settings**: User preferences, device connectivity, and account management
- **Real-time Updates**: WebSocket integration for live data synchronization
- **API Hooks**: Custom `useApi()` and `useWebSocket()` hooks for data fetching

## 📁 Project Structure

```
src/
├── pages/              # Page components
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── Dashboard.jsx
│   ├── HabitsPage.jsx
│   ├── CommunityPage.jsx
│   ├── AnalyticsPage.jsx
│   ├── SettingsPage.jsx
│   ├── SupportPage.jsx
│   └── TermsPage.jsx
├── components/         # Reusable components
│   ├── Layout.jsx
│   ├── ProtectedRoute.jsx
├── context/            # React Context providers
│   ├── AuthContext.js
│   └── WebSocketContext.jsx
├── hooks/              # Custom React hooks
│   ├── useApi.js       # API data fetching
│   └── useWebSocket.js # WebSocket integration
├── App.jsx             # Main app routing
├── main.jsx            # Entry point
└── index.css           # Global styles with Tailwind

public/
└── logo.png            # Aura logo

```

## 🛠️ Tech Stack

- **React 18** - UI framework
- **React Router 6** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **WebSocket** - Real-time updates
- **Custom Hooks** - API fetching and state management

## 🎨 Design System

### Colors
- **Primary**: #4f46e5 (Indigo)
- **Accent**: #10b981 (Emerald)
- **Error**: #f43f5e (Rose)
- **Warning**: #f59e0b (Amber)
- **Background**: #0a0a0b (Near Black)
- **Surface**: #1a1a1f (Dark Gray)

### Typography
- Clean, minimal interface following Apple HIG
- Inter font family throughout
- Clear hierarchy with 8px spacing system

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The app will open at `http://localhost:5173`

## 📱 Pages & Routes

### Public Routes
- `/` - Landing page with features and testimonials
- `/login` - Email/OAuth login
- `/signup` - User registration
- `/terms` - Terms & Conditions

### Protected Routes (Require Login)
- `/dashboard` - Main health dashboard
- `/habits` - Habit management and tracking
- `/community` - Challenges, leaderboards, and social
- `/analytics` - Detailed health insights and metrics
- `/settings` - User settings and preferences
- `/support` - FAQ and help center

## 🔐 Authentication

The app uses a mock authentication system with:
- Email/password login and signup
- OAuth simulation (Google, Apple)
- Session persistence via localStorage
- Protected routes with `ProtectedRoute` component

For production, integrate with:
- Firebase Auth
- Auth0
- Supabase Auth
- Your custom backend

## 🌐 API Integration

The `useApi()` hook provides data fetching with:
- Automatic loading and error states
- Mock data simulation
- Easy refetch capability

```jsx
const { data, loading, error, refetch } = useApi('/api/habits');
```

Mock endpoints available:
- `/api/habits` - Habit list
- `/api/analytics` - Analytics data
- `/api/community` - Community data

## 🔌 WebSocket Real-time Updates

The `useWebSocket()` hook provides real-time data:
- Live user counts
- Real-time habit completions
- Automatic reconnection

```jsx
const { isConnected, realtimeData } = useWebSocket();
```

## 🎯 Key Features Breakdown

### Dashboard
- Completion ring showing daily progress
- AI insight card with recommendations
- Habit cards with streaks and progress bars
- Activity overview with charts
- Real-time wearable sync status

### Habits Management
- Create/edit habits with custom goals
- Filter by category and status
- Progress tracking with visual indicators
- Streak counter
- Modal-based habit creation

### Community
- Active challenges with participant counts
- Friends activity feed
- Leaderboard with global and friend views
- Impact score calculation
- Real-time statistics

### Analytics
- Sleep timeline breakdown
- Stress level visualization
- Exercise streak calendar
- Habit performance comparison
- Time range filtering (week/month/year)

### Settings
- Profile management
- Theme toggle (dark/light)
- Notification preferences
- Device connectivity
- Security settings
- Account deletion

## 💡 Customization

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `App.jsx`
3. Add navigation link in `Layout.jsx`

### Styling
All styles use Tailwind CSS with custom design tokens defined in `src/index.css`. Modify the CSS variables to change the color scheme.

### API Integration
Replace mock data in `useApi()` hook with real API calls:

```jsx
const response = await fetch(url);
const data = await response.json();
```

## 📦 Building for Production

```bash
pnpm build
```

Creates optimized build in `dist/` directory. Deploy to:
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- Any static hosting

## 🔄 WebSocket Connection

To connect to a real WebSocket server, update `WebSocketContext.jsx`:

```jsx
const ws = new WebSocket('wss://your-server.com/socket');
ws.onmessage = (event) => {
  setRealtimeData(JSON.parse(event.data));
};
```

## 📝 License

Premium Health Application - All rights reserved

## 👨‍💻 Support

For questions or issues, refer to the Support page at `/support` or contact support@aura.health

---

**Built with ❤️ for high-performance health optimization**
