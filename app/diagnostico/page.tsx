'use client';

// Landing /diagnostico — captura de leads para el "Diagnóstico gratis de
// tienda online". Complementa el servicio WEB + partnership Tiendanube.
// Reconstruida en el lenguaje visual del sitio (Geist, paleta dark, lime).
// Al enviar el formulario dispara los eventos formSubmit + adsLeadConversion.

import { useMemo, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import { Logo } from '@/components/Logo';
import { events } from '@/lib/analytics';
import { tokens } from '@/lib/tokens';

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TEL_RE = /^[\d\s+()-]{8,}$/;
const URL_RE = /^(https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+/i;

const SUBMIT_MIN_MS = 900;

const SALES_RANGES = [
  { value: 'menos-50k', label: 'Menos de $50K MXN' },
  { value: '50-150k', label: '$50K – $150K MXN' },
  { value: '150-500k', label: '$150K – $500K MXN' },
  { value: '500k-1m', label: '$500K – $1M MXN' },
  { value: 'mas-1m', label: 'Más de $1M MXN' },
] as const;

// Las 5 fugas (copy tomado tal cual del brief de la landing).
const FUGAS = [
  {
    n: '01',
    code: 'PLATAFORMA',
    delta: '1–2%',
    title: 'Comisión por transacción',
    desc: 'Tu plataforma cobra un porcentaje de cada venta, además del gateway. En un GMV de $500K son $5–10K/mes.',
    severity: 'CRÍTICO',
  },
  {
    n: '02',
    code: 'APPS',
    delta: '$700–2,700',
    title: 'Apps y page builders externos',
    desc: 'Reseñas, upsells, builder, bundles: cada función básica es una suscripción en USD que además hace más lenta tu tienda.',
    severity: 'CRÍTICO',
  },
  {
    n: '03',
    code: 'MSI',
    delta: '−15–25%',
    title: 'Sin MSI nativo',
    desc: 'En ticket alto, no ofrecer meses sin intereses (Kueski, Aplazo) mata la conversión. En México, MSI no es opcional.',
    severity: 'CRÍTICO',
  },
  {
    n: '04',
    code: 'LATENCIA',
    delta: '+80–200',
    title: 'Servidor fuera de México',
    desc: 'Cada milisegundo extra de latencia le cuesta conversión a tu tráfico móvil. Tus clientes están aquí; tu servidor no.',
    severity: 'MEDIO',
  },
  {
    n: '05',
    code: 'TRÁFICO',
    delta: '98%',
    title: 'Tráfico pagado que no convierte',
    desc: 'Estás pagando por tráfico que tu plataforma desperdicia. El problema casi nunca es el anuncio: es lo que pasa después del clic.',
    severity: 'CRÍTICO',
  },
] as const;

// Tabla comparativa variable por variable.
const COMPARATIVA = [
  { variable: 'Comisión por venta', generica: '1–2% + gateway', tiendanube: '0% + gateway' },
  { variable: 'Apps + builder', generica: 'App externa ($400–900/mes)', tiendanube: 'Incluido, nativo' },
  { variable: 'MSI (Kueski, Aplazo)', generica: 'App externa o no existe', tiendanube: 'Incluido' },
  { variable: 'Integración pagos', generica: 'Integración manual', tiendanube: 'Nativo' },
  { variable: 'Facturación', generica: 'USD, sin factura MX', tiendanube: '$MXN con factura' },
  { variable: 'Soporte', generica: 'Tickets, sin SLA', tiendanube: 'En español, con SLA' },
  { variable: 'Servidor', generica: 'EE.UU. / Europa', tiendanube: 'LATAM' },
] as const;

function formatMXN(n: number) {
  return new Intl.NumberFormat('es-MX', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(n);
}

// Sample de reporte que se ve arriba de "Esto es lo que recibes".
const REPORT_SAMPLE = [
  { severity: 'CRÍTICO', page: '/producto', issue: 'Carga lenta en móvil (4.2s)' },
  { severity: 'CRÍTICO', page: '/checkout', issue: 'Sin meses sin intereses visibles' },
  { severity: 'MEDIO', page: '/inicio', issue: '3 pasos extra antes de pagar' },
] as const;

export default function DiagnosticoPage() {
  return (
    <>
      <MiniNav />
      <main>
        <Hero />
        <ReportSection />
        <Fugas />
        <Calculadora />
        <MargenComparativo />
        <Comparativa />
        <Consultores />
        <FormSection />
      </main>
      <Footer />
    </>
  );
}

// ───── Nav mínimo ─────────────────────────────────────────────

function MiniNav() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-line backdrop-blur-[12px]"
      style={{ background: 'rgba(13,14,12,0.85)' }}
    >
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-[18px] py-[14px] md:px-8 lg:px-10">
        <Link href="/" aria-label="Ir a btiq digital" className="block">
          <Logo />
        </Link>
        <a
          href="#form"
          className="flex items-center gap-1.5 rounded-full bg-lime px-[14px] py-[9px] font-sans text-[12.5px] font-medium text-bg transition-colors hover:bg-lime-hover"
        >
          Analizar mi tienda <span aria-hidden="true">→</span>
        </a>
      </div>
    </header>
  );
}

// ───── Hero ────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden px-[18px] pb-8 pt-[34px] md:px-8 lg:px-10">
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <div className="relative mx-auto w-full max-w-content">
        <div className="inline-flex items-center gap-2 rounded-full border border-line2 bg-[rgba(212,255,58,0.04)] px-[11px] py-[5px] font-mono text-[10.5px] uppercase tracking-mono text-lime">
          <span
            aria-hidden="true"
            className="lime-glow inline-block h-1.5 w-1.5 rounded-full bg-lime"
          />
          [PARTNER OFICIAL TIENDANUBE]
        </div>

        <h1
          className="mt-[22px] font-sans font-semibold text-ink"
          style={{
            fontSize: '46px',
            lineHeight: 0.98,
            letterSpacing: '-0.04em',
          }}
        >
          Tu tienda está perdiendo ventas.
          <br />
          <span className="text-faint">
            Te mostramos dónde y cuánto te cuesta.
          </span>
        </h1>

        <p
          className="mt-5 max-w-[380px] font-sans text-ink2"
          style={{ fontSize: '14.5px', lineHeight: 1.55 }}
        >
          Diagnóstico gratis de tu tienda online en 5 minutos. Score de
          conversión, fugas de dinero en el checkout y{' '}
          <span className="text-ink">acciones priorizadas por impacto</span>.
        </p>

        <div className="mt-6">
          <a
            href="#form"
            className="inline-flex items-center gap-2 rounded-xl bg-lime px-[22px] py-[15px] font-sans text-[14px] font-semibold text-bg transition-colors hover:bg-lime-hover"
            style={{ letterSpacing: '-0.01em' }}
          >
            Analizar mi tienda gratis <span aria-hidden="true">→</span>
          </a>
        </div>

        <p className="mt-4 font-mono text-[10.5px] tracking-mono text-faint">
          Funciona con Shopify, WooCommerce, Wix, Magento, VTEX o tienda
          propia.
        </p>
      </div>
    </section>
  );
}

// ───── Sección [01]: Ejemplo de reporte ─────────────────────

function ReportSection() {
  return (
    <section className="border-y border-line bg-bg2 px-[18px] py-12 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-content">
        <p className="font-mono text-[10.5px] uppercase tracking-mono-widest text-faint">
          {'// 01 esto es lo que recibes'}
        </p>
        <h2
          className="mt-3 font-sans font-semibold text-ink"
          style={{
            fontSize: '32px',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
          }}
        >
          Un reporte página por página.
        </h2>
        <p className="mt-4 max-w-[440px] font-sans text-[14px] leading-[1.55] text-ink2">
          Dónde se caen tus compradores, qué lo causa y qué hacer primero.
          Cada fuga viene con su costo estimado en pesos.
        </p>

        <div className="mt-6 rounded-card border border-line2 bg-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[9.5px] uppercase tracking-mono-wide text-faint">
              [SAMPLE · COMPLETADO]
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-mono-wide text-lime">
              SCORE 64/100
            </span>
          </div>
          <p className="mb-4 font-sans text-[13px] text-ink2">
            Buena base, pero hay <span className="text-lime">3 fugas</span> que
            están costándote conversión.
          </p>
          <ul className="flex flex-col gap-2">
            {REPORT_SAMPLE.map((r) => (
              <li
                key={r.issue}
                className="flex items-center gap-3 rounded-[10px] border border-line px-3 py-2.5"
              >
                <span
                  className={`inline-flex flex-shrink-0 rounded-chip px-1.5 py-0.5 font-mono text-[8.5px] font-medium ${
                    r.severity === 'CRÍTICO'
                      ? 'bg-[#7a1818] text-ink'
                      : 'bg-surface text-faint border border-line2'
                  }`}
                >
                  {r.severity}
                </span>
                <span className="flex-shrink-0 font-mono text-[10.5px] tracking-mono text-lime">
                  {r.page}
                </span>
                <span className="font-sans text-[12.5px] text-ink">
                  {r.issue}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ───── Sección [02]: Las 5 fugas ─────────────────────────

function Fugas() {
  return (
    <section className="px-[18px] py-12 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-content">
        <p className="font-mono text-[10.5px] uppercase tracking-mono-widest text-faint">
          {'// 02 las fugas'}
        </p>
        <h2
          className="mt-3 font-sans font-semibold text-ink"
          style={{
            fontSize: '32px',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
          }}
        >
          Las 5 fugas más comunes
          <br />
          <span className="text-faint">en tiendas mexicanas.</span>
        </h2>
        <p className="mt-4 max-w-[440px] font-sans text-[14px] leading-[1.55] text-ink2">
          Detectadas una y otra vez en tiendas que ya venden bien — y podrían
          vender más.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {FUGAS.map((f) => (
            <article
              key={f.n}
              className="rounded-card border border-line2 bg-surface px-4 py-4"
            >
              <div className="mb-2.5 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-chip border border-lime px-2 py-[3px] font-mono text-[10px] tracking-mono-wide text-lime">
                    FUGA_{f.n}
                  </span>
                  <span className="font-mono text-[10px] tracking-mono text-faint">
                    / {f.code}
                  </span>
                </div>
                <span
                  className="font-sans text-[18px] font-semibold text-lime"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {f.delta}
                </span>
              </div>
              <h3
                className="font-sans text-[18px] font-semibold text-ink"
                style={{ letterSpacing: '-0.02em' }}
              >
                {f.title}
              </h3>
              <p className="mt-2 font-sans text-[13px] leading-[1.55] text-ink2">
                {f.desc}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="#form"
            className="inline-flex items-center gap-1.5 font-sans text-[14px] font-medium text-lime underline-offset-4 hover:underline"
          >
            Descúbrelo gratis <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ───── Sección [03]: Calculadora ───────────────────────

function Calculadora() {
  const [gmv, setGmv] = useState(500000);

  // Fórmulas: fee ~1.5% GMV + overhead apps ~$500 base + 1.5% GMV extra.
  // Anotadas como estimadas — el diagnóstico real usa datos de la tienda.
  const fee = Math.round(gmv * 0.015);
  const apps = Math.max(500, Math.round(gmv * 0.015));
  const savingMonthly = fee + apps;
  const savingAnnual = savingMonthly * 12;

  return (
    <section className="border-y border-line bg-bg2 px-[18px] py-12 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-content">
        <p className="font-mono text-[10.5px] uppercase tracking-mono-widest text-faint">
          {'// 03 calculadora'}
        </p>
        <h2
          className="mt-3 font-sans font-semibold text-ink"
          style={{
            fontSize: '30px',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
          }}
        >
          ¿Cuánto te está costando
          <br />
          <span className="text-faint">tu plataforma cada mes?</span>
        </h2>

        <div className="mt-8">
          <label
            htmlFor="gmv-slider"
            className="mb-2 flex items-baseline justify-between font-mono text-[9.5px] uppercase tracking-mono-wide text-faint"
          >
            <span>Tus ventas mensuales (GMV)</span>
            <span className="font-sans text-[16px] font-semibold text-ink">
              ${formatMXN(gmv)} MXN
            </span>
          </label>
          <input
            id="gmv-slider"
            type="range"
            min={50000}
            max={2000000}
            step={50000}
            value={gmv}
            onChange={(e) => setGmv(Number(e.target.value))}
            className="w-full accent-lime"
          />
          <div className="mt-1 flex justify-between font-mono text-[9px] text-faint">
            <span>$50K</span>
            <span>$2M</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-2.5 md:grid-cols-2">
          <MetricRow label="Fee de tu plataforma [est.]" value={`−$${formatMXN(fee)}`} />
          <MetricRow label="Apps + builder [est.]" value={`−$${formatMXN(apps)}`} />
          <MetricRow
            label="Ahorro mensual [est.]"
            value={`+$${formatMXN(savingMonthly)}`}
            highlight
          />
          <MetricRow
            label="Ahorro anual proyectado"
            value={`+$${formatMXN(savingAnnual)}`}
            highlight
          />
        </div>

        <p className="mt-6 font-mono text-[9.5px] leading-[1.55] tracking-mono text-faint">
          [est.] Cálculo con comisión de plataforma de 1.5% y overhead promedio
          de apps. Tu diagnóstico usa los datos reales de tu tienda.
        </p>
      </div>
    </section>
  );
}

function MetricRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-[10px] border px-3.5 py-3 ${
        highlight
          ? 'border-lime bg-[rgba(212,255,58,0.06)]'
          : 'border-line2 bg-surface'
      }`}
    >
      <span className="font-mono text-[9.5px] uppercase tracking-mono-wide text-faint">
        {label}
      </span>
      <span
        className={`font-sans text-[18px] font-semibold ${
          highlight ? 'text-lime' : 'text-ink'
        }`}
        style={{ letterSpacing: '-0.02em' }}
      >
        {value}
      </span>
    </div>
  );
}

// ───── Sección [04]: El margen ─────────────────────────

function MargenComparativo() {
  return (
    <section className="px-[18px] py-12 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-content">
        <p className="font-mono text-[10.5px] uppercase tracking-mono-widest text-faint">
          {'// 04 el margen'}
        </p>
        <h2
          className="mt-3 font-sans font-semibold text-ink"
          style={{
            fontSize: '30px',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
          }}
        >
          De cada <span className="text-lime">$100</span>
          <br />
          <span className="text-faint">que vendes.</span>
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          <MargenCard
            title="PLATAFORMA GENÉRICA"
            neto="$85"
            rows={[
              { label: 'Gateway de pago', value: '−$3.6' },
              { label: 'Comisión de plataforma', value: '−$2.0' },
              { label: 'Apps + builder + extras', value: '−$9.4' },
            ]}
          />
          <MargenCard
            title="TIENDANUBE EVOLUCIÓN + BTIQ"
            neto="$93"
            highlight
            rows={[
              { label: 'Gateway de pago', value: '−$3.6' },
              { label: 'Comisión de plataforma', value: '$0.0' },
              { label: 'Apps nativas incluidas', value: '−$3.4' },
            ]}
          />
        </div>

        <p className="mt-6 font-sans text-[14px] leading-[1.55] text-ink2">
          <span className="text-lime font-semibold">+$8</span> de cada $100
          vendidos, directo a tu margen. En $500K de GMV son{' '}
          <span className="text-ink font-medium">$40K/mes [est.]</span>.
        </p>
      </div>
    </section>
  );
}

function MargenCard({
  title,
  neto,
  rows,
  highlight,
}: {
  title: string;
  neto: string;
  rows: { label: string; value: string }[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-card border p-4 ${
        highlight ? 'border-lime bg-[rgba(212,255,58,0.04)]' : 'border-line2 bg-surface'
      }`}
    >
      <div
        className={`font-mono text-[10px] tracking-mono ${
          highlight ? 'text-lime' : 'text-faint'
        }`}
      >
        {title}
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span
          className={`font-sans text-[42px] font-semibold ${
            highlight ? 'text-lime' : 'text-ink'
          }`}
          style={{ letterSpacing: '-0.04em', lineHeight: 1 }}
        >
          {neto}
        </span>
        <span className="font-mono text-[9.5px] uppercase tracking-mono-wide text-faint">
          netos [est.]
        </span>
      </div>
      <ul className="mt-4 flex flex-col gap-1.5 border-t border-line pt-3">
        {rows.map((r) => (
          <li
            key={r.label}
            className="flex items-center justify-between font-mono text-[11px] text-ink2"
          >
            <span className="text-faint">{r.label}</span>
            <span>{r.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ───── Sección [05]: Comparativa tabular ─────────

function Comparativa() {
  return (
    <section className="border-y border-line bg-bg2 px-[18px] py-12 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-content">
        <p className="font-mono text-[10.5px] uppercase tracking-mono-widest text-faint">
          {'// 05 comparativa'}
        </p>
        <h2
          className="mt-3 font-sans font-semibold text-ink"
          style={{
            fontSize: '30px',
            lineHeight: 1.0,
            letterSpacing: '-0.035em',
          }}
        >
          Variable por variable.
        </h2>

        <div className="mt-6 overflow-hidden rounded-card border border-line2">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-px bg-line font-mono text-[9.5px] uppercase tracking-mono-wide">
            <div className="bg-bg2 px-3 py-2.5 text-faint">Variable</div>
            <div className="bg-bg2 px-3 py-2.5 text-faint">Genérica</div>
            <div className="bg-bg2 px-3 py-2.5 text-lime">Tiendanube</div>
            {COMPARATIVA.map((c) => (
              <RowGroup key={c.variable} row={c} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RowGroup({
  row,
}: {
  row: { variable: string; generica: string; tiendanube: string };
}) {
  return (
    <>
      <div className="bg-surface px-3 py-3 font-sans text-[12px] font-medium normal-case tracking-normal text-ink">
        {row.variable}
      </div>
      <div className="bg-surface px-3 py-3 font-sans text-[12px] normal-case tracking-normal text-ink2">
        {row.generica}
      </div>
      <div className="bg-surface px-3 py-3 font-sans text-[12px] font-medium normal-case tracking-normal text-lime">
        {row.tiendanube}
      </div>
    </>
  );
}

// ───── Sección [06]: Quiénes analizan ─────────

function Consultores() {
  return (
    <section className="px-[18px] py-12 md:px-8 lg:px-10">
      <div className="mx-auto w-full max-w-content">
        <p className="font-mono text-[10.5px] uppercase tracking-mono-widest text-faint">
          {'// 06 quiénes analizan'}
        </p>
        <h2
          className="mt-3 font-sans font-semibold text-ink"
          style={{
            fontSize: '28px',
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
          }}
        >
          btiq digital
          <br />
          <span className="text-faint">
            partner oficial de Tiendanube en México.
          </span>
        </h2>
        <p className="mt-4 max-w-[440px] font-sans text-[14px] leading-[1.55] text-ink2">
          15+ años construyendo e-commerce para marcas como Samsung, AT&amp;T
          y decenas de marcas DTC mexicanas. Tu diagnóstico lo revisa un
          consultor, no un bot.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-sans text-[13px] font-semibold text-ink2 opacity-70">
          <span>SAMSUNG</span>
          <span>AT&amp;T</span>
          <span>TIENDANUBE</span>
          <span>+ MARCAS DTC</span>
        </div>
      </div>
    </section>
  );
}

// ───── Sección [07]: Formulario ─────────────────────

type FormState = {
  tienda_url: string;
  nombre: string;
  email: string;
  whatsapp: string;
  rango_ventas: string;
};

type FieldKey = keyof FormState;

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function FormSection() {
  const [form, setForm] = useState<FormState>({
    tienda_url: '',
    nombre: '',
    email: '',
    whatsapp: '',
    rango_ventas: '',
  });
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [networkError, setNetworkError] = useState<string | null>(null);

  const errors = useMemo(() => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (!form.tienda_url.trim()) e.tienda_url = 'Requerido';
    else if (!URL_RE.test(form.tienda_url.trim())) e.tienda_url = 'Formato inválido';
    if (!form.nombre.trim()) e.nombre = 'Requerido';
    else if (form.nombre.trim().length < 2) e.nombre = 'Muy corto';
    if (!form.email.trim()) e.email = 'Requerido';
    else if (!EMAIL_RE.test(form.email.trim())) e.email = 'Formato inválido';
    if (form.whatsapp.trim() && !TEL_RE.test(form.whatsapp.trim())) {
      e.whatsapp = 'Formato inválido';
    }
    if (!form.rango_ventas) e.rango_ventas = 'Elige un rango';
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  function update<K extends FieldKey>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }
  function blur(k: FieldKey) {
    setTouched((t) => ({ ...t, [k]: true }));
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({
      tienda_url: true,
      nombre: true,
      email: true,
      whatsapp: true,
      rango_ventas: true,
    });
    if (!isValid || submitting) return;

    setNetworkError(null);
    setSubmitting(true);

    const payload = {
      origen: 'diagnostico',
      tienda_url: form.tienda_url.trim(),
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      rango_ventas:
        SALES_RANGES.find((r) => r.value === form.rango_ventas)?.label ??
        form.rango_ventas,
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
      setSubmitted(true);
    } catch {
      setNetworkError(
        'Hubo un error. Intenta de nuevo o escríbenos a paola@btiq.mx',
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section
        id="form"
        className="border-t border-line bg-bg2 px-[18px] py-14 md:px-8 lg:px-10"
      >
        <div className="mx-auto w-full max-w-content" role="status" aria-live="polite">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-[28px] text-bg">
            ✓
          </div>
          <h2
            className="mt-5 font-sans font-semibold text-ink"
            style={{ fontSize: '34px', lineHeight: 0.98, letterSpacing: '-0.035em' }}
          >
            Recibimos tu tienda, {form.nombre.trim().split(' ')[0]}.
          </h2>
          <p className="mt-4 max-w-[420px] font-sans text-[14.5px] leading-[1.55] text-ink2">
            En menos de <span className="text-lime">48 horas</span> recibes tu
            diagnóstico personalizado en {form.email.trim()}. Sin tarjeta, sin
            compromiso.
          </p>
          <div className="mt-5 rounded-xl border border-line2 bg-surface px-4 py-3.5 font-mono text-[11.5px] leading-[1.6] text-ink2">
            <div>→ Score de conversión</div>
            <div>→ Mapa de fugas por página, con severidad</div>
            <div>→ Acciones priorizadas por impacto</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="form"
      className="border-t border-line bg-bg2 px-[18px] py-14 md:px-8 lg:px-10"
    >
      <div className="mx-auto w-full max-w-content">
        <p className="font-mono text-[10.5px] uppercase tracking-mono-widest text-faint">
          {'// 07 tu diagnóstico'}
        </p>
        <h2
          className="mt-3 font-sans font-semibold text-ink"
          style={{ fontSize: '32px', lineHeight: 1.0, letterSpacing: '-0.035em' }}
        >
          Tu tienda está perdiendo ventas.
          <br />
          <span className="text-lime">Descubre cuánto, gratis.</span>
        </h2>
        <p className="mt-4 max-w-[440px] font-sans text-[14px] leading-[1.55] text-ink2">
          Recibes tu reporte en menos de 48 horas. Sin tarjeta, sin
          compromiso.
        </p>

        <form onSubmit={submit} noValidate className="mt-6 flex flex-col gap-3.5">
          <FormField
            id="d-url"
            label="URL de tu tienda"
            error={errors.tienda_url}
            touched={touched.tienda_url}
          >
            <input
              id="d-url"
              type="url"
              value={form.tienda_url}
              onChange={(e) => update('tienda_url', e.target.value)}
              onBlur={() => blur('tienda_url')}
              placeholder="https://mimarca.com"
              className={inputClass(Boolean(errors.tienda_url && touched.tienda_url))}
              inputMode="url"
            />
          </FormField>

          <FormField
            id="d-nombre"
            label="Nombre"
            error={errors.nombre}
            touched={touched.nombre}
          >
            <input
              id="d-nombre"
              type="text"
              value={form.nombre}
              onChange={(e) => update('nombre', e.target.value)}
              onBlur={() => blur('nombre')}
              placeholder="Paola Parra"
              className={inputClass(Boolean(errors.nombre && touched.nombre))}
            />
          </FormField>

          <FormField
            id="d-email"
            label="Email"
            error={errors.email}
            touched={touched.email}
          >
            <input
              id="d-email"
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              onBlur={() => blur('email')}
              placeholder="paola@empresa.mx"
              className={inputClass(Boolean(errors.email && touched.email))}
              inputMode="email"
              autoComplete="email"
            />
          </FormField>

          <FormField
            id="d-whatsapp"
            label="WhatsApp"
            error={errors.whatsapp}
            touched={touched.whatsapp}
            optional
          >
            <input
              id="d-whatsapp"
              type="tel"
              value={form.whatsapp}
              onChange={(e) => update('whatsapp', e.target.value)}
              onBlur={() => blur('whatsapp')}
              placeholder="+52 55 0000 0000"
              className={inputClass(Boolean(errors.whatsapp && touched.whatsapp))}
              inputMode="tel"
              autoComplete="tel"
            />
          </FormField>

          <FormField
            id="d-rango"
            label="Rango de ventas mensuales"
            error={errors.rango_ventas}
            touched={touched.rango_ventas}
          >
            <select
              id="d-rango"
              value={form.rango_ventas}
              onChange={(e) => update('rango_ventas', e.target.value)}
              onBlur={() => blur('rango_ventas')}
              className={inputClass(
                Boolean(errors.rango_ventas && touched.rango_ventas),
              )}
            >
              <option value="">Selecciona un rango</option>
              {SALES_RANGES.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </FormField>

          {networkError && (
            <div
              role="alert"
              className="rounded-[10px] border border-[#7a1818]/60 bg-[#7a1818]/10 px-3.5 py-2.5 font-sans text-[12.5px] font-medium text-[#ff6a6a]"
            >
              {networkError}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            aria-busy={submitting}
            className="mt-2 flex items-center justify-between rounded-xl bg-lime px-[22px] py-[17px] font-sans text-[14.5px] font-semibold text-bg transition-colors hover:bg-lime-hover disabled:opacity-70"
            style={{ letterSpacing: '-0.01em' }}
          >
            <span>{submitting ? 'Analizando…' : 'Analizar mi tienda gratis'}</span>
            <span aria-hidden="true">{submitting ? '○' : '→'}</span>
          </button>

          <p className="mt-1 text-center font-mono text-[10px] leading-[1.55] tracking-mono text-faint">
            Solo usamos tus datos para enviarte el diagnóstico. Cero spam.{' '}
            <Link href="/aviso-de-privacidad" className="underline">
              Aviso de privacidad
            </Link>
            .
          </p>
        </form>
      </div>
    </section>
  );
}

// ───── Form helpers ─────────────────────────────────────

function FormField({
  id,
  label,
  error,
  touched,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  touched?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  const showErr = Boolean(error && touched);
  return (
    <label
      htmlFor={id}
      className="flex flex-col gap-1.5"
    >
      <span
        className="flex items-baseline justify-between font-mono text-[9.5px] uppercase tracking-mono-wide"
        style={{ color: showErr ? '#ff6a6a' : tokens.colors.faint }}
      >
        <span>
          {label}
          {optional && (
            <span
              className="ml-1.5 normal-case text-faint"
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

function inputClass(showErr: boolean) {
  return [
    'w-full rounded-[10px] px-3.5 py-[13px] font-sans text-[14px] font-medium text-ink outline-none transition-colors',
    'bg-surface placeholder:text-faint',
    showErr
      ? 'border-[1.5px] border-[#7a1818]'
      : 'border-[1.5px] border-line2 focus:border-lime',
  ].join(' ');
}
