import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Aviso de privacidad | btiq digital',
  description:
    'Aviso de privacidad de btiq digital — uso, tratamiento y derechos ARCO sobre datos personales.',
  robots: { index: true, follow: true },
};

// Contenido pendiente: Paola pasará el texto exacto del aviso de privacidad
// del sitio anterior. Este placeholder mantiene la ruta `/aviso-de-privacidad`
// y la identidad visual (header sticky + footer + paleta dark).

export default function AvisoDePrivacidadPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen">
        <section className="mx-auto w-full max-w-content px-[18px] py-12 md:px-8 lg:px-10">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-muted">
            // legal
          </p>
          <h1
            className="mt-4 font-sans text-[36px] font-semibold text-ink"
            style={{ letterSpacing: '-0.035em', lineHeight: 1.0 }}
          >
            Aviso de privacidad
          </h1>
          <p className="mt-6 font-sans text-[14px] leading-[1.6] text-ink2">
            Pendiente: copia del aviso de privacidad legal del sitio anterior.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
