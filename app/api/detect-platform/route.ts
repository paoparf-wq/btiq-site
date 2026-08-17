import { NextResponse } from 'next/server';

// API route que detecta la plataforma de e-commerce de un sitio.
// POST { url } -> { platform, confidence, hostname, signals }.
//
// Fetch server-side (imposible desde el browser por CORS). Lee hasta 300KB
// del HTML + inspecciona headers. Sistema de scoring: cada patrón matcheado
// suma 1 punto; matchear un header bonifica +2. La plataforma con más
// puntos gana; confidence según puntos totales.
//
// Basado en las firmas del kit oficial de Partners de Tiendanube.

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
  | 'prestashop'
  | 'jumpseller'
  | 'ecwid'
  | 'salesforce'
  | 'other';

type Signature = {
  platform: Platform;
  patterns: string[];
  headers?: string[];
};

const SIGNATURES: Signature[] = [
  {
    platform: 'tiendanube',
    patterns: [
      'mitiendanube.com',
      'tiendanube.com',
      'nuvemshop.com',
      'd2r9epyceweg5n.cloudfront.net',
      'acdn.tiendanube.com',
      'acdn-us.tiendanube.com',
      'ls.registerevent',
    ],
  },
  {
    platform: 'shopify',
    patterns: [
      'cdn.shopify.com',
      'shopify.theme',
      'shopify-features',
      '/cdn/shop/',
      'myshopify.com',
      'shopifycloud',
      'shopify-boomerang',
    ],
    headers: ['x-shopify-stage', 'x-shopid', 'x-shardid'],
  },
  {
    platform: 'vtex',
    patterns: [
      'vtexassets.com',
      'vtexcommercestable',
      'vtex.com.br',
      'vtex-render-runtime',
      '__runtime__',
      'vtexcommercebeta',
    ],
    headers: ['x-vtex-io', 'x-vtex-router-cache', 'x-vtex-backend-io'],
  },
  {
    platform: 'woocommerce',
    patterns: [
      'wp-content/plugins/woocommerce',
      'woocommerce-js',
      'wc-add-to-cart',
      'woocommerce_params',
      'wc_cart_fragments',
    ],
  },
  {
    platform: 'wix',
    patterns: [
      'wixstatic.com',
      'wix-code',
      '_wixcssstates',
      'wixsite.com',
      'parastorage.com',
    ],
    headers: ['x-wix-request-id', 'x-wix-published-version'],
  },
  {
    platform: 'magento',
    patterns: [
      'mage/cookies',
      'magento_ui',
      '/static/version',
      'magento_page_cache',
      'requirejs/require.js',
    ],
  },
  {
    platform: 'squarespace',
    patterns: [
      'squarespace.com',
      'static1.squarespace.com',
      'static.squarespace_context',
    ],
  },
  {
    platform: 'bigcommerce',
    patterns: ['bigcommerce.com', 'cdn11.bigcommerce.com', 'stencil-utils'],
  },
  {
    platform: 'prestashop',
    patterns: ['prestashop', '/modules/ps_'],
  },
  {
    platform: 'jumpseller',
    patterns: ['jumpseller.com', 'cdn.jumpseller'],
  },
  {
    platform: 'ecwid',
    patterns: ['ecwid.com', 'ec-storefront'],
  },
  {
    platform: 'salesforce',
    patterns: [
      'demandware.static',
      'dwstatic',
      '/on/demandware.store/',
    ],
  },
];

function normalize(input: string): string | null {
  let s = String(input || '').trim().toLowerCase();
  if (!s) return null;
  s = s
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split('?')[0];
  if (!/^[a-z0-9][a-z0-9.-]{2,252}\.[a-z]{2,24}$/.test(s)) return null;
  return s;
}

// SSRF guard: bloquear IPs y hostnames de redes internas
function isPrivate(host: string) {
  return /^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|\[?::1)/.test(
    host,
  );
}

async function fetchHead(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent':
          'Mozilla/5.0 (compatible; btiq-diagnostic/1.0; +https://btiq.mx)',
        accept: 'text/html,application/xhtml+xml',
        'accept-language': 'es-MX,es;q=0.9',
      },
    });
    // 300KB alcanzan: las firmas viven en el <head> y en los scripts de arriba
    const buf = await res.arrayBuffer();
    const html = Buffer.from(buf.slice(0, 300 * 1024)).toString('utf8');
    return { html, headers: res.headers, status: res.status };
  } finally {
    clearTimeout(timeout);
  }
}

function analyze(html: string, headers: Headers) {
  const hay = html.toLowerCase();
  const hs: Record<string, string> = {};
  headers.forEach((v, k) => {
    hs[k.toLowerCase()] = String(v).toLowerCase();
  });
  const hsBlob = Object.entries(hs)
    .map(([k, v]) => `${k}:${v}`)
    .join(' ');

  let best: {
    platform: Platform;
    signals: string[];
    points: number;
  } | null = null;

  for (const sig of SIGNATURES) {
    const signals: string[] = [];
    for (const p of sig.patterns) {
      if (hay.includes(p)) signals.push(p);
    }
    for (const h of sig.headers ?? []) {
      if (hsBlob.includes(h)) signals.push('header:' + h);
    }
    if (!signals.length) continue;
    const points =
      signals.length +
      (sig.headers && signals.some((s) => s.startsWith('header:')) ? 2 : 0);
    if (!best || points > best.points) {
      best = { platform: sig.platform, signals, points };
    }
  }

  if (!best) return null;
  const confidence: 'high' | 'medium' | 'low' =
    best.points >= 3 ? 'high' : best.points === 2 ? 'medium' : 'low';
  return {
    platform: best.platform,
    confidence,
    signals: best.signals.slice(0, 5),
  };
}

type DetectResult = {
  platform: Platform;
  confidence: 'high' | 'medium' | 'low';
  hostname: string;
  signals?: string[];
};

export async function POST(req: Request) {
  let body: { url?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const hostname = body.url ? normalize(body.url) : null;
  if (!hostname) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }
  if (isPrivate(hostname)) {
    return NextResponse.json({ error: 'Forbidden host' }, { status: 400 });
  }

  // Hostname puede delatar la plataforma sin necesidad de fetch
  if (/\.myshopify\.com$/i.test(hostname)) {
    return NextResponse.json<DetectResult>({
      platform: 'shopify',
      confidence: 'high',
      hostname,
    });
  }
  if (/\.mitiendanube\.com$/i.test(hostname) || /\.nuvemshop\.com/i.test(hostname)) {
    return NextResponse.json<DetectResult>({
      platform: 'tiendanube',
      confidence: 'high',
      hostname,
    });
  }

  // Intentar https, luego http como fallback
  for (const scheme of ['https://', 'http://']) {
    try {
      const r = await fetchHead(scheme + hostname);
      const hit = analyze(r.html, r.headers);
      return NextResponse.json<DetectResult>({
        platform: hit?.platform ?? 'other',
        confidence: hit?.confidence ?? 'low',
        hostname,
        signals: hit?.signals,
      });
    } catch {
      // intenta el siguiente esquema
    }
  }

  return NextResponse.json<DetectResult>({
    platform: 'other',
    confidence: 'low',
    hostname,
  });
}
