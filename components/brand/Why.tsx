import Image from 'next/image';
import { SectionHead } from './SectionHead';
import { tokens } from '@/lib/tokens';

// Nosotros. Grid 4 celdas (hairlines internos via gap:1px + border) con
// cifra grande, label mono y descripción. Debajo: bloque fundadora con foto
// 4:5 a la izquierda y cita destacada + firma a la derecha.

const STATS = [
  {
    number: '15+',
    label: 'años en marcas globales',
    description: 'Samsung, AT&T, Hyundai, Kia. Experiencia real, no slides.',
  },
  {
    number: '1',
    label: 'equipo senior',
    description: 'Quien piensa también ejecuta. Sin capas de intermediación.',
  },
  {
    number: 'ES/EN',
    label: 'alcance LatAm',
    description: 'Base CDMX. Operamos en MX, CO, CL y US-Hispanic.',
  },
  {
    number: '24h',
    label: 'respuesta máxima',
    description: 'Lean, sin overhead. Trabajas directo con quien decide.',
  },
];

export function Why() {
  return (
    <section id="nosotros" className="border-t border-borde py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto max-w-site px-gut">
        <SectionHead
          number="03"
          title={
            <>
              Calidad de global.
              <br />
              Agilidad de boutique.
            </>
          }
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-borde bg-borde lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-surface-1 p-[clamp(22px,2.4vw,28px)]"
            >
              <b
                className="block font-display font-bold text-texto-1"
                style={{
                  fontSize: '1.75rem',
                  letterSpacing: '-0.025em',
                  lineHeight: 1,
                }}
              >
                {s.number}
              </b>
              <div
                className="mt-3.5 mb-2.5 font-mono text-[10.5px] uppercase text-texto-3"
                style={{ letterSpacing: '0.07em' }}
              >
                {s.label}
              </div>
              <p
                className="text-texto-2"
                style={{ fontSize: '0.875rem', lineHeight: 1.55 }}
              >
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* Fundadora */}
        <div className="mt-[clamp(48px,6vw,86px)] grid grid-cols-1 items-center gap-[clamp(28px,4vw,64px)] lg:grid-cols-[0.8fr_1.2fr]">
          <div
            className="mx-auto w-full max-w-[340px] overflow-hidden rounded-[14px] border border-borde lg:max-w-none"
            style={{ aspectRatio: '4 / 5', background: '#e8e8e6' }}
          >
            <Image
              src="/founder.jpg"
              alt="Paola Parra, fundadora de btiq digital"
              width={800}
              height={1000}
              className="h-full w-full object-cover"
              style={{ objectPosition: '50% 12%' }}
              priority={false}
            />
          </div>
          <div>
            <div className="mono-label">Fundadora</div>
            <blockquote
              className="mt-5 font-display font-bold text-texto-1"
              style={{
                fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                lineHeight: 1.22,
                letterSpacing: '-0.02em',
                textWrap: 'pretty',
              }}
            >
              &ldquo;Las marcas medianas merecen la misma calidad estratégica
              que las globales — con la agilidad que las grandes ya no
              ofrecen.&rdquo;
            </blockquote>
            <div className="mt-[26px] flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-borde pt-5">
              <b
                className="font-display font-bold text-texto-1"
                style={{ fontSize: '0.9375rem' }}
              >
                Paola Parra
              </b>
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3">
                Digital Marketing Director
              </span>
              <a
                href={tokens.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3 transition-colors hover:text-brand"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
