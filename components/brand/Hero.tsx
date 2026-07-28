'use client';

import { useRef } from 'react';
import { useInView } from 'motion/react';
import { AnimatedNumber } from '@/components/ui/animated-number';
import { AnimatedMark } from './AnimatedMark';
import { events } from '@/lib/analytics';

// Hero — dirección Nómina × Marcador.
// H1: "No somos tu agencia. Estamos en tu nómina." con .mk highlight amarillo
// sobre "nómina". Métricas cuentan de 0 al valor al entrar en viewport.
// Glow radial del brand al 12% anclado abajo-derecha del bloque.

const METRICS = [
  {
    value: 4.8,
    precision: 1,
    suffix: '×',
    label: 'ROAS promedio',
    delta: '+38% vs benchmark',
  },
  {
    value: 127,
    precision: 0,
    suffix: '%',
    prefix: '+',
    label: 'Conversión',
    delta: 'lift a 6 meses',
  },
  {
    value: -38,
    precision: 0,
    suffix: '%',
    // Signo menos tipográfico U+2212 se aplica en format().
    label: 'CAC',
    delta: 'reducción media',
  },
] as const;

function CountUp({
  value,
  precision,
  suffix,
  prefix = '',
}: {
  value: number;
  precision: number;
  suffix: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <span ref={ref} className="tabular-nums">
      <AnimatedNumber
        value={inView ? value : 0}
        precision={precision}
        mass={1}
        stiffness={32}
        damping={20}
        format={(n) => {
          // Signo menos tipográfico U+2212 (no guion) para números negativos.
          const abs = Math.abs(n).toFixed(precision);
          if (n < 0) return `−${abs}${suffix}`;
          return `${prefix}${abs}${suffix}`;
        }}
      />
    </span>
  );
}

export function Hero() {
  function handlePrimaryClick() {
    events.agendaHeroClick();
  }

  return (
    <section className="relative overflow-hidden pt-[clamp(76px,11vw,150px)] pb-[clamp(56px,7vw,96px)]">
      {/* Glow radial del brand */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[120%]"
        style={{
          inset: 'auto -10% -40% 20%',
          background:
            'radial-gradient(50% 60% at 50% 100%, var(--glow), transparent 72%)',
        }}
      />

      <div className="relative mx-auto max-w-site px-gut">
        {/* Eyebrow */}
        <div className="mb-[clamp(24px,4vw,40px)] flex items-center gap-[14px]">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3">
            Performance
          </span>
          <span
            aria-hidden="true"
            className="block h-1 w-1 rounded-full bg-texto-4"
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3">
            CDMX
          </span>
          <span
            aria-hidden="true"
            className="block h-1 w-1 rounded-full bg-texto-4"
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3">
            ROAS 4.8×
          </span>
        </div>

        <h1 className="max-w-[17ch] text-display-xl">
          No somos tu agencia. Estamos en tu{' '}
          <AnimatedMark>nómina</AnimatedMark>.
        </h1>

        <p
          className="mt-[clamp(24px,3vw,34px)] max-w-[54ch] text-texto-2"
          style={{
            fontSize: 'clamp(1rem, 1.35vw, 1.1875rem)',
            lineHeight: 1.58,
          }}
        >
          Performance marketing, web y eventos para marcas medianas mexicanas
          que ya validaron su producto. Hablas con los dueños. Sin
          intermediarios, sin métricas que no venden.
        </p>

        <div className="mt-[clamp(30px,4vw,44px)] flex flex-wrap gap-3">
          <a
            href="#contacto"
            onClick={handlePrimaryClick}
            className="inline-flex items-center gap-2.5 rounded-[6px] bg-brand px-[18px] py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-base transition-all ease-brand duration-[220ms] hover:-translate-y-0.5 hover:shadow-brand-hover"
          >
            Agenda una llamada
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center gap-2.5 rounded-[6px] border border-borde bg-transparent px-[18px] py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-texto-2 transition-colors duration-[220ms] hover:border-texto-4 hover:text-texto-1"
          >
            <span aria-hidden="true">↓</span> Ver servicios
          </a>
        </div>

        {/* Métricas — grid 3 cols con hairlines internos via gap:1px sobre borde */}
        <div
          className="mt-[clamp(52px,7vw,88px)] grid grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-borde bg-borde lg:grid-cols-3"
        >
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="bg-surface-1 p-[clamp(22px,3vw,32px)]"
            >
              <strong
                className="block font-display font-bold text-texto-1"
                style={{
                  fontSize: 'clamp(2.2rem, 4.6vw, 3.5rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.03em',
                }}
              >
                <CountUp
                  value={m.value}
                  precision={m.precision}
                  suffix={m.suffix}
                  prefix={'prefix' in m ? m.prefix : ''}
                />
              </strong>
              <div className="mt-3.5 font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3">
                {m.label}
              </div>
              <div
                className="mt-[5px] font-mono text-[11px] text-texto-4"
                style={{ letterSpacing: '0.04em' }}
              >
                {m.delta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
