'use client';

import { useEffect, useRef } from 'react';
import { SectionHead } from './SectionHead';

// Proceso — 4 tarjetas en grid de 4 columnas + riel de días encima con
// nodos y barra de progreso amarilla que se llena con el scroll.
// Requisito crítico del handoff: el riel usa el MISMO gap:14px que las
// tarjetas para que los nodos caigan sobre cada paso.
// - Ghost numbers 118px con text-stroke sangran fuera del borde.
// - Cada tarjeta lleva 2 entregables con hairlines mono.
// - Bajo lg (940-1024px) el riel se oculta y las tarjetas se apilan.

type Step = {
  n: string;
  title: string;
  duration: string;
  description: string;
  deliverables: [string, string];
};

const STEPS: Step[] = [
  {
    n: '01',
    title: 'Diagnóstico',
    duration: '~7 días',
    description: 'Auditoría de canales, audiencia, competencia y stack actual.',
    deliverables: ['Auditoría de cuentas', 'Benchmark de categoría'],
  },
  {
    n: '02',
    title: 'Estrategia',
    duration: '~14 días',
    description: 'Plan a 90 días con KPIs, presupuesto y roadmap por canal.',
    deliverables: ['Plan de medios', 'KPIs y metas por canal'],
  },
  {
    n: '03',
    title: 'Ejecución',
    duration: '~30 días',
    description:
      'Lanzamiento con equipo senior dedicado. Reporting semanal.',
    deliverables: ['Campañas en vivo', 'Reporte cada lunes'],
  },
  {
    n: '04',
    title: 'Optimización',
    duration: 'Continuo',
    description:
      'A/B testing, escalado de winners, kill de losers. Data-driven.',
    deliverables: ['Escalado de winners', 'Iteración creativa'],
  },
];

const DAYS = [
  'Día 0 · firma',
  'Día 7',
  'Día 21',
  'Día 51 → scale',
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;

    function onScroll() {
      // Fórmula del handoff: p = (innerHeight*.82 − rectTop) / (rectHeight*.72)
      if (!section || !rail) return;
      const r = section.getBoundingClientRect();
      const h = window.innerHeight;
      let p = (h * 0.82 - r.top) / (r.height * 0.72);
      p = Math.max(0, Math.min(1, p));
      rail.style.setProperty('--p', (p * 100).toFixed(1) + '%');
      nodeRefs.current.forEach((n, i) => {
        if (!n) return;
        const threshold = i / (nodeRefs.current.length - 1) - 0.02;
        n.classList.toggle('lit', p >= threshold);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="border-t border-borde py-[clamp(72px,10vw,140px)]"
    >
      <div className="mx-auto max-w-site px-gut">
        <SectionHead
          number="02"
          title="Cómo te llevamos del 0 al scale."
          extra="90 días"
        />

        {/* Riel de días — solo desktop, comparte gap:14px con las tarjetas */}
        <div
          ref={railRef}
          className="relative mb-[26px] hidden grid-cols-4 gap-[14px] lg:grid"
          style={{ ['--p' as string]: '0%' }}
        >
          {/* Hairline base */}
          <div className="pointer-events-none absolute left-0 right-0 top-[9px] h-px bg-borde" />
          {/* Progress bar amarilla scroll-driven */}
          <div
            className="pointer-events-none absolute left-0 top-[9px] h-px transition-[width] duration-[180ms] ease-linear"
            style={{
              width: 'var(--p)',
              background: 'var(--brand)',
              boxShadow:
                '0 0 14px color-mix(in oklab, var(--brand) 45%, transparent)',
            }}
          />
          {DAYS.map((day, i) => {
            const isLast = i === DAYS.length - 1;
            return (
              <div
                key={day}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                }}
                data-lit={isLast}
                className={`group relative ${isLast ? 'lit' : ''}`}
              >
                <div
                  className="node relative top-[5px] h-[9px] w-[9px] rounded-full border border-texto-4 bg-surface-2 transition-all duration-300 group-[.lit]:border-brand group-[.lit]:bg-brand group-[.lit]:shadow-[0_0_0_5px_color-mix(in_oklab,var(--brand)_10%,transparent)]"
                />
                <div className="day mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-texto-4 transition-colors group-[.lit]:text-texto-2">
                  {day}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tarjetas — grid 4 cols, gap 14px, mismo hover que servicios */}
        <div className="grid grid-cols-1 gap-[14px] lg:grid-cols-4">
          {STEPS.map((s) => (
            <article
              key={s.n}
              className="relative overflow-hidden rounded-[14px] border border-borde bg-surface-1 px-6 pb-6 pt-[26px] transition-all ease-brand duration-300 hover:-translate-y-1 hover:border-borde-hover hover:bg-surface-2 hover:shadow-brand-hover"
            >
              {/* Ghost number 118px con text-stroke */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-[22px] -right-1.5 font-display font-bold leading-none text-transparent"
                style={{
                  fontSize: '118px',
                  letterSpacing: '-0.05em',
                  WebkitTextStroke: '1px rgb(244 245 240 / 0.09)',
                }}
              >
                {s.n}
              </div>

              <div className="relative font-mono text-[11px] tracking-[0.08em] text-texto-3">
                {s.n}
              </div>
              <h4
                className="relative mt-[52px] mb-2 font-display font-bold text-texto-1"
                style={{
                  fontSize: '1.3125rem',
                  letterSpacing: '-0.02em',
                }}
              >
                {s.title}
              </h4>
              <div
                className="mb-3.5 font-mono text-[10.5px] uppercase text-texto-3"
                style={{ letterSpacing: '0.06em' }}
              >
                {s.duration}
              </div>
              <p
                className="text-texto-2"
                style={{ fontSize: '0.875rem', lineHeight: 1.58 }}
              >
                {s.description}
              </p>

              <ul className="m-0 mt-5 list-none border-t border-borde p-0">
                {s.deliverables.map((d, i) => (
                  <li
                    key={d}
                    className={`py-[9px] font-mono text-[10px] uppercase text-texto-3 ${
                      i < s.deliverables.length - 1
                        ? 'border-b border-borde'
                        : ''
                    }`}
                    style={{ letterSpacing: '0.06em' }}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
