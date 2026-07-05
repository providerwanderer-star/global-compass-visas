// Google Search Console analytics proxy.
//
// Admin-only. Verifies the caller's JWT + admin role, then calls the
// Search Console API via the Lovable connector gateway using
// LOVABLE_API_KEY + GOOGLE_SEARCH_CONSOLE_API_KEY (auto-injected when
// the connector is linked to this project).
//
// Actions:
//   { action: "sites" }
//     → returns { siteEntry: [{ siteUrl, permissionLevel }] }
//   { action: "search_analytics", siteUrl, startDate, endDate, dimensions?, rowLimit? }
//     → returns { rows: [...] } from searchAnalytics/query

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function requireAdmin(req: Request): Promise<{ ok: true } | { ok: false; res: Response }> {
  const authHeader = req.headers.get("Authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (!token) return { ok: false, res: json({ error: "Missing bearer token" }, 401) };

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const { data: userData, error: userErr } = await supabase.auth.getUser(token);
  if (userErr || !userData?.user) return { ok: false, res: json({ error: "Invalid session" }, 401) };

  const { data: role, error: roleErr } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userData.user.id)
    .eq("role", "admin")
    .maybeSingle();
  if (roleErr || !role) return { ok: false, res: json({ error: "Admin access required" }, 403) };

  return { ok: true };
}

async function gscFetch(path: string, init: RequestInit = {}) {
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");
  const gscKey = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
  if (!lovableKey || !gscKey) {
    return { status: 503, body: { error: "GSC connector is not configured" } };
  }
  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gscKey,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }
  return { status: res.status, body };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const gate = await requireAdmin(req);
  if (!gate.ok) return gate.res;

  let payload: Record<string, unknown> = {};
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Body must be JSON" }, 400);
  }
  const action = String(payload.action ?? "");

  if (action === "sites") {
    const { status, body } = await gscFetch("/webmasters/v3/sites");
    return json(body, status);
  }

  if (action === "search_analytics") {
    const siteUrl = String(payload.siteUrl ?? "");
    const startDate = String(payload.startDate ?? "");
    const endDate = String(payload.endDate ?? "");
    if (!siteUrl || !startDate || !endDate) {
      return json({ error: "siteUrl, startDate, endDate required" }, 400);
    }
    const dimensions = Array.isArray(payload.dimensions) ? payload.dimensions : [];
    const rowLimit = typeof payload.rowLimit === "number" ? payload.rowLimit : 25;
    const encoded = encodeURIComponent(siteUrl);
    const { status, body } = await gscFetch(
      `/webmasters/v3/sites/${encoded}/searchAnalytics/query`,
      {
        method: "POST",
        body: JSON.stringify({ startDate, endDate, dimensions, rowLimit }),
      },
    );
    return json(body, status);
  }

  return json({ error: `Unknown action: ${action}` }, 400);
});