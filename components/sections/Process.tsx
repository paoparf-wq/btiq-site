import { Tag } from '../Tag';

// Process — vertical timeline con línea gradiente lime en el lado izquierdo.
// Step 01 lleva círculo lime sólido; el resto, surface con borde line2.
// Padding bottom 22px entre pasos excepto el último.

type Step = {
  number: string;
  duration: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    number: '01',
    duration: '7 días',
    title: 'Diagnóstico',
    description:
      'Auditoría de canales, audiencia, competencia y stack actual.',
  },
  {
    number: '02',
    duration: '14 días',
    title: 'Estrategia',
    description: 'Plan 90 días con KPIs, presupuesto y roadmap por canal.',
  },
  {
    number: '03',
    duration: '30 días',
    title: 'Ejecución',
    description:
      'Lanzamiento con equipo senior dedicado. Reporting semanal.',
  },
  {
    number: '04',
    duration: 'continuo',
    title: 'Optimización',
    description:
      'A/B testing, escalado de winners, kill de losers. Data-driven.',
  },
];

export function Process() {
  return (
    <section className="border-y border-line bg-bg2 px-[18px] py-12 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-content">
        <Tag>Proceso · 90 días</Tag>
        <h2
          className="mb-7 mt-[18px] font-sans font-semibold text-ink"
          style={{
            fontSize: '36px',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
          }}
        >
          Cómo te llevamos
          <br />
          del 0 al <span className="text-lime">scale</span>.
        </h2>

        <div className="relative">
          {/* Línea vertical con gradiente lime */}
          <div
            aria-hidden="true"
            className="absolute bottom-[14px] left-[18px] top-[14px] w-px"
            style={{
              background:
                'linear-gradient(180deg, #d4ff3a, transparent)',
            }}
          />
          {STEPS.map((step, i) => {
            const isFirst = i === 0;
            const isLast = i === STEPS.length - 1;
            return (
              <div
                key={step.number}
                className="relative flex gap-[18px]"
                style={{ paddingBottom: isLast ? 0 : 22 }}
              >
                <div
                  className="z-[1] flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-medium"
                  style={{
                    background: isFirst ? '#d4ff3a' : '#1a1c18',
                    borderColor: isFirst
                      ? '#d4ff3a'
                      : 'rgba(245,244,238,0.18)',
                    color: isFirst ? '#0d0e0c' : '#cfcec5',
                  }}
                >
                  {step.number}
                </div>
                <div className="flex-1 pt-1.5">
                  <div className="mb-1.5 flex items-baseline gap-2.5">
                    <h3
                      className="m-0 font-sans text-lg font-semibold text-ink"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {step.title}
                    </h3>
                    <span className="font-mono text-[10px] tracking-mono text-lime">
                      ~{step.duration}
                    </span>
                  </div>
                  <div className="font-sans text-[13px] leading-[1.55] text-ink2">
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
