import { SectionHead } from './SectionHead';

// Servicios — 3 cards con hover translateY + brand shadow + brand border.
// Estructura por card: header (code + metric) → título display-m → claim →
// descripción → tags con hairline superior.

type Service = {
  code: 'PERF' | 'WEB' | 'EVT';
  metric: string;
  title: string;
  claim: string;
  description: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    code: 'PERF',
    metric: '4.8× ROAS',
    title: 'Performance Marketing',
    claim: 'Cada peso invertido te regresa tres.',
    description:
      'Paid media, CRM, e-commerce y marketplaces optimizados para ROI. Funnel completo, no solo clics.',
    tags: ['Meta', 'Google', 'TikTok', 'HubSpot'],
  },
  {
    code: 'WEB',
    metric: '+127% conv.',
    title: 'Web & tiendas en línea',
    claim: 'Que convierten, no que solo se ven bonitas.',
    description:
      'Sitios y e-commerce listos para vender. Partners oficiales de Tiendanube: implementación, integraciones y optimización continua basada en data.',
    tags: ['Tiendanube', 'Next.js', 'Shopify', 'GA4'],
  },
  {
    code: 'EVT',
    metric: '87% leads cualif.',
    title: 'Eventos corporativos',
    claim: 'Generan negocio, no fotos para LinkedIn.',
    description:
      'Activaciones, lanzamientos y experiencias que generan leads cualificados, no solo asistencia.',
    tags: ['B2B', 'Producción', 'Activación'],
  },
];

export function Services() {
  return (
    <section id="servicios" className="border-t border-borde py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto max-w-site px-gut">
        <SectionHead
          number="01"
          title={
            <>
              Tres motores.
              <br />
              Una promesa.
            </>
          }
        />
        <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-3">
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
    <article
      className="group relative flex flex-col rounded-[14px] border border-borde bg-surface-1 p-[clamp(24px,2.6vw,32px)] transition-all ease-brand duration-300 hover:-translate-y-1 hover:border-borde-hover hover:bg-surface-2 hover:shadow-brand-hover"
    >
      {/* Header: code + metric */}
      <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3">
        <span>{s.code}</span>
        <span>{s.metric}</span>
      </div>

      <h3 className="mt-[clamp(38px,6vw,64px)] mb-3 text-display-m">
        {s.title}
      </h3>

      <p
        className="mb-3 font-display font-medium text-texto-1"
        style={{ fontSize: '0.9375rem', lineHeight: 1.5 }}
      >
        {s.claim}
      </p>

      <p className="flex-1 text-body-brand text-texto-2">{s.description}</p>

      <div className="mt-6 flex flex-wrap gap-[7px] border-t border-borde pt-5">
        {s.tags.map((t) => (
          <em
            key={t}
            className="not-italic rounded-[4px] border border-borde px-2 py-[5px] font-mono text-[10px] uppercase text-texto-3"
            style={{ letterSpacing: '0.06em' }}
          >
            {t}
          </em>
        ))}
      </div>
    </article>
  );
}
