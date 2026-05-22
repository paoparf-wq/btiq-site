import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

// Aviso de privacidad — contenido textual aprobado tomado del sitio anterior.
// Identidad visual del sitio nuevo: paleta dark, Geist, accent lime.
// Este documento legal NO debe indexarse en buscadores.

export const metadata: Metadata = {
  title: 'Aviso de privacidad | btiq digital',
  description: 'Aviso de privacidad de btiq digital.',
  robots: { index: false, follow: false },
};

export default function AvisoDePrivacidadPage() {
  return (
    <>
      <Nav />
      <main>
        <article className="mx-auto w-full max-w-content px-[18px] py-12 md:px-8 lg:px-10">
          {/* Volver a inicio */}
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-1.5 py-2 font-mono text-[10.5px] uppercase tracking-mono-wide text-lime transition-colors hover:text-ink"
          >
            <span aria-hidden="true">←</span> Volver a btiq.mx
          </Link>

          <header className="mt-8 border-b border-line pb-6">
            <h1
              className="font-sans font-semibold text-ink"
              style={{
                fontSize: '36px',
                lineHeight: 1.0,
                letterSpacing: '-0.035em',
              }}
            >
              Aviso de privacidad
            </h1>
            <p className="mt-3 font-mono text-[10.5px] uppercase tracking-mono-wide text-faint">
              Última actualización: 16 de abril de 2026
            </p>
          </header>

          <div className="prose-privacy mt-8 flex flex-col gap-4 font-sans text-[14px] leading-[1.7] text-ink2">
            <p>
              btiq digital (en adelante &ldquo;btiq&rdquo;), con domicilio en
              Ciudad de México, México, es responsable del tratamiento de sus
              datos personales conforme a lo establecido en la Ley Federal de
              Protección de Datos Personales en Posesión de los Particulares
              (LFPDPPP), su Reglamento y demás normatividad aplicable.
            </p>

            <Section title="Datos personales que recabamos">
              <p>
                Para las finalidades señaladas en el presente Aviso de
                Privacidad, btiq puede recabar los siguientes datos personales:
              </p>
              <PrivacyList
                items={[
                  'Nombre completo',
                  'Correo electrónico',
                  'Número telefónico',
                  'Empresa y cargo',
                  'Información contenida en mensajes o comunicaciones que nos envíe',
                ]}
              />
              <p>No se recaban datos personales sensibles.</p>
            </Section>

            <Section title="Finalidades del tratamiento">
              <p>
                <strong className="font-medium text-ink">
                  Finalidades primarias
                </strong>{' '}
                (necesarias para la relación con btiq):
              </p>
              <PrivacyList
                items={[
                  'Contactarle para dar respuesta a sus solicitudes de información',
                  'Proveer los servicios de marketing digital, desarrollo web y eventos corporativos que nos sean requeridos',
                  'Elaborar propuestas comerciales y cotizaciones',
                  'Dar seguimiento a la relación comercial',
                  'Cumplir con obligaciones legales y fiscales aplicables',
                ]}
              />
              <p>
                <strong className="font-medium text-ink">
                  Finalidades secundarias
                </strong>{' '}
                (no necesarias, pero nos ayudan a mejorar):
              </p>
              <PrivacyList
                items={[
                  'Envío de comunicaciones con contenido relevante sobre marketing digital, casos de estudio y novedades de btiq',
                  'Invitaciones a eventos, webinars o contenidos exclusivos',
                  'Análisis estadístico para mejorar nuestros servicios',
                ]}
              />
              <p>
                Si no desea que sus datos sean tratados para las finalidades
                secundarias, puede manifestarlo enviando un correo a{' '}
                <PrivacyLink href="mailto:paola@btiq.mx">
                  paola@btiq.mx
                </PrivacyLink>{' '}
                con el asunto &ldquo;No deseo comunicaciones&rdquo;.
              </p>
            </Section>

            <Section title="Transferencia de datos">
              <p>
                btiq no transfiere sus datos personales a terceros sin su
                consentimiento, salvo en los casos previstos en el artículo 37
                de la LFPDPPP (requerimientos de autoridad competente,
                cumplimiento de obligaciones legales, entre otros).
              </p>
              <p>
                Podremos compartir sus datos con proveedores tecnológicos que
                nos asisten en la operación del sitio y del servicio (por
                ejemplo, plataformas de hosting, analítica o envío de correos),
                quienes están obligados contractualmente a mantener la
                confidencialidad de su información.
              </p>
            </Section>

            <Section title="Derechos ARCO">
              <p>
                Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse
                al tratamiento de sus datos personales (derechos ARCO), así
                como a revocar su consentimiento en cualquier momento.
              </p>
              <p>
                Para ejercer estos derechos, envíe una solicitud al correo{' '}
                <PrivacyLink href="mailto:paola@btiq.mx">
                  paola@btiq.mx
                </PrivacyLink>{' '}
                indicando:
              </p>
              <PrivacyList
                items={[
                  'Su nombre completo y medio para recibir respuesta',
                  'Documento que acredite su identidad',
                  'Descripción clara del derecho que desea ejercer',
                  'Cualquier elemento que facilite la localización de sus datos',
                ]}
              />
              <p>
                Responderemos su solicitud en un plazo máximo de 20 días
                hábiles.
              </p>
            </Section>

            <Section title="Uso de cookies y tecnologías similares">
              <p>
                Nuestro sitio web utiliza cookies y herramientas de analítica
                (como Google Analytics) para mejorar la experiencia de
                navegación y analizar el uso del sitio. Puede deshabilitar las
                cookies desde la configuración de su navegador.
              </p>
            </Section>

            <Section title="Modificaciones al Aviso de Privacidad">
              <p>
                btiq se reserva el derecho de modificar el presente Aviso de
                Privacidad. Cualquier cambio será publicado en esta misma
                página. Le recomendamos revisarlo periódicamente.
              </p>
            </Section>

            <Section title="Contacto">
              <p>
                Para cualquier duda relacionada con este Aviso o con el
                tratamiento de sus datos personales, puede contactarnos en:
              </p>
              <p>
                Correo:{' '}
                <PrivacyLink href="mailto:paola@btiq.mx">
                  paola@btiq.mx
                </PrivacyLink>
                <br />
                Sitio web:{' '}
                <PrivacyLink href="https://btiq.mx">https://btiq.mx</PrivacyLink>
              </p>
            </Section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

// ───── Helpers locales ─────────────────────────────────────────────

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 flex flex-col gap-4">
      <h2
        className="font-sans text-[18px] font-semibold text-ink"
        style={{ letterSpacing: '-0.02em' }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function PrivacyList({ items }: { items: string[] }) {
  return (
    <ul className="ml-5 list-disc space-y-2 marker:text-lime">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function PrivacyLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      className="text-lime underline transition-colors hover:text-ink"
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
    >
      {children}
    </a>
  );
}
