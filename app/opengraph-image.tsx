import { ImageResponse } from 'next/og';

// Open Graph image — lo que ven WhatsApp, Slack, LinkedIn, X, iMessage,
// etc. cuando alguien comparte un link a btiq.mx.
//
// Diseño: paleta dark del sitio + acento lime + headline corto que comunica
// "agencia de marketing digital". El recipient debe entender en 2s qué es btiq
// sin tener que abrir el link.
//
// Tamaño 1200×630 — estándar de Facebook/OG, también respetado por todas
// las demás plataformas.

export const runtime = 'edge';
export const alt =
  'btiq digital — Marketing digital boutique en CDMX. Performance, web y eventos para marcas medianas mexicanas.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0d0e0c',
          display: 'flex',
          flexDirection: 'column',
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        {/* Glow lime decorativo en esquina superior derecha */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(212,255,58,0.18), transparent 70%)',
          }}
        />

        {/* Header — wordmark btiq/digital */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 11,
              background: '#d4ff3a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0d0e0c',
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '-0.04em',
            }}
          >
            b
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: '#f5f4ee',
              letterSpacing: '-0.015em',
              display: 'flex',
            }}
          >
            <span>btiq</span>
            <span style={{ color: '#7a7a72', fontWeight: 400 }}>/digital</span>
          </div>
        </div>

        {/* Eyebrow mono */}
        <div
          style={{
            marginTop: 'auto',
            fontSize: 20,
            color: '#d4ff3a',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            zIndex: 1,
          }}
        >
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              background: '#d4ff3a',
              display: 'inline-block',
            }}
          />
          PERFORMANCE · CDMX · ROAS 4.8×
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: 28,
            fontSize: 96,
            fontWeight: 600,
            color: '#f5f4ee',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
          }}
        >
          <span>Marketing digital</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ color: '#7a7a72' }}>boutique en</span>
            <span
              style={{
                background: '#d4ff3a',
                color: '#0d0e0c',
                padding: '0 22px',
                borderRadius: 14,
                transform: 'rotate(-2deg)',
                display: 'inline-flex',
              }}
            >
              CDMX.
            </span>
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: '#cfcec5',
            lineHeight: 1.4,
            maxWidth: 980,
            zIndex: 1,
            display: 'flex',
          }}
        >
          Performance, web y eventos para marcas medianas mexicanas. Cada peso
          invertido te regresa tres.
        </div>
      </div>
    ),
    { ...size },
  );
}
