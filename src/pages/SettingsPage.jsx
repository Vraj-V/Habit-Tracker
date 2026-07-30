import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Bell, Moon, Sun, Shield, LogOut, Trash2, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [showDangerZone, setShowDangerZone] = useState(false);
  const [theme, setTheme] = useState('dark');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="bg-surface rounded-xl border border-border p-8">
        <h2 className="text-xl font-bold mb-6">Profile</h2>

        <div className="flex items-start gap-8 mb-8 pb-8 border-b border-border">
          <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary flex-shrink-0">
            A
          </div>
          <div className="flex-1">
            <div className="mb-6">
              <p className="text-sm text-muted mb-2">Display Name</p>
              <p className="text-lg font-semibold">Alexander Vance</p>
            </div>
            <div>
              <p className="text-sm text-muted mb-2">Email</p>
              <p className="text-lg font-semibold">alexander.vance@executive.com</p>
            </div>
          </div>
          <button className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition">
            Edit
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-hover rounded-lg">
            <div>
              <p className="font-semibold text-sm">Membership Status</p>
              <p className="text-sm text-muted mt-1">AURA PREMIUM • Renews Oct 24</p>
            </div>
            <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-surface transition">
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-surface rounded-xl border border-border p-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </h2>

        <div className="space-y-4">
          {[
            { label: 'Daily Reminders', description: 'Gentle nudges for your habit streaks' },
            { label: 'AI Insights', description: 'Personalized health optimizations' },
            { label: 'Achievement Alerts', description: 'Celebrate your major milestones' },
            { label: 'Community Updates', description: 'News from the Aura circles' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-surface-hover rounded-lg hover:border border-border transition">
              <div>
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-sm text-muted mt-1">{item.description}</p>
              </div>
              <input
                type="checkbox"
                defaultChecked={true}
                className="w-5 h-5 rounded border-border cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-surface rounded-xl border border-border p-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          Appearance
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTheme('dark')}
            className={`p-6 rounded-lg border-2 transition flex flex-col items-center justify-center ${
              theme === 'dark'
                ? 'border-primary bg-primary/5'
                : 'border-border bg-surface-hover hover:border-primary/30'
            }`}
          >
            <Moon className="h-8 w-8 mb-2" />
            <span className="font-semibold">Dark</span>
          </button>
          <button
            onClick={() => setTheme('light')}
            className={`p-6 rounded-lg border-2 transition flex flex-col items-center justify-center ${
              theme === 'light'
                ? 'border-primary bg-primary/5'
                : 'border-border bg-surface-hover hover:border-primary/30'
            }`}
          >
            <Sun className="h-8 w-8 mb-2" />
            <span className="font-semibold">Light</span>
          </button>
        </div>
      </div>

      {/* Connectivity */}
      <div className="bg-surface rounded-xl border border-border p-8">
        <h2 className="text-xl font-bold mb-6">Connectivity</h2>

        <div className="space-y-4">
          <div className="flex items-start justify-between p-4 bg-surface-hover rounded-lg">
            <div>
              <p className="font-semibold text-sm">Apple Watch Ultra</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="h-2 w-2 bg-accent rounded-full"></div>
                <p className="text-xs text-muted">Connected • 82% • Synced 5 mins ago</p>
              </div>
            </div>
            <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-surface transition">
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-surface rounded-xl border border-border p-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Security
        </h2>

        <div className="space-y-4">
          <button className="w-full p-4 bg-surface-hover hover:bg-surface-darker rounded-lg text-left font-semibold text-sm transition">
            Change Password
          </button>
          <button className="w-full p-4 bg-surface-hover hover:bg-surface-darker rounded-lg text-left font-semibold text-sm transition">
            Two-Factor Authentication
          </button>
          <button className="w-full p-4 bg-surface-hover hover:bg-surface-darker rounded-lg text-left font-semibold text-sm transition">
            View Active Sessions
          </button>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full p-4 bg-primary/10 hover:bg-primary/20 rounded-lg text-primary font-semibold flex items-center justify-center gap-2 transition"
      >
        <LogOut className="h-5 w-5" />
        Sign Out of Account
      </button>

      {/* Danger Zone */}
      <div className="bg-error/5 border border-error/20 rounded-xl p-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-error">
          <AlertTriangle className="h-5 w-5" />
          Danger Zone
        </h2>

        {!showDangerZone ? (
          <button
            onClick={() => setShowDangerZone(true)}
            className="px-6 py-3 bg-error/10 hover:bg-error/20 text-error rounded-lg font-semibold transition"
          >
            Expand Danger Zone
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="w-full px-6 py-3 bg-error/10 hover:bg-error/20 text-error rounded-lg font-semibold flex items-center justify-center gap-2 transition">
              <Trash2 className="h-5 w-5" />
              Delete Account Permanently
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
