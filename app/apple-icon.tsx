import { ImageResponse } from 'next/og';

// Apple touch icon — usado cuando el usuario añade btiq.mx a su home screen
// en iOS / iPadOS. Mantenemos la misma identidad: cuadrado lime con "b".

export const runtime = 'edge';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#d4ff3a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 140,
          fontWeight: 700,
          color: '#0d0e0c',
          letterSpacing: '-0.04em',
        }}
      >
        b
      </div>
    ),
    { ...size },
  );
}
