'use client';

import { SectionHead } from './SectionHead';
import { events } from '@/lib/analytics';

// FAQ nativo con <details>/<summary>. El primer ítem viene abierto por
// default. Ícono "+" rota 45° cuando abierto y cambia a color brand.
// Analytics: dispara faq_open cuando un ítem se abre.

const FAQ_ITEMS = [
  {
    q: '¿Cuánto tarda en arrancar?',
    a: '7 a 14 días desde la firma. Empezamos con diagnóstico y entregamos un roadmap a 90 días con KPIs claros antes de gastar el primer peso en pauta.',
  },
  {
    q: '¿Retainer o por proyecto?',
    a: 'Performance y web de largo plazo van en retainer mensual; tiendas Tiendanube y eventos se cotizan como proyecto cerrado. Si no sabes qué te conviene, lo definimos en el diagnóstico.',
  },
  {
    q: '¿Quién ejecuta mi cuenta?',
    a: 'El mismo equipo senior que la piensa. No hay juniors aprendiendo con tu presupuesto ni ejecutivo de cuenta intermediando: hablas directo con quien decide.',
  },
  {
    q: '¿Operan fuera de México?',
    a: 'Sí. Base en CDMX, operación en México, Colombia, Chile y el mercado US-Hispanic, en español e inglés.',
  },
  {
    q: '¿Trabajan con startups?',
    a: 'Con las que ya validaron producto y tienen presupuesto de medios para escalar. Si estás antes de eso, te decimos qué hacer primero — aunque no nos contrates.',
  },
];

export function Faq() {
  function handleToggle(i: number, isOpen: boolean) {
    if (isOpen) events.faqOpen(i);
  }

  return (
    <section id="faq" className="border-t border-borde py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto max-w-site px-gut">
        <SectionHead number="04" title="Lo que siempre nos preguntan." />
        <div className="border-t border-borde">
          {FAQ_ITEMS.map((f, i) => (
            <details
              key={f.q}
              open={i === 0}
              onToggle={(e) =>
                handleToggle(i, (e.target as HTMLDetailsElement).open)
              }
              className="group border-b border-borde"
            >
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-6 py-[22px] font-display font-bold text-texto-1 transition-colors hover:text-texto-2"
                style={{ fontSize: '1.0625rem', letterSpacing: '-0.01em' }}
              >
                {f.q}
                <i
                  aria-hidden="true"
                  className="shrink-0 font-mono text-[15px] not-italic text-texto-3 transition-all duration-[250ms] group-open:rotate-45 group-open:text-brand"
                >
                  +
                </i>
              </summary>
              <p
                className="max-w-[70ch] pb-6 text-texto-2"
                style={{ fontSize: '0.9375rem', lineHeight: 1.62 }}
              >
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
