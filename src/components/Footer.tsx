import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Facebook, Instagram } from 'lucide-react';
import { SITE } from '@/lib/site';
import useCmsContent from '@/hooks/useCmsContent';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { getSetting, getImage } = useCmsContent();

  const siteName = getSetting('site_name', SITE.name);
  const footerText = getSetting(
    'footer_text',
    'EYFS nursery for children aged 0-5 years.',
  );
  const email = getSetting('email', SITE.email);
  const phoneDisplay = getSetting('phone', SITE.phoneDisplay);
  const address = getSetting('address', SITE.addressLines.join(', '));

  const footerLogo = getImage(
    'site_logo_white',
    '/logo-white.png',
    `${siteName} footer logo`,
  );

  const phoneHref = `tel:${phoneDisplay.replace(/[^\d+]/g, '')}`;
  const addressLines = address
    .split(',')
    .map((line) => line.trim())
    .filter(Boolean);

  const exploreLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/programs', label: 'Programs' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#114b44] px-0 pb-8 pt-16 text-white">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#1a5c53] to-transparent opacity-80" />

      <div className="section-container relative z-10">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2.4rem] bg-[#155448] px-7 py-10 text-center shadow-soft-lg sm:px-10">
            <h2 className="font-nunito text-4xl font-bold leading-tight text-white sm:text-5xl">
              Come and say hello!
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/82">
              Book a personal visit to see the setting in action and experience the warm,
              welcoming atmosphere for yourself.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex min-w-[220px] items-center justify-center rounded-full bg-[#e28061] px-8 py-4 text-lg font-bold text-white transition-transform duration-300 hover:scale-[1.02]"
            >
              Arrange a Visit
            </Link>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr_1fr]">
            <div className="text-center lg:text-left">
              <Link to="/" className="inline-flex items-center justify-center lg:justify-start">
                <img
                  src={footerLogo.src}
                  alt={footerLogo.alt}
                  className="h-24 w-auto object-contain"
                />
              </Link>

              <p className="mt-4 text-lg text-white/82">{footerText}</p>

              <div className="mt-8 flex justify-center gap-4 lg:justify-start">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h4 className="font-nunito text-3xl font-bold text-white">Explore</h4>
              <ul className="mt-6 space-y-4 text-lg text-white/82">
                {exploreLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="transition-colors duration-300 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center lg:text-left">
              <h4 className="font-nunito text-3xl font-bold text-white">Contact</h4>
              <div className="mt-6 space-y-5 text-lg text-white/82">
                <div className="flex items-start justify-center gap-3 lg:justify-start">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#f5a36c]" />
                  <div>
                    {addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>

                <a
                  href={`mailto:${email}`}
                  className="flex items-center justify-center gap-3 break-all transition-colors duration-300 hover:text-white lg:justify-start"
                >
                  <Mail className="h-5 w-5 shrink-0 text-[#f5a36c]" />
                  <span>{email}</span>
                </a>

                <a
                  href={phoneHref}
                  className="flex items-center justify-center gap-3 transition-colors duration-300 hover:text-white lg:justify-start"
                >
                  <Phone className="h-5 w-5 shrink-0 text-[#f5a36c]" />
                  <span>{phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 text-center text-base text-white/72 md:flex-row md:text-left">
              <p>&copy; {currentYear} {siteName}. All rights reserved.</p>

              <div className="flex items-center gap-6">
                <Link to="/privacy" className="transition-colors duration-300 hover:text-white">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="transition-colors duration-300 hover:text-white">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;