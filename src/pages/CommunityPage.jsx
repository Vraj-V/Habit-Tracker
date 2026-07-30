import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Search, Heart, MessageCircle, Medal } from 'lucide-react';

export default function CommunityPage() {
  const { data: communityData } = useApi('/api/community');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Global');

  const leaderboard = communityData?.leaderboard || [];
  const challenges = communityData?.challenges || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community</h1>
          <p className="text-muted">Connect, compete, and celebrate with others</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
          <input
            type="text"
            placeholder="Find friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Challenges */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Active Challenges</h2>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>

          {challenges.length > 0 ? (
            challenges.map((challenge) => (
              <div key={challenge.id} className="bg-surface rounded-xl border border-border overflow-hidden hover:border-primary/30 transition group cursor-pointer">
                <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent flex items-end p-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{challenge.goal || 'N/A'}</span>
                      <span className="text-sm text-muted">{challenge.type || 'Challenge'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{challenge.name}</h3>
                  <p className="text-sm text-muted mb-4">{challenge.description || 'No description available.'}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="text-muted">Participants: </span>
                      <span className="font-semibold">{(challenge.participants || 0).toLocaleString()}</span>
                    </div>
                    <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition">
                      Join Challenge
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-surface rounded-xl border border-border p-12 text-center">
              <Medal className="h-16 w-16 text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Active Challenges</h3>
              <p className="text-muted">Check back later for new community challenges!</p>
            </div>
          )}

          {/* Friends Activity */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Friends Activity</h2>

            {communityData?.friendsActivity && communityData.friendsActivity.length > 0 ? (
              <div className="space-y-3">
                {communityData.friendsActivity.map((item, i) => (
                  <div key={i} className="bg-surface rounded-lg border border-border p-4 flex items-start justify-between hover:border-primary/30 transition group">
                    <div className="flex gap-4 flex-1">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm">
                          <span className="font-semibold">{item.name}</span>
                          <span className="text-muted"> {item.activity}</span>
                        </p>
                        <p className="text-xs text-muted mt-1">{item.time}</p>
                      </div>
                    </div>
                    <Heart className="h-5 w-5 text-muted group-hover:text-error cursor-pointer transition opacity-0 group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-surface rounded-lg border border-border p-8 text-center">
                <p className="text-muted">No friend activity yet. Connect with friends to see their progress!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Your Impact Score */}
          <div className="bg-surface rounded-xl border border-border p-6">
            <h3 className="font-semibold mb-4">Your Impact Score</h3>
            <div className="space-y-4">
              <div className="relative h-24 flex items-center justify-center">
                <div className="absolute">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{communityData?.impactScore || 0}</div>
                    <div className="text-xs text-muted">{communityData?.ranking || 'No ranking yet'}</div>
                  </div>
                </div>
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#4F46E5" strokeWidth="8" strokeDasharray={`${283 * ((communityData?.impactScore || 0) / 10000)} 283`} strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-surface rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Leaderboard</h3>
              <div className="flex gap-2">
                <button className={`text-xs px-3 py-1 rounded-full transition ${activeTab === 'Global' ? 'bg-primary text-white' : 'bg-surface-hover text-muted'}`} onClick={() => setActiveTab('Global')}>
                  Global
                </button>
                <button className={`text-xs px-3 py-1 rounded-full transition ${activeTab === 'Friends' ? 'bg-primary text-white' : 'bg-surface-hover text-muted'}`} onClick={() => setActiveTab('Friends')}>
                  Friends
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div key={user.rank} className="flex items-center gap-3 p-3 bg-surface-hover rounded-lg hover:bg-primary/10 transition cursor-pointer">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-sm font-bold text-primary flex-shrink-0">
                    {user.rank === 1 && <span>🥇</span>}
                    {user.rank === 2 && <span>🥈</span>}
                    {user.rank === 3 && <span>🥉</span>}
                    {user.rank > 3 && user.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{user.name}</p>
                  </div>
                  <div className="text-sm font-bold text-primary">{user.points.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Active Users</span>
                <span className="text-sm font-bold text-primary">{communityData?.activeUsers || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Total Habits</span>
                <span className="text-sm font-bold text-primary">{communityData?.totalHabits || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">Longest Streak</span>
                <span className="text-sm font-bold text-primary">{communityData?.longestStreak || 0} days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
