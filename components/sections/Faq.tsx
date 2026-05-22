'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Tag } from '../Tag';
import { events } from '@/lib/analytics';

// FAQ accordion — 1er item abierto por default.
// Plus icon rota 45° para volverse X. Animación 0.25s.
// Accesibilidad: aria-expanded + aria-controls, navegable por teclado.

const FAQ_ITEMS = [
  {
    q: '¿Cuánto tarda en arrancar?',
    a: '7-14 días desde firma. Diagnóstico + roadmap 90 días con KPIs claros.',
  },
  {
    q: '¿Retainer o por proyecto?',
    a: 'Ambos. Performance suele ser retainer mensual; web y eventos pueden ir por entregable.',
  },
  {
    q: '¿Quién ejecuta mi cuenta?',
    a: 'Equipo senior dedicado. Sin juniors aprendiendo con tu presupuesto.',
  },
  {
    q: '¿Operan fuera de México?',
    a: 'Sí. Base CDMX, campañas activas en MX, CO, CL y US-Hispanic.',
  },
  {
    q: '¿Trabajan con startups?',
    a: 'Solo con producto validado y clientes reales. No hacemos discovery de mercado.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number>(0);

  function handleToggle(i: number) {
    if (open === i) {
      setOpen(-1);
    } else {
      setOpen(i);
      events.faqOpen(i);
    }
  }

  return (
    <section className="px-[18px] py-12 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-content">
        <Tag>FAQ</Tag>
        <h2
          className="mb-6 mt-[18px] font-sans font-semibold text-ink"
          style={{
            fontSize: '36px',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
          }}
        >
          Lo que
          <br />
          siempre nos preguntan.
        </h2>

        <div className="flex flex-col gap-2">
          {FAQ_ITEMS.map((f, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-xl border ${
                  isOpen ? 'border-line2 bg-surface' : 'border-line bg-transparent'
                }`}
              >
                <button
                  id={buttonId}
                  type="button"
                  onClick={() => handleToggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-2.5 border-none bg-transparent px-3.5 py-3.5 text-left"
                >
                  <span
                    className="font-sans text-sm font-medium leading-[1.35] text-ink"
                    style={{ letterSpacing: '-0.01em' }}
                  >
                    {f.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium transition-[background,transform] duration-[250ms] ${
                      isOpen
                        ? 'rotate-45 bg-lime text-bg'
                        : 'border border-line2 text-ink2'
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="px-3.5 pb-4 font-sans text-[13px] leading-[1.6] text-ink2">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
