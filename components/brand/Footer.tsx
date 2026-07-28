import Link from 'next/link';
import { Logo } from './Logo';

// Footer del home nuevo. Hairline superior, padding vertical 40px, 3
// bloques en línea (logo · copyright · link privacidad). Todo en mono-label
// según handoff.

export function Footer() {
  return (
    <footer className="border-t border-borde py-10">
      <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-y-4 gap-x-8 px-gut">
        <Link href="/" aria-label="btiq digital — inicio">
          <Logo />
        </Link>
        <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3">
          © 2026 btiq digital · Made in CDMX
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.08em]">
          <a
            href="/aviso-de-privacidad"
            className="text-texto-3 transition-colors hover:text-brand"
          >
            Aviso de privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
