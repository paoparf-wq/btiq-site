// BTag reusable — pill mono uppercase con dot lime.
// Aparece en: Hero, Services, Partner, Process, Why, Founder, FAQ.

export function Tag({
  children,
  dot = true,
}: {
  children: React.ReactNode;
  dot?: boolean;
}) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-line2 px-[11px] py-[5px] font-mono text-[10.5px] uppercase tracking-mono text-lime"
      style={{ background: 'rgba(212,255,58,0.04)' }}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="lime-glow inline-block h-1.5 w-1.5 rounded-full bg-lime"
        />
      )}
      {children}
    </div>
  );
}
