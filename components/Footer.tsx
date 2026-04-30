import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-bg text-muted">
      <div className="mx-auto w-full max-w-content px-[18px] pb-6 pt-7 md:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          <Logo size="sm" />
          <span className="font-mono text-[10px] text-muted">© 2026</span>
        </div>
        <div className="mt-[18px] flex items-center justify-between border-t border-line pt-[14px] font-mono text-[10px] text-muted">
          <Link
            href="/aviso-de-privacidad"
            className="transition-colors hover:text-ink2"
          >
            Aviso de privacidad
          </Link>
          <span>Made in CDMX</span>
        </div>
      </div>
    </footer>
  );
}
