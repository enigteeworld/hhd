import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Admin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check credentials
    if (formData.username === 'admin' && formData.password === 'Untoldpass@6') {
      // Store login state
      localStorage.setItem('adminLoggedIn', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-nursery-cream flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-nursery-tangerine/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-nursery-mint/30 rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="Happy Hearts Daycare"
            className="h-20 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-nursery-slate">Admin Portal</h1>
          <p className="text-nursery-slate-muted text-sm">Happy Hearts Daycare</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2rem] p-8 shadow-soft">
          <h2 className="text-xl font-bold text-nursery-slate mb-2">Welcome Back</h2>
          <p className="text-nursery-slate-muted text-sm mb-6">
            Please sign in to access the admin dashboard
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-nursery-slate">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nursery-slate-muted" />
                <Input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Enter username"
                  required
                  className="pl-12 rounded-xl border-nursery-mint focus:border-nursery-tangerine focus:ring-nursery-tangerine"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-nursery-slate">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nursery-slate-muted" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter password"
                  required
                  className="pl-12 pr-12 rounded-xl border-nursery-mint focus:border-nursery-tangerine focus:ring-nursery-tangerine"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-nursery-slate-muted hover:text-nursery-slate transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary border-0 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-nursery-mint">
            <p className="text-xs text-nursery-slate-muted text-center">
              Default credentials:<br />
              Username: <strong>admin</strong> | Password: <strong>Untoldpass@6</strong>
            </p>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-nursery-slate-muted hover:text-nursery-tangerine transition-colors text-sm"
          >
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Admin;
