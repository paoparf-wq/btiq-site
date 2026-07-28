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
  			// ─── Sistema "Nómina × Marcador" (dirección A del handoff) ───
  			// Convive con el sistema legacy de arriba. El home usa estos tokens;
  			// /diagnostico y páginas antiguas siguen con los legacy.
  			base: 'var(--base)',
  			'surface-1': 'var(--surface-1)',
  			'surface-2': 'var(--surface-2)',
  			// brand = amarillo marcador #ede04a. Se llama 'brand' (no 'accent')
  			// para no chocar con el 'accent' de shadcn.
  			brand: 'var(--brand)',
  			texto: {
  				'1': 'var(--texto-1)',
  				'2': 'var(--texto-2)',
  				'3': 'var(--texto-3)',
  				'4': 'var(--texto-4)'
  			},
  			borde: 'var(--borde)',
  			'borde-hover': 'var(--borde-hover)',
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
  			// Legacy (Geist) — usado por /diagnostico y componentes viejos.
  			sans: [
  				'var(--font-geist-sans)',
  				'system-ui',
  				'sans-serif'
  			],
  			// Display del nuevo home (Bricolage Grotesque).
  			display: [
  				'var(--font-bricolage)',
  				'Arial',
  				'Helvetica',
  				'sans-serif'
  			],
  			// Mono compartido: JetBrains para el nuevo home; Geist Mono como
  			// fallback si Bricolage no cargó — en /diagnostico ambos son mono
  			// técnicos y la diferencia visual es sutil.
  			mono: [
  				'var(--font-jetbrains)',
  				'var(--font-geist-mono)',
  				'ui-monospace',
  				'monospace'
  			]
  		},
  		fontSize: {
  			// Escala tipográfica del handoff Nómina × Marcador.
  			'display-xl': ['clamp(3rem,7.4vw,6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em', fontWeight: '700' }],
  			'display-l':  ['clamp(2.1rem,4.2vw,3.4rem)', { lineHeight: '0.98', letterSpacing: '-0.025em', fontWeight: '700' }],
  			'display-m':  ['1.5625rem', { lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: '700' }],
  			'body-l':     ['1.125rem', { lineHeight: '1.55' }],
  			'body-brand': ['0.9375rem', { lineHeight: '1.62' }],
  			'mono-label': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.08em' }]
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
  			'cosmic-spin-slow': 'cosmic-spin-slow 5s linear infinite',
  			// Marquee de logos infinito (Nómina × Marcador). La duplicación de
  			// la lista permite loop sin salto.
  			marquee: 'marquee 38s linear infinite',
  			// Sello circular del aviso de privacidad
  			'spin-slow': 'spin-slow 44s linear infinite'
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
  			},
  			marquee: {
  				to: {
  					transform:
  						'translateX(calc(-50% - clamp(14px, 2.5vw, 32px)))'
  				}
  			},
  			'spin-slow': {
  				to: { transform: 'rotate(360deg)' }
  			}
  		},
  		maxWidth: {
  			content: '640px',
  			site: 'var(--maxw)'
  		},
  		padding: {
  			gut: 'var(--gut)'
  		},
  		boxShadow: {
  			'brand-hover': 'var(--shadow-hover)'
  		},
  		backgroundImage: {
  			glow: 'radial-gradient(50% 60% at 50% 100%, var(--glow), transparent 72%)'
  		},
  		transitionTimingFunction: {
  			brand: 'cubic-bezier(0.22,1,0.36,1)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
