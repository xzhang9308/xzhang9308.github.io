import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const moduleFrom = async (url) => import('data:text/javascript;base64,' + Buffer.from(await readFile(url)).toString('base64'));
const { default: relay } = await moduleFrom(new URL('../edge-functions/analytics.js', import.meta.url));
const { default: worker } = await moduleFrom(new URL('../../../cloudflare/homepage-analytics/src/index.js', import.meta.url));
const secret = 'test-only-secret';
globalThis.Netlify = { env: { get: () => secret } };
let rows = [], upstream;
const DB = { prepare() { return { bind(...values) { return { async run() { rows.push(values); } }; } }; } };
const env = { DB, ANALYTICS_RELAY_SECRET: secret };
globalThis.fetch = async (url, options) => { upstream = { url, options }; return worker.fetch(new Request(url, options), env); };
const request = () => new Request('https://test.netlify.app/collect', {
  method: 'POST', headers: { origin: 'https://xzhang9308.github.io' },
  body: JSON.stringify({ page: '/relay-test', city: 'Fake city', ipv4: '8.8.8.8' }),
});
const context = { geo: { country: { code: 'CN' }, city: 'Chengdu', subdivision: { name: 'Sichuan' }, latitude: 30.6667, longitude: 104.0667, timezone: 'Asia/Shanghai' } };
assert.equal((await relay(request(), context)).status, 200);
assert.equal(rows.length, 1); assert.equal(rows[0][5], 'CN'); assert.equal(rows[0][7], 'Chengdu');
assert.equal(rows[0][13], 30.7); assert.equal(rows[0][15], 'netlify');
assert(!upstream.options.body.includes('8.8.8.8'));
const tampered = new Request(upstream.url, { ...upstream.options, body: upstream.options.body.replace('Chengdu', 'Fake city') });
assert.equal((await worker.fetch(tampered, env)).status, 401);
const expired = new Request(upstream.url, { ...upstream.options, headers: { ...upstream.options.headers, 'x-relay-timestamp': '1' } });
assert.equal((await worker.fetch(expired, env)).status, 401);
assert.equal(rows.length, 1);
assert.equal((await worker.fetch(new Request(upstream.url, { method: 'POST', body: '{}' }), env)).status, 401);
assert.equal((await relay(new Request('https://test.netlify.app/admin'), context)).status, 404);
assert.equal((await relay(new Request('https://test.netlify.app/collect', { method: 'POST', body: 'invalid' }), context)).status, 400);
assert.equal((await relay(new Request('https://test.netlify.app/collect', { method: 'POST', headers: { origin: 'https://other.example' }, body: '{}' }), context)).status, 403);
assert.equal((await relay(new Request('https://test.netlify.app/collect', { method: 'POST', body: 'x'.repeat(8193) }), context)).status, 413);
globalThis.fetch = async () => { throw Error('upstream unavailable'); };
assert.equal((await relay(request(), context)).status, 502);
assert.equal(rows.length, 1);
console.log('PASS: signed city ingestion, client geo ignored, forged/expired/unsigned rejection, origin/body limits, no admin proxy, upstream failure');
