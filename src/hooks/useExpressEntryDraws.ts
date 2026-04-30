import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { expressEntryDraws as staticDraws, type DrawRecord } from "@/data/expressEntryDraws";

function formatDate(iso: string): string {
  // "2026-04-30" -> "April 30, 2026" to match static format
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/**
 * Hybrid hook: returns Supabase data when available, falls back to bundled static array.
 * Keeps the same DrawRecord shape so consuming components need no other change.
 */
export function useExpressEntryDraws(): DrawRecord[] {
  const [draws, setDraws] = useState<DrawRecord[]>(staticDraws);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("express_entry_draws")
      .select("draw_number, draw_date, category, crs_min, itas, tie_break")
      .order("draw_number", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled || error || !data || data.length === 0) return;
        const mapped: DrawRecord[] = data.map((r: any) => ({
          drawNumber: r.draw_number,
          date: formatDate(r.draw_date),
          category: r.category,
          crsMin: r.crs_min,
          itas: r.itas,
          tieBreak: r.tie_break ?? undefined,
        }));
        setDraws(mapped);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return draws;
}