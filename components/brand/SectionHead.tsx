// Cabecera de sección reutilizable. Patrón usado en Servicios, Proceso,
// Nosotros y FAQ: número en mono a la izquierda, título display-l, hairline
// inferior. Extra opcional a la derecha (ej. "90 días" en Proceso).

export function SectionHead({
  number,
  title,
  extra,
}: {
  number: string;
  title: React.ReactNode;
  extra?: React.ReactNode;
}) {
  return (
    <div className="mb-[clamp(34px,5vw,62px)] flex items-baseline gap-5 border-b border-borde pb-[22px]">
      <span className="font-mono text-[11px] tracking-[0.08em] text-texto-4">
        {number}
      </span>
      <h2 className="text-display-l">{title}</h2>
      {extra && (
        <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3">
          {extra}
        </span>
      )}
    </div>
  );
}
