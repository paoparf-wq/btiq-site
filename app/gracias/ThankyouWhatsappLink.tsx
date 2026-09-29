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
      className="inline-flex items-center gap-2 rounded-[8px] bg-brand px-[24px] py-[14px] font-display text-[15px] font-semibold text-base transition-all ease-brand duration-[220ms] hover:-translate-y-0.5 hover:shadow-brand-hover"
    >
      Adelántalo por WhatsApp <span aria-hidden="true">↗</span>
    </a>
  );
}
