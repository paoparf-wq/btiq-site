import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-bg text-faint">
      <div className="mx-auto w-full max-w-content px-[18px] pb-6 pt-7 md:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <Logo size="sm" />
          <span className="font-mono text-[10px] text-faint">© 2026</span>
        </div>
        <div className="mt-[14px] flex items-center justify-between border-t border-line pt-[6px] font-mono text-[10px] text-faint">
          <Link
            href="/aviso-de-privacidad"
            className="inline-flex min-h-[36px] items-center py-2 transition-colors hover:text-ink2"
          >
            Aviso de privacidad
          </Link>
          <span className="inline-flex min-h-[36px] items-center py-2">
            Made in CDMX
          </span>
        </div>
      </div>
    </footer>
  );
}
