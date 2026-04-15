import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

type Badge = {
  emoji?: string;
  eyebrow?: string;
  text: string;
  position?: 'top-right' | 'bottom-right' | 'bottom-left';
};

type ImageShowcaseProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  tilt?: 'left' | 'right' | 'none';
  badge?: Badge;
};

const positionMap = {
  'top-right': 'right-3 top-3 sm:right-6 sm:top-6',
  'bottom-right': 'bottom-3 right-3 sm:bottom-6 sm:right-6',
  'bottom-left': 'bottom-3 left-3 sm:bottom-6 sm:left-6',
};

const tiltMap = {
  left: '-rotate-[1.1deg] hover:rotate-0',
  right: 'rotate-[1.1deg] hover:rotate-0',
  none: 'rotate-0',
};

const ImageShowcase = ({
  src,
  alt,
  className,
  imageClassName,
  tilt = 'none',
  badge,
}: ImageShowcaseProps) => {
  const badgePosition = positionMap[badge?.position ?? 'bottom-right'];

  return (
    <div className={cn('relative overflow-visible', className)}>
      <div className="absolute inset-6 -z-10 rounded-[2.8rem] bg-white/70 blur-2xl" />

      <div
        className={cn(
          'group relative overflow-hidden rounded-[2.8rem] border-[6px] border-white bg-white shadow-soft-lg transition-all duration-500 will-change-transform hover:-translate-y-1',
          tiltMap[tilt],
        )}
      >
        <img
          src={src}
          alt={alt}
          className={cn(
            'h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] sm:h-[520px]',
            imageClassName,
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-nursery-slate/5 via-transparent to-white/5" />
      </div>

      {badge ? (
        <div
          className={cn(
            'absolute z-20 max-w-[calc(100%-1.5rem)] sm:max-w-[300px] rounded-[1.25rem] bg-nursery-tangerine px-3 py-2.5 shadow-soft-lg animate-float sm:px-4',
            badgePosition,
          )}
        >
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 shrink-0">
              <Star className="h-4 w-4 fill-white text-white" />
            </div>

            <div className="min-w-0">
              {badge.eyebrow ? (
                <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85 sm:text-[11px]">
                  {badge.eyebrow}
                </p>
              ) : null}

              <p className="text-sm font-semibold leading-snug text-white break-words sm:text-[15px]">
                {badge.text}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageShowcase;