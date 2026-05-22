import { clsx } from 'clsx';

// Wordmark "btiq/digital" con cuadrado lime + "b". Se reusa en nav y footer.
// Tamaños diferentes según contexto.

export function Logo({ size = 'md' }: { size?: 'md' | 'sm' }) {
  const isSmall = size === 'sm';

  return (
    <div className="flex items-center gap-2">
      <div
        className={clsx(
          'flex items-center justify-center bg-lime font-sans font-bold text-bg tracking-tight',
          isSmall
            ? 'h-6 w-6 rounded-md text-[13px]'
            : 'h-[26px] w-[26px] rounded-[7px] text-sm',
        )}
        aria-hidden="true"
      >
        b
      </div>
      <span
        className={clsx(
          'font-sans font-semibold text-ink',
          isSmall ? 'text-[13px]' : 'text-[15px]',
        )}
        style={{ letterSpacing: '-0.015em' }}
      >
        btiq<span className="font-normal text-faint">/digital</span>
      </span>
    </div>
  );
}
