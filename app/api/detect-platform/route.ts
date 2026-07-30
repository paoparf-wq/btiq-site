import { NextResponse } from 'next/server';

// API route que detecta la plataforma de e-commerce de un sitio.
// Recibe { url } y devuelve { platform, confidence, hostname }.
// Fetch server-side al HTML del sitio, busca patrones típicos.
// Timeout de 6s para no colgar la UI. Sin cache — el resultado importa
// que sea correcto en el momento, no rápido.

export const runtime = 'nodejs';
export const maxDuration = 10;

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

type DetectResult = {
  platform: Platform;
  confidence: 'high' | 'medium' | 'low';
  hostname: string;
};

// Patrones ordenados por prioridad — los primeros son señales más fuertes.
const PATTERNS: {
  platform: Platform;
  confidence: 'high' | 'medium';
  needles: RegExp[];
}[] = [
  {
    platform: 'shopify',
    confidence: 'high',
    needles: [
      /myshopify\.com/i,
      /cdn\.shopify\.com/i,
      /Shopify\.theme/,
      /window\.Shopify/,
      /shopify-section/i,
    ],
  },
  {
    platform: 'tiendanube',
    confidence: 'high',
    needles: [
      /mitiendanube\.com/i,
      /tiendanube\.com\/js/i,
      /nuvem-shop|tiendanube-store/i,
    ],
  },
  {
    platform: 'woocommerce',
    confidence: 'high',
    needles: [
      /wp-content\/plugins\/woocommerce/i,
      /wc-add-to-cart|woocommerce-page/i,
      /generator.*WooCommerce/i,
    ],
  },
  {
    platform: 'vtex',
    confidence: 'high',
    needles: [/vtexcommercestable\.com\.br/i, /vtex\.com\.br/i, /vtex-io/i],
  },
  {
    platform: 'wix',
    confidence: 'high',
    needles: [
      /static\.parastorage\.com/i,
      /wix\.com/i,
      /wixstatic\.com/i,
      /X-Wix-Request-Id/i,
    ],
  },
  {
    platform: 'magento',
    confidence: 'high',
    needles: [/mage-cache-storage/i, /Magento_/, /magentocloud/i],
  },
  {
    platform: 'squarespace',
    confidence: 'high',
    needles: [/squarespace\.com/i, /static1\.squarespace\.com/i],
  },
  {
    platform: 'bigcommerce',
    confidence: 'high',
    needles: [/bigcommerce\.com/i, /cdn\d*\.bcapp\.dev/i],
  },
];

function normalizeUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  // Agregar https:// si falta protocolo
  const withProto = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const u = new URL(withProto);
    // Solo http(s)
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return null;
    // Solo dominios con al menos un punto (evita "localhost" y strings raros)
    if (!u.hostname.includes('.')) return null;
    return u.toString();
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const targetUrl = body.url ? normalizeUrl(body.url) : null;
  if (!targetUrl) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  const hostname = new URL(targetUrl).hostname;

  // Shortcut: si el hostname mismo ya delata la plataforma
  if (/\.myshopify\.com$/i.test(hostname)) {
    return NextResponse.json<DetectResult>({
      platform: 'shopify',
      confidence: 'high',
      hostname,
    });
  }
  if (/mitiendanube\.com$/i.test(hostname)) {
    return NextResponse.json<DetectResult>({
      platform: 'tiendanube',
      confidence: 'high',
      hostname,
    });
  }

  // Fetch con timeout
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        // User-Agent realista — algunos sitios bloquean fetches sin UA
        'User-Agent':
          'Mozilla/5.0 (compatible; btiq-diagnostic/1.0; +https://btiq.mx)',
        Accept: 'text/html,application/xhtml+xml',
      },
      // Redirects (301/302) se siguen por default hasta 20 saltos
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json<DetectResult>({
        platform: 'other',
        confidence: 'low',
        hostname,
      });
    }

    // Solo leemos los primeros 150KB del HTML — los patterns viven en el
    // <head> y los primeros scripts, no hace falta bajar todo el sitio
    const reader = res.body?.getReader();
    if (!reader) {
      return NextResponse.json<DetectResult>({
        platform: 'other',
        confidence: 'low',
        hostname,
      });
    }

    const decoder = new TextDecoder('utf-8');
    let html = '';
    const CAP = 150 * 1024;
    while (html.length < CAP) {
      const { done, value } = await reader.read();
      if (done) break;
      html += decoder.decode(value, { stream: true });
    }
    await reader.cancel().catch(() => {});

    // Buscar el primer patrón que matchee
    for (const p of PATTERNS) {
      for (const needle of p.needles) {
        if (needle.test(html)) {
          return NextResponse.json<DetectResult>({
            platform: p.platform,
            confidence: p.confidence,
            hostname,
          });
        }
      }
    }

    return NextResponse.json<DetectResult>({
      platform: 'other',
      confidence: 'low',
      hostname,
    });
  } catch (err) {
    clearTimeout(timeout);
    // Timeout, DNS fail, CORS, etc. — respondemos 'other' para que la UI
    // caiga al fallback de preguntar la plataforma manualmente.
    return NextResponse.json<DetectResult>({
      platform: 'other',
      confidence: 'low',
      hostname,
    });
  }
}
