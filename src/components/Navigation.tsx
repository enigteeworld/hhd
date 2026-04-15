import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { SITE } from '@/lib/site';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/programs', label: 'Programs' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
        <div
          className={`mx-auto max-w-7xl rounded-[2rem] border border-white/60 bg-white/92 px-4 py-3 shadow-soft transition-all duration-500 sm:px-6 ${
            isScrolled ? 'backdrop-blur-xl' : 'backdrop-blur-md'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex min-w-0 items-center gap-3 group" aria-label={SITE.name}>
              <img
                src="/logo-cropped.png"
                alt={SITE.name}
                className="h-14 w-auto shrink-0 object-contain transition-transform duration-300 group-hover:scale-[1.03] sm:h-16"
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-semibold transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-nursery-tangerine'
                      : 'text-nursery-slate hover:text-nursery-tangerine'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-nursery-tangerine transition-all duration-300 ${
                      isActive(link.path) ? 'w-full' : 'w-0'
                    }`}
                  />
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href={SITE.phoneHref}
                className="flex items-center gap-2 rounded-full bg-nursery-cream px-4 py-2 text-sm font-semibold text-nursery-slate transition-all duration-300 hover:-translate-y-0.5 hover:text-nursery-tangerine"
              >
                <Phone className="h-4 w-4" />
                <span>{SITE.phoneDisplay}</span>
              </a>
              <Link to="/contact" className="btn-primary text-sm py-3 px-6 shadow-soft">
                Book a Tour
              </Link>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-nursery-cream text-nursery-slate shadow-sm transition-transform duration-300 hover:scale-[1.03]"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-nursery-slate/25 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`absolute left-3 right-3 top-[5.35rem] overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-b from-[#eef6e5] via-white to-white shadow-soft-lg transition-all duration-500 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-6'
          }`}
        >
          <div className="border-b border-nursery-mint/80 px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <img src="/logo-cropped.png" alt={SITE.name} className="h-12 w-auto object-contain" />
              <div className="rounded-full bg-[#f5d9b8]/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#d18c53]">
                Explore
              </div>
            </div>
          </div>

          <div className="px-5 py-5">
            <div className="space-y-2.5">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block rounded-[1.4rem] px-5 py-4 text-lg font-semibold transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-[#e28061] text-white shadow-soft'
                      : 'text-nursery-slate hover:bg-nursery-mint/70'
                  }`}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <a
              href={SITE.phoneHref}
              className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-nursery-slate transition-colors duration-300 hover:text-nursery-tangerine"
            >
              <Phone className="h-4 w-4" />
              <span>{SITE.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
