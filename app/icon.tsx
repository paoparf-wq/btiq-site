import { ImageResponse } from 'next/og';

// Favicon dinámico — la "b" lime sobre fondo dark del logo de btiq.
// Next.js sirve este archivo automáticamente como /icon
// y emite el <link rel="icon"> en el <head>.

export const runtime = 'edge';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          // Logo del sitio nuevo: cuadrado texto-1 (crema) con "b" en base (dark).
          background: '#f4f5f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 26,
          fontWeight: 700,
          color: '#0d0e0c',
          letterSpacing: '-0.04em',
          borderRadius: 6,
        }}
      >
        b
      </div>
    ),
    { ...size },
  );
}
