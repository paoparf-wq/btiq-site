'use client';

// Cotizador — quiz de 5 pasos que calcula el ahorro operativo mensual
// estimado con base en comision de plataforma, apps overhead, comision por
// venta que el usuario reporta y costo promedio de envio.
//
// Flujo:
//   1. URL de la tienda -> API detect-platform + confirmar
//   2. Ventas mensuales (rango)
//   3. Costo promedio de envio por pedido (rango)
//   4. Comision total por venta que paga hoy (rango, o "no sé")
//   5. Nombre + email + WhatsApp -> POST Formspree + resultado LIVE
//
// Resultado se entrega EN PANTALLA al instante con desglose completo.
// No hay promesa de "reporte en 24h" — es reporte instantáneo.

import { useMemo, useState, type FormEvent } from 'react';
import { events } from '@/lib/analytics';

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

// Costos default por plataforma (comision % del GMV + apps mensuales MXN).
// Se usan cuando el usuario elige "No lo sé" en la comision.
const PLATFORM_COSTS: Record<Platform, { fee: number; apps: number }> = {
  shopify:     { fee: 0.020, apps: 1200 },
  wix:         { fee: 0.025, apps: 700 },
  vtex:        { fee: 0.020, apps: 2500 },
  magento:     { fee: 0.000, apps: 3000 },
  woocommerce: { fee: 0.000, apps: 900 },
  squarespace: { fee: 0.030, apps: 500 },
  bigcommerce: { fee: 0.015, apps: 900 },
  other:       { fee: 0.015, apps: 600 },
  tiendanube:  { fee: 0.000, apps: 400 },
};

const BASELINE_APPS = 400; // apps residuales en plataforma óptima
const AVG_TICKET = 600;    // ticket promedio MXN (para estimar # pedidos)
const SHIPPING_OPTIMIZATION = 0.15; // 15% ahorro por negociar volumen

const SALES_RANGES = [
  { value: 'r1', label: 'Menos de $50K MXN', gmv: 25_000 },
  { value: 'r2', label: '$50K – $150K MXN', gmv: 100_000 },
  { value: 'r3', label: '$150K – $500K MXN', gmv: 325_000 },
  { value: 'r4', label: '$500K – $1M MXN', gmv: 750_000 },
  { value: 'r5', label: 'Más de $1M MXN', gmv: 1_500_000 },
] as const;

const SHIPPING_RANGES = [
  { value: 's1', label: 'Menos de $60 MXN', cost: 50 },
  { value: 's2', label: '$60 – $100 MXN', cost: 80 },
  { value: 's3', label: '$100 – $150 MXN', cost: 125 },
  { value: 's4', label: '$150 – $200 MXN', cost: 175 },
  { value: 's5', label: 'Más de $200 MXN', cost: 220 },
  { value: 's0', label: 'Envío gratis / lo absorbo', cost: 0 },
] as const;

const CPT_RANGES = [
  { value: 'c1', label: 'Menos de 3% (solo gateway)', pct: 0.025 },
  { value: 'c2', label: '3% – 5%', pct: 0.04 },
  { value: 'c3', label: '5% – 7%', pct: 0.06 },
  { value: 'c4', label: '7% – 10%', pct: 0.085 },
  { value: 'c5', label: 'Más de 10%', pct: 0.12 },
  { value: 'c0', label: 'No lo sé — usa el default de mi plataforma', pct: -1 },
] as const;

function formatMXN(n: number) {
  return new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 }).format(n);
}

type Step = 1 | 2 | 3 | 4 | 5 | 6; // 6 = resultado

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export function CotizadorQuiz() {
  const [step, setStep] = useState<Step>(1);

  // Screen 1
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [platform, setPlatform] = useState<Platform | ''>('');
  const [detected, setDetected] = useState(false);

  // Screens 2/3/4
  const [rangeSales, setRangeSales] = useState('');
  const [rangeShipping, setRangeShipping] = useState('');
  const [rangeCpt, setRangeCpt] = useState('');

  // Screen 5
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [nombreErr, setNombreErr] = useState<string | null>(null);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [whatsappErr, setWhatsappErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);

  const report = useMemo(() => {
    if (!platform || !rangeSales || !rangeShipping || !rangeCpt) return null;
    const sales = SALES_RANGES.find((r) => r.value === rangeSales);
    const shipping = SHIPPING_RANGES.find((r) => r.value === rangeShipping);
    const cpt = CPT_RANGES.find((r) => r.value === rangeCpt);
    if (!sales || !shipping || !cpt) return null;

    const gmv = sales.gmv;
    const orders = Math.round(gmv / AVG_TICKET);
    const platformDefault = PLATFORM_COSTS[platform];

    // Comisión efectiva: si el user reportó (>=0) la tomamos; si no, el default de la plataforma.
    const effectiveFeePct = cpt.pct >= 0 ? cpt.pct : platformDefault.fee;
    const feeUsedSource: 'reported' | 'default' =
      cpt.pct >= 0 ? 'reported' : 'default';

    const currentFee = Math.round(gmv * effectiveFeePct);
    const currentApps = platformDefault.apps;
    const currentShipping = shipping.cost * orders;
    const currentTotal = currentFee + currentApps + currentShipping;

    // Baseline optimizado
    const baselineFee = 0;
    const baselineApps = BASELINE_APPS;
    const baselineShipping = Math.round(
      shipping.cost * orders * (1 - SHIPPING_OPTIMIZATION),
    );
    const baselineTotal = baselineFee + baselineApps + baselineShipping;

    const savingsFee = currentFee - baselineFee;
    const savingsApps = Math.max(0, currentApps - baselineApps);
    const savingsShipping = currentShipping - baselineShipping;
    const savingsMonthly = savingsFee + savingsApps + savingsShipping;
    const savingsAnnual = savingsMonthly * 12;

    // "Score" simple: cuánto de tu gasto es evitable
    const score = currentTotal > 0
      ? Math.round((savingsMonthly / currentTotal) * 100)
      : 0;

    return {
      gmv,
      orders,
      effectiveFeePct,
      feeUsedSource,
      currentFee,
      currentApps,
      currentShipping,
      currentTotal,
      baselineFee,
      baselineApps,
      baselineShipping,
      baselineTotal,
      savingsFee,
      savingsApps,
      savingsShipping,
      savingsMonthly,
      savingsAnnual,
      score,
    };
  }, [platform, rangeSales, rangeShipping, rangeCpt]);

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
    if (!ok || submitting || !report) return;

    setNetworkError(null);
    setSubmitting(true);

    const salesLbl = SALES_RANGES.find((r) => r.value === rangeSales)?.label;
    const shipLbl = SHIPPING_RANGES.find((r) => r.value === rangeShipping)?.label;
    const cptLbl = CPT_RANGES.find((r) => r.value === rangeCpt)?.label;

    const payload = {
      origen: 'cotizador',
      nombre: nombre.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      tienda_url: url.trim(),
      plataforma: PLATFORM_LABELS[platform as Platform],
      plataforma_detectada: detected ? 'sí' : 'no',
      rango_ventas: salesLbl ?? rangeSales,
      envio_promedio: shipLbl ?? rangeShipping,
      comision_reportada: cptLbl ?? rangeCpt,
      comision_fuente: report.feeUsedSource,
      costo_mensual_est: `$${formatMXN(report.currentTotal)} MXN`,
      ahorro_mensual_est: `$${formatMXN(report.savingsMonthly)} MXN`,
      ahorro_anual_est: `$${formatMXN(report.savingsAnnual)} MXN`,
      score_evitable: `${report.score}%`,
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
      setStep(6);
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
                    setDetected(false);
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
        <RangeScreen
          title="¿Cuánto vendes al mes?"
          hint="Un rango es suficiente. Usamos el punto medio para el cálculo."
          options={SALES_RANGES.map((r) => ({ value: r.value, label: r.label }))}
          value={rangeSales}
          onChange={setRangeSales}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <RangeScreen
          title="¿Cuánto cuesta en promedio cada envío?"
          hint="El costo por pedido — lo que le pagas a la paquetería (DHL, Estafeta, etc.)."
          options={SHIPPING_RANGES.map((r) => ({ value: r.value, label: r.label }))}
          value={rangeShipping}
          onChange={setRangeShipping}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <RangeScreen
          title="¿Qué comisión total pagas por cada venta?"
          hint="Suma comisión de plataforma + gateway + apps. Si no sabes, selecciona la última opción."
          options={CPT_RANGES.map((r) => ({ value: r.value, label: r.label }))}
          value={rangeCpt}
          onChange={setRangeCpt}
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        />
      )}

      {step === 5 && (
        <Screen title="Ver mi reporte">
          <p className="mt-3 text-body-l text-texto-2">
            Te lo mostramos en pantalla al momento. También lo guardamos y te
            escribimos para ayudarte a ejecutar lo que veas.
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
              <SecondaryButton onClick={() => setStep(4)} type="button">
                ← Atrás
              </SecondaryButton>
              <PrimaryButton loading={submitting} type="submit">
                {submitting ? 'Calculando…' : 'Ver mi reporte →'}
              </PrimaryButton>
            </div>
          </form>
        </Screen>
      )}

      {step === 6 && report && (
        <LiveReport
          nombre={nombre.trim().split(' ')[0] ?? ''}
          platform={platform as Platform}
          report={report}
          rangeSalesLabel={
            SALES_RANGES.find((r) => r.value === rangeSales)?.label ?? ''
          }
        />
      )}
    </div>
  );
}

// ─── Building blocks ────────────────────────────────────

function ProgressBar({ step }: { step: Step }) {
  const total = 5;
  const cur = Math.min(step, total);
  const pct = (cur / total) * 100;
  return (
    <div className="mb-10">
      <div className="mb-2 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] text-texto-3">
        <span>Paso {cur} de {total}</span>
        <span>{step === 6 ? 'Reporte listo' : `${Math.round(pct)}%`}</span>
      </div>
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-borde">
        <div
          className="h-full bg-brand transition-all duration-500 ease-brand"
          style={{
            width: step === 6 ? '100%' : `${pct}%`,
            boxShadow:
              '0 0 12px color-mix(in oklab, var(--brand) 40%, transparent)',
          }}
        />
      </div>
    </div>
  );
}

function Screen({ title, children }: { title: string; children: React.ReactNode }) {
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

function RangeScreen({
  title,
  hint,
  options,
  value,
  onChange,
  onBack,
  onNext,
}: {
  title: string;
  hint: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <Screen title={title}>
      <p className="mt-3 text-body-l text-texto-2">{hint}</p>
      <div className="mt-8 flex flex-col gap-2.5">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-[12px] border px-5 py-4 text-left font-display text-[15px] transition-all duration-200 ${
              value === o.value
                ? 'border-brand bg-surface-2 text-texto-1'
                : 'border-borde bg-surface-1 text-texto-2 hover:border-texto-4 hover:text-texto-1'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <SecondaryButton onClick={onBack}>← Atrás</SecondaryButton>
        <PrimaryButton onClick={onNext} disabled={!value}>
          Continuar →
        </PrimaryButton>
      </div>
    </Screen>
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

// ─── Live report ────────────────────────────────────────

type ReportData = {
  gmv: number;
  orders: number;
  effectiveFeePct: number;
  feeUsedSource: 'reported' | 'default';
  currentFee: number;
  currentApps: number;
  currentShipping: number;
  currentTotal: number;
  baselineTotal: number;
  savingsFee: number;
  savingsApps: number;
  savingsShipping: number;
  savingsMonthly: number;
  savingsAnnual: number;
  score: number;
};

function LiveReport({
  nombre,
  platform,
  report,
  rangeSalesLabel,
}: {
  nombre: string;
  platform: Platform;
  report: ReportData;
  rangeSalesLabel: string;
}) {
  const maxCost = Math.max(
    report.currentFee,
    report.currentApps,
    report.currentShipping,
    1,
  );

  return (
    <div className="rounded-[14px] border border-borde bg-surface-1 p-[clamp(28px,4vw,44px)]">
      {/* Header del reporte */}
      <div className="mono-label">
        Reporte de {nombre} · {PLATFORM_LABELS[platform]} · {rangeSalesLabel}
      </div>

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
          ${formatMXN(report.savingsMonthly)} MXN
        </span>{' '}
        al mes.
      </h2>
      <p className="mt-3 text-body-l text-texto-2">
        Score de gasto evitable: <b className="text-texto-1">{report.score}%</b>{' '}
        · {report.orders.toLocaleString('es-MX')} pedidos/mes estimados.
      </p>

      {/* Barras horizontales por rubro */}
      <div className="mt-8 space-y-4">
        <CostBar
          label="Comisión por venta"
          value={report.currentFee}
          max={maxCost}
          note={
            report.feeUsedSource === 'reported'
              ? `${(report.effectiveFeePct * 100).toFixed(1)}% reportado`
              : `${(report.effectiveFeePct * 100).toFixed(1)}% default plataforma`
          }
          severity="high"
        />
        <CostBar
          label="Apps + integraciones"
          value={report.currentApps}
          max={maxCost}
          note={`${PLATFORM_LABELS[platform]} promedio`}
          severity="mid"
        />
        <CostBar
          label="Envíos"
          value={report.currentShipping}
          max={maxCost}
          note={`${report.orders.toLocaleString('es-MX')} pedidos × costo`}
          severity="mid"
        />
      </div>

      {/* Totales */}
      <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-borde bg-borde md:grid-cols-3">
        <TotalCell
          label="Gasto operativo actual"
          value={`$${formatMXN(report.currentTotal)}`}
          sub="por mes [est.]"
        />
        <TotalCell
          label="Ahorro mensual proyectado"
          value={`+$${formatMXN(report.savingsMonthly)}`}
          sub="con la plataforma correcta"
          highlight
        />
        <TotalCell
          label="Ahorro anual"
          value={`+$${formatMXN(report.savingsAnnual)}`}
          sub="12 × ahorro mensual"
        />
      </div>

      {/* CTA */}
      <div className="mt-8">
        <a
          href={`https://wa.me/525537344652?text=${encodeURIComponent(
            `Hola Paola, hice el cotizador. Estoy en ${PLATFORM_LABELS[platform]} vendiendo ${rangeSalesLabel}. El reporte me da un ahorro estimado de $${formatMXN(report.savingsMonthly)}/mes (${report.score}% evitable). Quiero agendar la llamada.`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => events.whatsappClick('thankyou')}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-[6px] bg-brand px-[22px] py-4 font-mono text-[12px] uppercase tracking-[0.08em] text-base transition-all ease-brand duration-[220ms] hover:-translate-y-0.5 hover:shadow-brand-hover"
        >
          Quiero ahorrar esto — agenda una llamada <span aria-hidden="true">→</span>
        </a>
        <p
          className="mt-3 text-center font-mono text-[10.5px] text-texto-4"
          style={{ letterSpacing: '0.05em' }}
        >
          Sin tarjeta, sin compromiso. Reporte generado con datos que
          reportaste — cifras estimadas.
        </p>
      </div>
    </div>
  );
}

function CostBar({
  label,
  value,
  max,
  note,
  severity,
}: {
  label: string;
  value: number;
  max: number;
  note: string;
  severity: 'high' | 'mid' | 'low';
}) {
  const pct = Math.min(100, (value / max) * 100);
  const color =
    severity === 'high' ? '#c14a4a' : severity === 'mid' ? '#d6b45a' : 'var(--brand)';
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span
          className="font-mono text-[10.5px] uppercase text-texto-3"
          style={{ letterSpacing: '0.07em' }}
        >
          {label}
        </span>
        <span
          className="font-display font-bold text-texto-1"
          style={{ fontSize: '1rem' }}
        >
          ${formatMXN(value)}
        </span>
      </div>
      <div className="relative h-[6px] w-full overflow-hidden rounded-full bg-borde">
        <div
          className="h-full transition-all duration-700 ease-brand"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <div
        className="mt-1 font-mono text-[10px] text-texto-4"
        style={{ letterSpacing: '0.04em' }}
      >
        {note}
      </div>
    </div>
  );
}

function TotalCell({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`bg-surface-1 p-5 ${highlight ? 'bg-surface-2' : ''}`}
    >
      <div
        className="mono-label"
        style={{ color: highlight ? 'var(--brand)' : 'var(--texto-3)' }}
      >
        {label}
      </div>
      <div
        className={`mt-2 font-display font-bold ${
          highlight ? 'text-brand' : 'text-texto-1'
        }`}
        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.03em' }}
      >
        {value}
      </div>
      <div className="mt-1 text-[12px] text-texto-2">{sub}</div>
    </div>
  );
}
