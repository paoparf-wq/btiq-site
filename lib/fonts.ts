import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';

/* btiq digital — dos familias, dos pesos cada una.
   Self-hosted por next/font (sin @import, sin CDN de terceros, subset latino).
   Total: 4 archivos woff2. adjustFontFallback evita layout shift. */

export const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--font-bricolage',
  adjustFontFallback: true,
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
});

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains',
  fallback: ['ui-monospace', 'monospace'],
});
