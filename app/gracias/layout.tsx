import type { Metadata } from 'next';

// /gracias — noindex, confirmación post-formulario.

export const metadata: Metadata = {
  title: 'Gracias | btiq digital',
  description: 'Mensaje recibido. Te escribimos hoy con un diagnóstico inicial.',
  robots: { index: false, follow: false },
};

export default function GraciasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
