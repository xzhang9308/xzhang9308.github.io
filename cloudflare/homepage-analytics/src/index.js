const CSV_COLUMNS = [
  "visited_at",
  "page",
  "title",
  "referrer",
  "source",
  "country",
  "region",
  "city",
  "timezone",
  "colo",
  "language",
  "user_agent",
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(request, env) });
    }

    if (url.pathname === "/collect" && request.method === "POST") {
      return collectVisit(request, env);
    }

    if (url.pathname === "/admin.csv" && request.method === "GET") {
      return exportCsv(request, env);
    }

    if (url.pathname === "/health" && request.method === "GET") {
      return jsonResponse({ ok: true }, request, env);
    }

    return jsonResponse({ error: "Not found" }, request, env, 404);
  },
};

async function collectVisit(request, env) {
  if (!isAllowedOrigin(request, env)) {
    return jsonResponse({ error: "Forbidden origin" }, request, env, 403);
  }

  let payload = {};
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON" }, request, env, 400);
  }

  const cf = request.cf || {};
  const page = cleanText(payload.page, 2048) || "/";
  const title = cleanText(payload.title, 512);
  const referrer = cleanText(payload.referrer, 2048);
  const source = cleanText(sourceFromReferrer(referrer), 256);
  const language = cleanText(request.headers.get("accept-language"), 512);
  const userAgent = cleanText(request.headers.get("user-agent"), 1024);

  await env.DB.prepare(
    `INSERT INTO visits (
      visited_at, page, title, referrer, source, country, region, city,
      timezone, colo, language, user_agent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      new Date().toISOString(),
      page,
      title,
      referrer,
      source,
      cleanText(cf.country, 128),
      cleanText(cf.region, 256),
      cleanText(cf.city, 256),
      cleanText(cf.timezone, 128),
      cleanText(cf.colo, 64),
      language,
      userAgent
    )
    .run();

  return jsonResponse({ ok: true }, request, env);
}

async function exportCsv(request, env) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || "";

  if (!env.ADMIN_TOKEN || token !== env.ADMIN_TOKEN) {
    return new Response("Unauthorized\n", {
      status: 401,
      headers: {
        ...corsHeaders(request, env),
        "content-type": "text/plain; charset=utf-8",
      },
    });
  }

  const limit = clampNumber(url.searchParams.get("limit"), 1, 50000, 10000);
  const { results } = await env.DB.prepare(
    `SELECT ${CSV_COLUMNS.join(", ")}
     FROM visits
     ORDER BY visited_at DESC
     LIMIT ?`
  )
    .bind(limit)
    .all();

  const rows = [CSV_COLUMNS.join(",")];
  for (const row of results || []) {
    rows.push(CSV_COLUMNS.map((column) => csvCell(row[column])).join(","));
  }

  return new Response(`${rows.join("\n")}\n`, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="homepage-visits.csv"',
      "cache-control": "no-store",
    },
  });
}

function jsonResponse(data, request, env, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...corsHeaders(request, env),
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function corsHeaders(request, env) {
  const origin = request.headers.get("origin") || "";
  const allowedOrigin = env.ALLOWED_ORIGIN || "https://xzhang9308.github.io";
  return {
    "access-control-allow-origin": origin === allowedOrigin ? origin : allowedOrigin,
    "access-control-allow-methods": "POST, GET, OPTIONS",
    "access-control-allow-headers": "content-type",
    "vary": "Origin",
  };
}

function isAllowedOrigin(request, env) {
  const origin = request.headers.get("origin");
  return !origin || origin === (env.ALLOWED_ORIGIN || "https://xzhang9308.github.io");
}

function sourceFromReferrer(referrer) {
  if (!referrer) return "direct";

  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (!host) return "direct";
    if (host.includes("google.")) return "google";
    if (host.includes("github.")) return "github";
    if (host.includes("bing.")) return "bing";
    if (host.includes("baidu.")) return "baidu";
    if (host.includes("linkedin.")) return "linkedin";
    if (host.includes("twitter.") || host.includes("x.com")) return "x";
    return host;
  } catch {
    return "unknown";
  }
}

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, maxLength).trim();
}

function csvCell(value) {
  const text = value == null ? "" : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function clampNumber(value, min, max, fallback) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(Math.max(number, min), max);
}
