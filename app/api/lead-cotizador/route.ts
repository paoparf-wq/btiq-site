import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// POST /api/lead-cotizador
// Recibe el payload del quiz + reporte calculado. Manda 2 emails con Resend:
//   1. Al lead: reporte formateado (mismo diseño que la pantalla)
//   2. A Paola: brief completo con desglose para preparar la reunión
// Además hace POST a Formspree como respaldo (histórico).
//
// Si RESEND_API_KEY no está definida, solo Formspree se ejecuta.

export const runtime = 'nodejs';
export const maxDuration = 15;

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const PAOLA_EMAIL = 'paola@btiq.mx';
const FROM_ADDRESS = 'btiq digital <hola@btiq.mx>';

type Payload = {
  // Datos del lead
  nombre: string;
  email: string;
  whatsapp?: string;
  tienda_url: string;

  // Plataforma
  plataforma: string;
  plataforma_detectada: 'sí' | 'no';

  // Rangos declarados
  rango_pedidos: string;
  ticket_promedio: string;
  envio_promedio: string;
  comision_reportada: string;
  comision_fuente: 'reported' | 'default';

  // Números calculados
  pedidos_estimados: number;
  gmv_estimado: number;
  ahorro_mensual_est: string;
  ahorro_anual_est: string;
  costo_mensual_est: string;
  score_evitable: string;
  ya_en_plataforma_optima: 'sí' | 'no';

  // Desglose para el brief (montos numéricos)
  hoy_plan: number;
  hoy_comisiones: number;
  hoy_apps: number;
  hoy_envios: number;
  hoy_total: number;
  tn_plan: number;
  tn_comisiones: number;
  tn_envios: number;
  tn_total: number;
  ahorro_total_num: number;

  // UTM
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

function money(n: number) {
  return '$' + Math.round(n).toLocaleString('es-MX');
}

// Email 1 — reporte para el lead. HTML minimalista, sin estilos externos,
// safe para todos los clientes de correo.
function buildLeadEmail(p: Payload): string {
  const ahorroChico = p.ahorro_total_num < 3000;
  const yaTn = p.ya_en_plataforma_optima === 'sí';

  const headline = yaTn
    ? 'Ya estás en la plataforma correcta.'
    : ahorroChico
      ? 'Tu operación ya está bien ajustada.'
      : `Puedes ahorrar hasta ${p.ahorro_mensual_est} al mes.`;

  const subline = yaTn
    ? 'Tu tienda ya está en Tiendanube. Donde sí podemos ayudarte a mover la aguja: crecer conversión, bajar el costo de traer un cliente y automatizar seguimiento.'
    : ahorroChico
      ? 'Con lo que nos compartiste, tus costos están cerca del mínimo. El siguiente salto no está en recortar — está en crecer: subir conversión, bajar CAC, retener mejor.'
      : `Con los datos que compartiste identificamos fugas específicas de tu operación. Estimado anual: <b>${p.ahorro_anual_est}</b>.`;

  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><title>Tu reporte · btiq digital</title></head>
<body style="margin:0;padding:0;background:#0d0e0c;color:#f4f5f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0d0e0c;padding:32px 20px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#161814;border:1px solid rgba(244,245,240,0.07);border-radius:14px;padding:32px 28px;">
        <tr><td>
          <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#ede04a;margin-bottom:16px;">
            Reporte de ${p.nombre.split(' ')[0]} · ${p.plataforma}
          </div>
          <h1 style="margin:0 0 16px;font-size:28px;line-height:1.05;letter-spacing:-0.02em;font-weight:700;color:#f4f5f0;">
            ${headline}
          </h1>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.55;color:#989995;">${subline}</p>

          <div style="border-top:1px solid rgba(244,245,240,0.07);padding-top:24px;margin-top:8px;">
            <div style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#7c7d79;margin-bottom:12px;">
              El desglose completo lo hablamos por WhatsApp
            </div>
            <ul style="margin:0 0 24px;padding:0;list-style:none;">
              ${
                yaTn || ahorroChico
                  ? `
              <li style="padding:10px 0;border-bottom:1px solid rgba(244,245,240,0.07);color:#f4f5f0;font-size:14px;">→ Playbook para subir tu conversión</li>
              <li style="padding:10px 0;border-bottom:1px solid rgba(244,245,240,0.07);color:#f4f5f0;font-size:14px;">→ Cómo bajar el costo de traer un cliente</li>
              <li style="padding:10px 0;border-bottom:1px solid rgba(244,245,240,0.07);color:#f4f5f0;font-size:14px;">→ Optimización de tus campañas de Google y Meta</li>
              <li style="padding:10px 0;color:#f4f5f0;font-size:14px;">→ Automatización de reportes y seguimiento</li>`
                  : `
              <li style="padding:10px 0;border-bottom:1px solid rgba(244,245,240,0.07);color:#f4f5f0;font-size:14px;">→ El % exacto que estás pagando de más en comisiones</li>
              <li style="padding:10px 0;border-bottom:1px solid rgba(244,245,240,0.07);color:#f4f5f0;font-size:14px;">→ Qué apps puedes eliminar sin perder función</li>
              <li style="padding:10px 0;border-bottom:1px solid rgba(244,245,240,0.07);color:#f4f5f0;font-size:14px;">→ Cuánto negociar con tu paquetería por tu volumen</li>
              <li style="padding:10px 0;color:#f4f5f0;font-size:14px;">→ Plan de migración sin bajar ventas mientras cambias</li>`
              }
            </ul>

            <a href="https://wa.me/525537344652?text=${encodeURIComponent(`Hola Paola, hice el cotizador y me llegó el email. Quiero el desglose completo.`)}"
               style="display:block;text-align:center;background:#ede04a;color:#0d0e0c;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;font-weight:700;padding:16px 22px;border-radius:6px;text-decoration:none;">
              Agenda una llamada gratis →
            </a>
          </div>

          <p style="margin:24px 0 0;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;letter-spacing:0.04em;color:#656663;text-align:center;">
            Estimación con base en tarifas de referencia y los datos que reportaste. No es una cotización oficial.
          </p>
        </td></tr>
      </table>

      <p style="margin:20px 0 0;font-size:12px;color:#656663;">
        btiq digital · Marketing digital boutique en CDMX · <a href="https://btiq.mx" style="color:#989995;">btiq.mx</a>
      </p>
    </td></tr>
  </table>
</body></html>`;
}

// Email 2 — brief para Paola. Formato monospace con toda la data para
// preparar la reunión.
function buildBriefEmail(p: Payload): string {
  const utmLine =
    p.utm_source || p.utm_campaign
      ? `\nUTM: ${[p.utm_source, p.utm_campaign, p.utm_content].filter(Boolean).join(' · ')}`
      : '';

  const puntosReunion: string[] = [];
  if (p.comision_fuente === 'reported') {
    puntosReunion.push(
      `Su comisión reportada (${p.comision_reportada}) — validar si es Pago Nube nativo o gateway externo.`,
    );
  } else {
    puntosReunion.push(
      `No supo su comisión real — usamos el default de ${p.plataforma}. Preguntar en la llamada para calibrar.`,
    );
  }
  if (p.hoy_apps > 0) {
    puntosReunion.push(
      `Apps: ${money(p.hoy_apps)}/mes en ${p.plataforma}. Tiendanube las incluye — ahorro directo.`,
    );
  }
  if (p.hoy_envios > 5000) {
    puntosReunion.push(
      `Envíos: ${money(p.hoy_envios)}/mes en ${p.pedidos_estimados} pedidos. Se puede bajar ~15% negociando por volumen (~${money(p.hoy_envios * 0.15)}/mes).`,
    );
  }
  if (p.ya_en_plataforma_optima === 'sí') {
    puntosReunion.push(
      `Ya está en Tiendanube — enfocar la conversación en crecer ventas, no en migrar.`,
    );
  }
  if (p.ahorro_total_num < 3000 && p.ya_en_plataforma_optima === 'no') {
    puntosReunion.push(
      `Ahorro estimado bajo (< $3K/mes). Reporte muestra variante "operación ajustada" — la venta va por retención/CAC/conversión.`,
    );
  }

  const body = `NUEVO LEAD · COTIZADOR

Cliente:      ${p.nombre}
Email:        ${p.email}
WhatsApp:     ${p.whatsapp || '—'}
Tienda:       ${p.tienda_url} (${p.plataforma}${p.plataforma_detectada === 'sí' ? ', auto-detectada' : ', declarada'})${utmLine}

────────────────────────────────────────
DECLARADO

Pedidos/mes:       ${p.rango_pedidos} (usamos ${p.pedidos_estimados})
Ticket promedio:   ${p.ticket_promedio}
Envío/pedido:      ${p.envio_promedio}
Comisión total:    ${p.comision_reportada}
GMV estimado:      ${money(p.gmv_estimado)}/mes

────────────────────────────────────────
COSTOS HOY (estimado ${p.plataforma})

Plan plataforma:       ${money(p.hoy_plan).padStart(12)}
Comisiones por venta:  ${money(p.hoy_comisiones).padStart(12)}
Apps y extras:         ${money(p.hoy_apps).padStart(12)}
Envíos:                ${money(p.hoy_envios).padStart(12)}
                       ────────────
TOTAL:                 ${money(p.hoy_total).padStart(12)} /mes

CON TIENDANUBE

Plan (desc 25%):       ${money(p.tn_plan).padStart(12)}
Pago Nube 2.99% + $3:  ${money(p.tn_comisiones).padStart(12)}
Envío Nube $130/pedido:${money(p.tn_envios).padStart(12)}
Apps incluidas:                    $0
                       ────────────
TOTAL:                 ${money(p.tn_total).padStart(12)} /mes

AHORRO ESTIMADO:       ${money(p.ahorro_total_num).padStart(12)} /mes
                       ${money(p.ahorro_total_num * 12).padStart(12)} /año
Score evitable:        ${p.score_evitable}

────────────────────────────────────────
PUNTOS PARA LA REUNIÓN

${puntosReunion.map((p, i) => `${i + 1}. ${p}`).join('\n')}
`;

  return `<pre style="font-family:'JetBrains Mono',ui-monospace,monospace;font-size:13px;line-height:1.55;background:#0d0e0c;color:#f4f5f0;padding:24px;margin:0;white-space:pre-wrap;">${body}</pre>`;
}

export async function POST(req: Request) {
  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const results = {
    formspree: false,
    email_lead: false,
    email_brief: false,
  };

  // 1. Formspree (mismo comportamiento que teníamos, para respaldo histórico)
  if (FORMSPREE_ENDPOINT) {
    try {
      const fs = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      results.formspree = fs.ok;
    } catch {
      // No bloquea el resto
    }
  }

  // 2 y 3. Resend emails
  if (RESEND_API_KEY) {
    const resend = new Resend(RESEND_API_KEY);

    try {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: payload.email,
        subject: 'Tu reporte de ahorro · btiq digital',
        html: buildLeadEmail(payload),
        replyTo: PAOLA_EMAIL,
      });
      results.email_lead = true;
    } catch {
      // No bloquea el brief
    }

    try {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: PAOLA_EMAIL,
        subject: `Nuevo lead · ${payload.nombre} · ${payload.plataforma} · ${payload.ahorro_mensual_est}/mes`,
        html: buildBriefEmail(payload),
        replyTo: payload.email,
      });
      results.email_brief = true;
    } catch {
      // Reportamos silencioso al lead
    }
  }

  return NextResponse.json({ ok: true, ...results });
}
