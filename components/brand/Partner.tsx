import Image from 'next/image';
import { AnimatedMark } from './AnimatedMark';

// Partnership Tiendanube. Grid 2 cols: izquierda label+H2+bullets, derecha
// placa clara con el logo oficial (fondo claro porque el logo es azul sobre
// blanco). Marcador amarillo animado en "30 días".

const CAPABILITIES = [
  { title: 'Setup completo', detail: 'Tema · productos · pagos · envíos' },
  { title: 'Integraciones', detail: 'Meta · Google · CRM' },
  { title: 'Migración', detail: 'Desde cualquier plataforma' },
  { title: 'Soporte continuo', detail: 'Mantenimiento + growth' },
];

export function Partner() {
  return (
    <section id="tiendanube" className="border-t border-borde py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto max-w-site px-gut">
        <div className="grid grid-cols-1 items-center gap-[clamp(28px,4vw,60px)] lg:grid-cols-[1.05fr_0.95fr]">
          {/* Izquierda */}
          <div>
            <div className="mono-label">Partner oficial · México</div>
            <h2 className="mt-5 mb-[18px] text-display-l">
              Lanzamos tu tienda en <AnimatedMark>30 días</AnimatedMark>.
            </h2>
            <p className="text-body-l text-texto-2">
              Como partners certificados, configuramos tu e-commerce de punta
              a punta: catálogo, pagos, envíos, integraciones con Meta y
              Google, y campañas listas para escalar.
            </p>

            <div className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-borde bg-borde">
              {CAPABILITIES.map((c) => (
                <div
                  key={c.title}
                  className="flex items-baseline justify-between gap-4 bg-surface-1 px-[18px] py-4"
                >
                  <b
                    className="font-display font-bold"
                    style={{ fontSize: '0.9375rem' }}
                  >
                    {c.title}
                  </b>
                  <span
                    className="text-right font-mono text-[10.5px] uppercase text-texto-3"
                    style={{ letterSpacing: '0.05em' }}
                  >
                    {c.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Derecha — placa clara */}
          <div className="overflow-hidden rounded-[14px] border border-borde bg-surface-1">
            <div
              className="grid place-items-center px-[clamp(28px,4vw,48px)] py-[clamp(38px,5vw,60px)]"
              style={{ background: '#f4f5f0' }}
            >
              <Image
                src="/tiendanube-partners.webp"
                alt="Tiendanube Partners"
                width={340}
                height={100}
                className="h-auto w-full max-w-[340px]"
                priority={false}
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-borde px-[18px] py-4">
              <b
                className="font-display font-bold"
                style={{ fontSize: '0.9375rem' }}
              >
                Partner certificado en México
              </b>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-texto-3">
                Verificado 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
