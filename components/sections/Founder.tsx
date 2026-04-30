import Image from 'next/image';
import { Tag } from '../Tag';
import { tokens } from '@/lib/tokens';

// Founder — bg2, avatar circular 72px con la foto de Paola.
// Pull quote con frase clave en lime + card link a LinkedIn.

export function Founder() {
  return (
    <section className="border-t border-line bg-bg2 px-[18px] py-12 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-content">
        <Tag>Fundadora</Tag>

        <div className="mt-[18px] flex items-center gap-3.5">
          <div className="relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-full ring-1 ring-line2">
            <Image
              src="/founder.jpg"
              alt="Paola Parra, fundadora de btiq digital"
              fill
              sizes="72px"
              className="object-cover"
              priority={false}
            />
          </div>
          <div>
            <div
              className="font-sans text-xl font-semibold text-ink"
              style={{ letterSpacing: '-0.02em' }}
            >
              Paola Parra
            </div>
            <div
              className="mt-1 font-mono text-[10.5px] text-muted"
              style={{ letterSpacing: '0.05em' }}
            >
              Digital Marketing Director
            </div>
            <div
              className="mt-0.5 font-mono text-[10.5px] text-lime"
              style={{ letterSpacing: '0.05em' }}
            >
              15+ años · ES/EN · LatAm
            </div>
          </div>
        </div>

        <p className="mt-5 font-sans text-sm leading-[1.6] text-ink2">
          &ldquo;Las marcas medianas merecen la{' '}
          <span className="text-lime">misma calidad estratégica</span> que las
          globales — con la agilidad que las grandes ya no ofrecen.&rdquo;
        </p>

        <a
          href={tokens.contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center justify-between rounded-[10px] border border-line2 bg-surface px-3.5 py-2.5 transition-colors hover:bg-bg2"
        >
          <span className="font-sans text-[12.5px] text-ink2">
            Ver perfil en LinkedIn
          </span>
          <span
            aria-hidden="true"
            className="text-sm text-lime"
          >
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}
