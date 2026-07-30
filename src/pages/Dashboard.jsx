import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useApi } from '../hooks/useApi';
import { useWebSocket } from '../hooks/useWebSocket';
import { CheckCircle2, Flame, TrendingUp, Zap } from 'lucide-react';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const { data: habits } = useApi('/api/habits');
  const { realtimeData } = useWebSocket();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const displayedHabits = habits || [];
  const completionPercentage = displayedHabits.length > 0 
    ? Math.round((displayedHabits.filter(h => h.completed).length / displayedHabits.length) * 100) 
    : 0;
  const currentStreak = displayedHabits.length > 0 
    ? Math.max(...displayedHabits.map(h => h.streak || 0))
    : 0;

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Good Morning, {user?.name?.split(' ')[0]}</h1>
        <p className="text-muted">Here is your daily health snapshot.</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Completion Ring */}
        <div className="lg:col-span-2 bg-surface rounded-xl border border-border p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">Active Habits</h2>
              <p className="text-muted">Stay consistent to reach your goals.</p>
            </div>
            <div className="flex gap-2">
              {['All', 'Morning', 'Evening'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    selectedFilter === filter
                      ? 'bg-primary text-white'
                      : 'bg-surface-hover text-muted hover:text-foreground'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Habits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayedHabits.length === 0 ? (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted mb-4">No habits yet. Start tracking your first habit!</p>
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
                  Add Habit
                </button>
              </div>
            ) : (
              displayedHabits.map((habit) => (
                <div
                  key={habit.id}
                  className="bg-gradient-to-br from-surface-dark to-surface-darker border border-border rounded-xl p-6 hover:border-primary/30 transition group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Zap className="h-6 w-6" />
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition">⋯</button>
                  </div>

                  <h3 className="font-semibold mb-1">{habit.name}</h3>
                  <p className="text-xs text-muted mb-4">{habit.goal}</p>

                  {/* Progress Ring */}
                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <div className="text-2xl font-bold mb-1">{habit.completion || 0}</div>
                      <div className="w-full bg-surface-hover rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all"
                          style={{ width: `${habit.completion_rate || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <Flame className="h-3 w-3 text-orange" />
                      <span>{habit.streak || 0}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Activity Ring */}
        <div className="bg-surface rounded-xl border border-border p-8 flex flex-col items-center justify-center">
          <div className="relative h-40 w-40 flex items-center justify-center mb-6">
            <svg className="transform -rotate-90" width="160" height="160" viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="12"
                strokeDasharray={`${440 * (completionPercentage / 100)} 440`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <div className="text-3xl font-bold">{completionPercentage}%</div>
              <div className="text-xs text-muted">Complete</div>
            </div>
          </div>

          <h3 className="font-semibold text-center mb-6">Today&apos;s Progress</h3>

          {/* Stats */}
          <div className="space-y-3 w-full">
            <div className="flex items-center justify-between p-2 bg-primary/5 rounded">
              <span className="text-sm text-muted">Completed</span>
              <span className="font-semibold">{displayedHabits.filter(h => h.completed).length}</span>
            </div>
            <div className="flex items-center justify-between p-2">
              <span className="text-sm text-muted">Streak</span>
              <span className="font-semibold flex items-center gap-1">
                <Flame className="h-4 w-4 text-orange" /> {currentStreak} days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insight - Only show if there's data */}
      {displayedHabits.length > 0 && (
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">AI Recommended</h3>
              <p className="text-muted">
                Keep building your habits consistently for better results.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Overview - Remove hardcoded data */}
      {displayedHabits.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Walking & Running */}
          <div className="bg-surface rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wide mb-1">Activity Stats</h3>
                <p className="text-muted text-sm">No activity data yet</p>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="text-center py-8 text-muted">
              <p>Connect a wearable device to see activity data</p>
            </div>
          </div>

          {/* Sleep & Stress */}
          <div className="bg-surface rounded-xl border border-border p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wide mb-3">Sleep</h3>
                <div className="text-muted">No data</div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wide mb-3">Stress</h3>
                <div className="text-muted">No data</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wearable Sync Status */}
      {realtimeData.timestamp && (
        <div className="bg-surface rounded-lg border border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-accent rounded-full animate-pulse"></div>
            <div>
              <div className="text-sm font-medium">Real-time Sync Active</div>
              <div className="text-xs text-muted">Last synced just now</div>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition">
            Refresh
          </button>
        </div>
      )}
    </div>
  );
}
