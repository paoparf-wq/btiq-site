import { Tag } from '../Tag';

// Sección de partnership Tiendanube — bg2, card con glow lime en esquina sup-derecha,
// brand row + headline "30 días" en lime + 2x2 grid de capabilities.
// El cuadrado azul con "T" es placeholder hasta tener el badge oficial.

const CAPABILITIES = [
  { title: 'Setup completo', detail: 'Tema, productos, pagos, envíos' },
  { title: 'Integraciones', detail: 'Meta · Google · CRM' },
  { title: 'Migración', detail: 'Desde cualquier plataforma' },
  { title: 'Soporte continuo', detail: 'Mantenimiento + growth' },
] as const;

export function Partner() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-bg2 px-[18px] py-10 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-content">
        <Tag>Partnership oficial</Tag>

        <div className="relative mt-[18px] overflow-hidden rounded-card border border-line2 bg-surface px-[18px] py-[22px]">
          {/* Glow lime decorativo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[30px] -top-[30px] h-[140px] w-[140px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(212,255,58,0.13), transparent 70%)',
            }}
          />

          <div className="mb-[14px] flex items-center gap-2.5">
            <div
              aria-hidden="true"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-tiendanube font-sans text-[22px] font-bold text-white"
              style={{ letterSpacing: '-0.04em' }}
            >
              T
            </div>
            <div>
              <div
                className="font-sans text-base font-semibold text-ink"
                style={{ letterSpacing: '-0.02em' }}
              >
                Tiendanube
              </div>
              <div className="mt-[3px] font-mono text-[10px] tracking-mono text-lime">
                PARTNER OFICIAL · MÉXICO
              </div>
            </div>
          </div>

          <h3
            className="mt-2 font-sans text-2xl font-semibold leading-[1.05] text-ink"
            style={{ letterSpacing: '-0.025em' }}
          >
            Lanzamos tu tienda en{' '}
            <span className="text-lime">30 días</span>.
          </h3>
          <p className="mt-3 font-sans text-[13.5px] leading-[1.55] text-ink2">
            Como partners certificados, configuramos tu e-commerce de punta a
            punta: catálogo, pagos, envíos, integraciones con Meta y Google, y
            campañas listas para escalar.
          </p>

          <div className="mt-[18px] grid grid-cols-2 gap-2">
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="rounded-[10px] border border-line px-[11px] py-2.5"
                style={{ background: 'rgba(245,244,238,0.04)' }}
              >
                <div
                  className="font-sans text-[12.5px] font-medium text-ink"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {c.title}
                </div>
                <div
                  className="mt-[3px] font-mono text-[9.5px] text-muted"
                  style={{ letterSpacing: '0.02em' }}
                >
                  {c.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
