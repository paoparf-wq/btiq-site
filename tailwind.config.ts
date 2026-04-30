import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta dark del design handoff. NO modificar.
        bg: '#0d0e0c',
        bg2: '#161814',
        surface: '#1a1c18',
        ink: '#f5f4ee',
        ink2: '#cfcec5',
        muted: '#7a7a72',
        lime: {
          DEFAULT: '#d4ff3a',
          hover: '#bce024',
        },
        line: 'rgba(245,244,238,0.10)',
        line2: 'rgba(245,244,238,0.18)',
        error: '#7a1818',
        tiendanube: '#0066ff',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        // Display headings: -0.025em a -0.04em (más apretado en tamaños grandes)
        tightest: '-0.04em',
        tighter: '-0.035em',
        tight: '-0.025em',
        // Mono uppercase: 0.05em–0.18em
        mono: '0.05em',
        'mono-wide': '0.1em',
        'mono-widest': '0.18em',
      },
      borderRadius: {
        chip: '5px',
        card: '18px',
      },
      animation: {
        // Pulse del dot lime: 2s ease-in-out infinite, opacity 1 ↔ 0.4.
        // Renombrado a evitar la colisión con animate-pulse builtin de Tailwind.
        'lime-pulse': 'lime-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'lime-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      maxWidth: {
        // Contenedor desktop según handoff
        content: '640px',
      },
    },
  },
  plugins: [],
};

export default config;
