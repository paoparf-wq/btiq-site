'use client';

import { events } from '@/lib/analytics';

// Botón WhatsApp de /gracias — dispara whatsapp_click con location:'thankyou'
// para separar en GA4 los leads que pasan al WhatsApp después de enviar el
// form vs los que hacen click al link del contact strip del home.

export function ThankyouWhatsappLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => events.whatsappClick('thankyou')}
      className="inline-flex items-center gap-2.5 rounded-[6px] bg-brand px-[18px] py-[13px] font-mono text-[11px] uppercase tracking-[0.08em] text-base transition-all ease-brand duration-[220ms] hover:-translate-y-0.5 hover:shadow-brand-hover"
    >
      Adelántalo por WhatsApp <span aria-hidden="true">↗</span>
    </a>
  );
}
