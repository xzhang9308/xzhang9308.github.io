# Netlify analytics entry point

Production: https://xzhang9308-visitors.netlify.app

Netlify project ID: `7a5548ce-680a-4996-b7d5-89eb12806c52`.

Deploy this directory as a separate **Free** Netlify project. The academic site
stays on GitHub Pages. Both collection and public statistics use the assigned
`https://<project>.netlify.app` URL; no purchased domain is required.

## Data flow

- `POST /collect` takes the page metadata already collected by the homepage.
- Geolocation comes exclusively from Netlify `context.geo`, not browser input.
- The relay signs the body and timestamp with HMAC SHA-256, then sends it to the
  existing Cloudflare Worker's `/relay-collect` endpoint. Its D1 history is kept.
- Cloudflare verifies the signature and a 60-second timestamp window before
  recording the visit with `location_source = netlify`.
- No visitor IP is sent to the Worker or stored in D1. Coordinates are rounded
  to one decimal place by the Worker. The browser no longer depends on ipify.
- `GET /public-stats` proxies only public aggregates. Admin routes are never
  exposed by the relay. A failed upstream write returns 502, never false success.
- `GET /diagnostic` returns the caller's country/city without inserting a visit.

## Deployment

1. Set the same random `ANALYTICS_RELAY_SECRET` as a Cloudflare Worker secret and
   Netlify runtime environment variable. Never commit it or expose it to browsers.
2. Deploy the updated Worker and then this directory using Netlify CLI.
3. Test `/diagnostic`, collection, and database insertion from a mainland host
   with explicit proxies disabled. An HTTP 200 health check alone is insufficient.
4. Change `homepage_analytics_endpoint` in `_config.yml` to the deployed Netlify
   `/collect` URL, then publish the homepage.

Use the Free plan's hard spending limit. This project serves only tiny API
responses, not the homepage's static assets. Quota exhaustion pauses the service.
Reachability on one mainland network does not guarantee every ISP or future date.

## Tests

From the repository root:

```sh
node netlify/homepage-analytics/tests/relay.mjs
```

The test sends the relay's actual signed payload through the Worker handler and
checks the recorded city, rejects altered/expired/unsigned payloads, verifies
client-supplied location is ignored, and covers request/upstream failure handling.

## Verified deployment — 2026-11-09

- Netlify production deploy: `6af1b24f0f59ebf662ce13c6`.
- Production visibility: Public; deploy previews: Private.
- Free team allowance verified: 300 credits; overages disabled.
- Mainland test: SWJTU host, Python urllib `ProxyHandler({})`; Cloudflare trace
  confirmed `loc=CN`, `warp=off`. No raw IP is included in this report.
- `/diagnostic`: HTTP 200, `CN`, `Chengdu`.
- `/collect`: HTTP 200, `ok=true`.
- Public totals: 1375 → 1376; China: 0 → 1.
- City aggregate: Chengdu / Sichuan / CN, coordinates 30.7, 104.1;
  today/week/month/all-time each 1.
- One clearly labelled verification visit is retained in the history as
  `netlify-cn-verification-20261109`.

This verifies the actual collection-to-database-to-public-statistics path on the
tested mainland network. It does not guarantee every ISP or future availability.
