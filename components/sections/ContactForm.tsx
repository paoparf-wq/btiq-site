'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { events } from '@/lib/analytics';
import { tokens } from '@/lib/tokens';

// Sección final — bg lime, dark text. Replica el form del handoff
// (direction-b.jsx) y lo conecta a Formspree vía fetch JSON.
//
// - Validaciones reproducen las del JSX original (regex iguales).
// - Errores se muestran solo después del primer blur o intento de submit.
// - Loading: 900ms simulados para suavizar la UX (según handoff).
// - Éxito: estado reemplaza el form; se dispara form_submit en GA4.
// - Error de red: mensaje rojo arriba del botón.

const SERVICE_OPTIONS = [
  { id: 'PERF', label: 'Performance Marketing' },
  { id: 'WEB', label: 'Web & Tiendas en línea' },
  { id: 'EVT', label: 'Eventos Corporativos' },
] as const;

type ServiceCode = (typeof SERVICE_OPTIONS)[number]['id'];

type FormState = {
  nombre: string;
  email: string;
  empresa: string;
  telefono: string;
  servicios: ServiceCode[];
};

type FieldKey = keyof FormState;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TEL_RE = /^[\d\s+()-]{8,}$/;

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

// Delay artificial para que la respuesta no se sienta seca aunque Formspree
// responda en <100ms. Definido en el handoff.
const SUBMIT_MIN_MS = 900;

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    nombre: '',
    email: '',
    empresa: '',
    telefono: '',
    servicios: [],
  });
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);

  const errors = useMemo(() => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (!form.nombre.trim()) e.nombre = 'Requerido';
    else if (form.nombre.trim().length < 2) e.nombre = 'Muy corto';

    if (!form.email.trim()) e.email = 'Requerido';
    else if (!EMAIL_RE.test(form.email.trim())) e.email = 'Formato inválido';

    if (!form.empresa.trim()) e.empresa = 'Requerido';

    if (form.telefono.trim() && !TEL_RE.test(form.telefono.trim())) {
      e.telefono = 'Formato inválido';
    }

    if (form.servicios.length === 0) e.servicios = 'Elige al menos uno';
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  function update<K extends FieldKey>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function blur(key: FieldKey) {
    setTouched((t) => ({ ...t, [key]: true }));
  }

  function toggleService(id: ServiceCode) {
    setForm((f) => {
      const has = f.servicios.includes(id);
      return {
        ...f,
        servicios: has
          ? f.servicios.filter((x) => x !== id)
          : [...f.servicios, id],
      };
    });
    setTouched((t) => ({ ...t, servicios: true }));
    events.serviceSelect(id);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({
      nombre: true,
      email: true,
      empresa: true,
      telefono: true,
      servicios: true,
    });
    if (!isValid || submitting) return;

    setNetworkError(null);
    setSubmitting(true);

    // Servicios como string separado por comas — más legible en el email.
    const payload = {
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      empresa: form.empresa.trim(),
      telefono: form.telefono.trim(),
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

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      events.formSubmit();
      setSubmitted(true);
    } catch {
      setNetworkError(
        'Hubo un error. Intenta de nuevo o escríbenos a paola@btiq.mx',
      );
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setSubmitted(false);
    setForm({
      nombre: '',
      email: '',
      empresa: '',
      telefono: '',
      servicios: [],
    });
    setTouched({});
    setNetworkError(null);
  }

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-lime px-[18px] pb-11 pt-10 text-bg md:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-content">
        {submitted ? (
          <SuccessState
            firstName={form.nombre.trim().split(' ')[0] ?? ''}
            email={form.email.trim()}
            onReset={reset}
          />
        ) : (
          <FormView
            form={form}
            errors={errors}
            touched={touched}
            submitting={submitting}
            networkError={networkError}
            onUpdate={update}
            onBlur={blur}
            onToggleService={toggleService}
            onSubmit={handleSubmit}
          />
        )}

        <ContactStrip />
      </div>
    </section>
  );
}

// ───── Subcomponentes ─────────────────────────────────────────────

function FormView({
  form,
  errors,
  touched,
  submitting,
  networkError,
  onUpdate,
  onBlur,
  onToggleService,
  onSubmit,
}: {
  form: FormState;
  errors: Partial<Record<FieldKey, string>>;
  touched: Partial<Record<FieldKey, boolean>>;
  submitting: boolean;
  networkError: string | null;
  onUpdate: <K extends FieldKey>(k: K, v: FormState[K]) => void;
  onBlur: (k: FieldKey) => void;
  onToggleService: (id: ServiceCode) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <>
      <div
        className="font-mono text-[10.5px] uppercase tracking-mono-widest"
        style={{ color: 'rgba(13,14,12,0.6)' }}
      >
        {'// next step'}
      </div>
      <h2
        className="mt-3.5 font-sans font-semibold text-bg"
        style={{
          fontSize: '42px',
          lineHeight: 0.95,
          letterSpacing: '-0.04em',
        }}
      >
        Hablemos
        <br />
        de tu próximo
        <br />
        trimestre.
      </h2>
      <p
        className="mt-4 max-w-[320px] font-sans text-[14px] leading-[1.55]"
        style={{ color: 'rgba(13,14,12,0.75)' }}
      >
        Respuesta en menos de 24 horas con un diagnóstico inicial gratuito.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-3.5">
        <Field
          label="Nombre"
          htmlFor="f-nombre"
          error={errors.nombre}
          touched={touched.nombre}
        >
          <input
            id="f-nombre"
            type="text"
            value={form.nombre}
            onChange={(e) => onUpdate('nombre', e.target.value)}
            onBlur={() => onBlur('nombre')}
            placeholder="Paola Parra"
            className={inputClass(Boolean(errors.nombre && touched.nombre))}
          />
        </Field>

        <Field
          label="Email"
          htmlFor="f-email"
          error={errors.email}
          touched={touched.email}
        >
          <input
            id="f-email"
            type="email"
            value={form.email}
            onChange={(e) => onUpdate('email', e.target.value)}
            onBlur={() => onBlur('email')}
            placeholder="paola@empresa.mx"
            className={inputClass(Boolean(errors.email && touched.email))}
            inputMode="email"
            autoComplete="email"
          />
        </Field>

        <Field
          label="Empresa"
          htmlFor="f-empresa"
          error={errors.empresa}
          touched={touched.empresa}
        >
          <input
            id="f-empresa"
            type="text"
            value={form.empresa}
            onChange={(e) => onUpdate('empresa', e.target.value)}
            onBlur={() => onBlur('empresa')}
            placeholder="Nombre de tu marca"
            className={inputClass(Boolean(errors.empresa && touched.empresa))}
          />
        </Field>

        <Field
          label="Teléfono / WhatsApp"
          htmlFor="f-telefono"
          error={errors.telefono}
          touched={touched.telefono}
          optional
        >
          <input
            id="f-telefono"
            type="tel"
            value={form.telefono}
            onChange={(e) => onUpdate('telefono', e.target.value)}
            onBlur={() => onBlur('telefono')}
            placeholder="+52 55 0000 0000"
            className={inputClass(Boolean(errors.telefono && touched.telefono))}
            inputMode="tel"
            autoComplete="tel"
          />
        </Field>

        <Field
          label="Servicios de interés"
          error={errors.servicios}
          touched={touched.servicios}
        >
          <div
            role="group"
            aria-label="Servicios de interés"
            className="mt-0.5 flex flex-col gap-2"
          >
            {SERVICE_OPTIONS.map((s) => {
              const on = form.servicios.includes(s.id);
              return (
                <button
                  type="button"
                  key={s.id}
                  role="checkbox"
                  aria-checked={on}
                  onClick={() => onToggleService(s.id)}
                  className="flex items-center gap-3 rounded-[10px] px-3.5 py-3 text-left font-sans text-[13.5px] font-medium transition-colors"
                  style={{
                    background: on
                      ? tokens.colors.bg
                      : 'rgba(13,14,12,0.06)',
                    border: on
                      ? `1.5px solid ${tokens.colors.bg}`
                      : '1.5px solid rgba(13,14,12,0.12)',
                    color: on ? tokens.colors.lime : tokens.colors.bg,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-[5px] text-xs font-bold"
                    style={{
                      background: on ? tokens.colors.lime : 'transparent',
                      border: on
                        ? 'none'
                        : '1.5px solid rgba(13,14,12,0.3)',
                      color: tokens.colors.bg,
                    }}
                  >
                    {on ? '✓' : ''}
                  </span>
                  <span
                    className="rounded-chip px-1.5 py-0.5 font-mono text-[9.5px] tracking-mono-wide"
                    style={{
                      color: on
                        ? tokens.colors.lime
                        : 'rgba(13,14,12,0.5)',
                      border: on
                        ? `1px solid ${tokens.colors.lime}`
                        : '1px solid rgba(13,14,12,0.2)',
                    }}
                  >
                    {s.id}
                  </span>
                  <span className="flex-1">{s.label}</span>
                </button>
              );
            })}
          </div>
        </Field>

        {networkError && (
          <div
            role="alert"
            className="rounded-[10px] px-3.5 py-2.5 font-sans text-[12.5px] font-medium"
            style={{
              background: 'rgba(122,24,24,0.08)',
              border: '1.5px solid rgba(122,24,24,0.4)',
              color: '#7a1818',
            }}
          >
            {networkError}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="mt-2 flex items-center justify-between rounded-xl px-[22px] py-[17px] font-sans text-[14.5px] font-semibold text-lime"
          style={{
            background: submitting
              ? 'rgba(13,14,12,0.6)'
              : tokens.colors.bg,
            cursor: submitting ? 'wait' : 'pointer',
            letterSpacing: '-0.01em',
          }}
        >
          <span>{submitting ? 'Enviando…' : 'Enviar mensaje'}</span>
          <span aria-hidden="true">{submitting ? '○' : '→'}</span>
        </button>

        <div
          className="mt-1 text-center font-mono text-[10px] leading-[1.55]"
          style={{
            color: 'rgba(13,14,12,0.6)',
            letterSpacing: '0.02em',
          }}
        >
          Al enviar aceptas nuestro{' '}
          <a href="/aviso-de-privacidad" className="underline">
            aviso de privacidad
          </a>
          .
        </div>
      </form>
    </>
  );
}

function SuccessState({
  firstName,
  email,
  onReset,
}: {
  firstName: string;
  email: string;
  onReset: () => void;
}) {
  return (
    <div role="status" aria-live="polite">
      <div
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-bg text-[28px] text-lime"
      >
        ✓
      </div>
      <h2
        className="mt-5 font-sans font-semibold text-bg"
        style={{
          fontSize: '38px',
          lineHeight: 0.98,
          letterSpacing: '-0.035em',
        }}
      >
        Gracias, {firstName}.
      </h2>
      <p
        className="mt-3.5 max-w-[320px] font-sans text-[14.5px] leading-[1.55]"
        style={{ color: 'rgba(13,14,12,0.78)' }}
      >
        Recibimos tu mensaje. Paola te contacta en menos de 24 horas con un
        diagnóstico inicial.
      </p>
      <div
        className="mt-6 flex flex-col gap-1 rounded-xl px-4 py-3.5 font-mono text-[11.5px] leading-[1.6]"
        style={{
          background: 'rgba(13,14,12,0.08)',
          color: 'rgba(13,14,12,0.8)',
        }}
      >
        <div>→ Confirmación enviada a {email}</div>
        <div>→ Próximo paso: agendar 30 min</div>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 cursor-pointer border-none bg-transparent p-0 font-sans text-[13px] font-medium text-bg underline"
      >
        Enviar otro mensaje
      </button>
    </div>
  );
}

function ContactStrip() {
  function handleWhatsappClick() {
    events.whatsappClick();
  }

  return (
    <div
      className="mt-7 flex flex-col gap-1.5 border-t pt-[18px] font-mono text-[11px]"
      style={{
        borderColor: 'rgba(13,14,12,0.18)',
        color: 'rgba(13,14,12,0.7)',
      }}
    >
      <a href={`mailto:${tokens.contact.email}`} className="hover:underline">
        → {tokens.contact.email}
      </a>
      <a
        href={tokens.contact.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsappClick}
        className="hover:underline"
      >
        → WhatsApp directo · {tokens.contact.whatsapp}
      </a>
      <span>→ {tokens.contact.location}</span>
    </div>
  );
}

// ───── Field helpers ──────────────────────────────────────────────

function Field({
  label,
  htmlFor,
  error,
  touched,
  optional,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  touched?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  const showErr = Boolean(error && touched);
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5">
      <span
        className="flex items-baseline justify-between font-mono text-[9.5px] uppercase"
        style={{
          color: showErr ? '#7a1818' : 'rgba(13,14,12,0.65)',
          letterSpacing: '0.12em',
        }}
      >
        <span>
          {label}
          {optional && (
            <span
              className="ml-1.5 normal-case opacity-60"
              style={{ letterSpacing: 0 }}
            >
              (opcional)
            </span>
          )}
        </span>
        {showErr && (
          <span className="normal-case text-[10px]" style={{ letterSpacing: 0 }}>
            {error}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function inputClass(showErr: boolean | undefined) {
  // Tokens locked in handoff: bg rgba(13,14,12,0.06), 1.5px border, radius 10,
  // padding 13×14. Color on dark bg (#0d0e0c).
  return [
    'w-full rounded-[10px] px-3.5 py-[13px] font-sans text-[14px] font-medium text-bg outline-none transition-colors',
    'placeholder:text-[rgba(13,14,12,0.4)]',
    showErr
      ? 'border-[1.5px] border-[#7a1818] bg-[rgba(13,14,12,0.06)]'
      : 'border-[1.5px] border-[rgba(13,14,12,0.12)] bg-[rgba(13,14,12,0.06)] focus:border-bg',
  ].join(' ');
}
