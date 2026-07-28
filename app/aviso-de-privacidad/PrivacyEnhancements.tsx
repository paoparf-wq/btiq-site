'use client';

import { useEffect } from 'react';

// Client-side enhancements para la página de privacidad:
// 1. Barra de progreso de lectura bajo el nav (scroll → width)
// 2. Parallax de la marca de agua "PRIVACIDAD" (transform vs scroll)
// 3. Reveal por sección (fade+slide al entrar en viewport)
// 4. Scroll-spy del índice: marca la sección activa con barra amarilla
// Todo respeta prefers-reduced-motion.

export function PrivacyEnhancements({ sectionIds }: { sectionIds: string[] }) {
  useEffect(() => {
    const prog = document.getElementById('privacy-prog');
    const wmk = document.getElementById('privacy-wmk');
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;

    function onScroll() {
      const doc = document.documentElement;
      const h = doc.scrollHeight - window.innerHeight;
      if (prog) {
        prog.style.width = (h > 0 ? Math.min(1, window.scrollY / h) : 0) * 100 + '%';
      }
      if (!rm && wmk) {
        wmk.style.transform = `translateY(${-window.scrollY * 0.16}px)`;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Reveal por sección
    const sections = document.querySelectorAll<HTMLElement>(
      '[data-privacy-section]',
    );
    if (rm) {
      sections.forEach((s) => s.classList.add('in'));
    } else {
      const reveal = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) e.target.classList.add('in');
          }
        },
        { threshold: 0.08 },
      );
      sections.forEach((s) => reveal.observe(s));
    }

    // Scroll-spy: marca el link activo en el índice
    const links = document.querySelectorAll<HTMLAnchorElement>(
      '.privacy-toc-link',
    );
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = e.target.id;
            links.forEach((l) => {
              const isOn = l.dataset.target === id;
              l.classList.toggle('text-texto-1', isOn);
              l.classList.toggle('text-texto-2', !isOn);
              const bar = l.parentElement?.querySelector<HTMLElement>(
                '.privacy-toc-bar',
              );
              if (bar) {
                bar.style.transform = `translateY(-50%) scaleY(${isOn ? 1 : 0})`;
              }
            });
          }
        }
      },
      { rootMargin: '-18% 0px -68% 0px' },
    );
    sections.forEach((s) => spy.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [sectionIds]);

  return null;
}
