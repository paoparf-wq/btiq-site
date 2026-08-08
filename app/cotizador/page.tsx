import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Footer } from '@/components/brand/Footer';
import { CotizadorQuiz } from './CotizadorQuiz';
import { ReportPreview } from './ReportPreview';

// /cotizador — quiz 6 pasos con reporte LIVE en pantalla.
// Layout compacto: hero corto, quiz, muestra del reporte pegada abajo para
// que la gente entienda "esto es lo que voy a recibir" antes de terminar.

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

      <main className="relative flex-1 overflow-hidden py-[clamp(32px,5vw,64px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-[120%]"
          style={{
            inset: 'auto -10% -45% 15%',
            background:
              'radial-gradient(45% 55% at 45% 100%, var(--glow), transparent 72%)',
          }}
        />

        <div className="relative mx-auto max-w-[700px] px-gut">
          <div className="mb-8 text-center">
            <div className="mono-label">Diagnóstico de tienda online</div>
            <h1
              className="mt-3 font-display font-bold text-texto-1"
              style={{
                fontSize: 'clamp(2rem, 4.6vw, 3.4rem)',
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
              }}
            >
              ¿Cuánto puedes ahorrar en tu tienda?
            </h1>
            <p
              className="mx-auto mt-3 max-w-[50ch] text-body-l text-texto-2"
            >
              6 preguntas y te decimos, al momento, cuánto estás pagando de
              más en comisiones, apps y envíos.
            </p>
          </div>

          <CotizadorQuiz />

          {/* Muestra del reporte — pegada al quiz, sin border-top que
              divida (queremos que se sienta parte del mismo bloque). */}
          <div className="mt-10">
            <ReportPreview />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
