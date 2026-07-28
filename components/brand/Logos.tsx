// Marquee infinito de wordmarks. La lista se duplica dentro de un .track
// de width:max-content que se desplaza -50% en 38s lineales. Contenedor con
// mask lineal para difuminar entrada/salida y pause en hover.

const LOGOS = ['SAMSUNG', 'AT&T', 'HYUNDAI', 'KIA', 'ALIAT UNIVERSIDADES'];

export function Logos() {
  return (
    <section>
      <div className="mx-auto max-w-site px-gut">
        <div className="mono-label">
          Donde nuestra fundadora ha liderado marketing
        </div>
        <div
          className="marquee overflow-hidden py-[clamp(30px,4vw,44px)]"
          style={{
            WebkitMaskImage:
              'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
            maskImage:
              'linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)',
          }}
        >
          <div className="track flex w-max animate-marquee gap-[clamp(28px,5vw,64px)]">
            {LOGOS.map((l) => (
              <span
                key={`a-${l}`}
                className="whitespace-nowrap font-mono font-medium text-texto-4"
                style={{
                  fontSize: 'clamp(12px, 1.4vw, 15px)',
                  letterSpacing: '0.14em',
                }}
              >
                {l}
              </span>
            ))}
            {/* Duplicado decorativo para el loop infinito */}
            {LOGOS.map((l) => (
              <span
                key={`b-${l}`}
                aria-hidden="true"
                className="whitespace-nowrap font-mono font-medium text-texto-4"
                style={{
                  fontSize: 'clamp(12px, 1.4vw, 15px)',
                  letterSpacing: '0.14em',
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
