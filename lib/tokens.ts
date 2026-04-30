// Design tokens del handoff aprobado (Direction B).
// Espejo de tailwind.config.ts — usar SOLO cuando se necesiten valores
// inline (CSS-in-JS, gradientes dinámicos, animaciones imperativas).
// Para clases regulares preferir Tailwind utilities.

export const tokens = {
  colors: {
    bg: '#0d0e0c',
    bg2: '#161814',
    surface: '#1a1c18',
    ink: '#f5f4ee',
    ink2: '#cfcec5',
    muted: '#8a8a82',
    lime: '#d4ff3a',
    lime2: '#bce024',
    line: 'rgba(245,244,238,0.10)',
    line2: 'rgba(245,244,238,0.18)',
    error: '#7a1818',
    tiendanube: '#0066ff',
  },
  // Datos de contacto del sitio (no inventar — vienen del brief)
  contact: {
    email: 'paola@btiq.mx',
    whatsapp: '+52 55 3734 4652',
    whatsappLink:
      'https://wa.me/525537344652?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20btiq%20digital',
    linkedin:
      'https://www.linkedin.com/in/paolaparramx-digital-growth-latam',
    location: 'Ciudad de México',
  },
  site: {
    url: 'https://btiq.mx',
    name: 'btiq digital',
  },
} as const;

export type Tokens = typeof tokens;
