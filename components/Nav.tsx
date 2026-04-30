'use client';

import { Logo } from './Logo';
import { events } from '@/lib/analytics';

// Nav sticky con backdrop-blur. CTA "Agenda" lleva al formulario y dispara
// el evento agenda_click con location: 'header'.

export function Nav() {
  function handleAgendaClick() {
    events.agendaHeaderClick();
  }

  return (
    <header
      className="sticky top-0 z-50 border-b border-line backdrop-blur-[12px]"
      style={{ background: 'rgba(13,14,12,0.85)' }}
    >
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-[18px] py-[14px] md:px-8 lg:px-10">
        <a href="#top" aria-label="btiq digital — inicio" className="block">
          <Logo />
        </a>
        <a
          href="#contacto"
          onClick={handleAgendaClick}
          className="flex items-center gap-1.5 rounded-full bg-lime px-[14px] py-[9px] font-sans text-[12.5px] font-medium text-bg transition-colors hover:bg-lime-hover"
        >
          Agenda <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
