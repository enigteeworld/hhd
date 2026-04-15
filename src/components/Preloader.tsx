import { useEffect, useState } from 'react';
import { SITE } from '@/lib/site';

const PRELOADER_MIN_MS = 1400;

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setIsFading(true), PRELOADER_MIN_MS);
    const hideTimer = window.setTimeout(() => setIsVisible(false), PRELOADER_MIN_MS + 350);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-nursery-cream transition-opacity duration-300 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
      aria-label="Loading website"
      aria-live="polite"
    >
      <div className="relative flex flex-col items-center gap-5">
        <div className="absolute inset-0 -z-10 blur-3xl bg-nursery-tangerine/20 rounded-full scale-125" />
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-soft-lg">
          <span className="absolute inset-0 rounded-full border border-nursery-tangerine/20" />
          <span className="absolute inset-3 rounded-full border-2 border-dashed border-nursery-mint animate-spin [animation-duration:10s]" />
          <img
            src="/logo-cropped.png"
            alt={SITE.name}
            className="w-24 object-contain drop-shadow-sm"
          />
        </div>
        <div className="text-center">
          <p className="font-nunito text-xl font-bold text-nursery-slate">{SITE.shortName}</p>
          <p className="text-sm text-nursery-slate-muted">Preparing a warm welcome…</p>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
