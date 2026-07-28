'use client';

import { useEffect, useRef, useState } from 'react';

// Marcador amarillo detrás de 1-3 palabras.
// El ::before arranca en scaleX(0) inclinado (skewX -9deg) y anima a
// scaleX(1) en .6s cuando el elemento entra en viewport (threshold .9,
// una sola vez). El texto de la palabra empieza en texto-1 y pasa a base
// con .3s de retraso .28s — crucial para que no haya un instante negro
// sobre negro. prefers-reduced-motion desactiva la animación.

export function AnimatedMark({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setOn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setOn(true);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.9 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`mk ${on ? 'on' : ''}`}>
      {children}
    </span>
  );
}
