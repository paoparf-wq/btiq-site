import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { Logos } from '@/components/sections/Logos';
import { Services } from '@/components/sections/Services';
import { Partner } from '@/components/sections/Partner';
import { Process } from '@/components/sections/Process';
import { Why } from '@/components/sections/Why';
import { Founder } from '@/components/sections/Founder';
import { Faq } from '@/components/sections/Faq';

// Pendiente: ContactForm — bloquea espera de NEXT_PUBLIC_FORMSPREE_ENDPOINT

export default function Page() {
  return (
    <>
      <a id="top" />
      <Nav />
      <main>
        <Hero />
        <Logos />
        <Services />
        <Partner />
        <Process />
        <Why />
        <Founder />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
