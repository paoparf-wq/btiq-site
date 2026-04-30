'use client';

import { Tag } from '../Tag';
import { events } from '@/lib/analytics';

// Hero — Direction B aprobado.
// Headline: 50/600/0.95/-0.04em con "tres." en chip lime rotado -2deg.
// Live metrics card con dot lime pulsante (animate-lime-pulse).
// CTAs: primario lime (agenda_click hero) + secundario outline scroll-down.

const METRICS = [
  { v: '4.8×', l: 'ROAS', sub: '+38% vs benchmark' },
  { v: '127%', l: 'Conv.', sub: 'lift 6 meses' },
  { v: '-42%', l: 'CAC', sub: 'reducción media' },
] as const;

export function Hero() {
  function handlePrimaryClick() {
    events.agendaHeroClick();
  }

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-[18px] pb-7 pt-[34px] md:px-8 lg:px-10"
    >
      {/* Grid sutil con mask radial */}
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 opacity-40"
      />

      <div className="relative mx-auto w-full max-w-content">
        <Tag>Performance · CDMX · ROAS 4.8×</Tag>

        <h1
          className="mt-[22px] font-sans font-semibold text-ink"
          style={{
            fontSize: '50px',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
          }}
        >
          Cada peso
          <br />
          <span className="text-muted">invertido</span>
          <br />
          te regresa{' '}
          <span
            className="inline-block rounded-lg bg-lime px-3 text-bg"
            style={{ transform: 'rotate(-2deg)' }}
          >
            tres.
          </span>
        </h1>

        <p
          className="mt-[22px] max-w-[320px] font-sans text-ink2"
          style={{ fontSize: '14.5px', lineHeight: 1.55 }}
        >
          Marketing digital, web y eventos para marcas medianas mexicanas que
          ya validaron su producto.{' '}
          <span className="text-ink">
            Sin intermediarios. Sin métricas que no venden.
          </span>
        </p>

        <div className="mt-6 flex gap-2">
          <a
            href="#contacto"
            onClick={handlePrimaryClick}
            className="flex flex-1 items-center justify-center rounded-xl bg-lime px-[18px] py-[15px] text-center font-sans text-[14px] font-semibold text-bg transition-colors hover:bg-lime-hover"
            style={{ letterSpacing: '-0.01em' }}
          >
            Agenda una llamada
          </a>
          <a
            href="#servicios"
            aria-label="Ir a servicios"
            className="flex items-center justify-center rounded-xl border border-line2 px-[18px] py-[15px] font-sans text-[14px] font-medium text-ink transition-colors hover:bg-surface"
          >
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        {/* Live metrics card */}
        <div className="mt-[30px] rounded-card border border-line2 bg-surface px-4 py-[18px]">
          <div className="mb-[14px] flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-mono-wide text-muted">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 animate-lime-pulse rounded-full bg-lime"
              />
              Resultados promedio · Q1 2026
            </div>
          </div>
          <div className="grid grid-cols-3 border-t border-line">
            {METRICS.map((m, i) => (
              <div
                key={m.l}
                className="px-1.5 pt-[14px]"
                style={{
                  borderRight:
                    i < METRICS.length - 1
                      ? '1px solid rgba(245,244,238,0.10)'
                      : 'none',
                }}
              >
                <div
                  className="font-sans text-[26px] font-semibold leading-none text-lime"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  {m.v}
                </div>
                <div className="mt-1.5 font-mono text-[9.5px] uppercase tracking-mono-wide text-ink2">
                  {m.l}
                </div>
                <div className="mt-[3px] font-mono text-[9px] text-muted">
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
