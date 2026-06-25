import { NextResponse } from 'next/server';

// Endpoint que envía cada lead del formulario de contacto a HubSpot CRM
// usando la API de Formularios de HubSpot (Forms Submissions API).
//
// NO requiere token secreto ni "Private App": solo el Portal ID (público) y
// el GUID de un formulario creado gratis en HubSpot. Al enviar, HubSpot crea
// o actualiza automáticamente el contacto en el CRM.
//
// Configurar la variable de entorno HUBSPOT_FORM_GUID con el ID del formulario.
// Si no está configurada, el endpoint responde { skipped } sin romper el flujo
// (Formspree sigue capturando el lead).

export const runtime = 'nodejs';

const PORTAL_ID = process.env.HUBSPOT_PORTAL_ID ?? '51657541';
const FORM_GUID = process.env.HUBSPOT_FORM_GUID;

type LeadPayload = {
  nombre?: string;
  email?: string;
  empresa?: string;
  telefono?: string;
  servicios?: string;
};

export async function POST(req: Request) {
  if (!FORM_GUID) {
    return NextResponse.json({ ok: true, skipped: true }, { status: 200 });
  }

  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 });
  }

  const email = (body.email ?? '').trim();
  if (!email) {
    return NextResponse.json({ ok: false, error: 'missing_email' }, { status: 400 });
  }

  const nombre = (body.nombre ?? '').trim();
  const [firstname, ...rest] = nombre.split(/\s+/);
  const empresa = (body.empresa ?? '').trim();

  // Los "name" deben coincidir con los campos del formulario en HubSpot.
  // El formulario tiene: firstname, lastname, email, phone, message.
  // La empresa se incluye dentro del mensaje (el form no tiene campo company).
  const fields = [
    { name: 'email', value: email },
    { name: 'firstname', value: firstname ?? '' },
    { name: 'lastname', value: rest.join(' ') },
    { name: 'phone', value: (body.telefono ?? '').trim() },
    {
      name: 'message',
      value: `Empresa: ${empresa || '—'} | Servicios de interés: ${
        body.servicios ?? '—'
      } (Lead desde btiq.mx)`,
    },
  ].filter((f) => f.value);

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_GUID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields,
          context: { pageName: 'btiq.mx — Contacto' },
        }),
      },
    );

    if (res.ok) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { ok: false, error: 'hubspot_error', status: res.status },
      { status: 502 },
    );
  } catch {
    return NextResponse.json({ ok: false, error: 'network' }, { status: 502 });
  }
}
