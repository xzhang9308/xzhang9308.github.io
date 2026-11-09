const ORIGIN = 'https://xzhang9308.github.io';
const UPSTREAM = 'https://homepage-analytics.zx19930818.workers.dev';
const encoder = new TextEncoder();

export default async function analytics(request, context) {
  const path = new URL(request.url).pathname;
  const headers = {
    'access-control-allow-origin': ORIGIN,
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'vary': 'Origin', 'cache-control': 'no-store',
  };
  const json = (value, status = 200) => Response.json(value, { status, headers });
  if (request.headers.get('origin') && request.headers.get('origin') !== ORIGIN) return json({ error: 'Forbidden origin' }, 403);
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
  const geo = context.geo || {};
  const location = {
    country: geo.country?.code || '', region: geo.subdivision?.name || '',
    city: geo.city || '', timezone: geo.timezone || '',
    latitude: geo.latitude ?? null, longitude: geo.longitude ?? null,
  };
  if (path === '/diagnostic' && request.method === 'GET') return json({ country: location.country, city: location.city, source: 'netlify' });
  if (path === '/health' && request.method === 'GET') return json({ ok: true });
  try {
    if (path === '/public-stats' && request.method === 'GET') {
      const response = await fetch(UPSTREAM + '/public-stats', { signal: AbortSignal.timeout(12000) });
      if (!response.ok) return json({ error: 'Statistics unavailable' }, 502);
      return new Response(await response.text(), { headers: { ...headers, 'content-type': 'application/json', 'cache-control': 'public, max-age=60' } });
    }
    if (path !== '/collect' || request.method !== 'POST') return json({ error: 'Not found' }, 404);
    if (Number(request.headers.get('content-length')) > 8192) return json({ error: 'Payload too large' }, 413);
    const text = await request.text();
    if (encoder.encode(text).length > 8192) return json({ error: 'Payload too large' }, 413);
    let payload;
    try { payload = JSON.parse(text); } catch { return json({ error: 'Invalid JSON' }, 400); }
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return json({ error: 'Invalid payload' }, 400);
    // Only platform-derived geolocation is forwarded; client-supplied IP/geo is ignored.
    const body = JSON.stringify({ payload: {
      page: payload.page, title: payload.title, referrer: payload.referrer,
      visitor_label: payload.visitor_label,
    }, location });
    const secret = Netlify.env.get('ANALYTICS_RELAY_SECRET');
    if (!secret) return json({ error: 'Service unavailable' }, 503);
    const timestamp = String(Date.now());
    const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(timestamp + '.' + body));
    const hex = Array.from(new Uint8Array(signature), byte => byte.toString(16).padStart(2, '0')).join('');
    const response = await fetch(UPSTREAM + '/relay-collect', {
      method: 'POST', signal: AbortSignal.timeout(12000), body,
      headers: { 'content-type': 'application/json', 'origin': ORIGIN,
        'x-relay-timestamp': timestamp, 'x-relay-signature': hex,
        'accept-language': request.headers.get('accept-language') || '',
        'user-agent': request.headers.get('user-agent') || '' },
    });
    if (!response.ok) return json({ error: 'Recording unavailable' }, 502);
    return json({ ok: true });
  } catch { return json({ error: 'Service temporarily unavailable' }, 502); }
}
