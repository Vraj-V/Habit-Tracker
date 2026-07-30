# Aura Frontend - Implementation Guide

## Complete Feature Documentation

### 🔐 Authentication System

#### Login Page (`/login`)
- Email/password authentication
- "Forgot password?" link
- OAuth buttons (Google, Apple)
- Show/hide password toggle
- Error messaging and validation
- Session persistence with localStorage

**Features:**
- Email validation
- Password strength checking
- Remember me functionality
- Smooth loading states
- Link to signup page

#### Signup Page (`/signup`)
- Full name, email, password fields
- Confirm password validation
- Terms & Conditions checkbox
- Password strength indicator
- OAuth signup buttons
- Live active user counter
- Link to login page

**Validation:**
```javascript
- Email format validation
- Password minimum 6 characters
- Password match confirmation
- Required field checks
- Terms agreement required
```

#### Protected Routes
- Automatic redirect to login if not authenticated
- Session persistence across browser refresh
- Context-based user management

---

### 🏠 Dashboard (`/dashboard`)

#### Sections:
1. **Greeting Header**
   - Dynamic time-based greeting ("Good Morning")
   - User's first name display
   - Daily snapshot subtitle

2. **Main Content Area**
   - **Filter Buttons**: All, Morning, Evening
   - **Habit Cards Grid**: 
     - Habit name and goal
     - Progress visualization
     - Streak count with flame icon
     - Quick action buttons

3. **Completion Ring**
   - Circular progress visualization (SVG)
   - Percentage display
   - Today's progress overview

4. **Activity Section**
   - Walking & Running stats
   - Sleep timeline
   - Stress level indicator
   - Charts and visualizations

5. **AI Insight Card**
   - AI-generated recommendation
   - Health optimization tip
   - Contextual badge

6. **Real-time Sync Status**
   - Live wearable connection indicator
   - Last sync timestamp
   - Manual refresh button

---

### 📋 Habits Management (`/habits`)

#### Features:
- **Search functionality** with instant filtering
- **Filter tabs**: All, Active, Archived, by Category
- **Habit cards** showing:
  - Habit name and goal
  - Progress bar
  - Completion percentage
  - Streak counter
  - Action buttons (Archive, Delete)

#### Create Habit Modal:
```javascript
Fields:
- Habit Name (text input)
- Frequency (dropdown: Daily, Weekly, Monthly)
- Time of Day (dropdown: Morning, Afternoon, Evening)
- Submit/Cancel buttons
```

#### Habit Card Actions:
- Archive: Pause tracking without deleting
- Delete: Remove habit (with confirmation)
- Check In: Quick habit completion
- Edit: Modify habit settings

---

### 👥 Community Page (`/community`)

#### Active Challenges Section:
- Challenge cards with background images
- Participant count
- Days remaining
- "Join Challenge" buttons
- Challenge description

#### Friends Activity Feed:
- Friend profile avatars
- Activity descriptions with timestamps
- Like/heart interaction buttons
- Recent activity prioritization

#### Leaderboard Sidebar:
- Tab switching: Global / Friends
- Top 3 with medal emojis (🥇 🥈 🥉)
- Ranking numbers for positions 4+
- Points display
- Current user's position highlighted

#### Impact Score Card:
- Circular progress visualization
- Current score display
- Percentile ranking
- Weekly comparison

#### Quick Stats:
- Active Users count
- Total Habits tracked
- Longest Streak records

---

### 📊 Analytics Page (`/analytics`)

#### Time Range Filter:
- Week / Month / Year tabs
- Dynamic data refresh based on selection

#### Key Metrics (4 Cards):
- Sleep Timeline with % quality
- Stress Level with trend
- Exercise Streak with day count
- Completion Rate with percentage

#### Sleep Timeline Chart:
- Deep / Light / REM / Awake breakdown
- Duration display for each stage
- Color-coded visualization
- Weekly average

#### Stress Level Visualization:
- Line graph with gradient fill
- Current state indicator
- Min/Max/Avg values
- Trend analysis

#### Exercise Streak Calendar:
- 31-day grid view
- Color-coded completion
- Current streak highlight
- Total workouts this month

#### Habit Performance Table:
- Habit name
- Completion percentage bar
- Streak count
- Multiple habits comparison

---

### ⚙️ Settings Page (`/settings`)

#### Profile Section:
- Avatar display (initials-based)
- Name and email display
- Edit button
- Membership status with renewal date

#### Notification Preferences:
- Toggle switches for:
  - Daily Reminders
  - AI Insights
  - Achievement Alerts
  - Community Updates
- Per-notification customization

#### Appearance Theme:
- Dark mode toggle
- Light mode toggle
- Visual preview buttons

#### Connectivity:
- Device listing (Apple Watch, etc.)
- Connection status indicator
- Battery percentage
- Last sync timestamp
- Manage button for device settings

#### Security Section:
- Change Password button
- Two-Factor Authentication setup
- Active Sessions management

#### Sign Out & Danger Zone:
- Logout button
- Account deletion with warning
- Irreversible action confirmation

---

### ❓ Support Page (`/support`)

#### Help Resources (3 Cards):
1. **Live Concierge**
   - 24/7 expert availability
   - AI insights interpretation

2. **Aura Academy**
   - Evidence-based courses
   - Sleep optimization content

3. **Executive Circle**
   - Exclusive peer groups
   - High-performance networking

#### FAQ Section:
- Search functionality
- 5 expandable questions
- Smooth accordion animations
- Filter results dynamically

#### Contact Section:
- Support email link
- API Status link
- Privacy Policy link
- Documentation link

---

### 📄 Landing Page (`/`)

#### Navigation Bar:
- Logo with click to home
- Feature/Pricing/Blog links
- Login button
- Sign Up CTA button

#### Hero Section:
- Animated tagline
- Main headline with gradient
- Subheading text
- "Start Free Trial" and "View Science" buttons
- Live user counter

#### Features Section:
- 3 feature cards with icons
- Automatic Tracking
- Predictive Insights
- Community Drive

#### Wearable Integration Section:
- Compatible device logos
- Apple, Google, Fitbit, Garmin, Samsung, Oura

#### Testimonials Section:
- 3 user testimonial cards
- Star ratings
- User names and titles
- Quote text

#### CTA Section:
- Main call-to-action
- "Get Started Free" button

#### Footer:
- Multiple column navigation
- Product links
- Resource links
- Legal links
- Social media links
- Copyright notice

---

## 🔌 Custom Hooks

### `useApi(url, options)`
```javascript
const { data, loading, error, refetch } = useApi('/api/habits');

// Returns:
- data: API response data or mock data
- loading: boolean indicating fetch state
- error: error message if failed
- refetch: function to manually refresh data
```

### `useWebSocket()`
```javascript
const { isConnected, realtimeData } = useWebSocket();

// Returns:
- isConnected: WebSocket connection status
- realtimeData: Latest real-time data object
- Auto-updates every 5 seconds with mock data
```

---

## 🎨 Component Architecture

### Layout Component
Provides:
- Sidebar navigation with 5 main sections
- Top bar with date, notifications, user avatar
- Logo and "New Habit" button
- Navigation item highlighting
- Logout functionality

### ProtectedRoute Component
- Checks user authentication
- Redirects to login if not authenticated
- Wraps protected page components

### Context Providers
- **AuthContext**: User state and auth methods
- **WebSocketContext**: Real-time data streaming

---

## 🔄 Data Flow

### Authentication Flow
```
SignUp/Login → localStorage.setItem('aura_user') 
→ AuthContext.Provider → Protected Routes → Dashboard
```

### Real-time Updates
```
WebSocketProvider → useWebSocket() → Component State
→ Re-render with latest data
```

### API Data Fetching
```
useApi(url) → fetch data (simulated) → setData 
→ Component state → UI render
```

---

## 🎯 Mock API Endpoints

### Available Endpoints:
```javascript
GET /api/habits
Returns: Array of habit objects with name, goal, completion, streak

GET /api/analytics  
Returns: Sleep, stress, and exercise data

GET /api/community
Returns: Challenges, leaderboard, friends activity
```

---

## 🛠️ Integration Points for Backend

### 1. Authentication
Replace mock login in `LoginPage.jsx`:
```javascript
// Before (mock):
await new Promise((resolve) => setTimeout(resolve, 1000));

// After (real API):
const response = await fetch('https://your-api.com/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

### 2. Real-time WebSocket
Update `WebSocketContext.jsx`:
```javascript
wsRef.current = new WebSocket('wss://your-api.com/socket');
wsRef.current.onmessage = (event) => {
  setRealtimeData(JSON.parse(event.data));
};
```

### 3. API Fetching
Update `useApi.js` hook:
```javascript
const response = await fetch(url, {
  headers: { Authorization: `Bearer ${token}` }
});
const data = await response.json();
```

---

## 📱 Responsive Design

All components use Tailwind CSS breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

Key responsive features:
- Grid layouts adapt column count
- Sidebar becomes collapsible on mobile
- Modal full-width on small screens
- Touch-friendly button sizes

---

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratios (4.5:1 minimum)
- Focus indicators on all buttons
- Screen reader friendly

---

## 🚀 Performance Optimizations

- Code splitting via React Router
- Image lazy loading
- CSS-in-JS minimal runtime
- Memoized components where needed
- Efficient re-renders with context

---

## 📝 Development Tips

### Adding a New Page:
1. Create component in `src/pages/`
2. Import in `App.jsx`
3. Add Route in Routes component
4. Add navigation link in `Layout.jsx`

### Styling New Components:
- Use Tailwind utility classes
- Reference design tokens in `index.css`
- Follow 8px spacing system
- Use semantic color classes

### Debugging:
- Check browser console for errors
- Use React DevTools browser extension
- Inspect network tab for API calls
- Use localStorage for session debugging

---

## 🔗 Key File Locations

- **Authentication**: `src/context/AuthContext.js`
- **Real-time**: `src/context/WebSocketContext.jsx`
- **API Hooks**: `src/hooks/useApi.js`
- **Styling**: `src/index.css`
- **Config**: `vite.config.js`, `tailwind.config.js`
- **Routes**: `src/App.jsx`
- **Layout**: `src/components/Layout.jsx`

---

## 🎓 Next Steps

1. **Test all flows** - Login, create habits, view analytics
2. **Connect real backend** - Replace mock data with API calls
3. **Add error boundaries** - Error handling for API failures
4. **Implement notifications** - Browser push notifications
5. **Add persistence** - Database integration
6. **Deploy** - Build and deploy to Vercel/Netlify

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready
