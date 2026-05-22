import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
  	extend: {
  		colors: {
  			bg: '#0d0e0c',
  			bg2: '#161814',
  			surface: '#1a1c18',
  			ink: '#f5f4ee',
  			ink2: '#cfcec5',
  			// Token del handoff (texto secundario sobre fondo dark). Renombrado de
  			// 'muted' a 'faint' para no chocar con el 'muted' de shadcn/Cult UI.
  			faint: '#8a8a82',
  			// muted = sistema de shadcn (CSS variables). Lo usan los componentes
  			// de Cult UI; nuestro sitio no lo referencia directamente.
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			lime: {
  				DEFAULT: '#d4ff3a',
  				hover: '#bce024'
  			},
  			line: 'rgba(245,244,238,0.10)',
  			line2: 'rgba(245,244,238,0.18)',
  			error: '#7a1818',
  			tiendanube: '#0066ff',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: 'hsl(var(--destructive))',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-geist-mono)',
  				'ui-monospace',
  				'monospace'
  			]
  		},
  		letterSpacing: {
  			tightest: '-0.04em',
  			tighter: '-0.035em',
  			tight: '-0.025em',
  			mono: '0.05em',
  			'mono-wide': '0.1em',
  			'mono-widest': '0.18em'
  		},
  		borderRadius: {
  			chip: '5px',
  			card: '18px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'lime-pulse': 'lime-pulse 2s ease-in-out infinite',
  			// Animaciones requeridas por cosmic-button de Cult UI (el componente
  			// las documenta en sintaxis v4; aquí están portadas a v3).
  			'cosmic-spin': 'cosmic-spin 3s linear infinite',
  			'cosmic-spin-slow': 'cosmic-spin-slow 5s linear infinite'
  		},
  		keyframes: {
  			'lime-pulse': {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.4'
  				}
  			},
  			'cosmic-spin': {
  				from: { transform: 'rotate(0deg)' },
  				to: { transform: 'rotate(360deg)' }
  			},
  			'cosmic-spin-slow': {
  				from: { transform: 'rotate(0deg)' },
  				to: { transform: 'rotate(-360deg)' }
  			}
  		},
  		maxWidth: {
  			content: '640px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
