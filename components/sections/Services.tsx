import { Tag } from '../Tag';

// Services — 3 cards con header (code badge + métrica), título, italic lime
// quote, descripción y footer con stack chips. Card 2 (WEB) lleva además el
// badge "PARTNER OFICIAL" porque btiq es partner certificado de Tiendanube.

type Service = {
  code: 'PERF' | 'WEB' | 'EVT';
  title: string;
  promise: string;
  description: string;
  metric: { value: string; label: string };
  stack: string[];
  partner?: boolean;
};

const SERVICES: Service[] = [
  {
    code: 'PERF',
    title: 'Performance Marketing',
    promise: 'Cada peso invertido te regresa tres.',
    description:
      'Paid media, CRM, e-commerce y marketplaces optimizados para ROI. Funnel completo, no solo clics.',
    metric: { value: '4.8×', label: 'ROAS promedio' },
    stack: ['Meta', 'Google', 'TikTok', 'HubSpot'],
  },
  {
    code: 'WEB',
    title: 'Web & Tiendas en línea',
    promise: 'Que convierten, no que solo se ven bonitos.',
    description:
      'Sitios web y e-commerce listos para vender. Partners oficiales de Tiendanube: implementación, integraciones y optimización continua basada en data.',
    metric: { value: '+127%', label: 'Conv. media' },
    stack: ['Tiendanube', 'Next.js', 'Shopify', 'GA4'],
    partner: true,
  },
  {
    code: 'EVT',
    title: 'Eventos Corporativos',
    promise: 'Generan negocio, no fotos para LinkedIn.',
    description:
      'Activaciones, lanzamientos y experiencias que generan leads cualificados, no solo asistencia.',
    metric: { value: '87%', label: 'Leads cualif.' },
    stack: ['B2B', 'Producción', 'Activación'],
  },
];

export function Services() {
  return (
    <section
      id="servicios"
      className="px-[18px] pb-10 pt-12 md:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-content">
        <Tag>Servicios</Tag>
        <h2
          className="mb-2 mt-[18px] font-sans font-semibold text-ink"
          style={{
            fontSize: '36px',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
          }}
        >
          Tres motores.
          <br />
          <span className="text-muted">Una promesa.</span>
        </h2>

        <div className="mt-[26px] flex flex-col gap-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.code} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service: s }: { service: Service }) {
  return (
    <article className="relative overflow-hidden rounded-card border border-line2 bg-surface px-4 py-[18px]">
      {/* Header: code badge + métrica */}
      <div className="mb-[14px] flex items-start justify-between">
        <div className="rounded-chip border border-lime px-2 py-[3px] font-mono text-[10px] tracking-mono-wide text-lime">
          {s.code}
        </div>
        <div className="text-right">
          <div
            className="font-sans text-[22px] font-semibold leading-none text-lime"
            style={{ letterSpacing: '-0.03em' }}
          >
            {s.metric.value}
          </div>
          <div className="mt-[3px] font-mono text-[8.5px] uppercase tracking-mono-wide text-muted">
            {s.metric.label}
          </div>
        </div>
      </div>

      <h3
        className="mb-1.5 font-sans text-[22px] font-semibold leading-[1.1] text-ink"
        style={{ letterSpacing: '-0.025em' }}
      >
        {s.title}
      </h3>
      <div
        className="mb-2.5 font-sans text-[13.5px] italic leading-[1.35] text-lime"
        style={{ letterSpacing: '-0.005em' }}
      >
        &ldquo;{s.promise}&rdquo;
      </div>
      <p className="m-0 font-sans text-[13px] leading-[1.55] text-ink2">
        {s.description}
      </p>

      <div className="mt-[14px] flex flex-wrap items-center gap-1.5 border-t border-line pt-[14px]">
        {s.partner && (
          <span
            className="inline-flex items-center gap-1.5 rounded-chip bg-lime px-2 py-[3px] font-mono text-[9.5px] font-medium text-bg"
            style={{ letterSpacing: '0.04em' }}
          >
            <span
              aria-hidden="true"
              className="inline-block h-[5px] w-[5px] rounded-full bg-bg"
            />
            PARTNER OFICIAL
          </span>
        )}
        {s.stack.map((t) => (
          <span
            key={t}
            className="rounded-chip px-[7px] py-[3px] font-mono text-[9.5px] text-ink2"
            style={{
              background: 'rgba(245,244,238,0.05)',
              letterSpacing: '0.02em',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
