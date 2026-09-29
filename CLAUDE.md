# Contexto para Claude Code — sitio btiq.mx

Sitio público de **btiq digital** (Paola Parra, dirección). Es el sitio de la agencia,
no de un cliente.

## Stack

Next.js 14 (App Router) + React 18 + TypeScript + Tailwind. Componentes bajo `components/`,
rutas bajo `app/`. `motion` para animación, `lucide-react` para iconos, `resend` para el
envío de correo de los formularios.

## Deploy

- Repo: `git@github.com:paoparf-wq/btiq-site.git` (usuario de GitHub `paoparf-wq`,
  llave SSH de esta Mac ya autorizada — los push salen sin contraseña).
- Hosting: **Vercel**, dominio `btiq.mx`. `vercel.json` redirige `www.btiq.mx` → `btiq.mx`.
- Ver `../Btiq Digital/GUIA-DEPLOY.md` si hay dudas del procedimiento.

## Comandos

```bash
npm run dev     # desarrollo local
npm run build   # verificar que compila antes de push
npm run lint
```

## Marca

Pantalla/web = negro + amarillo `#EDE04A` + Bricolage Grotesque / JetBrains Mono
(btiq.mx, rediseño 2026). Documentos de cliente (.docx) usan NAVY/TEAL Calibri — no
mezclar los dos sistemas.

## Cómo trabajar aquí sin quemar contexto

Una sola sesión de este proyecto costó 106M tokens por acumular todo en una conversación.
Abrir conversación nueva al cambiar de objetivo (una sección del sitio ≠ un bug de build
≠ un ajuste de copy). Este archivo carga el contexto base; no hace falta arrastrarlo en
la conversación.
