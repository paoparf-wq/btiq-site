'use client';

// Cotizador — quiz de 6 pasos con lenguaje coloquial y fórmula oficial
// del kit del Programa de Partners de Tiendanube.
//
// Costos que se calculan (todo mensualizado -> anualizado ×12):
//   plan   = plan mensual de la plataforma
//   pas    = comisión pasarela % × GMV + cargo fijo × pedidos
//   cpt    = comisión de la plataforma % × GMV (además del plan)
//   log    = costo envío × pedidos
//   otras  = apps y herramientas externas al mes
//
// Baseline Tiendanube: plan con descuento 25%, comisión Pago Nube 2.99% +
// $3 fijo, envío $130 por pedido con Envío Nube, apps $0 (incluidas), cpt 0.
//
// Los rangos que el user elige son las 3 entradas de la fórmula:
//   - GMV mensual (rango)
//   - Ticket promedio -> deriva # pedidos
//   - Costo envío por pedido (rango)
//   - % comisión que reporta (o "no sé" -> default de la plataforma)

import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from 'react';
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
  | 'prestashop'
  | 'jumpseller'
  | 'ecwid'
  | 'salesforce'
  | 'propia'
  | 'other';

const PLATFORM_LABELS: Record<Platform, string> = {
  shopify: 'Shopify',
  woocommerce: 'WooCommerce',
  wix: 'Wix',
  vtex: 'VTEX',
  magento: 'Magento / Adobe',
  squarespace: 'Squarespace',
  bigcommerce: 'BigCommerce',
  prestashop: 'PrestaShop',
  jumpseller: 'Jumpseller',
  ecwid: 'Ecwid',
  salesforce: 'Salesforce Commerce',
  tiendanube: 'Tiendanube',
  propia: 'Desarrollo propio',
  other: 'Otra plataforma',
};

// Tarifas oficiales del kit del Programa de Partners MX. plan/otras en
// MXN/mes; com y cpt en % del GMV; fijo en MXN por pedido; envio en MXN.
type Rates = {
  plan: number;
  com: number;
  fijo: number;
  cpt: number;
  envio: number;
  otras: number;
};

const PLATFORM_RATES: Record<Platform, Rates> = {
  shopify:     { plan: 1690,  com: 3.48, fijo: 4, cpt: 0.5, envio: 160, otras: 1105 },
  vtex:        { plan: 9500,  com: 3.20, fijo: 4, cpt: 1.9, envio: 160, otras: 1500 },
  woocommerce: { plan: 900,   com: 3.60, fijo: 4, cpt: 0.0, envio: 160, otras: 1800 },
  wix:         { plan: 1200,  com: 3.40, fijo: 4, cpt: 0.0, envio: 160, otras: 1100 },
  magento:     { plan: 12000, com: 3.30, fijo: 4, cpt: 0.0, envio: 160, otras: 2000 },
  squarespace: { plan: 900,   com: 3.30, fijo: 4, cpt: 0.0, envio: 160, otras: 800 },
  bigcommerce: { plan: 1200,  com: 3.30, fijo: 4, cpt: 0.0, envio: 160, otras: 900 },
  prestashop:  { plan: 1500,  com: 3.60, fijo: 4, cpt: 0.0, envio: 160, otras: 1200 },
  jumpseller:  { plan: 900,   com: 3.50, fijo: 4, cpt: 0.5, envio: 160, otras: 900 },
  ecwid:       { plan: 900,   com: 3.50, fijo: 4, cpt: 0.0, envio: 160, otras: 900 },
  salesforce:  { plan: 15000, com: 3.30, fijo: 4, cpt: 0.5, envio: 160, otras: 2500 },
  propia:      { plan: 8000,  com: 3.50, fijo: 4, cpt: 0.0, envio: 160, otras: 1500 },
  other:       { plan: 1690,  com: 3.48, fijo: 4, cpt: 0.5, envio: 160, otras: 1105 },
  tiendanube:  { plan: 3499 * 0.75, com: 2.99, fijo: 3, cpt: 0, envio: 130, otras: 0 },
};

// Baseline oficial Tiendanube (plan con 25% de descuento aplicado arriba).
const TN_RATES = PLATFORM_RATES.tiendanube;

// Rangos de # pedidos al mes. Preguntamos esto (no cuánto vende) porque
// la gente comparte pedidos con menos fricción que revenue. GMV se deriva:
// gmv = orders × ticket_promedio.
const ORDERS_RANGES = [
  { value: 'o1', label: 'Menos de 30 pedidos', orders: 15 },
  { value: 'o2', label: '30 – 100 pedidos', orders: 65 },
  { value: 'o3', label: '100 – 300 pedidos', orders: 200 },
  { value: 'o4', label: '300 – 800 pedidos', orders: 550 },
  { value: 'o5', label: '800 – 2,000 pedidos', orders: 1400 },
  { value: 'o6', label: 'Más de 2,000 pedidos', orders: 3000 },
] as const;

const TICKET_RANGES = [
  { value: 't1', label: 'Menos de $300', avg: 200 },
  { value: 't2', label: '$300 – $500', avg: 400 },
  { value: 't3', label: '$500 – $1,000', avg: 750 },
  { value: 't4', label: '$1,000 – $2,000', avg: 1500 },
  { value: 't5', label: 'Más de $2,000', avg: 3000 },
] as const;

const SHIPPING_RANGES = [
  { value: 's0', label: 'Envío gratis (lo absorbo yo)', cost: 0 },
  { value: 's1', label: 'Menos de $60', cost: 50 },
  { value: 's2', label: '$60 – $100', cost: 80 },
  { value: 's3', label: '$100 – $150', cost: 125 },
  { value: 's4', label: '$150 – $200', cost: 175 },
  { value: 's5', label: 'Más de $200', cost: 220 },
] as const;

const CPT_RANGES = [
  { value: 'c1', label: 'Casi nada, menos del 3%', pct: 2.5 },
  { value: 'c2', label: 'Entre 3% y 5%', pct: 4 },
  { value: 'c3', label: 'Entre 5% y 7%', pct: 6 },
  { value: 'c4', label: 'Entre 7% y 10%', pct: 8.5 },
  { value: 'c5', label: 'Más del 10%', pct: 12 },
  { value: 'c0', label: 'No estoy segur@', pct: -1 },
] as const;

function formatMXN(n: number) {
  return new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 }).format(
    Math.round(n),
  );
}

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7; // 7 = reporte

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

// Captura UTMs del querystring una vez al montar el componente.
type Utm = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

function useUtm(): Utm {
  const [utm, setUtm] = useState<Utm>({});
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search);
    const captured: Utm = {};
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const) {
      const v = p.get(key);
      if (v) captured[key] = v.slice(0, 120);
    }
    setUtm(captured);
  }, []);
  return utm;
}

export function CotizadorQuiz() {
  const utm = useUtm();
  const [step, setStep] = useState<Step>(1);

  // Screen 1
  const [url, setUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [platform, setPlatform] = useState<Platform | ''>('');
  const [detected, setDetected] = useState(false);

  // Screens 2-5
  const [rangeOrders, setRangeOrders] = useState('');
  const [rangeTicket, setRangeTicket] = useState('');
  const [rangeShipping, setRangeShipping] = useState('');
  const [rangeCpt, setRangeCpt] = useState('');

  // Screen 6
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [nombreErr, setNombreErr] = useState<string | null>(null);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [whatsappErr, setWhatsappErr] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);

  const report = useMemo(() => {
    if (
      !platform ||
      !rangeOrders ||
      !rangeTicket ||
      !rangeShipping ||
      !rangeCpt
    )
      return null;
    const ordersRange = ORDERS_RANGES.find((r) => r.value === rangeOrders);
    const ticket = TICKET_RANGES.find((r) => r.value === rangeTicket);
    const shipping = SHIPPING_RANGES.find((r) => r.value === rangeShipping);
    const cpt = CPT_RANGES.find((r) => r.value === rangeCpt);
    if (!ordersRange || !ticket || !shipping || !cpt) return null;

    // Ahora orders es reportado; GMV se deriva.
    const orders = ordersRange.orders;
    const gmv = orders * ticket.avg;

    // Tarifas de la plataforma que reporta
    const p = PLATFORM_RATES[platform];

    // Fee efectivo: si reportó su %, lo usamos; si no, el default plataforma
    const cptReportedPct = cpt.pct >= 0 ? cpt.pct : p.com + p.cpt;
    const feeUsedSource: 'reported' | 'default' =
      cpt.pct >= 0 ? 'reported' : 'default';

    // Modelo: si reportó su %, asumimos que es LA suma total (com + cpt);
    // si no, usamos default separado como en el kit.
    // Costo mensual "hoy" (12 = anual)
    const hoyPlan = p.plan;
    const hoyPas =
      cpt.pct >= 0
        ? (gmv * (cptReportedPct / 100)) + (orders * p.fijo) // total reportado
        : (gmv * (p.com / 100)) + (orders * p.fijo);
    const hoyCpt = cpt.pct >= 0 ? 0 : gmv * (p.cpt / 100);
    const hoyEnvio = shipping.cost * orders;
    const hoyOtras = p.otras;
    const hoyMes = hoyPlan + hoyPas + hoyCpt + hoyEnvio + hoyOtras;
    const hoyAnio = hoyMes * 12;

    // Baseline Tiendanube (mes)
    const tn = TN_RATES;
    // Envío TN: usa el mejor entre lo que reporta y el precio TN
    const tnEnvioPorPedido = Math.min(shipping.cost || tn.envio, tn.envio);
    const tnPlan = tn.plan;
    const tnPas = gmv * (tn.com / 100) + orders * tn.fijo;
    const tnEnvio = tnEnvioPorPedido * orders;
    const tnOtras = tn.otras;
    const tnMes = tnPlan + tnPas + tnEnvio + tnOtras;
    const tnAnio = tnMes * 12;

    const ahorroMes = Math.max(0, hoyMes - tnMes);
    const ahorroAnio = ahorroMes * 12;

    const score = hoyMes > 0 ? Math.round((ahorroMes / hoyMes) * 100) : 0;
    const isAlreadyOptimal = platform === 'tiendanube';

    return {
      gmv,
      orders,
      ticketAvg: ticket.avg,
      cptReportedPct,
      feeUsedSource,
      // Rubros mensuales del "hoy" para el desglose visual
      hoyPlan,
      hoyPas,
      hoyCpt,
      hoyEnvio,
      hoyOtras,
      hoyMes,
      hoyAnio,
      tnMes,
      tnAnio,
      ahorroMes,
      ahorroAnio,
      score,
      isAlreadyOptimal,
    };
  }, [platform, rangeOrders, rangeTicket, rangeShipping, rangeCpt]);

  async function handleUrlNext() {
    const raw = url.trim();
    if (!URL_RE.test(raw)) {
      setUrlError('Escribe una URL válida (por ejemplo: mimarca.com)');
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

    const payload = {
      origen: 'cotizador',
      nombre: nombre.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      tienda_url: url.trim(),
      plataforma: PLATFORM_LABELS[platform as Platform],
      plataforma_detectada: detected ? 'sí' : 'no',
      rango_pedidos: ORDERS_RANGES.find((r) => r.value === rangeOrders)?.label,
      ticket_promedio: TICKET_RANGES.find((r) => r.value === rangeTicket)?.label,
      pedidos_estimados: report.orders,
      envio_promedio: SHIPPING_RANGES.find((r) => r.value === rangeShipping)?.label,
      comision_reportada: CPT_RANGES.find((r) => r.value === rangeCpt)?.label,
      comision_fuente: report.feeUsedSource,
      costo_mensual_est: `$${formatMXN(report.hoyMes)} MXN`,
      ahorro_mensual_est: `$${formatMXN(report.ahorroMes)} MXN`,
      ahorro_anual_est: `$${formatMXN(report.ahorroAnio)} MXN`,
      score_evitable: `${report.score}%`,
      ya_en_plataforma_optima: report.isAlreadyOptimal ? 'sí' : 'no',
      ...utm,
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
        delay(500),
      ]);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      events.formSubmit();
      events.adsLeadConversion();
      setStep(7);
    } catch {
      setNetworkError(
        'Hubo un error. Intenta de nuevo o escríbenos a paola@btiq.mx',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[620px]">
      <ProgressBar step={step} />

      {step === 1 && (
        <Screen title="¿Cuál es tu tienda online?">
          <p className="mt-2 text-body-l text-texto-2">
            Con la URL podemos ver qué plataforma usas.
          </p>
          <div className="mt-6 space-y-3">
            <QuizField label="La página de tu tienda" error={urlError}>
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
                    ? '✓ Vemos que tu tienda está en:'
                    : 'No pudimos identificar automáticamente. ¿Con qué la hiciste?'
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

          <div className="mt-6 flex justify-end">
            {!platform ? (
              <PrimaryButton onClick={handleUrlNext} loading={detecting}>
                {detecting ? 'Buscando…' : 'Siguiente →'}
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={() => setStep(2)}>
                Siguiente →
              </PrimaryButton>
            )}
          </div>
        </Screen>
      )}

      {step === 2 && (
        <RangeScreen
          title="¿Cuántos pedidos tienes al mes?"
          hint="Aproximado está bien. Preferimos preguntar pedidos que ventas — es menos personal."
          options={ORDERS_RANGES.map((r) => ({ value: r.value, label: r.label }))}
          value={rangeOrders}
          onChange={setRangeOrders}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <RangeScreen
          title="¿Cuánto compra en promedio cada cliente?"
          hint="Lo que gasta una persona por pedido. Si no llevas la cuenta, aproximado está bien."
          options={TICKET_RANGES.map((r) => ({ value: r.value, label: r.label }))}
          value={rangeTicket}
          onChange={setRangeTicket}
          onBack={() => setStep(2)}
          onNext={() => setStep(4)}
        />
      )}

      {step === 4 && (
        <RangeScreen
          title="¿Cuánto te cuesta cada envío?"
          hint="Lo que le pagas a la paquetería por cada pedido (DHL, Estafeta, 99minutos, etc.)."
          options={SHIPPING_RANGES.map((r) => ({ value: r.value, label: r.label }))}
          value={rangeShipping}
          onChange={setRangeShipping}
          onBack={() => setStep(3)}
          onNext={() => setStep(5)}
        />
      )}

      {step === 5 && (
        <RangeScreen
          title="De cada venta, ¿cuánto se te va en comisiones?"
          hint="La suma de todo lo que te cobran: tu plataforma, tarjetas, apps. Si no sabes, dinos la última."
          options={CPT_RANGES.map((r) => ({ value: r.value, label: r.label }))}
          value={rangeCpt}
          onChange={setRangeCpt}
          onBack={() => setStep(4)}
          onNext={() => setStep(6)}
        />
      )}

      {step === 6 && (
        <Screen title="Ver mi reporte">
          <p className="mt-2 text-body-l text-texto-2">
            Te lo mostramos aquí en pantalla, al momento.
          </p>
          <form onSubmit={handleFinalSubmit} noValidate className="mt-6 space-y-3">
            <QuizField label="Tu nombre" error={nombreErr}>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="María López"
                autoFocus
                className={inputClass(!!nombreErr)}
              />
            </QuizField>
            <QuizField label="Tu email" error={emailErr}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="maria@mimarca.mx"
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

            <div className="flex justify-between pt-1">
              <SecondaryButton onClick={() => setStep(5)} type="button">
                ← Atrás
              </SecondaryButton>
              <PrimaryButton loading={submitting} type="submit">
                {submitting ? 'Calculando…' : 'Ver mi reporte →'}
              </PrimaryButton>
            </div>
          </form>
        </Screen>
      )}

      {step === 7 && report && (
        <LiveReport
          nombre={nombre.trim().split(' ')[0] ?? ''}
          platform={platform as Platform}
          report={report}
          rangeOrdersLabel={
            ORDERS_RANGES.find((r) => r.value === rangeOrders)?.label ?? ''
          }
        />
      )}
    </div>
  );
}

// ─── Building blocks ────────────────────────────────────

function ProgressBar({ step }: { step: Step }) {
  const total = 6;
  const cur = Math.min(step, total);
  const pct = (cur / total) * 100;
  return (
    <div className="mb-6">
      <div className="mb-1.5 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.08em] text-texto-3">
        <span>Paso {cur} de {total}</span>
        <span>{step === 7 ? 'Reporte listo' : `${Math.round(pct)}%`}</span>
      </div>
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-borde">
        <div
          className="h-full bg-brand transition-all duration-500 ease-brand"
          style={{
            width: step === 7 ? '100%' : `${pct}%`,
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
    <div className="rounded-[14px] border border-borde bg-surface-1 p-[clamp(22px,3vw,32px)]">
      <h2
        className="font-display font-bold text-texto-1"
        style={{
          fontSize: 'clamp(1.5rem, 3.4vw, 2.2rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
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
      <p className="mt-2 text-body-l text-texto-2">{hint}</p>
      <div className="mt-5 flex flex-col gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-[10px] border px-4 py-3.5 text-left font-display text-[15px] transition-all duration-200 ${
              value === o.value
                ? 'border-brand bg-surface-2 text-texto-1'
                : 'border-borde bg-surface-1 text-texto-2 hover:border-texto-4 hover:text-texto-1'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        <SecondaryButton onClick={onBack}>← Atrás</SecondaryButton>
        <PrimaryButton onClick={onNext} disabled={!value}>
          Siguiente →
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
        className="mb-1.5 flex items-baseline justify-between font-display text-[13px] font-medium"
        style={{ color: error ? '#ff6a6a' : 'var(--texto-2)' }}
      >
        <span>{label}</span>
        {error && (
          <span
            className="font-mono text-[10.5px]"
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
    'w-full rounded-[7px] px-3.5 py-3 font-display text-[15px] font-medium text-texto-1 outline-none transition-colors',
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
      className="inline-flex items-center gap-2.5 rounded-[6px] border border-borde bg-transparent px-[16px] py-3 font-mono text-[11px] uppercase tracking-[0.08em] text-texto-3 transition-colors duration-[220ms] hover:border-texto-4 hover:text-texto-1"
    >
      {children}
    </button>
  );
}

// ─── Live report ────────────────────────────────────────

type ReportData = {
  gmv: number;
  orders: number;
  ticketAvg: number;
  cptReportedPct: number;
  feeUsedSource: 'reported' | 'default';
  hoyPlan: number;
  hoyPas: number;
  hoyCpt: number;
  hoyEnvio: number;
  hoyOtras: number;
  hoyMes: number;
  hoyAnio: number;
  tnMes: number;
  tnAnio: number;
  ahorroMes: number;
  ahorroAnio: number;
  score: number;
  isAlreadyOptimal: boolean;
};

function LiveReport({
  nombre,
  platform,
  report,
  rangeOrdersLabel,
}: {
  nombre: string;
  platform: Platform;
  report: ReportData;
  rangeOrdersLabel: string;
}) {
  if (report.isAlreadyOptimal) {
    return (
      <div className="rounded-[14px] border border-brand/40 bg-surface-1 p-[clamp(22px,3vw,36px)]">
        <div className="mono-label" style={{ color: 'var(--brand)' }}>
          Reporte de {nombre} · {PLATFORM_LABELS[platform]}
        </div>
        <h2
          className="mt-3 font-display font-bold text-texto-1"
          style={{
            fontSize: 'clamp(1.75rem, 4.4vw, 2.8rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
          }}
        >
          Buenas noticias —{' '}
          <span
            className="text-brand"
            style={{
              background:
                'linear-gradient(180deg, transparent 65%, rgba(237,224,74,0.20) 65%)',
            }}
          >
            ya estás en la plataforma correcta.
          </span>
        </h2>
        <p className="mt-4 text-body-l text-texto-2">
          Tu tienda ya está en Tiendanube, así que no hay comisiones altas ni
          apps caras que ahorrar. Donde sí podemos ayudarte:
        </p>
        <ul className="mt-4 grid gap-2 md:grid-cols-2">
          {[
            'Más ventas con las mismas visitas',
            'Bajar el costo de traer un cliente',
            'Optimizar tus campañas de Google y Meta',
            'Automatizar reportes y seguimiento',
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 rounded-[10px] border border-borde bg-surface-1 px-4 py-3 text-[14px] text-texto-1"
            >
              <span
                aria-hidden="true"
                className="mt-1 block h-[7px] w-[7px] flex-none rounded-full bg-brand"
              />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-7">
          <a
            href={`https://wa.me/525537344652?text=${encodeURIComponent(
              `Hola Paola, hice el cotizador. Ya estoy en Tiendanube con ${rangeOrdersLabel} al mes. Quiero ver cómo pueden ayudarme a crecer.`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => events.whatsappClick('thankyou')}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-[6px] bg-brand px-[22px] py-4 font-mono text-[12px] uppercase tracking-[0.08em] text-base transition-all ease-brand duration-[220ms] hover:-translate-y-0.5 hover:shadow-brand-hover"
          >
            Agenda una llamada gratis <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Card principal */}
      <div className="rounded-[14px] border border-brand/40 bg-surface-1 p-[clamp(22px,3vw,36px)]">
        <div className="mono-label">
          Reporte de {nombre} · {PLATFORM_LABELS[platform]}
        </div>
        <h2
          className="mt-3 font-display font-bold text-texto-1"
          style={{
            fontSize: 'clamp(1.5rem, 3.6vw, 2.2rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}
        >
          Puedes ahorrar
        </h2>
        <div
          className="mt-1 font-display font-bold text-brand"
          style={{
            fontSize: 'clamp(2.6rem, 7vw, 4.2rem)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          <span
            style={{
              background:
                'linear-gradient(180deg, transparent 68%, rgba(237,224,74,0.20) 68%)',
            }}
          >
            ${formatMXN(report.ahorroMes)}
          </span>
          <span
            className="text-texto-2"
            style={{ fontSize: '0.5em', letterSpacing: '-0.02em' }}
          >
            {' '}/ mes
          </span>
        </div>
        <p className="mt-3 text-body-l text-texto-2">
          Y{' '}
          <b className="text-texto-1">
            ${formatMXN(report.ahorroAnio)}
          </b>{' '}
          al año. Es dinero que hoy pagas en plan, comisiones, apps y envíos
          que se pueden reducir.
        </p>
      </div>

      {/* Card 2 — desglose */}
      <div className="rounded-[14px] border border-borde bg-surface-1 p-[clamp(22px,3vw,32px)]">
        <div className="mono-label">De dónde sale ese ahorro (al mes)</div>
        <div className="mt-4 space-y-3.5">
          {report.hoyPlan > 0 && (
            <CostRow
              label="Plan que pagas a tu plataforma"
              amount={report.hoyPlan}
              note="Al mes, sin importar cuánto vendas"
              severity="high"
            />
          )}
          <CostRow
            label="Comisiones por cada venta"
            amount={report.hoyPas + report.hoyCpt}
            note={
              report.feeUsedSource === 'reported'
                ? `${report.cptReportedPct.toFixed(1)}% de tus ventas`
                : `Aproximado para ${PLATFORM_LABELS[platform]}`
            }
            severity="high"
          />
          {report.hoyOtras > 0 && (
            <CostRow
              label="Apps y herramientas extras"
              amount={report.hoyOtras}
              note={`Al mes, promedio para ${PLATFORM_LABELS[platform]}`}
              severity="mid"
            />
          )}
          <CostRow
            label={`Envíos de tus ~${report.orders.toLocaleString('es-MX')} pedidos`}
            amount={report.hoyEnvio}
            note="Se puede negociar más barato por volumen"
            severity="mid"
          />
        </div>

        <div className="mt-6 border-t border-borde pt-5">
          <div className="flex items-baseline justify-between">
            <span
              className="font-display font-medium text-texto-2"
              style={{ fontSize: '15px' }}
            >
              Total que pagas hoy
            </span>
            <span
              className="font-display font-bold text-texto-1"
              style={{ fontSize: '20px', letterSpacing: '-0.02em' }}
            >
              ${formatMXN(report.hoyMes)} / mes
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-[14px] border border-borde bg-surface-2 p-[clamp(22px,3vw,32px)] text-center">
        <p
          className="font-display font-bold text-texto-1"
          style={{
            fontSize: 'clamp(1.125rem, 2.2vw, 1.4rem)',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}
        >
          ¿Quieres que te ayudemos a recuperar esos $
          {formatMXN(report.ahorroMes)} al mes?
        </p>
        <a
          href={`https://wa.me/525537344652?text=${encodeURIComponent(
            `Hola Paola, hice el cotizador. Estoy en ${PLATFORM_LABELS[platform]} con ${rangeOrdersLabel} al mes. El reporte me da un ahorro de $${formatMXN(report.ahorroMes)}/mes. Quiero agendar la llamada.`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => events.whatsappClick('thankyou')}
          className="mt-4 inline-flex w-full items-center justify-center gap-2.5 rounded-[6px] bg-brand px-[22px] py-4 font-mono text-[12px] uppercase tracking-[0.08em] text-base transition-all ease-brand duration-[220ms] hover:-translate-y-0.5 hover:shadow-brand-hover"
        >
          Sí, agenda una llamada gratis <span aria-hidden="true">→</span>
        </a>
        <p
          className="mt-3 font-mono text-[10.5px] text-texto-4"
          style={{ letterSpacing: '0.04em' }}
        >
          Estimación con base en tarifas de referencia y los datos que
          reportaste. No es una cotización oficial.
        </p>
      </div>
    </div>
  );
}

function CostRow({
  label,
  amount,
  note,
  severity,
}: {
  label: string;
  amount: number;
  note: string;
  severity: 'high' | 'mid' | 'low';
}) {
  const color =
    severity === 'high'
      ? '#c14a4a'
      : severity === 'mid'
        ? '#d6b45a'
        : 'var(--brand)';
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden="true"
        className="mt-1.5 block h-[9px] w-[9px] flex-none rounded-full"
        style={{ background: color }}
      />
      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <span
            className="font-display font-medium text-texto-1"
            style={{ fontSize: '14.5px' }}
          >
            {label}
          </span>
          <span
            className="whitespace-nowrap font-display font-bold text-texto-1"
            style={{ fontSize: '15px', letterSpacing: '-0.01em' }}
          >
            ${formatMXN(amount)}
          </span>
        </div>
        <div className="mt-0.5 text-[12.5px] text-texto-3">{note}</div>
      </div>
    </div>
  );
}
