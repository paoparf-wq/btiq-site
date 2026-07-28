import { ImageResponse } from 'next/og';

// Open Graph image — lo que ven WhatsApp, Slack, LinkedIn, X, iMessage,
// etc. cuando alguien comparte un link a btiq.mx.
//
// Rediseñada con la dirección "Nómina × Marcador":
// - Fondo base #0d0e0c con glow sutil amarillo
// - Wordmark con cuadrado texto-1 crema + "btiq/digital"
// - Headline "No somos tu agencia. Estamos en tu nómina." con marcador
//   amarillo #ede04a inclinado -9° sobre "nómina"
// - Caption mono amarilla arriba: PERFORMANCE · CDMX · ROAS 4.8×
// - Tagline en texto-2 (gris)
//
// 1200×630 (estándar Facebook/OG).

export const runtime = 'edge';
export const alt =
  'btiq digital — No somos tu agencia. Estamos en tu nómina. Performance marketing, web y eventos para marcas medianas mexicanas.';
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
        {/* Glow amarillo sutil abajo-derecha (equivalente al hero) */}
        <div
          style={{
            position: 'absolute',
            bottom: -280,
            right: -150,
            width: 720,
            height: 720,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(237,224,74,0.14), transparent 70%)',
          }}
        />

        {/* Wordmark superior */}
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
              borderRadius: 9,
              background: '#f4f5f0',
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
              fontWeight: 700,
              color: '#f4f5f0',
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            <span>btiq</span>
            <span style={{ color: '#7c7d79', fontWeight: 500 }}>/digital</span>
          </div>
        </div>

        {/* Caption mono amarillo */}
        <div
          style={{
            marginTop: 'auto',
            fontSize: 20,
            color: '#ede04a',
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
              background: '#ede04a',
              display: 'block',
            }}
          />
          PERFORMANCE · CDMX · ROAS 4.8×
        </div>

        {/* Headline con marcador amarillo en "nómina" */}
        <div
          style={{
            marginTop: 28,
            fontSize: 84,
            fontWeight: 700,
            color: '#f4f5f0',
            letterSpacing: '-0.03em',
            lineHeight: 0.98,
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
          }}
        >
          <span>No somos tu agencia.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span>Estamos en tu</span>
            <span
              style={{
                background: '#ede04a',
                color: '#0d0e0c',
                padding: '0 24px',
                transform: 'skewX(-9deg)',
                display: 'flex',
              }}
            >
              <span style={{ transform: 'skewX(9deg)', display: 'flex' }}>
                nómina.
              </span>
            </span>
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 26,
            fontSize: 24,
            color: '#989995',
            lineHeight: 1.42,
            maxWidth: 980,
            zIndex: 1,
            display: 'flex',
          }}
        >
          Performance marketing, web y eventos para marcas medianas mexicanas.
          Hablas con los dueños.
        </div>
      </div>
    ),
    { ...size },
  );
}
