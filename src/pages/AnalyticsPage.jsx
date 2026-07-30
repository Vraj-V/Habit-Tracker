import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

export default function AnalyticsPage() {
  const { data: analytics } = useApi('/api/analytics');
  const [timeRange, setTimeRange] = useState('month');

  // Show empty state if no analytics data
  const hasData = analytics && Object.keys(analytics).length > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted">Deep insights into your health and habits</p>
        </div>
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                timeRange === range
                  ? 'bg-primary text-white'
                  : 'bg-surface border border-border text-muted hover:text-foreground'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {!hasData ? (
        <div className="bg-surface rounded-xl border border-border p-12 text-center">
          <div className="max-w-md mx-auto">
            <Calendar className="h-16 w-16 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Analytics Data Yet</h3>
            <p className="text-muted mb-6">
              Start tracking your habits to see detailed insights and analytics about your progress.
            </p>
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
              Add Your First Habit
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Sleep Timeline', value: analytics?.sleepTimeline || 'N/A', change: analytics?.sleepChange, positive: true },
              { label: 'Stress Level', value: analytics?.stressLevel || 'N/A', change: analytics?.stressChange, positive: true },
              { label: 'Exercise Streak', value: analytics?.exerciseStreak || '0', unit: 'days', change: analytics?.exerciseChange, positive: true },
              { label: 'Completion Rate', value: analytics?.completionRate || '0', unit: '%', change: analytics?.completionChange, positive: true },
            ].map((metric, i) => (
              <div key={i} className="bg-surface rounded-xl border border-border p-6">
                <p className="text-sm text-muted mb-3">{metric.label}</p>
                <div className="flex items-end gap-3">
                  <div>
                    <div className="text-2xl font-bold mb-1">{metric.value}</div>
                    {metric.unit && <div className="text-xs text-muted">{metric.unit}</div>}
                  </div>
                  {metric.change && (
                    <div className={`flex items-center gap-1 text-sm ml-auto ${metric.positive ? 'text-accent' : 'text-error'}`}>
                      {metric.positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span>{metric.change}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
