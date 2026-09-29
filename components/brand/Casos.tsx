'use client';

import { events } from '@/lib/analytics';
import { SectionHead } from './SectionHead';
import { AnimatedMark } from './AnimatedMark';

// Casos de cliente. Grid de 4 tarjetas: cliente + sector, reto, qué hicimos,
// y el resultado con la métrica en display. Un solo marcador amarillo en la
// sección (va en el H2), igual que en Partner.
//
// REGLAS DE CONTENIDO — no tocar sin revisar:
// · La desarrolladora de vivienda NUNCA se nombra, ni sus desarrollos.
// · Continental Moto lleva SIEMPRE la nota de distribuidor: el cliente es el
//   distribuidor nacional, no el fabricante alemán.
// · Las métricas salen de reportes reales. No redondear hacia arriba.

const CASOS = [
  {
    cliente: 'Desarrolladora de vivienda',
    sector: 'Vivienda · México',
    servicio: 'Performance',
    reto: 'Generar leads calificados para varios desarrollos a la vez, en un mercado donde todos le hablan al mismo comprador.',
    hicimos: 'Meta y Google Ads por desarrollo, captación por formulario y WhatsApp, reporte semanal y tablero de diagnóstico que se actualiza a diario.',
    metrica: '$81 → $66',
    metricaPie: 'Costo por conversión en Google tras reestructurar por intención de búsqueda — con más volumen, no menos.',
    nota: null,
  },
  {
    cliente: 'Praktiko.mx',
    sector: 'E-commerce multicanal',
    servicio: 'Marketplaces',
    reto: 'Vender en cuatro marketplaces al mismo tiempo sin que las comisiones y el envío se comieran el margen.',
    hicimos: 'Auditoría de rentabilidad producto por producto y canal por canal, corrección de precios, gestión de TikTok Shop y Mercado Libre, inventario sincronizado.',
    metrica: '1.87× → 3.22×',
    metricaPie: 'ROI de campaña y costo por pedido 23% más bajo, en una semana y gastando 55% más.',
    nota: null,
  },
  {
    cliente: 'Panatta',
    sector: 'Alimentos · B2B',
    servicio: 'Performance',
    reto: 'Conseguir clientes mayoristas recurrentes —cafeterías, fondas, restaurantes, hoteles— en CDMX y Estado de México.',
    hicimos: 'Meta y Google Ads, stack de medición GA4 y GTM instalado desde cero, captación por WhatsApp.',
    metrica: '30 días',
    metricaPie: 'Un canal de Google que llevaba un mes sin mostrar un solo anuncio, entregando desde la primera semana con 9.77% de CTR.',
    nota: null,
  },
  {
    cliente: 'Continental Moto',
    sector: 'Refacciones · Moto',
    servicio: 'Web · Marketplaces · Eventos',
    reto: 'Arrancar la venta digital desde cero: catálogo grande, cero presencia en línea, cero facturado en digital.',
    hicimos: 'Sitio propio, catálogo digital de 43 medidas, alta de tres canales de venta, redes desde cero y activación en el Salón Internacional de la Motocicleta.',
    metrica: '0 → 3 canales',
    metricaPie: 'De cero presencia digital a sitio propio, catálogo completo y tres canales listos para vender, en menos de 90 días.',
    nota: 'vía su distribuidor nacional en México',
  },
];

export function Casos() {
  return (
    <section id="casos" className="border-t border-borde py-[clamp(72px,10vw,140px)]">
      <div className="mx-auto max-w-site px-gut">
        <SectionHead
          number="02"
          title={
            <>
              Lo que <AnimatedMark>hemos construido</AnimatedMark>.
            </>
          }
          extra="Resultados verificados"
        />

        <div className="grid grid-cols-1 gap-[clamp(16px,2vw,24px)] lg:grid-cols-2">
          {CASOS.map((c) => (
            <article
              key={c.cliente}
              className="flex flex-col rounded-[12px] border border-borde bg-surface-1 p-[clamp(22px,3vw,32px)]"
            >
              <div className="mono-label">{c.sector}</div>

              <h3
                className="mt-3 font-serif leading-[1.1]"
                style={{ fontSize: 'clamp(1.5rem, 2.3vw, 1.875rem)', letterSpacing: '-0.015em', fontWeight: 700 }}
              >
                {c.cliente}
              </h3>

              {c.nota && (
                <p className="mt-1 font-mono text-[10.5px] tracking-[0.05em] text-texto-4">
                  {c.nota}
                </p>
              )}

              <p className="mt-5 text-body-l text-texto-2">{c.reto}</p>

              <div className="mt-6 border-t border-borde pt-5">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-texto-4">
                  {c.servicio}
                </div>
                <p className="mt-2 text-texto-3" style={{ fontSize: '1.0625rem', lineHeight: 1.55 }}>
                  {c.hicimos}
                </p>
              </div>

              <div className="mt-auto border-t border-borde pt-6">
                <div
                  className="font-display font-bold leading-none"
                  style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.035em' }}
                >
                  {c.metrica}
                </div>
                <p className="mt-3 text-texto-3" style={{ fontSize: '0.9375rem', lineHeight: 1.55 }}>
                  {c.metricaPie}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Salida de la sección: las tarjetas terminaban sin siguiente paso. */}
        <div className="mt-[clamp(32px,4vw,52px)] flex flex-col items-start gap-4 border-t border-borde pt-[clamp(28px,3.5vw,40px)] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body-l text-texto-2">
            ¿Tu cuenta se parece a alguna de estas?
          </p>
          <a
            href="#contacto"
            onClick={() => events.agendaCasosClick()}
            className="inline-flex shrink-0 items-center gap-2 rounded-[8px] bg-brand px-[24px] py-[14px] font-display text-[15px] font-semibold text-base transition-all duration-[220ms] ease-brand hover:-translate-y-0.5 hover:shadow-brand-hover"
          >
            Diagnóstico sin costo <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
