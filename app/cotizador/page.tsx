import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Footer } from '@/components/brand/Footer';
import { CotizadorQuiz } from './CotizadorQuiz';

// /cotizador — landing de campaña con quiz interactivo. Nav mínimo (sin
// escape hatches que distraigan del funnel) + hero corto + quiz + footer.

export default function CotizadorPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-borde">
        <div className="mx-auto flex h-[66px] max-w-site items-center justify-between px-gut">
          <Link href="/" aria-label="btiq digital — inicio">
            <Logo />
          </Link>
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3 transition-colors hover:text-texto-1"
          >
            ← Volver al sitio
          </Link>
        </div>
      </header>

      <main className="relative flex-1 overflow-hidden py-[clamp(48px,8vw,110px)]">
        {/* Glow radial sutil */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-[120%]"
          style={{
            inset: 'auto -10% -45% 15%',
            background:
              'radial-gradient(45% 55% at 45% 100%, var(--glow), transparent 72%)',
          }}
        />

        <div className="relative mx-auto max-w-[720px] px-gut">
          <div className="mb-[clamp(28px,4vw,48px)] text-center">
            <div className="mono-label">Diagnóstico de tienda online</div>
            <h1
              className="mt-4 font-display font-bold text-texto-1"
              style={{
                fontSize: 'clamp(2.4rem, 5.4vw, 4.2rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.03em',
              }}
            >
              Cuánto puedes ahorrar en gastos de tu tienda.
            </h1>
            <p
              className="mx-auto mt-5 max-w-[52ch] text-texto-2"
              style={{
                fontSize: 'clamp(1rem, 1.35vw, 1.1875rem)',
                lineHeight: 1.58,
              }}
            >
              3 preguntas, 60 segundos. Te decimos cuánto estás perdiendo cada
              mes en comisiones y apps — y cómo bajarlo.
            </p>
          </div>

          <CotizadorQuiz />
        </div>
      </main>

      <Footer />
    </div>
  );
}
