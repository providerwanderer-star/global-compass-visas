import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { expressEntryDraws } from "@/data/expressEntryDraws";

export interface NocCutoff {
  drawNumber: number;
  category: string;
  crsMin: number;
  date: string;
}

/**
 * Returns a map of nocCode → most recent draw cutoff that included it.
 * One round-trip; safe to call from a list page.
 */
export function useRecentCutoffs(): Record<string, NocCutoff> {
  const [map, setMap] = useState<Record<string, NocCutoff>>({});

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error } = await supabase
        .from("draw_noc_codes")
        .select("draw_number, noc_code, category")
        .order("draw_number", { ascending: false })
        .limit(10000);

      if (cancelled || error || !data) return;

      // Build draw lookup (use static draws for date/crs — they mirror DB).
      const drawByNum = new Map(expressEntryDraws.map((d) => [d.drawNumber, d]));

      const next: Record<string, NocCutoff> = {};
      for (const row of data as any[]) {
        if (next[row.noc_code]) continue; // first hit = newest (sorted desc)
        const draw = drawByNum.get(row.draw_number);
        if (!draw) continue;
        next[row.noc_code] = {
          drawNumber: row.draw_number,
          category: row.category,
          crsMin: draw.crsMin,
          date: draw.date,
        };
      }
      setMap(next);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return map;
}