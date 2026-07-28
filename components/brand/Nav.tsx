'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { events } from '@/lib/analytics';
import { tokens } from '@/lib/tokens';

// Nav sticky del home. Bajo lg (1024px) se ocultan links + CTA de nav y
// aparece hamburguesa 40x40 que abre panel fullscreen (#mnav). Cierra con
// Escape, al tocar un link o al re-clickear la hamburguesa. Bloquea el
// scroll del body mientras está abierto (clase mopen).

const LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#tiendanube', label: 'Tiendanube' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#faq', label: 'FAQ' },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.classList.add('mopen');
    else document.body.classList.remove('mopen');
    return () => document.body.classList.remove('mopen');
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function handleAgendaClick() {
    events.agendaHeaderClick();
  }

  return (
    <>
      <header
        className="sticky top-0 z-[120] border-b border-borde"
        style={{
          background: 'color-mix(in oklab, var(--base) 86%, transparent)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="mx-auto flex h-[66px] max-w-site items-center justify-between px-gut">
          <Link href="/" aria-label="btiq digital — inicio">
            <Logo />
          </Link>

          <nav
            aria-label="Secciones"
            className="hidden gap-[26px] lg:flex"
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3 transition-colors hover:text-texto-1"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href="#contacto"
            onClick={handleAgendaClick}
            className="hidden items-center gap-2.5 rounded-[6px] bg-brand px-[18px] py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-base transition-all ease-brand duration-[220ms] hover:-translate-y-0.5 hover:shadow-brand-hover lg:inline-flex"
          >
            Agenda una llamada
          </a>

          {/* Hamburguesa — visible bajo lg */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mnav"
            className="burger flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg border border-borde bg-transparent p-0 lg:hidden"
          >
            <span
              className={`block h-[1.5px] w-4 bg-texto-1 transition-all duration-300 ease-brand ${
                open ? 'translate-y-[6.5px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] w-4 bg-texto-1 transition-opacity duration-200 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-[1.5px] w-4 bg-texto-1 transition-all duration-300 ease-brand ${
                open ? '-translate-y-[6.5px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Panel móvil fullscreen */}
      <div
        id="mnav"
        className={`fixed inset-x-0 bottom-0 top-[66px] z-[119] flex flex-col justify-between gap-6 overflow-y-auto bg-base px-gut transition-all duration-[280ms] ease-brand lg:hidden ${
          open
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="mt-2 flex flex-col">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-borde py-[clamp(12px,2.2vh,20px)] font-display font-bold leading-none text-texto-1"
              style={{
                fontSize: 'clamp(1.5rem, 7vw, 2.25rem)',
                letterSpacing: '-0.03em',
              }}
            >
              {l.label}
              <i
                aria-hidden="true"
                className="font-mono text-[11px] not-italic uppercase tracking-[0.08em] text-texto-4"
              >
                0{i + 1}
              </i>
            </a>
          ))}
        </div>
        <div className="flex-none space-y-3.5 pb-5">
          <a
            href="#contacto"
            onClick={() => {
              setOpen(false);
              handleAgendaClick();
            }}
            className="flex w-full items-center justify-center gap-2.5 rounded-[6px] bg-brand px-[18px] py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-base"
          >
            Agenda una llamada
          </a>
          <div className="text-center mono-label">
            {tokens.contact.email} · {tokens.contact.whatsapp}
          </div>
        </div>
      </div>
    </>
  );
}
