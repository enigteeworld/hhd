import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { SITE } from '@/lib/site';
import useCmsContent from '@/hooks/useCmsContent';

const Admin = () => {
  const navigate = useNavigate();
  const { getSetting, getImage } = useCmsContent();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const siteName = getSetting('site_name', SITE.name);
  const adminLogo = getImage(
    'site_logo',
    '/logo-cropped.png',
    `${siteName} logo`,
  );

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/admin/dashboard');
      }
    };

    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email.trim(),
      password: formData.password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    navigate('/admin/dashboard');
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-nursery-cream p-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nursery-tangerine/10" />
        <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-nursery-mint/30" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <img
            src={adminLogo.src}
            alt={adminLogo.alt}
            className="mx-auto mb-4 h-20 w-auto object-contain"
          />
          <h1 className="text-2xl font-bold text-nursery-slate">Admin Portal</h1>
          <p className="text-sm text-nursery-slate-muted">{siteName}</p>
        </div>

        <div className="rounded-[2rem] border border-white/60 bg-white/95 p-8 shadow-soft-lg backdrop-blur">
          <h2 className="mb-2 text-xl font-bold text-nursery-slate">Welcome Back</h2>
          <p className="mb-6 text-sm text-nursery-slate-muted">
            Sign in with your admin email and password
          </p>

          {error ? (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-nursery-slate">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-nursery-slate-muted" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter admin email"
                  required
                  className="rounded-xl border-nursery-mint pl-12 focus:border-nursery-tangerine focus:ring-nursery-tangerine"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-nursery-slate">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-nursery-slate-muted" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                  }
                  placeholder="Enter password"
                  required
                  className="rounded-xl border-nursery-mint pl-12 pr-12 focus:border-nursery-tangerine focus:ring-nursery-tangerine"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-nursery-slate-muted transition-colors hover:text-nursery-slate"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center border-0 btn-primary"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-nursery-slate-muted transition-colors hover:text-nursery-tangerine"
          >
            ← Back to website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Admin;