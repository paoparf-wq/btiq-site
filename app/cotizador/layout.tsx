import type { Metadata } from 'next';

// /cotizador — indexable, landing de campaña. Título/descripción con foco
// en el ahorro para que aparezca bien en Ads y en previews.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btiq.mx';

export const metadata: Metadata = {
  title: 'Cuánto puedes ahorrar en tu tienda online | btiq digital',
  description:
    'Calcula en 60 segundos cuánto estás perdiendo cada mes en comisiones y apps. Diagnóstico gratis, sin tarjeta.',
  openGraph: {
    title: 'Cuánto puedes ahorrar en tu tienda online',
    description:
      'Diagnóstico gratis en 60 segundos. Calcula tu ahorro potencial mensual y anual.',
    url: `${SITE_URL}/cotizador`,
    siteName: 'btiq digital',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cuánto puedes ahorrar en tu tienda online',
    description:
      'Diagnóstico gratis en 60 segundos. Ahorro estimado en comisiones y apps.',
  },
  alternates: { canonical: `${SITE_URL}/cotizador` },
  robots: { index: true, follow: true },
};

export default function CotizadorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
