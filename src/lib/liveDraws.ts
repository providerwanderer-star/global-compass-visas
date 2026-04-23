/**
 * liveDraws — fetch latest Express Entry & PNP draws from Supabase.
 * Falls back to the bundled static arrays if the DB is unreachable
 * (offline, edge cache cold, etc.) so the UI never blanks out.
 */
import { supabase } from "@/integrations/supabase/client";
import {
  expressEntryDraws as staticEEDraws,
  type DrawRecord,
} from "@/data/expressEntryDraws";
import { pnpDraws as staticPnpDraws, type PNPDraw } from "@/data/pnpDraws";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
function isoToHuman(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export async function fetchLiveExpressEntryDraws(limit = 25): Promise<DrawRecord[]> {
  try {
    const { data, error } = await supabase
      .from("express_entry_draws")
      .select("draw_number, draw_date, category, crs_min, itas")
      .order("draw_date", { ascending: false })
      .limit(limit);
    if (error || !data || data.length === 0) throw error ?? new Error("empty");
    return data.map((r): DrawRecord => ({
      drawNumber: r.draw_number,
      date: isoToHuman(r.draw_date),
      category: r.category as DrawRecord["category"],
      crsMin: r.crs_min,
      itas: r.itas,
    }));
  } catch (e) {
    console.warn("[liveDraws] EE fetch failed, using static fallback:", e);
    return staticEEDraws.slice(0, limit);
  }
}

export async function fetchLivePnpDraws(limit = 25): Promise<PNPDraw[]> {
  try {
    const { data, error } = await supabase
      .from("pnp_draws")
      .select("province, province_code, stream, draw_date, invitations, min_score, notes, source_url")
      .order("draw_date", { ascending: false })
      .limit(limit);
    if (error || !data || data.length === 0) throw error ?? new Error("empty");
    return data.map((r): PNPDraw => ({
      province: r.province,
      provinceCode: r.province_code,
      stream: r.stream,
      date: isoToHuman(r.draw_date),
      invitations: r.invitations,
      minScore: r.min_score ?? undefined,
      officialUrl: r.source_url ?? "",
      notes: r.notes ?? undefined,
    }));
  } catch (e) {
    console.warn("[liveDraws] PNP fetch failed, using static fallback:", e);
    return staticPnpDraws.slice(0, limit);
  }
}