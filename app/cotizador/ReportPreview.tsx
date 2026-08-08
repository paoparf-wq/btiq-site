// Muestra visual del reporte, para que se vea lo que se va a recibir.
// Copy simple, sin jerga. 3 tarjetas compactas.

export function ReportPreview() {
  return (
    <div>
      <div className="mb-5 text-center">
        <div className="mono-label">Así se ve tu reporte</div>
        <p
          className="mx-auto mt-2 max-w-[46ch] text-texto-2"
          style={{ fontSize: '14.5px', lineHeight: 1.5 }}
        >
          Al terminar las preguntas ves esto en pantalla, sin esperar.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <MockCard label="Ahorro al mes">
          <div
            className="font-display font-bold text-brand"
            style={{
              fontSize: '2.6rem',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            $7,700
          </div>
          <div
            className="mt-1 font-display text-texto-2"
            style={{ fontSize: '13px' }}
          >
            que hoy se te van
          </div>
        </MockCard>

        <MockCard label="Ahorro al año">
          <div
            className="font-display font-bold text-texto-1"
            style={{
              fontSize: '2.2rem',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            $92,400
          </div>
          <div
            className="mt-1 font-display text-texto-2"
            style={{ fontSize: '13px' }}
          >
            proyectado en 12 meses
          </div>
        </MockCard>

        <MockCard label="De dónde">
          <div className="space-y-2">
            <MockBar label="Comisiones" pct={82} color="#c14a4a" />
            <MockBar label="Apps" pct={54} color="#d6b45a" />
            <MockBar label="Envíos" pct={40} color="#d6b45a" />
          </div>
        </MockCard>
      </div>

      <p
        className="mt-4 text-center font-mono text-[10px] text-texto-4"
        style={{ letterSpacing: '0.04em' }}
      >
        Ejemplo — tus números salen de lo que contestes en las 6 preguntas.
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
    <div className="rounded-[12px] border border-borde bg-surface-1 p-4">
      <div
        className="mb-3 font-mono uppercase text-texto-3"
        style={{ fontSize: '10.5px', letterSpacing: '0.08em' }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function MockBar({
  label,
  pct,
  color,
}: {
  label: string;
  pct: number;
  color: string;
}) {
  return (
    <div>
      <div
        className="mb-1 font-display text-texto-2"
        style={{ fontSize: '12px' }}
      >
        {label}
      </div>
      <div className="h-[6px] w-full overflow-hidden rounded-full bg-borde">
        <div
          className="h-full"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}
