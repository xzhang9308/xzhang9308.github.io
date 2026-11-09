# Homepage Analytics Worker

Private visit logging for `xzhang9308.github.io`.

## Endpoints

- `POST /collect`: records one visit.
- `GET /admin?token=...`: shows recent visits in a browser table.
- `GET /admin.csv?token=...`: downloads recent visits as CSV.
- `GET /health`: health check.
- `GET /public-stats`: public country/region page-view totals for the homepage globe
  (cached for five minutes). No visit-level fields or admin credentials are exposed.

The homepage's expandable Visitor Map uses the existing visit history. Counts are
page views, not deduplicated visitors, and may include bots. Unknown locations remain
in the total and table. Globe markers use approximate country/region label positions;
small regions missing from the boundary data still appear in the statistics table.
Deploy the Worker before publishing the frontend. No database migration is required.

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
