import { cn } from '@/lib/utils';

type EmojiIconProps = {
  emoji: string;
  className?: string;
  sizeClassName?: string;
  glowClassName?: string;
};

const EmojiIcon = ({ emoji, className, sizeClassName = 'h-16 w-16', glowClassName = 'from-white to-white/80' }: EmojiIconProps) => {
  return (
    <span
      className={cn(
        'relative inline-flex items-center justify-center rounded-full border border-white/80 bg-gradient-to-br shadow-[0_14px_34px_rgba(43,58,66,0.12)]',
        glowClassName,
        sizeClassName,
        className,
      )}
      aria-hidden="true"
    >
      <span className="absolute inset-1 rounded-full bg-white/55 blur-[1px]" />
      <span className="relative text-2xl sm:text-[1.7rem]">{emoji}</span>
    </span>
  );
};

export default EmojiIcon;
