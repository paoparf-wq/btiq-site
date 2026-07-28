import Link from 'next/link';
import { AnimatedMark } from '@/components/brand/AnimatedMark';
import { Logo } from '@/components/brand/Logo';
import { Footer } from '@/components/brand/Footer';
import { ThankyouWhatsappLink } from './ThankyouWhatsappLink';
import { tokens } from '@/lib/tokens';

// /gracias — confirmación post-formulario.
// Layout 2 cols centrado verticalmente. Izquierda: check animado + titular
// con marcador + botones + canales. Derecha: tarjeta "Qué pasa ahora"
// con 4 pasos numerados. Glow del acento abajo-izquierda.

const STEPS = [
  {
    title: 'Hoy — leemos tu caso',
    detail:
      'Revisamos tu sitio, tus canales activos y lo que nos contaste. Sin reunión todavía.',
  },
  {
    title: 'En menos de 24 h — te escribimos',
    detail:
      'Con una primera lectura: qué vemos, qué falta y si somos o no la agencia correcta para eso.',
  },
  {
    title: 'Esta semana — llamada de 30 min',
    detail:
      'Con quien va a ejecutar tu cuenta. Salimos con un alcance y un rango de inversión claros.',
  },
  {
    title: 'Si avanzamos — diagnóstico a 7 días',
    detail:
      'Auditoría completa y roadmap a 90 días con KPIs antes de gastar el primer peso en pauta.',
  },
];

export default function GraciasPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav minimal — sin CTA, solo logo + volver */}
      <header className="border-b border-borde">
        <div className="mx-auto flex h-[66px] max-w-site items-center justify-between px-gut">
          <Link href="/" aria-label="Ir a btiq digital">
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

      <main className="relative flex flex-1 items-center overflow-hidden py-[clamp(52px,9vw,120px)]">
        {/* Glow radial abajo-izquierda */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-[130%]"
          style={{
            inset: 'auto -10% -55% 8%',
            background:
              'radial-gradient(48% 58% at 45% 100%, var(--glow), transparent 72%)',
          }}
        />

        <div className="relative mx-auto w-full max-w-site px-gut">
          <div className="grid grid-cols-1 items-start gap-[clamp(34px,6vw,88px)] lg:grid-cols-[1.15fr_0.85fr]">
            {/* Izquierda */}
            <div>
              <div
                className="mb-6 grid h-[52px] w-[52px] place-items-center rounded-full border border-borde bg-surface-1 text-[22px] text-texto-1"
                style={{
                  animation: 'pop .5s var(--ease) both',
                }}
              >
                ✓
              </div>
              <div className="mono-label">Mensaje recibido</div>
              <h1
                className="mt-[18px] font-display font-bold text-texto-1"
                style={{
                  fontSize: 'clamp(2.4rem, 5.6vw, 4.4rem)',
                  lineHeight: 0.96,
                  letterSpacing: '-0.03em',
                }}
              >
                Listo. Ahora te toca a <AnimatedMark>nosotros</AnimatedMark>.
              </h1>
              <p
                className="mt-6 max-w-[48ch] text-texto-2"
                style={{
                  fontSize: 'clamp(1rem, 1.4vw, 1.1875rem)',
                  lineHeight: 1.58,
                }}
              >
                Tu mensaje ya está con Paola — no con un bot ni con un
                ejecutivo de cuenta. Respondemos en menos de 24 horas hábiles
                con un diagnóstico inicial, sin costo.
              </p>

              <div className="mt-[34px] flex flex-wrap gap-3">
                <ThankyouWhatsappLink href={tokens.contact.whatsappLink} />
                <Link
                  href="/#servicios"
                  className="inline-flex items-center gap-2.5 rounded-[6px] border border-borde bg-transparent px-[18px] py-[13px] font-mono text-[11px] uppercase tracking-[0.08em] text-texto-2 transition-colors duration-[220ms] hover:border-texto-4 hover:text-texto-1"
                >
                  Ver servicios
                </Link>
              </div>

              <div className="mt-[18px] grid grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-borde bg-borde">
                <a
                  href={`mailto:${tokens.contact.email}`}
                  className="flex items-center justify-between gap-4 bg-surface-1 px-[18px] py-[15px] text-texto-1 transition-colors hover:bg-surface-2"
                  style={{ fontSize: '0.9375rem' }}
                >
                  <span>{tokens.contact.email}</span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.07em] text-texto-3">
                    Email directo
                  </span>
                </a>
                <a
                  href={tokens.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 bg-surface-1 px-[18px] py-[15px] text-texto-1 transition-colors hover:bg-surface-2"
                  style={{ fontSize: '0.9375rem' }}
                >
                  <span>Paola Parra</span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.07em] text-texto-3">
                    LinkedIn ↗
                  </span>
                </a>
              </div>
            </div>

            {/* Derecha — Qué pasa ahora */}
            <aside className="rounded-[14px] border border-borde bg-surface-1 p-[clamp(24px,3vw,32px)]">
              <h2
                className="border-b border-borde pb-[18px] font-display font-bold text-texto-1"
                style={{
                  fontSize: '1.25rem',
                  letterSpacing: '-0.02em',
                }}
              >
                Qué pasa ahora
              </h2>
              <ol className="m-0 list-none p-0">
                {STEPS.map((s, i) => (
                  <li
                    key={s.title}
                    className={`grid grid-cols-[34px_1fr] items-baseline gap-3.5 py-[18px] ${
                      i < STEPS.length - 1 ? 'border-b border-borde' : ''
                    }`}
                  >
                    <span
                      className="font-mono text-[10.5px] text-texto-4"
                      style={{ letterSpacing: '0.07em' }}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <b
                        className="mb-1.5 block font-display font-bold text-texto-1"
                        style={{ fontSize: '0.9375rem' }}
                      >
                        {s.title}
                      </b>
                      <p
                        className="text-texto-2"
                        style={{ fontSize: '0.875rem', lineHeight: 1.55 }}
                      >
                        {s.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </div>
      </main>

      <Footer />

      {/* Keyframe local para el pop del check */}
      <style>{`
        @keyframes pop {
          from { transform: scale(0.7); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation: pop"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
