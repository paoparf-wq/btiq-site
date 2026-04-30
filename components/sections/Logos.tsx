// Strip de marcas donde Paola ha liderado.
// Por ahora es texto Geist 14/600 con opacity 0.7 (válido para v1 según handoff).
// Reemplazar por SVGs cuando estén disponibles.

const LOGOS = ['SAMSUNG', 'AT&T', 'HYUNDAI', 'KIA', 'ALIAT UNIVERSIDADES'];

export function Logos() {
  return (
    <section className="border-y border-line bg-bg2">
      <div className="mx-auto w-full max-w-content px-[18px] py-6 md:px-8 lg:px-10">
        <div className="mb-[14px] font-mono text-[10px] uppercase tracking-mono-widest text-muted">
          {'// marcas donde nuestra fundadora ha liderado'}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {LOGOS.map((l) => (
            <div
              key={l}
              className="font-sans text-sm font-semibold text-ink2 opacity-70"
              style={{ letterSpacing: '0.02em' }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
