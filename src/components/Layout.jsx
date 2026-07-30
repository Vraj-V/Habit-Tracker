import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  LayoutGrid,
  BarChart3,
  CheckCircle2,
  Users,
  MessageCircle,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
} from 'lucide-react';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: LayoutGrid, label: 'Dashboard', path: '/dashboard' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: CheckCircle2, label: 'Habits', path: '/habits' },
    { icon: Users, label: 'Community', path: '/community' },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 bg-surface border-r border-border p-6 flex flex-col overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 cursor-pointer" onClick={() => navigate('/dashboard')}>
          <img src="/logo.png" alt="Aura" className="h-10 w-10" />
          <div>
            <h1 className="text-xl font-bold text-primary">Aura</h1>
            <p className="text-xs text-muted">Premium Health</p>
          </div>
        </div>

        {/* New Habit Button */}
        <button className="w-full bg-primary text-white rounded-full py-2 px-4 mb-8 font-medium hover:bg-primary-dark transition flex items-center justify-center gap-2">
          <span>+</span> New Habit
        </button>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted hover:bg-surface-hover hover:text-foreground transition group"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <div className="space-y-2 border-t border-border pt-4 mt-4">
          <button
            onClick={() => navigate('/settings')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted hover:bg-surface-hover hover:text-foreground transition"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
          <button
            onClick={() => navigate('/support')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted hover:bg-surface-hover hover:text-foreground transition"
          >
            <HelpCircle className="h-5 w-5" />
            <span>Support</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-error hover:bg-error/10 transition"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-surface border-b border-border px-8 py-4 flex items-center justify-between">
          <div className="text-sm text-muted">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-surface-hover rounded-lg transition">
              <Bell className="h-5 w-5 text-muted" />
            </button>
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
