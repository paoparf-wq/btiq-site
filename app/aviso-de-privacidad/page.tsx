import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Footer } from '@/components/brand/Footer';
import { PrivacyEnhancements } from './PrivacyEnhancements';

// Aviso de privacidad — rediseñado con la dirección Nómina × Marcador.
// Contenido legal LFPDPPP sin cambios; presentación nueva:
// - Header con marca de agua "PRIVACIDAD" (parallax) + sello circular
//   con textPath girando (44s)
// - Layout grid: índice sticky a la izquierda + article a la derecha
// - Barra de progreso de lectura (2px accent) bajo el nav
// - Reveal fade+slide por sección + scroll-spy en el índice
// Los comportamientos JS viven en PrivacyEnhancements (client component).

export const metadata: Metadata = {
  title: 'Aviso de privacidad | btiq digital',
  description: 'Aviso de privacidad de btiq digital.',
  robots: { index: false, follow: false },
};

const SECTIONS = [
  { id: 'datos', title: 'Datos que recabamos' },
  { id: 'finalidades', title: 'Finalidades del tratamiento' },
  { id: 'transferencia', title: 'Transferencia de datos' },
  { id: 'arco', title: 'Derechos ARCO' },
  { id: 'cookies', title: 'Cookies y analítica' },
  { id: 'modificaciones', title: 'Modificaciones' },
  { id: 'contacto-legal', title: 'Contacto' },
];

export default function AvisoDePrivacidadPage() {
  return (
    <div>
      {/* Nav sticky con barra de progreso */}
      <header className="sticky top-0 z-[120] border-b border-borde">
        <div
          className="relative"
          style={{
            background: 'color-mix(in oklab, var(--base) 86%, transparent)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          <div className="mx-auto flex h-[66px] max-w-site items-center justify-between px-gut">
            <Link href="/" aria-label="Ir a btiq digital">
              <Logo />
            </Link>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2.5 rounded-[6px] bg-brand px-[18px] py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-base transition-all ease-brand duration-[220ms] hover:-translate-y-0.5 hover:shadow-brand-hover"
            >
              Agenda una llamada
            </Link>
          </div>
          <div
            id="privacy-prog"
            className="absolute -bottom-px left-0 h-[2px] w-0 bg-brand"
            style={{
              boxShadow:
                '0 0 18px color-mix(in oklab, var(--brand) 40%, transparent)',
            }}
          />
        </div>
      </header>

      {/* Header con marca de agua + sello */}
      <section className="relative overflow-hidden pt-[clamp(56px,8vw,104px)] pb-[clamp(34px,4vw,52px)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-[130%]"
          style={{
            inset: 'auto -20% -60% 30%',
            background:
              'radial-gradient(50% 60% at 50% 100%, var(--glow), transparent 72%)',
          }}
        />
        <div className="relative mx-auto max-w-site px-gut">
          {/* Marca de agua "PRIVACIDAD" — parallax scroll (via JS) */}
          <div
            id="privacy-wmk"
            aria-hidden="true"
            className="pointer-events-none absolute select-none whitespace-nowrap font-display font-bold text-transparent"
            style={{
              right: 'calc(var(--gut) * -0.6)',
              top: 'clamp(30px, 7vw, 74px)',
              fontSize: 'clamp(9rem, 21vw, 20rem)',
              lineHeight: 0.72,
              letterSpacing: '-0.05em',
              WebkitTextStroke: '1px rgb(244 245 240 / 0.07)',
              willChange: 'transform',
            }}
          >
            PRIVACIDAD
          </div>

          {/* Sello circular con textPath — solo en desktop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute hidden h-[150px] w-[150px] lg:block"
            style={{ right: 'var(--gut)', top: 'clamp(52px, 9vw, 96px)' }}
          >
            <svg
              viewBox="0 0 150 150"
              className="h-full w-full animate-spin-slow"
            >
              <defs>
                <path
                  id="seal-ring"
                  d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0"
                />
              </defs>
              <circle
                cx="75"
                cy="75"
                r="70"
                fill="none"
                stroke="rgb(244 245 240 / 0.09)"
              />
              <circle
                cx="75"
                cy="75"
                r="45"
                fill="none"
                stroke="rgb(244 245 240 / 0.07)"
              />
              <text
                fontFamily="var(--font-jetbrains), monospace"
                fontSize="9.5"
                letterSpacing="2.6"
                fill="#7c7d79"
              >
                <textPath href="#seal-ring" startOffset="0">
                  BTIQ DIGITAL · AVISO DE PRIVACIDAD · LFPDPPP · CDMX ·{' '}
                </textPath>
              </text>
            </svg>
            <div
              className="absolute inset-0 grid place-items-center text-center font-mono text-[10px] uppercase leading-[1.6] tracking-[0.08em] text-texto-3"
            >
              <span>
                <b className="block font-display text-[26px] font-bold not-italic leading-none tracking-[-0.02em] text-texto-1">
                  07
                </b>
                secciones
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="relative inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3 transition-colors hover:text-texto-1"
          >
            ← Volver a btiq.mx
          </Link>

          <h1
            className="relative mt-[22px] font-display font-bold text-texto-1"
            style={{
              fontSize: 'clamp(2.4rem, 5.4vw, 4.2rem)',
              lineHeight: 0.96,
              letterSpacing: '-0.03em',
            }}
          >
            Aviso de privacidad
          </h1>

          <div className="relative mt-[26px] flex flex-wrap gap-x-[26px] gap-y-2.5 border-t border-borde pt-5">
            <span className="mono-label">Última actualización · 16 abril 2026</span>
            <span className="mono-label">LFPDPPP · México</span>
            <span className="mono-label">Responsable · btiq digital</span>
          </div>
        </div>
      </section>

      {/* Doc — índice sticky + article */}
      <div className="mx-auto max-w-site px-gut">
        <div className="grid grid-cols-1 gap-[clamp(30px,5vw,80px)] border-t border-borde py-[clamp(40px,6vw,72px)] pb-[clamp(72px,10vw,130px)] lg:grid-cols-[230px_1fr]">
          {/* Índice */}
          <aside className="lg:sticky lg:top-[98px] lg:self-start">
            <div className="mono-label">Contenido</div>
            <ol
              id="privacy-toc"
              className="m-0 mt-3.5 list-none p-0 lg:columns-1"
              style={{ columns: 'unset' }}
            >
              {SECTIONS.map((s, i) => (
                <li
                  key={s.id}
                  className="relative border-t border-borde last:border-b"
                >
                  <a
                    href={`#${s.id}`}
                    data-target={s.id}
                    className="privacy-toc-link flex gap-3 py-2.5 text-[0.875rem] leading-[1.35] text-texto-2 transition-colors hover:text-texto-1"
                  >
                    <span
                      className="pt-[3px] font-mono text-[10px] text-texto-4"
                      style={{ letterSpacing: '0.06em' }}
                    >
                      0{i + 1}
                    </span>
                    {s.title}
                  </a>
                  <span
                    className="privacy-toc-bar absolute left-[-14px] top-1/2 h-[22px] w-[2px] origin-center -translate-y-1/2 scale-y-0 bg-brand transition-transform duration-300 ease-brand"
                  />
                </li>
              ))}
            </ol>
          </aside>

          {/* Artículo */}
          <article className="max-w-[74ch]">
            <p
              className="text-texto-1"
              style={{
                fontSize: 'clamp(1.0625rem, 1.6vw, 1.25rem)',
                lineHeight: 1.6,
                textWrap: 'pretty',
              }}
            >
              btiq digital (en adelante &ldquo;btiq&rdquo;), con domicilio en
              Ciudad de México, México, es responsable del tratamiento de sus
              datos personales conforme a la Ley Federal de Protección de
              Datos Personales en Posesión de los Particulares (LFPDPPP), su
              Reglamento y demás normatividad aplicable.
            </p>

            <PrivacySection num="01" id="datos" title="Datos personales que recabamos">
              <p>
                Para las finalidades señaladas en este aviso, btiq puede
                recabar los siguientes datos personales:
              </p>
              <PrivacyList
                items={[
                  'Nombre completo',
                  'Correo electrónico',
                  'Número telefónico',
                  'Empresa y cargo',
                  'Información contenida en los mensajes o comunicaciones que nos envíe',
                ]}
              />
              <PrivacyCallout>
                <b className="font-bold text-texto-1">
                  No se recaban datos personales sensibles.
                </b>
              </PrivacyCallout>
            </PrivacySection>

            <PrivacySection num="02" id="finalidades" title="Finalidades del tratamiento">
              <PrivacySubhead>
                Finalidades primarias · necesarias para la relación con btiq
              </PrivacySubhead>
              <PrivacyList
                items={[
                  'Contactarle para dar respuesta a sus solicitudes de información',
                  'Proveer los servicios de marketing digital, desarrollo web y eventos corporativos que nos sean requeridos',
                  'Elaborar propuestas comerciales y cotizaciones',
                  'Dar seguimiento a la relación comercial',
                  'Cumplir con obligaciones legales y fiscales aplicables',
                ]}
              />
              <PrivacySubhead>
                Finalidades secundarias · no necesarias
              </PrivacySubhead>
              <PrivacyList
                items={[
                  'Envío de comunicaciones con contenido sobre marketing digital, casos de estudio y novedades de btiq',
                  'Invitaciones a eventos, webinars o contenidos exclusivos',
                  'Análisis estadístico para mejorar nuestros servicios',
                ]}
              />
              <PrivacyCallout>
                Si no desea que sus datos se traten para las finalidades
                secundarias, escríbanos a{' '}
                <a
                  href="mailto:paola@btiq.mx?subject=No%20deseo%20comunicaciones"
                  className="text-texto-1 underline underline-offset-[3px] hover:text-brand"
                  style={{ textDecorationColor: 'var(--texto-4)' }}
                >
                  paola@btiq.mx
                </a>{' '}
                con el asunto{' '}
                <b className="font-bold text-texto-1">
                  &ldquo;No deseo comunicaciones&rdquo;
                </b>
                .
              </PrivacyCallout>
            </PrivacySection>

            <PrivacySection num="03" id="transferencia" title="Transferencia de datos">
              <p>
                btiq no transfiere sus datos personales a terceros sin su
                consentimiento, salvo en los casos previstos en el artículo 37
                de la LFPDPPP (requerimientos de autoridad competente,
                cumplimiento de obligaciones legales, entre otros).
              </p>
              <p>
                Podremos compartir sus datos con proveedores tecnológicos que
                nos asisten en la operación del sitio y del servicio —por
                ejemplo, plataformas de hosting, analítica o envío de
                correos—, quienes están obligados contractualmente a mantener
                la confidencialidad de su información.
              </p>
            </PrivacySection>

            <PrivacySection num="04" id="arco" title="Derechos ARCO">
              <p>
                Usted tiene derecho a{' '}
                <strong className="font-bold text-texto-1">
                  Acceder, Rectificar, Cancelar u Oponerse
                </strong>{' '}
                al tratamiento de sus datos personales, así como a revocar su
                consentimiento en cualquier momento.
              </p>
              <p>
                Para ejercer estos derechos, envíe una solicitud a{' '}
                <a
                  href="mailto:paola@btiq.mx"
                  className="text-texto-1 underline underline-offset-[3px] hover:text-brand"
                  style={{ textDecorationColor: 'var(--texto-4)' }}
                >
                  paola@btiq.mx
                </a>{' '}
                indicando:
              </p>
              <PrivacyList
                items={[
                  'Su nombre completo y el medio para recibir respuesta',
                  'Documento que acredite su identidad',
                  'Descripción clara del derecho que desea ejercer',
                  'Cualquier elemento que facilite la localización de sus datos',
                ]}
              />
              <PrivacyCallout>
                Respondemos su solicitud en un plazo máximo de{' '}
                <b className="font-bold text-texto-1">20 días hábiles</b>.
              </PrivacyCallout>
            </PrivacySection>

            <PrivacySection num="05" id="cookies" title="Cookies y tecnologías similares">
              <p>
                Nuestro sitio utiliza cookies y herramientas de analítica
                (como Google Analytics) para mejorar la experiencia de
                navegación y analizar el uso del sitio. Puede deshabilitarlas
                desde la configuración de su navegador.
              </p>
            </PrivacySection>

            <PrivacySection num="06" id="modificaciones" title="Modificaciones a este aviso">
              <p>
                btiq se reserva el derecho de modificar el presente Aviso de
                Privacidad. Cualquier cambio será publicado en esta misma
                página. Le recomendamos revisarlo periódicamente.
              </p>
            </PrivacySection>

            <PrivacySection num="07" id="contacto-legal" title="Contacto">
              <p>
                Para cualquier duda sobre este aviso o sobre el tratamiento de
                sus datos personales:
              </p>
              <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-borde bg-borde">
                <a
                  href="mailto:paola@btiq.mx"
                  className="flex items-center justify-between gap-4 bg-surface-1 px-[18px] py-[15px] text-texto-1 transition-colors hover:bg-surface-2"
                  style={{ fontSize: '0.9375rem' }}
                >
                  <span>paola@btiq.mx</span>
                  <span className="mono-label">Email</span>
                </a>
                <a
                  href="https://btiq.mx"
                  className="flex items-center justify-between gap-4 bg-surface-1 px-[18px] py-[15px] text-texto-1 transition-colors hover:bg-surface-2"
                  style={{ fontSize: '0.9375rem' }}
                >
                  <span>btiq.mx</span>
                  <span className="mono-label">Sitio web</span>
                </a>
                <div
                  className="flex items-center justify-between gap-4 bg-surface-1 px-[18px] py-[15px]"
                  style={{ fontSize: '0.9375rem' }}
                >
                  <span>Ciudad de México</span>
                  <span className="mono-label">Domicilio</span>
                </div>
              </div>
            </PrivacySection>
          </article>
        </div>
      </div>

      <Footer />

      <PrivacyEnhancements sectionIds={SECTIONS.map((s) => s.id)} />
    </div>
  );
}

// ─── Sub-componentes locales ──────────────────────────────

function PrivacySection({
  num,
  id,
  title,
  children,
}: {
  num: string;
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-privacy-section
      className="mt-[clamp(40px,5vw,64px)] scroll-mt-[92px] space-y-[18px] opacity-0 [&.in]:opacity-100 [&.in]:translate-y-0 translate-y-[18px] transition-all duration-700 ease-brand"
      style={{ transitionProperty: 'opacity, transform' }}
    >
      <h2
        className="flex items-baseline gap-4 border-b border-borde pb-4 font-display font-bold text-texto-1"
        style={{
          fontSize: '1.5625rem',
          lineHeight: 1.06,
          letterSpacing: '-0.02em',
        }}
      >
        <span className="mono-label" style={{ textTransform: 'none' }}>
          {num}
        </span>
        {title}
      </h2>
      <div
        className="space-y-4 text-texto-2 [&_p]:text-[1rem] [&_p]:leading-[1.7]"
        style={{ textWrap: 'pretty' }}
      >
        {children}
      </div>
    </section>
  );
}

function PrivacyList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 mt-5 list-none p-0">
      {items.map((item) => (
        <li
          key={item}
          className="relative border-b border-borde py-[9px] pl-[26px] text-[0.9375rem] leading-[1.6] text-texto-2 before:absolute before:left-0.5 before:top-[19px] before:h-px before:w-2 before:bg-texto-4"
          style={{ content: 'unset' }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function PrivacyCallout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-6 rounded-[12px] border border-borde bg-surface-1 px-6 py-5 text-[0.9375rem] leading-[1.65] text-texto-2"
    >
      {children}
    </div>
  );
}

function PrivacySubhead({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 mono-label" style={{ textTransform: 'uppercase' }}>
      {children}
    </div>
  );
}
