import type { Metadata } from 'next';

// Metadata SEO para la landing de captura /diagnostico. Sí se indexa —
// queremos tráfico orgánico y buenos previews cuando se comparta el link
// (además de que la usan las campañas de Google Ads).

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btiq.mx';

export const metadata: Metadata = {
  title: 'Diagnóstico gratis de tienda online | btiq digital',
  description:
    'Diagnóstico gratis de tu tienda online en 5 minutos. Score de conversión, mapa de fugas por página y acciones priorizadas por impacto. Partner oficial de Tiendanube.',
  openGraph: {
    title: 'Diagnóstico gratis de tienda online | btiq digital',
    description:
      'Tu tienda está perdiendo ventas. Te mostramos dónde y cuánto te cuesta. Diagnóstico gratis en 48 horas, sin tarjeta.',
    url: `${SITE_URL}/diagnostico`,
    siteName: 'btiq digital',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diagnóstico gratis de tienda online | btiq digital',
    description:
      'Tu tienda está perdiendo ventas. Descubre dónde y cuánto — gratis, en 48h.',
  },
  alternates: { canonical: `${SITE_URL}/diagnostico` },
  robots: { index: true, follow: true },
};

export default function DiagnosticoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
