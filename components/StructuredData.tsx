import { tokens } from '@/lib/tokens';

// Schema.org JSON-LD. Permite a Google armar el Knowledge Panel y rich
// snippets con dirección, logo, redes y datos de contacto. Se inyecta en
// el <body> del layout, server-rendered (no necesita ser cliente).

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btiq.mx';

const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'btiq digital',
  alternateName: 'btiq',
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  image: `${SITE_URL}/opengraph-image`,
  description:
    'Marketing digital boutique en CDMX. Performance, web y eventos para marcas medianas mexicanas. Partner oficial de Tiendanube.',
  foundingDate: '2024',
  founder: {
    '@type': 'Person',
    name: 'Paola Parra',
    jobTitle: 'Digital Marketing Director',
    sameAs: tokens.contact.linkedin,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ciudad de México',
    addressRegion: 'CDMX',
    addressCountry: 'MX',
  },
  areaServed: [
    { '@type': 'Country', name: 'Mexico' },
    { '@type': 'Country', name: 'Colombia' },
    { '@type': 'Country', name: 'Chile' },
    { '@type': 'Country', name: 'United States' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+52-55-3734-4652',
    email: tokens.contact.email,
    availableLanguage: ['Spanish', 'English'],
  },
  sameAs: [tokens.contact.linkedin],
  knowsAbout: [
    'Performance marketing',
    'E-commerce',
    'Tiendanube',
    'Eventos corporativos',
    'Paid media',
    'Marketing digital',
  ],
} as const;

const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'btiq digital',
  inLanguage: 'es-MX',
  publisher: { '@id': `${SITE_URL}/#organization` },
} as const;

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ORGANIZATION_LD),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(WEBSITE_LD),
        }}
      />
    </>
  );
}
