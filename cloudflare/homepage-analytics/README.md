# Homepage Analytics Worker

Private visit logging for `xzhang9308.github.io`.

## Endpoints

- `POST /collect`: records one visit.
- `GET /admin?token=...`: shows recent visits in a browser table.
- `GET /admin.csv?token=...`: downloads recent visits as CSV.
- `GET /health`: health check.
- `GET /public-stats`: public country/region and city page-view totals for the homepage globe
  (cached for five minutes). No visit-level fields or admin credentials are exposed.

The homepage's expandable Visitor Map uses the existing visit history. Counts are
page views, not deduplicated visitors, and may include bots. Unknown locations remain
in the total and table. Globe markers use city coordinates where available, otherwise country label positions;
small regions missing from the boundary data still appear in the statistics table.
Apply the city-coordinate migration to an existing database, then deploy the Worker before publishing the frontend.

## Deploy

Run from this directory:

```sh
PATH="/Users/zhangxi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/zhangxi/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin:$PATH" pnpm dlx wrangler deploy
```

## Database

Apply the schema:

```sh
PATH="/Users/zhangxi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/Users/zhangxi/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin:$PATH" pnpm dlx wrangler d1 execute homepage-analytics --remote --file schema.sql
```

## Admin Token

The CSV token is stored as the Cloudflare Worker secret `ADMIN_TOKEN`.
Do not commit the token to this repository.

## Public statistics page

`/visitors/` opens in a new tab from the homepage map. `/public-stats` also returns
`periods` (today, yesterday, week, month, views), 30 zero-filled `daily` counts,
per-country counts for each period, and the response generation time. All date
boundaries use Beijing time (UTC+8); 7/30-day ranges include today and the previous
6/29 calendar days. Future-dated records are excluded. The existing `total` and
country `views` fields remain compatible with the homepage globe.

## City geolocation

Following the reference homepage (Reagan1311/reagan1311.github.io), the browser
requests IPv4 from api.ipify.org (1.8 s timeout). The Worker looks it up using
ipwho.is (1.4 s timeout); failures and rate limits fall back to request.cf.
The lookup provider receives the IPv4 address; our database does not store it.
Coordinates are rounded to one decimal place. IP location is approximate and
reflects the network exit (including VPNs). Client-supplied IP is not verified.
Existing city names are displayed; old records without coordinates remain at
country level unless a later visit supplies coordinates for the same city.
Counts remain page views, preserving the existing history and date filters.

For an existing database, apply once before deploying:

```sh
pnpm dlx wrangler d1 migrations apply homepage-analytics --remote
```

For a fresh database, schema.sql already includes these columns; do not reapply
0001_city_coordinates.sql to that schema.

### Mainland connectivity check (2026-11-09)

A read-only test from the SWJTU server used Python urllib with ProxyHandler({}).
Cloudflare trace reported loc=CN. The homepage returned HTTP 200; workers.dev
collector failed with Network unreachable; api.ipify.org refused connection.
The reference stats.genli.top/stats returned HTTP 200 with its allowed Origin.
This is evidence for this tested network, not a nationwide reachability claim.
No Cloudflare zones are currently available in this account. A reachable custom
domain (as used by the reference), or another verified reachable hosting route,
is still needed before mainland recording can be considered working.

## Netlify entry point (2026-11-09)

The mainland reachability issue above is addressed by the production entry point
https://xzhang9308-visitors.netlify.app. It forwards platform-derived city data
through an HMAC-authenticated `/relay-collect` route and proxies public statistics.
See ../../netlify/homepage-analytics/README.md for deployment and mainland test
results. The homepage no longer calls ipify or workers.dev directly. Existing
Cloudflare collection routes remain available for compatibility.
