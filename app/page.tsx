import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

// TODO: ir agregando secciones en orden:
// Hero → Logos → Services → Tiendanube → Process → Why → Founder → FAQ → ContactForm
// Por ahora solo Nav + placeholder + Footer para validar shell.

export default function Page() {
  return (
    <>
      <a id="top" />
      <Nav />
      <main className="min-h-screen">
        {/* Placeholder hasta implementar secciones */}
        <section className="mx-auto w-full max-w-content px-[18px] py-20 md:px-8 lg:px-10">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-muted">
            // setup base
          </p>
          <h1
            className="mt-4 font-sans text-[32px] font-semibold text-ink"
            style={{ letterSpacing: '-0.035em', lineHeight: 1.0 }}
          >
            Nav + Footer activos.
            <br />
            <span className="text-muted">Secciones en camino.</span>
          </h1>
          <p className="mt-5 max-w-[320px] font-sans text-[14px] leading-[1.55] text-ink2">
            Estructura validada. Continuamos con Hero, Services, Tiendanube,
            Process, Why, Founder, FAQ y formulario.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
