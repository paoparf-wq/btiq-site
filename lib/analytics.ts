// Wrapper tipado para gtag(). Se mantienen los nombres de eventos del
// sitio anterior para no perder histórico en GA4.

type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js' | 'set',
      action: string,
      params?: GtagEventParams,
    ) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(name: string, params?: GtagEventParams) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

// Eventos del sitio anterior (mantener nombres exactos)
export const events = {
  formSubmit: () => trackEvent('form_submit', { location: 'contact' }),
  // location default 'contact' preserva el evento del contact strip del home;
  // /gracias pasa 'thankyou' para separar leads que pasan al WhatsApp tras
  // enviar el form.
  whatsappClick: (location: 'contact' | 'thankyou' = 'contact') =>
    trackEvent('whatsapp_click', { location }),
  agendaHeaderClick: () => trackEvent('agenda_click', { location: 'header' }),
  agendaHeroClick: () => trackEvent('agenda_click', { location: 'hero' }),
  // Adicionales
  serviceSelect: (service: 'PERF' | 'WEB' | 'EVT') =>
    trackEvent('service_select', { service }),
  faqOpen: (questionIndex: number) =>
    trackEvent('faq_open', { question_index: questionIndex }),
  // Conversión de Google Ads: envío de formulario (lead). Se dispara al
  // completar el formulario de contacto con éxito.
  adsLeadConversion: () =>
    trackEvent('conversion', {
      send_to: 'AW-18284380417/eITICIzP8sccEIGC1o5E',
      value: 1.0,
      currency: 'MXN',
    }),
};
