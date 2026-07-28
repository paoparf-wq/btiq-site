'use client';

import { useEffect, useRef, useState } from 'react';

// Wrapper para reveal por sección: la sección entra opacity:0 + translateY(18px)
// y pasa a opacity:1 + translateY(0) cuando entra en viewport (threshold .06,
// una sola vez). prefers-reduced-motion desactiva el efecto.

export function SectionReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-brand ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[18px]'
      }`}
      style={{ transitionProperty: 'opacity, transform' }}
    >
      {children}
    </div>
  );
}
