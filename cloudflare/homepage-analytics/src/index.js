const SELECT_COLUMNS = [
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
  "visitor_label",
  "language",
  "user_agent",
];

const CSV_COLUMNS = ["visited_at_beijing", ...SELECT_COLUMNS.slice(1)];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(request, env) });
    }

    if (url.pathname === "/collect" && request.method === "POST") {
      return collectVisit(request, env);
    }

    if (url.pathname === "/collect.gif" && request.method === "GET") {
      return collectVisit(request, env, "pixel");
    }

    if (url.pathname === "/admin.csv" && request.method === "GET") {
      return exportCsv(request, env);
    }

    if (url.pathname === "/admin" && request.method === "GET") {
      return exportHtml(request, env);
    }

    if (url.pathname === "/health" && request.method === "GET") {
      return jsonResponse({ ok: true }, request, env);
    }

    return jsonResponse({ error: "Not found" }, request, env, 404);
  },
};

async function collectVisit(request, env, responseType = "json") {
  if (!isAllowedOrigin(request, env)) {
    return jsonResponse({ error: "Forbidden origin" }, request, env, 403);
  }

  const url = new URL(request.url);
  const payload = request.method === "GET" ? payloadFromQuery(url) : await payloadFromJson(request);
  if (!payload) return jsonResponse({ error: "Invalid JSON" }, request, env, 400);

  const cf = request.cf || {};
  const page = cleanText(payload.page, 2048) || "/";
  const title = cleanText(payload.title, 512);
  const referrer = cleanText(payload.referrer || request.headers.get("referer"), 2048);
  const source = cleanText(sourceFromReferrer(referrer), 256);
  const visitorLabel = cleanText(payload.visitor_label, 128);
  const language = cleanText(request.headers.get("accept-language"), 512);
  const userAgent = cleanText(request.headers.get("user-agent"), 1024);

  await env.DB.prepare(
    `INSERT INTO visits (
      visited_at, page, title, referrer, source, country, region, city,
      timezone, colo, visitor_label, language, user_agent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
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
      visitorLabel,
      language,
      userAgent
    )
    .run();

  if (responseType === "pixel") {
    return new Response(transparentGif(), {
      headers: {
        "content-type": "image/gif",
        "cache-control": "no-store",
      },
    });
  }

  return jsonResponse({ ok: true }, request, env);
}

async function payloadFromJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

function payloadFromQuery(url) {
  return {
    page: url.searchParams.get("page") || "",
    title: url.searchParams.get("title") || "",
    referrer: url.searchParams.get("referrer") || "",
    visitor_label: url.searchParams.get("visitor_label") || "",
  };
}

async function exportCsv(request, env) {
  const url = new URL(request.url);

  if (!isAuthorizedAdmin(url, env)) {
    return unauthorizedResponse(request, env);
  }

  const limit = clampNumber(url.searchParams.get("limit"), 1, 50000, 10000);
  const { results } = await env.DB.prepare(
    `SELECT ${SELECT_COLUMNS.join(", ")}
     FROM visits
     ORDER BY visited_at DESC
     LIMIT ?`
  )
    .bind(limit)
    .all();

  const rows = [CSV_COLUMNS.join(",")];
  for (const row of results || []) {
    rows.push(csvRow(row));
  }

  return new Response(`${rows.join("\n")}\n`, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="homepage-visits.csv"',
      "cache-control": "no-store",
    },
  });
}

async function exportHtml(request, env) {
  const url = new URL(request.url);

  if (!isAuthorizedAdmin(url, env)) {
    return unauthorizedResponse(request, env);
  }

  const limit = clampNumber(url.searchParams.get("limit"), 1, 500, 100);
  const [{ total }, { results }] = await Promise.all([
    env.DB.prepare("SELECT COUNT(*) AS total FROM visits").first(),
    env.DB.prepare(
      `SELECT ${SELECT_COLUMNS.join(", ")}
       FROM visits
       ORDER BY visited_at DESC
       LIMIT ?`
    )
      .bind(limit)
      .all(),
  ]);

  const token = url.searchParams.get("token") || "";
  const csvUrl = `/admin.csv?token=${encodeURIComponent(token)}&limit=10000`;
  const rows = (results || [])
    .map(
      (row) => `<tr>
        <td>${escapeHtml(formatBeijingTime(row.visited_at))}</td>
        <td>${escapeHtml(row.visitor_label)}</td>
        <td class="wrap">${escapeHtml(row.page)}</td>
        <td>${escapeHtml(row.source)}</td>
        <td>${escapeHtml(row.country)}</td>
        <td>${escapeHtml(row.region)}</td>
        <td>${escapeHtml(row.city)}</td>
        <td>${escapeHtml(row.timezone)}</td>
        <td class="wrap">${escapeHtml(row.referrer)}</td>
        <td class="wrap">${escapeHtml(row.user_agent)}</td>
      </tr>`
    )
    .join("");

  return new Response(
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Homepage Visits</title>
  <style>
    body { color: #172026; font: 14px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 0; }
    header { align-items: center; border-bottom: 1px solid #d9e1e8; display: flex; gap: 16px; justify-content: space-between; padding: 16px 20px; }
    h1 { font-size: 18px; margin: 0; }
    main { padding: 16px 20px 28px; }
    .meta { color: #52616d; display: flex; flex-wrap: wrap; gap: 12px; margin-top: 4px; }
    a { color: #0b5cad; text-decoration: none; }
    a:hover { text-decoration: underline; }
    table { border-collapse: collapse; min-width: 1180px; width: 100%; }
    th, td { border-bottom: 1px solid #e6edf2; padding: 9px 10px; text-align: left; vertical-align: top; }
    th { background: #f5f7f9; color: #34424d; font-size: 12px; position: sticky; top: 0; }
    .table-wrap { border: 1px solid #d9e1e8; overflow: auto; }
    .wrap { max-width: 280px; overflow-wrap: anywhere; }
    .empty { color: #52616d; padding: 24px 0; }
  </style>
</head>
<body>
  <header>
    <div>
      <h1>Homepage Visits</h1>
      <div class="meta">
        <span>Total: ${escapeHtml(total)}</span>
        <span>Showing latest: ${escapeHtml((results || []).length)}</span>
        <span>Limit: ${escapeHtml(limit)}</span>
      </div>
    </div>
    <a href="${escapeHtml(csvUrl)}">Download CSV</a>
  </header>
  <main>
    ${
      rows
        ? `<div class="table-wrap"><table>
      <thead>
        <tr>
          <th>Time (Beijing)</th>
          <th>Visitor</th>
          <th>Page</th>
          <th>Source</th>
          <th>Country</th>
          <th>Region</th>
          <th>City</th>
          <th>Timezone</th>
          <th>Referrer</th>
          <th>User Agent</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table></div>`
        : `<div class="empty">No visits recorded yet.</div>`
    }
  </main>
</body>
</html>`,
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
      },
    }
  );
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

function isAuthorizedAdmin(url, env) {
  const token = url.searchParams.get("token") || "";
  return Boolean(env.ADMIN_TOKEN && token === env.ADMIN_TOKEN);
}

function unauthorizedResponse(request, env) {
  return new Response("Unauthorized\n", {
    status: 401,
    headers: {
      ...corsHeaders(request, env),
      "content-type": "text/plain; charset=utf-8",
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

function csvRow(row) {
  return CSV_COLUMNS.map((column) => {
    if (column === "visited_at_beijing") return csvCell(formatBeijingTime(row.visited_at));
    return csvCell(row[column]);
  }).join(",");
}

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatBeijingTime(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date(value));
}

function transparentGif() {
  return Uint8Array.from([
    71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 128, 0, 0, 0, 0, 0, 255, 255, 255,
    33, 249, 4, 1, 0, 0, 0, 0, 44, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 2, 68,
    1, 0, 59,
  ]);
}

function clampNumber(value, min, max, fallback) {
  const number = Number.parseInt(value, 10);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(Math.max(number, min), max);
}
