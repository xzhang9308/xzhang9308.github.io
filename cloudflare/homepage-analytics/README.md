# Homepage Analytics Worker

Private visit logging for `xzhang9308.github.io`.

## Endpoints

- `POST /collect`: records one visit.
- `GET /admin.csv?token=...`: downloads recent visits as CSV.
- `GET /health`: health check.

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
