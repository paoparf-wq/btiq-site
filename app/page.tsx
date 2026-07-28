import { Nav } from '@/components/brand/Nav';
import { Footer } from '@/components/brand/Footer';
import { Hero } from '@/components/brand/Hero';
import { Logos } from '@/components/brand/Logos';
import { Services } from '@/components/brand/Services';
import { Partner } from '@/components/brand/Partner';
import { Process } from '@/components/brand/Process';
import { Why } from '@/components/brand/Why';
import { Faq } from '@/components/brand/Faq';
import { ContactForm } from '@/components/brand/ContactForm';
import { SectionReveal } from '@/components/brand/SectionReveal';

// Home — dirección "Nómina × Marcador" (dirección A del handoff aprobado).
// Orden estricto: hero → prueba social → servicios → Tiendanube → proceso →
// nosotros+fundadora → FAQ → contacto. Cada sección post-hero envuelta en
// SectionReveal (fade+slide al entrar en viewport, una vez).

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SectionReveal>
          <Logos />
        </SectionReveal>
        <SectionReveal>
          <Services />
        </SectionReveal>
        <SectionReveal>
          <Partner />
        </SectionReveal>
        <SectionReveal>
          <Process />
        </SectionReveal>
        <SectionReveal>
          <Why />
        </SectionReveal>
        <SectionReveal>
          <Faq />
        </SectionReveal>
        <SectionReveal>
          <ContactForm />
        </SectionReveal>
      </main>
      <Footer />
    </>
  );
}
