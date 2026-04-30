# Handoff: Btiq Digital — Landing Page Redesign

## Overview
This is a complete redesign of the btiq.mx landing page (a boutique digital marketing agency in CDMX, Mexico, founded by Paola Parra). The redesign is **mobile-first**, modern, performance-focused, and aimed at mid-sized Mexican brands ($50M–$500M MXN annual revenue) looking to scale their digital marketing.

The primary CTA is **"Agenda una llamada"** (book a call) — the goal is to drive demo/sales bookings.

## About the Design Files
The HTML/JSX files in this bundle are **design references** created as a working prototype to demonstrate the intended look, feel, copy, and interactive behavior. **They are not meant to be deployed as-is.**

Your task is to **recreate these designs in the target codebase's existing environment** — using its established patterns, design tokens, and component library — or, if no codebase exists yet, to choose the most appropriate stack (Next.js + Tailwind is recommended for this kind of marketing site).

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, and interactions are all locked in. Recreate pixel-perfect.

## Files in this bundle
- `Btiq Mobile.html` — **The primary deliverable.** Direction B at full mobile scale, scrollable. This is what the user approved.
- `direction-b.jsx` — All React components for Direction B (the chosen direction).
- `Btiq Landing.html` — Comparison view showing both Direction A and B side-by-side in a design canvas (for reference only).
- `direction-a.jsx` — Alternate "Editorial Confidence" direction (NOT the chosen direction; included for reference only).
- `app.jsx`, `design-canvas.jsx`, `tweaks-panel.jsx` — Canvas/scaffolding files; not needed for production.

## Screens / Sections (in order, top to bottom)

All sections live in a single scrollable mobile page. Use `direction-b.jsx` as the source of truth.

### 1. Nav (sticky, top)
- **Layout**: flex row, space-between, padding 14px 18px, sticky to top with backdrop-blur(12px), 1px bottom border (rgba(245,244,238,0.10))
- **Left**: 26×26 lime square (radius 7) with bold "b" → wordmark "btiq/digital" (Geist 15px / 600)
- **Right**: lime pill button "Agenda ↗" (Geist 12.5/500, padding 9×14, radius 999)

### 2. Hero
- **Layout**: padding 34px 18px 28px, faint 28×28 grid background masked with radial gradient
- **Tag pill** (BTag): "Performance · CDMX · ROAS 4.8×" — lime dot + lime mono uppercase 10.5px on dark pill
- **Headline (H1)**: Geist 50px / 600, line-height 0.95, letter-spacing -0.04em
  - Line 1: "Cada peso" (ink color #f5f4ee)
  - Line 2: "invertido" (muted #7a7a72)
  - Line 3: "te regresa **tres.**" — "tres." has lime background (#d4ff3a), bg color text (#0d0e0c), padding 0 12px, radius 8, **rotated -2deg** for visual emphasis
- **Subhead**: 14.5px 1.55 line-height, max-width 320px, color ink2 (#cfcec5), with key phrase "Sin intermediarios. Sin métricas que no venden." in full ink
- **CTAs**: lime primary "Agenda una llamada" (radius 12, padding 15×18) + secondary outline "↓" button
- **Live metrics card**: surface bg, rounded 18, with pulsing lime dot + label "Resultados promedio · Q1 2026", then 3 metrics in a row (ROAS 4.8×, Conv. 127%, CAC -42%)

### 3. Logos strip
- **Layout**: padding 24px 18px, top+bottom borders, bg #161814
- **Caption** (mono 10/0.15em): "// marcas donde nuestra fundadora ha liderado"
- **Logos** (Geist 14/600, ink2 at 0.7 opacity): SAMSUNG, AT&T, HYUNDAI, KIA, ALIAT UNIVERSIDADES — flex wrap with 24px gap

### 4. Services (3 cards)
- Each card: surface bg, 1px line2 border, radius 18, padding 18×16
- Header row: code badge ("PERF" / "WEB" / "EVT") + right-aligned metric value (lime, 22px/600) + small mono label
- Title (Geist 22/600 letter-spacing -0.025em)
- Italic lime promise quote
- Description (13px ink2)
- Footer row: optional **"PARTNER OFICIAL"** badge (lime bg, bg color text) + tech stack chips
- **Card 1 — PERF · Performance Marketing**
  - Promise: "Cada peso invertido te regresa tres."
  - Stack: Meta, Google, TikTok, HubSpot · Metric: 4.8× ROAS promedio
- **Card 2 — WEB · Web & Tiendas en línea** (HAS PARTNER BADGE)
  - Promise: "Que convierten, no que solo se ven bonitos."
  - Description mentions Tiendanube partnership explicitly
  - Stack: Tiendanube, Next.js, Shopify, GA4 · Metric: +127% Conv. media
- **Card 3 — EVT · Eventos Corporativos**
  - Promise: "Generan negocio, no fotos para LinkedIn."
  - Stack: B2B, Producción, Activación · Metric: 87% Leads cualif.

### 5. Tiendanube Partnership (dedicated section)
- **Layout**: padding 40px 18px, bg #161814, top border
- Tag: "Partnership oficial"
- Card with surface bg, radius 18, with lime radial glow in top-right corner
- Brand row: 42×42 blue square (#0066ff) with white "T" + "Tiendanube" + lime mono "PARTNER OFICIAL · MÉXICO"
- Headline (24px/600): "Lanzamos tu tienda en **30 días**." (30 días in lime)
- Description about being certified partners doing end-to-end e-commerce setup
- 2×2 grid of capabilities: Setup completo / Integraciones (Meta·Google·CRM) / Migración / Soporte continuo

### 6. Process (Cómo te llevamos del 0 al scale)
- Bg #161814, top+bottom borders
- Tag: "Proceso · 90 días"
- H2: "Cómo te llevamos / del 0 al **scale**." (scale in lime)
- Vertical timeline with lime gradient line on the left
- Steps: 01 Diagnóstico (~7 días) / 02 Estrategia (~14 días) / 03 Ejecución (~30 días) / 04 Optimización (continuo)
- Step 01 has filled lime circle; rest are surface bg with lime borders. Each step: title (18/600) + lime mono duration + description.

### 7. Why Btiq (Por qué btiq)
- 2×2 grid of stats:
  - **15+** años en marcas globales
  - **1** equipo senior
  - **ES/EN** alcance LatAm
  - **24h** respuesta máxima
- Each card: surface bg, radius 14, padding 16×14. Number in lime 30/600, label in ink, description in muted.

### 8. Founder
- Bg #161814, top border
- 72×72 circular avatar with lime gradient + "PP" initials
- "Paola Parra" (20/600) + "Digital Marketing Director" (mono muted) + "15+ años · ES/EN · LatAm" (mono lime)
- Pull quote: "Las marcas medianas merecen la **misma calidad estratégica** que las globales — con la agilidad que las grandes ya no ofrecen." (key phrase in lime)
- LinkedIn link card

### 9. FAQ (5 items, accordion)
- 1st item open by default
- Open state: surface bg + line2 border, lime "+ → ×" rotation indicator (45° rotation, lime fill)
- Closed: transparent bg, line border, hollow + indicator
- Questions: ¿Cuánto tarda en arrancar? / ¿Retainer o por proyecto? / ¿Quién ejecuta mi cuenta? / ¿Operan fuera de México? / ¿Trabajan con startups?

### 10. Contact Form (THE FINAL CTA)
- **Bg lime (#d4ff3a)**, dark text
- Eyebrow: "// next step" (mono uppercase)
- H2 (Geist 42/600 letter-spacing -0.04em): "Hablemos / de tu próximo / trimestre."
- Subhead: "Respuesta en menos de 24 horas con un diagnóstico inicial gratuito."
- **Fields** (in order):
  1. Nombre (text, required, min 2 chars)
  2. Email (email, required, regex /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
  3. Empresa (text, required)
  4. Teléfono / WhatsApp (tel, optional, regex /^[\d\s+()-]{8,}$/ if filled)
  5. Servicios de interés (multi-select tile group, at least one required) — options: PERF Performance Marketing / WEB Web & Tiendas en línea / EVT Eventos Corporativos
- **Field styling**: mono uppercase 9.5/0.12em label + optional inline error (red #7a1818). Inputs: rgba(13,14,12,0.06) bg, 1.5px border, radius 10, padding 13×14.
- **Service tiles**: when off → muted bg, when on → bg color (#0d0e0c) bg + lime text + lime check square
- **Submit button**: dark bg, lime text, radius 12, padding 17×22, with → arrow. Shows "Enviando…" + ○ during submit (900ms simulated).
- **Success state** (replaces the form): same lime bg, big check circle, "Gracias, {firstName}." headline, confirmation paragraph + mono "→" list with email confirmation note + next-step note. "Enviar otro mensaje" link to reset.
- **Privacy notice** below button: mono 10px centered.
- **Contact strip below form**: top border, mono 11px, color rgba(13,14,12,0.7):
  - → paola@btiq.mx
  - → WhatsApp directo · +52 55 3734 4652
  - → Ciudad de México

### 11. Footer
- Bg bg color (#0d0e0c), padding 28×18×24
- Top row: small lime "b" badge + "btiq/digital" wordmark · "© 2026" mono
- Bottom row: "Aviso de privacidad" / "Made in CDMX" (mono 10, top border)

## Interactions & Behavior

- **Sticky nav**: fades to bg with backdrop-blur on scroll (already always-on in design).
- **FAQ accordion**: clicking a closed item opens it; clicking the open one closes it. Plus icon rotates 45° to become an X. Transition 0.25s.
- **Service tiles in form**: click toggles selection. Multi-select.
- **Form validation**: errors shown only after field blur or submit attempt. Live validation updates as user types after first blur.
- **Form submit**: 900ms loading simulation, then success state. In production, hook to email/CRM/Resend/SendGrid.
- **Pulse animation** on hero metric dot: 2s ease-in-out infinite, opacity 1 ↔ 0.4.
- **Hero "tres." chip rotation**: static -2deg.

## Responsive Behavior
- **Designed mobile-first at 390px width** (iPhone 14 Pro). Layout currently optimized for 360–430px.
- For tablet/desktop: increase max-width to ~640px for content (single column still works), but consider a dedicated desktop hero with side-by-side metrics card. **Desktop breakpoint not yet designed** — flag for a follow-up design pass.

## State Management
- `open` (number, default 0) — currently open FAQ index
- `form` ({ nombre, email, empresa, telefono, servicios[] }) — controlled form state
- `touched` (object) — which fields have been blurred (for error timing)
- `submitted` (boolean) — show success state when true
- `submitting` (boolean) — show loading state when true
- `errors` (derived/memo from form) — validation map

## Design Tokens

### Colors
```
bg:       #0d0e0c    /* near-black background */
bg2:      #161814    /* alternate band background */
surface:  #1a1c18    /* card surface */
ink:      #f5f4ee    /* primary text on dark */
ink2:     #cfcec5    /* secondary text on dark */
muted:    #7a7a72    /* muted text */
lime:     #d4ff3a    /* primary accent — CTAs, highlights, metrics */
lime2:    #bce024    /* lime hover/pressed */
line:     rgba(245,244,238,0.10)    /* subtle dividers */
line2:    rgba(245,244,238,0.18)    /* card borders */
error:    #7a1818    /* form error red */
tiendanube: #0066ff  /* Tiendanube brand blue */
```

### Typography
- **Sans**: `Geist` (Google Fonts) — weights 300, 400, 500, 600, 700
- **Mono**: `Geist Mono` — weights 400, 500
- Letter-spacing on display headings: -0.025em to -0.04em (tighter for larger sizes)
- Letter-spacing on mono uppercase: 0.05em–0.18em

### Spacing
- Section vertical padding: 40–48px
- Section horizontal padding: 18px (mobile)
- Card padding: 18×16 or 22×18
- Card gap: 8–14px

### Radii
- Small chip/tag: 4–5px
- Input/button: 10–12px
- Card: 14–18px
- Pill: 999px

### Shadows
- Pulse glow on lime dot: `box-shadow: 0 0 8px #d4ff3a`
- Lime radial glow in partner card: `radial-gradient(circle, #d4ff3a22, transparent 70%)`

## Assets
- **Logos**: Currently rendered as text (SAMSUNG, AT&T, HYUNDAI, KIA, ALIAT UNIVERSIDADES). Replace with proper SVG logos in production. **Note**: these are brands where the founder Paola Parra has worked — verify trademark usage rights with each.
- **Tiendanube logo**: Currently a placeholder blue square with "T". Replace with the official Tiendanube partner badge (request from your Tiendanube partner manager).
- **Founder photo**: Currently a gradient circle with "PP" initials. Replace with Paola's headshot (the original site uses `https://www.btiq.mx/assets/founder.jpg`).

## Implementation Recommendations
1. **Stack**: Next.js (App Router) + Tailwind CSS + Framer Motion for interactions. Deploy on Vercel.
2. **Form backend**: Resend or Formspree for the contact form. Send confirmation email to user + alert email to paola@btiq.mx.
3. **Analytics**: GA4 + Meta Pixel + LinkedIn Insight Tag (since target is B2B mid-market).
4. **i18n**: Site is in Spanish. Plan an English version for LatAm/US-Hispanic expansion.
5. **SEO**: Meta title "Btiq Digital — Marketing digital boutique en CDMX" / description emphasizing performance marketing + Tiendanube partnership for Mexican mid-market brands.
6. **CMS** (optional): Sanity or Contentful so Paola can edit copy, FAQ, and case studies without deploys.

## Contact info (for footer/contact)
- Email: **paola@btiq.mx**
- WhatsApp: **+52 55 3734 4652**
- Location: Ciudad de México, MX
- LinkedIn (founder): https://www.linkedin.com/in/paolaparramx-digital-growth-latam
