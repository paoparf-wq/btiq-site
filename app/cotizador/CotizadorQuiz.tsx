'use client';

// Cotizador — quiz interactivo de 3 pasos que calcula el ahorro mensual
// estimado de la tienda del prospecto. No menciona a Tiendanube (aunque el
// baseline oculto para el cálculo del "ahorro" corresponde a una plataforma
// con 0% de comisión y bajo overhead de apps). La propuesta específica se
// hace en la llamada.
//
// Flow:
//   1. URL de la tienda → API detect-platform + confirmar/cambiar
//   2. Rango de ventas mensuales
//   3. Nombre + Email + WhatsApp (opcional) → POST Formspree + resultado
//
// Al llegar al resultado dispara events.formSubmit + events.adsLeadConversion.

import { useMemo, useState, type FormEvent } from 'react';
import { events } from '@/lib/analytics';
import { tokens } from '@/lib/tokens';

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TEL_RE = /^[\d\s+()-]{8,}$/;
const URL_RE = /^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+/i;

type Platform =
  | 'shopify'
  | 'woocommerce'
  | 'wix'
  | 'vtex'
  | 'magento'
  | 'tiendanube'
  | 'squarespace'
  | 'bigcommerce'
  | 'other';

// Etiquetas para el select de "cambiar plataforma". Tiendanube incluido
// para transparencia — si el prospecto ya la usa, el ahorro será chico
// (baseline), y honestamente no le mentimos.
const PLATFORM_LABELS: Record<Platform, string> = {
  shopify: 'Shopify',
  woocommerce: 'WooCommerce',
  wix: 'Wix',
  vtex: 'VTEX',
  magento: 'Magento',
  squarespace: 'Squarespace',
  bigcommerce: 'BigCommerce',
  tiendanube: 'Tiendanube',
  other: 'Otra / tienda propia',
};

// Costos aproximados por plataforma — comisión (% del GMV) y overhead
// mensual de apps/plugins en MXN. Números redondos, honestos, del handoff.
// Baseline (para calcular ahorro): plataforma con 0% comisión + apps
// nativas → ~$400/mes de overhead residual.
const PLATFORM_COSTS: Record<Platform, { fee: number; apps: number }> = {
  shopify:      { fee: 0.020, apps: 1200 },
  wix:          { fee: 0.025, apps: 700 },
  vtex:         { fee: 0.020, apps: 2500 },
  magento:      { fee: 0.000, apps: 3000 },
  woocommerce:  { fee: 0.000, apps: 900 },
  squarespace:  { fee: 0.030, apps: 500 },
  bigcommerce:  { fee: 0.015, apps: 900 },
  other:        { fee: 0.015, apps: 600 },
  tiendanube:   { fee: 0.000, apps: 400 }, // baseline: bajo overhead
};

const BASELINE_APPS = 400; // apps residuales de la plataforma "óptima"

const SALES_RANGES = [
  { value: 'r1', label: 'Menos de $50K MXN', gmv: 25_000 },
  { value: 'r2', label: '$50K – $150K MXN', gmv: 100_000 },
  { value: 'r3', label: '$150K – $500K MXN', gmv: 325_000 },
  { value: 'r4', label: '$500K – $1M MXN', gmv: 750_000 },
  { value: 'r5', label: 'Más de $1M MXN', gmv: 1_500_000 },
] as const;

function formatMXN(n: number) {
  return new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 }).format(n);
}

type Step = 1 | 2 | 3 | 4; // 4 = resultado

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export function CotizadorQuiz() {
  const [step, setStep] = useState<Step>(1);

  // Screen 1 — URL + plataforma
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [platform, setPlatform] = useState<Platform | ''>('');
  const [detected, setDetected] = useState(false); // true = fue auto-detectado

  // Screen 2 — ventas
  const [range, setRange] = useState<string>('');

  // Screen 3 — datos + submit
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [nombreErr, setNombreErr] = useState<string | null>(null);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [whatsappErr, setWhatsappErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);

  // Cálculo del ahorro (solo válido si tenemos platform + range)
  const savings = useMemo(() => {
    if (!platform || !range) return null;
    const r = SALES_RANGES.find((x) => x.value === range);
    if (!r) return null;
    const gmv = r.gmv;
    const cost = PLATFORM_COSTS[platform];
    const currentFee = Math.round(gmv * cost.fee);
    const currentApps = cost.apps;
    const currentTotal = currentFee + currentApps;
    // El "objetivo" es reducir a baseline (0% comisión + $400 apps)
    const targetTotal = BASELINE_APPS;
    const monthlySavings = Math.max(0, currentTotal - targetTotal);
    const annualSavings = monthlySavings * 12;
    return { gmv, currentFee, currentApps, currentTotal, monthlySavings, annualSavings };
  }, [platform, range]);

  async function handleUrlNext() {
    const raw = url.trim();
    if (!URL_RE.test(raw)) {
      setUrlError('Escribe una URL válida (ej: mimarca.com)');
      return;
    }
    setUrlError(null);
    setDetecting(true);
    try {
      const res = await fetch('/api/detect-platform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: raw }),
      });
      const data: { platform: Platform } = await res.json();
      setPlatform(data.platform);
      setDetected(data.platform !== 'other');
    } catch {
      setPlatform('other');
      setDetected(false);
    } finally {
      setDetecting(false);
    }
  }

  async function handleFinalSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let ok = true;
    if (!nombre.trim() || nombre.trim().length < 2) {
      setNombreErr('Requerido');
      ok = false;
    } else setNombreErr(null);
    if (!EMAIL_RE.test(email.trim())) {
      setEmailErr('Email inválido');
      ok = false;
    } else setEmailErr(null);
    if (whatsapp.trim() && !TEL_RE.test(whatsapp.trim())) {
      setWhatsappErr('Formato inválido');
      ok = false;
    } else setWhatsappErr(null);
    if (!ok || submitting || !platform || !range || !savings) return;

    setNetworkError(null);
    setSubmitting(true);

    const rangeLabel =
      SALES_RANGES.find((r) => r.value === range)?.label ?? range;

    const payload = {
      origen: 'cotizador',
      nombre: nombre.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      tienda_url: url.trim(),
      plataforma: PLATFORM_LABELS[platform],
      plataforma_detectada: detected ? 'sí' : 'no',
      rango_ventas: rangeLabel,
      ahorro_mensual_est: `$${formatMXN(savings.monthlySavings)} MXN`,
      ahorro_anual_est: `$${formatMXN(savings.annualSavings)} MXN`,
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
        delay(600),
      ]);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      events.formSubmit();
      events.adsLeadConversion();
      setStep(4);
    } catch {
      setNetworkError(
        'Hubo un error. Intenta de nuevo o escríbenos a paola@btiq.mx',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[640px]">
      <ProgressBar step={step} />

      {step === 1 && (
        <Screen title="¿Cuál es tu tienda online?">
          <p className="mt-3 text-body-l text-texto-2">
            Empezamos por ahí para calcular tu ahorro potencial.
          </p>
          <div className="mt-8 space-y-4">
            <QuizField label="URL de tu tienda" error={urlError}>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleUrlNext();
                  }
                }}
                placeholder="mimarca.com"
                autoFocus
                className={inputClass(!!urlError)}
                inputMode="url"
              />
            </QuizField>

            {platform && (
              <QuizField
                label={
                  detected
                    ? '✓ Detectamos que estás en:'
                    : 'No pudimos detectar automáticamente. ¿Qué usas?'
                }
              >
                <select
                  value={platform}
                  onChange={(e) => {
                    setPlatform(e.target.value as Platform);
                    setDetected(false); // ya no es auto-detect si la cambia
                  }}
                  className={inputClass(false)}
                >
                  {Object.entries(PLATFORM_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
              </QuizField>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            {!platform ? (
              <PrimaryButton onClick={handleUrlNext} loading={detecting}>
                {detecting ? 'Analizando…' : 'Continuar →'}
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={() => setStep(2)}>
                Continuar →
              </PrimaryButton>
            )}
          </div>
        </Screen>
      )}

      {step === 2 && (
        <Screen title="¿Cuánto vendes al mes?">
          <p className="mt-3 text-body-l text-texto-2">
            Un rango es suficiente. Usamos el punto medio para el cálculo.
          </p>
          <div className="mt-8 flex flex-col gap-2.5">
            {SALES_RANGES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRange(r.value)}
                className={`rounded-[12px] border px-5 py-4 text-left font-display text-[15px] transition-all duration-200 ${
                  range === r.value
                    ? 'border-brand bg-surface-2 text-texto-1'
                    : 'border-borde bg-surface-1 text-texto-2 hover:border-texto-4 hover:text-texto-1'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <SecondaryButton onClick={() => setStep(1)}>← Atrás</SecondaryButton>
            <PrimaryButton
              onClick={() => range && setStep(3)}
              disabled={!range}
            >
              Continuar →
            </PrimaryButton>
          </div>
        </Screen>
      )}

      {step === 3 && (
        <Screen title="Tus datos para enviarte el diagnóstico">
          <p className="mt-3 text-body-l text-texto-2">
            Te lo compartimos por email en menos de 24 horas.
          </p>
          <form onSubmit={handleFinalSubmit} noValidate className="mt-8 space-y-4">
            <QuizField label="Nombre" error={nombreErr}>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                autoFocus
                className={inputClass(!!nombreErr)}
              />
            </QuizField>
            <QuizField label="Email" error={emailErr}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.mx"
                className={inputClass(!!emailErr)}
                autoComplete="email"
              />
            </QuizField>
            <QuizField label="WhatsApp (opcional)" error={whatsappErr}>
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="+52"
                className={inputClass(!!whatsappErr)}
                autoComplete="tel"
              />
            </QuizField>

            {networkError && (
              <div
                role="alert"
                className="rounded-[7px] border border-[#7a1818]/60 bg-[#7a1818]/10 px-3.5 py-2.5 font-mono text-[11px] text-[#ff6a6a]"
              >
                {networkError}
              </div>
            )}

            <div className="flex justify-between pt-2">
              <SecondaryButton
                onClick={() => setStep(2)}
                type="button"
              >
                ← Atrás
              </SecondaryButton>
              <PrimaryButton loading={submitting} type="submit">
                {submitting ? 'Calculando…' : 'Ver mi ahorro →'}
              </PrimaryButton>
            </div>
          </form>
        </Screen>
      )}

      {step === 4 && savings && (
        <div className="rounded-[14px] border border-borde bg-surface-1 p-[clamp(28px,4vw,44px)]">
          <div className="mono-label">Diagnóstico · {PLATFORM_LABELS[platform as Platform]}</div>

          <h2
            className="mt-4 font-display font-bold text-texto-1"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.4rem)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            Estás perdiendo{' '}
            <span
              className="text-brand"
              style={{
                background:
                  'linear-gradient(180deg, transparent 65%, rgba(237,224,74,0.18) 65%)',
              }}
            >
              ${formatMXN(savings.monthlySavings)} MXN
            </span>{' '}
            al mes.
          </h2>
          <p className="mt-4 text-body-l text-texto-2">
            Con la plataforma correcta y menos apps externas, ese gasto se
            puede eliminar casi por completo.
          </p>

          {/* Breakdown honesto */}
          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-borde bg-borde">
            <BreakdownRow
              label="Comisión de plataforma [est.]"
              value={`$${formatMXN(savings.currentFee)}`}
              severity="high"
            />
            <BreakdownRow
              label="Apps + integraciones [est.]"
              value={`$${formatMXN(savings.currentApps)}`}
              severity="mid"
            />
            <BreakdownRow
              label="Ahorro anual proyectado"
              value={`+$${formatMXN(savings.annualSavings)}`}
              severity="win"
              highlight
            />
          </div>

          <div className="mt-8">
            <a
              href={`https://wa.me/525537344652?text=${encodeURIComponent(
                `Hola Paola, hice el cotizador. Estoy en ${PLATFORM_LABELS[platform as Platform]} vendiendo ${SALES_RANGES.find((r) => r.value === range)?.label}. Me da un ahorro estimado de $${formatMXN(savings.monthlySavings)}/mes. Quiero agendar la llamada.`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => events.whatsappClick('thankyou')}
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-[6px] bg-brand px-[22px] py-4 font-mono text-[12px] uppercase tracking-[0.08em] text-base transition-all ease-brand duration-[220ms] hover:-translate-y-0.5 hover:shadow-brand-hover"
            >
              Agenda una llamada gratis <span aria-hidden="true">→</span>
            </a>
            <p
              className="mt-3 text-center font-mono text-[10.5px] text-texto-4"
              style={{ letterSpacing: '0.05em' }}
            >
              Sin tarjeta, sin compromiso. Diagnóstico completo en 24h a{' '}
              {email}.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Building blocks ────────────────────────────────────

function ProgressBar({ step }: { step: Step }) {
  const total = 3;
  const cur = Math.min(step, total);
  const pct = (cur / total) * 100;
  return (
    <div className="mb-10">
      <div className="mb-2 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] text-texto-3">
        <span>Paso {cur} de {total}</span>
        <span>{step === 4 ? 'Diagnóstico listo' : `${Math.round(pct)}%`}</span>
      </div>
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-borde">
        <div
          className="h-full bg-brand transition-all duration-500 ease-brand"
          style={{
            width: step === 4 ? '100%' : `${pct}%`,
            boxShadow:
              '0 0 12px color-mix(in oklab, var(--brand) 40%, transparent)',
          }}
        />
      </div>
    </div>
  );
}

function Screen({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[14px] border border-borde bg-surface-1 p-[clamp(28px,4vw,44px)]">
      <h2
        className="font-display font-bold text-texto-1"
        style={{
          fontSize: 'clamp(1.75rem, 4vw, 2.6rem)',
          lineHeight: 1.02,
          letterSpacing: '-0.025em',
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function QuizField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | null;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="mb-2 flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.08em]"
        style={{ color: error ? '#ff6a6a' : 'var(--texto-3)' }}
      >
        <span>{label}</span>
        {error && (
          <span className="text-[10px] normal-case" style={{ letterSpacing: 0 }}>
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

function PrimaryButton({
  children,
  onClick,
  loading,
  disabled,
  type = 'button',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      className="inline-flex items-center gap-2.5 rounded-[6px] bg-brand px-[22px] py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-base transition-all ease-brand duration-[220ms] hover:-translate-y-0.5 hover:shadow-brand-hover disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
  type = 'button',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center gap-2.5 rounded-[6px] border border-borde bg-transparent px-[18px] py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3 transition-colors duration-[220ms] hover:border-texto-4 hover:text-texto-1"
    >
      {children}
    </button>
  );
}

function BreakdownRow({
  label,
  value,
  severity,
  highlight,
}: {
  label: string;
  value: string;
  severity: 'high' | 'mid' | 'win';
  highlight?: boolean;
}) {
  const dotColor =
    severity === 'high'
      ? '#c14a4a'
      : severity === 'mid'
        ? '#d6b45a'
        : 'var(--brand)';
  return (
    <div
      className={`flex items-center justify-between gap-4 bg-surface-1 px-5 py-4 ${
        highlight ? 'bg-surface-2' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="block h-[9px] w-[9px] rounded-full"
          style={{ background: dotColor }}
        />
        <span
          className="font-mono text-[10.5px] uppercase text-texto-3"
          style={{ letterSpacing: '0.07em' }}
        >
          {label}
        </span>
      </div>
      <span
        className={`font-display font-bold ${
          severity === 'win' ? 'text-brand' : 'text-texto-1'
        }`}
        style={{ fontSize: '1.125rem', letterSpacing: '-0.02em' }}
      >
        {value}
      </span>
    </div>
  );
}
