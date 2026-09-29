import { Inter, Instrument_Serif, JetBrains_Mono } from 'next/font/google';

/* btiq digital — sistema tipográfico Editorial (Opción A).
   Instrument Serif para momentos display (hero, section heads, claims italic).
   Inter como workhorse (UI, body, card titles, botones).
   JetBrains Mono para etiquetas técnicas.
   Self-hosted por next/font (sin @import, sin CDN de terceros, subset latino).
   adjustFontFallback evita layout shift. */

// Workhorse sans — reemplaza Bricolage como fuente base del sistema.
export const display = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: true,
  fallback: ['system-ui', '-apple-system', 'Arial', 'sans-serif'],
});

// Editorial serif — solo para hero, section heads y claims italic.
export const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument',
  adjustFontFallback: true,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains',
  fallback: ['ui-monospace', 'monospace'],
});
