// Mockup visual del reporte, para mostrar bajo el quiz qué se recibe.
// Todo es HTML/CSS estilizado (no imágenes) — mismo lenguaje visual que el
// reporte real que aparece al terminar el quiz. Da dinamismo a la página
// sin cargar assets extra.

export function ReportPreview() {
  return (
    <div>
      <div className="mb-8 text-center">
        <div className="mono-label">Muestra del reporte</div>
        <h3
          className="mt-3 font-display font-bold text-texto-1"
          style={{
            fontSize: 'clamp(1.5rem, 3.4vw, 2.2rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
          }}
        >
          Esto es lo que ves al terminar.
        </h3>
        <p
          className="mx-auto mt-3 max-w-[48ch] text-texto-2"
          style={{ fontSize: '0.9375rem', lineHeight: 1.55 }}
        >
          Sin esperas ni promesas de 24 horas — tu ahorro estimado en
          pantalla, al instante.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Card 1 — Score */}
        <MockCard label="01 · Score de ahorro">
          <div className="flex items-baseline gap-3">
            <div
              className="font-display font-bold text-brand"
              style={{ fontSize: '3.4rem', lineHeight: 1, letterSpacing: '-0.04em' }}
            >
              62%
            </div>
            <div
              className="font-mono text-[10px] uppercase text-texto-3"
              style={{ letterSpacing: '0.07em' }}
            >
              de tu gasto<br />es evitable
            </div>
          </div>
          <div className="mt-4 h-[6px] w-full overflow-hidden rounded-full bg-borde">
            <div
              className="h-full bg-brand"
              style={{
                width: '62%',
                boxShadow: '0 0 10px color-mix(in oklab, var(--brand) 40%, transparent)',
              }}
            />
          </div>
        </MockCard>

        {/* Card 2 — Breakdown */}
        <MockCard label="02 · Dónde se va tu dinero">
          <div className="space-y-2.5">
            <MockBar label="Comisión" pct={82} color="#c14a4a" amount="$6,500" />
            <MockBar label="Apps" pct={54} color="#d6b45a" amount="$1,200" />
            <MockBar label="Envíos" pct={40} color="#d6b45a" amount="$3,200" />
          </div>
        </MockCard>

        {/* Card 3 — Ahorro */}
        <MockCard label="03 · Ahorro proyectado">
          <div className="font-mono text-[9.5px] uppercase text-texto-3" style={{ letterSpacing: '0.07em' }}>
            Mensual
          </div>
          <div
            className="mt-1 font-display font-bold text-brand"
            style={{ fontSize: '2.2rem', lineHeight: 1, letterSpacing: '-0.03em' }}
          >
            +$7,700
          </div>
          <div className="mt-4 border-t border-borde pt-4">
            <div className="font-mono text-[9.5px] uppercase text-texto-3" style={{ letterSpacing: '0.07em' }}>
              Anual
            </div>
            <div
              className="mt-1 font-display font-bold text-texto-1"
              style={{ fontSize: '1.6rem', lineHeight: 1, letterSpacing: '-0.02em' }}
            >
              +$92,400
            </div>
          </div>
        </MockCard>
      </div>

      <p
        className="mt-6 text-center font-mono text-[10px] text-texto-4"
        style={{ letterSpacing: '0.05em' }}
      >
        Cifras del ejemplo — tu reporte usa los datos que reportes.
      </p>
    </div>
  );
}

function MockCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[14px] border border-borde bg-surface-1 p-5">
      <div className="mono-label mb-4">{label}</div>
      {children}
    </div>
  );
}

function MockBar({
  label,
  pct,
  color,
  amount,
}: {
  label: string;
  pct: number;
  color: string;
  amount: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span
          className="font-mono text-[9.5px] uppercase text-texto-3"
          style={{ letterSpacing: '0.07em' }}
        >
          {label}
        </span>
        <span
          className="font-display font-bold text-texto-1"
          style={{ fontSize: '0.8125rem' }}
        >
          {amount}
        </span>
      </div>
      <div className="h-[5px] w-full overflow-hidden rounded-full bg-borde">
        <div
          className="h-full"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}
