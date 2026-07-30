import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Eye, EyeOff, Check } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validation
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Please enter a valid email');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      if (!agreed) {
        setError('Please agree to the Terms & Conditions');
        setLoading(false);
        return;
      }

      // Mock successful signup
      const user = {
        id: '1',
        name: formData.name,
        email: formData.email,
        avatar: null,
      };

      signup(user);
      navigate('/dashboard');
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    // Simulate OAuth signup
    const user = {
      id: '1',
      name: provider === 'google' ? 'Google User' : 'Apple User',
      email: `user@${provider}.com`,
      avatar: null,
    };
    signup(user);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="/logo.png" alt="Aura" className="h-12 w-12" />
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-2">Aura</h1>
        <p className="text-center text-muted mb-8">Begin your journey to calm intelligence and peak performance.</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {error && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-lg text-sm text-error">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@aurahealth.ai"
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Create Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-border bg-surface cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-muted">
              I agree to the{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms & Conditions
              </Link>{' '}
              and Privacy Policy
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-full font-medium hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-muted">OR CONTINUE WITH</span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => handleOAuth('google')}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-surface transition"
          >
            <span className="text-xl">🔵</span>
            <span className="text-sm font-medium">Google</span>
          </button>
          <button
            onClick={() => handleOAuth('apple')}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-surface transition"
          >
            <span className="text-xl">🍎</span>
            <span className="text-sm font-medium">Apple</span>
          </button>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-sm text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>

        {/* Live Stats */}
        <div className="mt-8 p-4 bg-surface rounded-lg border border-border text-center">
          <div className="text-sm text-muted mb-1">Active Users</div>
          <div className="text-2xl font-bold text-primary">12k+</div>
          <div className="text-xs text-muted mt-2">Living better with Aura</div>
        </div>
      </div>
    </div>
  );
}
