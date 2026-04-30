import { clsx } from 'clsx';

// Wrapper de ancho de contenido — handoff aprobado solo en mobile (390px),
// pero en desktop se centra a max 640px sin reorganización compleja.
// Padding lateral progresivo: 18px mobile → 32px md → 40px lg.

export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer' | 'main';
}) {
  return (
    <Tag
      className={clsx(
        'mx-auto w-full max-w-content px-[18px] md:px-8 lg:px-10',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
