import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Script from 'next/script';
import './globals.css';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btiq.mx';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'btiq digital | Marketing digital boutique en CDMX',
  description:
    'Performance marketing, web y eventos corporativos para marcas medianas mexicanas. Cada peso invertido te regresa tres. Partner oficial de Tiendanube.',
  openGraph: {
    title: 'btiq digital | Marketing digital boutique en CDMX',
    description:
      'Cada peso invertido te regresa tres. Sin intermediarios. Sin métricas que no venden.',
    url: SITE_URL,
    siteName: 'btiq digital',
    locale: 'es_MX',
    type: 'website',
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0d0e0c',
  width: 'device-width',
  initialScale: 1,
};

const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { send_page_view: true });
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}
