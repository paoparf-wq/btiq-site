import { SectionHead } from './SectionHead';

// Servicios — 4 cards organizados por etapa del funnel:
// Atracción → Conversión → Fidelización → Inteligencia + IA.
// Cada card lleva code + métrica en la esquina, stage title en serif,
// claim italic, y una lista de sub-servicios (nombre en Inter semibold +
// descriptor). Grid 2×2 en lg.

type SubService = {
  name: string;
  detail: string;
};

type Service = {
  code: 'ATR' | 'CONV' | 'FID' | 'IA';
  stage: string;
  metric: string;
  claim: string;
  subServices: SubService[];
};

const SERVICES: Service[] = [
  {
    code: 'ATR',
    stage: 'Atracción',
    metric: '4.8× ROAS',
    claim: 'Que tu marca llegue a quien sí compra.',
    subServices: [
      { name: 'Performance Marketing', detail: 'Meta, Google, TikTok Ads' },
      { name: 'Contenido & Redes', detail: 'orgánico, community, editorial' },
      { name: 'SEO', detail: 'posicionamiento orgánico' },
      { name: 'Eventos & Activaciones', detail: 'B2B, ferias, lanzamientos' },
    ],
  },
  {
    code: 'CONV',
    stage: 'Conversión',
    metric: '+127% conv.',
    claim: 'Tu canal digital que sí vende.',
    subServices: [
      { name: 'Web', detail: 'Next.js, WordPress, landings' },
      { name: 'Tiendas en línea', detail: 'Tiendanube — Partners oficiales' },
      { name: 'Marketplaces', detail: 'Mercado Libre, Amazon, TikTok Shop' },
      { name: 'CRO & Analytics', detail: 'GA4, Tag Manager' },
    ],
  },
  {
    code: 'FID',
    stage: 'Fidelización',
    metric: 'Multi-canal',
    claim: 'Convertir clientes en fans que recompran.',
    subServices: [
      { name: 'CRM & Automatización', detail: 'HubSpot, workflows' },
      { name: 'Email marketing', detail: 'segmentación, journeys' },
      { name: 'WhatsApp Business', detail: 'broadcast, chatbots' },
      { name: 'Remarketing', detail: 'dinámico multi-canal' },
    ],
  },
  {
    code: 'IA',
    stage: 'Inteligencia + IA',
    metric: '6 metodologías',
    claim: 'Decidir con datos, no con corazonadas.',
    subServices: [
      { name: 'Inteligencia de mercado', detail: 'cuali/cuanti, geo, neuro' },
      { name: 'EventScore', detail: 'evaluación de eventos' },
      { name: 'IA aplicada', detail: 'automatizaciones, agentes, predictivo' },
      { name: 'Dashboards', detail: 'data storytelling' },
    ],
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
              Cuatro etapas.
              <br />
              Un solo equipo.
            </>
          }
        />
        <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-2">
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
      {/* Meta row: code + metric */}
      <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3">
        <span>{s.code}</span>
        <span>{s.metric}</span>
      </div>

      {/* Stage title — serif editorial */}
      <h3
        className="mt-[clamp(28px,4vw,44px)] mb-3 font-serif leading-[1.02]"
        style={{
          fontSize: 'clamp(1.75rem, 2.6vw, 2.125rem)',
          letterSpacing: '-0.02em',
          fontWeight: 400,
        }}
      >
        {s.stage}
      </h3>

      {/* Italic claim — serif italic accent */}
      <p
        className="mb-[clamp(22px,2.8vw,30px)] font-serif italic text-texto-2"
        style={{ fontSize: '1.125rem', lineHeight: 1.42, fontWeight: 400 }}
      >
        {s.claim}
      </p>

      {/* Sub-services list — Inter workhorse */}
      <ul className="flex flex-1 flex-col gap-[10px] border-t border-borde pt-5">
        {s.subServices.map((sub) => (
          <li key={sub.name} className="text-body-brand leading-[1.5]">
            <span className="font-semibold text-texto-1">{sub.name}</span>
            <span className="text-texto-3"> · {sub.detail}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
