import type { MetadataRoute } from 'next';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://btiq.mx';

// /robots.txt dinámico. Permite todo el sitio salvo el aviso de privacidad,
// que ya lleva su propio robots: noindex en su metadata pero conviene
// reforzarlo aquí para crawlers que ignoren los meta tags.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
