import { Tag } from '../Tag';

// Why btiq — 2x2 grid de stats (cards surface).
// Número grande lime / label / descripción en muted.

const STATS = [
  {
    number: '15+',
    label: 'años en marcas globales',
    description:
      'Samsung, AT&T, Hyundai, Kia. Experiencia real, no slides.',
  },
  {
    number: '1',
    label: 'equipo senior',
    description:
      'Quien piensa también ejecuta. Sin capas de intermediación.',
  },
  {
    number: 'ES/EN',
    label: 'alcance LatAm',
    description: 'CDMX base. Operamos en MX, CO, CL y US-Hispanic.',
  },
  {
    number: '24h',
    label: 'respuesta máxima',
    description: 'Lean, sin overhead. Trabajas directo con quien decide.',
  },
] as const;

export function Why() {
  return (
    <section className="px-[18px] py-12 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-content">
        <Tag>Por qué btiq</Tag>
        <h2
          className="mb-6 mt-[18px] font-sans font-semibold text-ink"
          style={{
            fontSize: '36px',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
          }}
        >
          Calidad de global.
          <br />
          Agilidad de <span className="text-lime">boutique</span>.
        </h2>

        <div className="grid grid-cols-2 gap-2.5">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-[14px] border border-line2 bg-surface px-[14px] py-4"
            >
              <div
                className="font-sans text-[30px] font-semibold leading-none text-lime"
                style={{ letterSpacing: '-0.04em' }}
              >
                {s.number}
              </div>
              <div
                className="mt-2 font-sans text-xs font-medium text-ink"
                style={{ letterSpacing: '-0.01em' }}
              >
                {s.label}
              </div>
              <div className="mt-1.5 font-sans text-[11.5px] leading-[1.45] text-muted">
                {s.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
