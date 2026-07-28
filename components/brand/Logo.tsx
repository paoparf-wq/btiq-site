// Logo del nuevo home (Nómina × Marcador). Cuadrado 24×24 texto-1
// (blanco crema) con "b" en base (dark). "btiq" en peso 700, "/digital" en
// texto-3 peso 500. Renderizado como <div> (no <a>) para permitir que se
// envuelva en <Link> desde el caller sin nested anchors.

export function Logo() {
  return (
    <div
      className="flex items-center gap-[9px] font-display text-[17px] font-bold text-texto-1"
      style={{ letterSpacing: '-0.02em' }}
    >
      <i
        aria-hidden="true"
        className="grid h-6 w-6 place-items-center rounded-[5px] bg-texto-1 text-[14px] font-bold not-italic leading-none text-base"
      >
        b
      </i>
      <span>
        btiq
        <span className="font-medium text-texto-3">/digital</span>
      </span>
    </div>
  );
}
