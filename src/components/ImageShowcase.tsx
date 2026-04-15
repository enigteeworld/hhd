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
  'top-right': 'right-4 top-4 sm:right-6 sm:top-6',
  'bottom-right': 'bottom-4 right-4 sm:bottom-6 sm:right-6',
  'bottom-left': 'bottom-4 left-4 sm:bottom-6 sm:left-6',
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
    <div className={cn('relative', className)}>
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
            'absolute z-20 rounded-full bg-nursery-tangerine px-4 py-2 shadow-soft-lg animate-float',
            badgePosition,
          )}
        >
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-white text-white" />
            <p className="whitespace-nowrap text-sm font-semibold text-white">
              {badge.eyebrow ? `${badge.eyebrow} • ${badge.text}` : badge.text}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ImageShowcase;