'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { events } from '@/lib/analytics';
import { tokens } from '@/lib/tokens';

// Contacto — sección final. Grid 2 columnas: canales a la izquierda,
// formulario a la derecha. Glow radial del brand al 12% en la esquina
// superior izquierda. POST a Formspree con origen: "home"; al éxito dispara
// formSubmit + adsLeadConversion (Google Ads) y REDIRIGE a /gracias.

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TEL_RE = /^[\d\s+()-]{8,}$/;
const SUBMIT_MIN_MS = 900;

const SERVICES = [
  { id: 'PERF', label: 'PERF · Performance' },
  { id: 'WEB', label: 'WEB · E-commerce' },
  { id: 'EVT', label: 'EVT · Eventos' },
] as const;

type ServiceCode = (typeof SERVICES)[number]['id'];

type FormState = {
  nombre: string;
  email: string;
  empresa: string;
  whatsapp: string;
  mensaje: string;
  servicios: ServiceCode[];
};

type FieldKey = keyof Omit<FormState, 'servicios'>;

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export function ContactForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    nombre: '',
    email: '',
    empresa: '',
    whatsapp: '',
    mensaje: '',
    servicios: ['PERF'], // PERF preseleccionado según handoff
  });
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);

  const errors = useMemo(() => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (!form.nombre.trim()) e.nombre = 'Requerido';
    else if (form.nombre.trim().length < 2) e.nombre = 'Muy corto';
    if (!form.email.trim()) e.email = 'Requerido';
    else if (!EMAIL_RE.test(form.email.trim())) e.email = 'Formato inválido';
    if (form.whatsapp.trim() && !TEL_RE.test(form.whatsapp.trim())) {
      e.whatsapp = 'Formato inválido';
    }
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  function update<K extends FieldKey>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }
  function blur(k: FieldKey) {
    setTouched((t) => ({ ...t, [k]: true }));
  }
  function toggleService(id: ServiceCode) {
    setForm((f) => ({
      ...f,
      servicios: f.servicios.includes(id)
        ? f.servicios.filter((s) => s !== id)
        : [...f.servicios, id],
    }));
    events.serviceSelect(id);
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ nombre: true, email: true, empresa: true, whatsapp: true, mensaje: true });
    if (!isValid || submitting) return;

    setNetworkError(null);
    setSubmitting(true);

    const payload = {
      origen: 'home',
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      empresa: form.empresa.trim(),
      whatsapp: form.whatsapp.trim(),
      mensaje: form.mensaje.trim(),
      servicios: form.servicios.join(', '),
    };

    try {
      const [response] = await Promise.all([
        fetch(FORMSPREE_ENDPOINT ?? '', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        }),
        delay(SUBMIT_MIN_MS),
      ]);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      events.formSubmit();
      events.adsLeadConversion();
      // Redirigir a /gracias. router.push preserva estado de conversion
      // (los gtag events ya se dispararon arriba). No reseteamos submitting
      // porque la navegación desmonta el componente.
      router.push('/gracias');
    } catch {
      setNetworkError(
        'Hubo un error. Intenta de nuevo o escríbenos a paola@btiq.mx',
      );
      setSubmitting(false);
    }
  }

  function handleWhatsappClick() {
    events.whatsappClick();
  }

  return (
    <section
      id="contacto"
      className="relative overflow-hidden border-t border-borde py-[clamp(72px,10vw,140px)]"
    >
      {/* Glow radial esquina superior izquierda */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-[120%]"
        style={{
          inset: '-30% 30% auto -10%',
          background:
            'radial-gradient(46% 52% at 40% 40%, var(--glow), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-site px-gut">
        <div className="grid grid-cols-1 items-start gap-[clamp(30px,5vw,72px)] lg:grid-cols-2">
          {/* Izquierda — info y canales */}
          <div>
            <div className="mono-label">Contacto</div>
            <h2 className="mt-[18px] text-display-l">
              Hablemos de tu próximo trimestre.
            </h2>
            <p className="mt-5 max-w-[40ch] text-body-l text-texto-2">
              Respuesta en menos de 24 horas, con un diagnóstico inicial
              gratuito.
            </p>

            <div className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-borde bg-borde">
              <a
                href={`mailto:${tokens.contact.email}`}
                className="flex items-center justify-between gap-4 bg-surface-1 px-[18px] py-[15px] text-texto-1 transition-colors hover:bg-surface-2"
                style={{ fontSize: '0.9375rem' }}
              >
                <span>{tokens.contact.email}</span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.07em] text-texto-3">
                  Email
                </span>
              </a>
              <a
                href={tokens.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsappClick}
                className="flex items-center justify-between gap-4 bg-surface-1 px-[18px] py-[15px] text-texto-1 transition-colors hover:bg-surface-2"
                style={{ fontSize: '0.9375rem' }}
              >
                <span>{tokens.contact.whatsapp}</span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.07em] text-texto-3">
                  WhatsApp
                </span>
              </a>
              <div
                className="flex items-center justify-between gap-4 bg-surface-1 px-[18px] py-[15px]"
                style={{ fontSize: '0.9375rem' }}
              >
                <span>{tokens.contact.location}</span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.07em] text-texto-3">
                  Oficina
                </span>
              </div>
            </div>
          </div>

          {/* Derecha — formulario. Al enviar exitosamente redirige a /gracias. */}
          <form
              onSubmit={submit}
              noValidate
              className="rounded-[14px] border border-borde bg-surface-1 p-[clamp(24px,3vw,34px)]"
            >
              <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
                <Field
                  id="c-nombre"
                  label="Nombre"
                  error={errors.nombre}
                  touched={touched.nombre}
                >
                  <input
                    id="c-nombre"
                    type="text"
                    value={form.nombre}
                    onChange={(e) => update('nombre', e.target.value)}
                    onBlur={() => blur('nombre')}
                    placeholder="Tu nombre"
                    className={inputClass(Boolean(errors.nombre && touched.nombre))}
                    required
                  />
                </Field>
                <Field
                  id="c-email"
                  label="Email"
                  error={errors.email}
                  touched={touched.email}
                >
                  <input
                    id="c-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    onBlur={() => blur('email')}
                    placeholder="tu@empresa.mx"
                    className={inputClass(Boolean(errors.email && touched.email))}
                    autoComplete="email"
                    required
                  />
                </Field>
              </div>

              <div className="mt-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
                <Field id="c-empresa" label="Empresa">
                  <input
                    id="c-empresa"
                    type="text"
                    value={form.empresa}
                    onChange={(e) => update('empresa', e.target.value)}
                    placeholder="Nombre de la marca"
                    className={inputClass(false)}
                  />
                </Field>
                <Field
                  id="c-whatsapp"
                  label="WhatsApp"
                  optional
                  error={errors.whatsapp}
                  touched={touched.whatsapp}
                >
                  <input
                    id="c-whatsapp"
                    type="tel"
                    value={form.whatsapp}
                    onChange={(e) => update('whatsapp', e.target.value)}
                    onBlur={() => blur('whatsapp')}
                    placeholder="+52"
                    className={inputClass(
                      Boolean(errors.whatsapp && touched.whatsapp),
                    )}
                    autoComplete="tel"
                  />
                </Field>
              </div>

              <fieldset className="mt-3.5">
                <legend className="mb-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3">
                  Servicios de interés
                </legend>
                <div className="flex flex-wrap gap-2" role="group">
                  {SERVICES.map((s) => {
                    const on = form.servicios.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        onClick={() => toggleService(s.id)}
                        className={`cursor-pointer rounded-[6px] border px-3 py-2.5 font-mono text-[10.5px] uppercase transition-all duration-200 ${
                          on
                            ? 'border-texto-4 bg-surface-2 text-texto-1'
                            : 'border-borde bg-transparent text-texto-3 hover:text-texto-1'
                        }`}
                        style={{ letterSpacing: '0.07em' }}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <Field id="c-mensaje" label="Mensaje" className="mt-3.5">
                <textarea
                  id="c-mensaje"
                  value={form.mensaje}
                  onChange={(e) => update('mensaje', e.target.value)}
                  rows={3}
                  placeholder="Presupuesto de medios actual, canales y a dónde quieres llegar."
                  className={`${inputClass(false)} resize-y`}
                />
              </Field>

              {networkError && (
                <div
                  role="alert"
                  className="mt-3.5 rounded-[7px] border border-[#7a1818]/60 bg-[#7a1818]/10 px-3.5 py-2.5 font-mono text-[11px] text-[#ff6a6a]"
                >
                  {networkError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-[6px] bg-brand px-[18px] py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-base transition-all ease-brand duration-[220ms] hover:-translate-y-0.5 hover:shadow-brand-hover disabled:cursor-wait disabled:opacity-70"
              >
                {submitting ? 'Enviando…' : 'Enviar mensaje'}
              </button>

              <p
                className="mt-3.5 text-center font-mono text-[10px] text-texto-4"
                style={{ letterSpacing: '0.05em' }}
              >
                Al enviar aceptas el{' '}
                <a
                  href="/aviso-de-privacidad"
                  className="underline transition-colors hover:text-texto-3"
                >
                  aviso de privacidad
                </a>
              </p>
            </form>
        </div>
      </div>
    </section>
  );
}

// ─── Helpers ───────────────────────────────────

function Field({
  id,
  label,
  children,
  optional,
  error,
  touched,
  className,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  optional?: boolean;
  error?: string;
  touched?: boolean;
  className?: string;
}) {
  const showErr = Boolean(error && touched);
  return (
    <label htmlFor={id} className={`block ${className ?? ''}`}>
      <span
        className="mb-2 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.08em]"
        style={{ color: showErr ? '#ff6a6a' : 'var(--texto-3)' }}
      >
        <span>
          {label}
          {optional && (
            <em
              className="ml-2 not-italic text-texto-4"
              style={{ letterSpacing: 0, textTransform: 'none' }}
            >
              (opcional)
            </em>
          )}
        </span>
        {showErr && (
          <span
            className="text-[10px] normal-case"
            style={{ letterSpacing: 0 }}
          >
            {error}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function inputClass(showErr: boolean) {
  return [
    'w-full rounded-[7px] px-3.5 py-3 font-display font-medium text-texto-1 outline-none transition-colors',
    'bg-base placeholder:text-texto-4',
    showErr
      ? 'border border-[#7a1818]'
      : 'border border-borde focus:border-texto-4',
  ].join(' ');
}

// SuccessCard eliminado — ahora redirigimos a /gracias en vez de mostrar
// success inline. Ver router.push en submit().
