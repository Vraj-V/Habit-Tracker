import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { Plus, Search, Filter, Trash2, Archive } from 'lucide-react';

export default function HabitsPage() {
  const { data: habits } = useApi('/api/habits');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTab, setFilterTab] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: '', frequency: 'Daily', time: 'Morning' });

  const displayedHabits = habits || [];

  const handleAddHabit = (e) => {
    e.preventDefault();
    // In production, send to API
    console.log('Adding habit:', newHabit);
    setShowModal(false);
    setNewHabit({ name: '', frequency: 'Daily', time: 'Morning' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Habits</h1>
          <p className="text-muted">Track and manage all your daily habits</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary-dark transition flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          New Habit
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
          <input
            type="text"
            placeholder="Search habits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary"
          />
        </div>
        <button className="px-4 py-3 rounded-lg bg-surface border border-border text-muted hover:text-foreground transition flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', 'Active', 'Archived', 'Health', 'Fitness', 'Learning'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${
              filterTab === tab
                ? 'bg-primary text-white'
                : 'bg-surface border border-border text-muted hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedHabits.map((habit) => (
          <div key={habit.id} className="bg-surface rounded-xl border border-border p-6 hover:border-primary/30 transition group">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{habit.name}</h3>
                <p className="text-xs text-muted">{habit.goal}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition flex gap-2">
                <button className="p-2 hover:bg-surface-hover rounded transition">
                  <Archive className="h-4 w-4 text-muted" />
                </button>
                <button className="p-2 hover:bg-error/10 rounded transition">
                  <Trash2 className="h-4 w-4 text-error" />
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted">Progress</span>
                <span className="text-sm font-semibold">{Math.round((habit.completion / parseFloat(habit.goal)) * 100)}%</span>
              </div>
              <div className="w-full bg-surface-hover rounded-full h-2">
                <div
                  className="bg-primary rounded-full h-2 transition-all"
                  style={{ width: `${(habit.completion / parseFloat(habit.goal)) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Current Streak</span>
                <span className="font-semibold">{habit.streak || 0} days 🔥</span>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full mt-6 bg-primary/10 text-primary py-2 rounded-lg font-medium hover:bg-primary/20 transition">
              Check In
            </button>
          </div>
        ))}

        {/* Create New Card */}
        <button
          onClick={() => setShowModal(true)}
          className="bg-surface rounded-xl border-2 border-dashed border-border p-6 hover:border-primary transition flex flex-col items-center justify-center min-h-64 group"
        >
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
            <Plus className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold">Create New Habit</h3>
          <p className="text-sm text-muted mt-1">Add a new habit to track</p>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-xl border border-border p-8 w-full max-w-md max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">New Habit</h2>
              <button onClick={() => setShowModal(false)} className="text-muted hover:text-foreground text-2xl leading-none">
                ×
              </button>
            </div>

            <form onSubmit={handleAddHabit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Habit Name</label>
                <input
                  type="text"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  placeholder="e.g., Morning Run"
                  className="w-full px-4 py-2 rounded-lg bg-surface-darker border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Frequency</label>
                <select
                  value={newHabit.frequency}
                  onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-surface-darker border border-border text-foreground focus:outline-none focus:border-primary"
                >
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Time of Day</label>
                <select
                  value={newHabit.time}
                  onChange={(e) => setNewHabit({ ...newHabit, time: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-surface-darker border border-border text-foreground focus:outline-none focus:border-primary"
                >
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-surface-hover transition">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
