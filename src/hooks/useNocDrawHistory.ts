import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { expressEntryDraws, type DrawRecord } from "@/data/expressEntryDraws";

export interface NocDrawRow {
  drawNumber: number;
  date: string;
  category: DrawRecord["category"];
  crsMin: number;
  itas: number;
}

/**
 * Returns the Express Entry draw history that explicitly invited this NOC code,
 * sorted newest first. Falls back to filtering by the NOC's category when no
 * explicit mapping exists.
 */
export function useNocDrawHistory(
  code: string | undefined,
  categoryFallback?: DrawRecord["category"],
): NocDrawRow[] {
  const [rows, setRows] = useState<NocDrawRow[]>([]);

  useEffect(() => {
    if (!code) return;
    let cancelled = false;

    (async () => {
      // 1) explicit per-NOC mappings
      const { data: mapped } = await supabase
        .from("draw_noc_codes")
        .select("draw_number")
        .eq("noc_code", code);

      const drawNums = new Set((mapped ?? []).map((r: any) => r.draw_number as number));
      let history: NocDrawRow[] = [];

      if (drawNums.size > 0) {
        // hydrate from DB draws (preferred) but fall back to the static list
        const { data: dbDraws } = await supabase
          .from("express_entry_draws")
          .select("draw_number, draw_date, category, crs_min, itas")
          .in("draw_number", Array.from(drawNums))
          .order("draw_number", { ascending: false });

        if (dbDraws && dbDraws.length > 0) {
          history = dbDraws.map((d: any) => ({
            drawNumber: d.draw_number,
            date: d.draw_date,
            category: d.category,
            crsMin: d.crs_min,
            itas: d.itas,
          }));
        } else {
          history = expressEntryDraws
            .filter((d) => drawNums.has(d.drawNumber))
            .map((d) => ({
              drawNumber: d.drawNumber,
              date: d.date,
              category: d.category,
              crsMin: d.crsMin,
              itas: d.itas,
            }));
        }
      } else if (categoryFallback) {
        // Fallback: any draw in the NOC's category
        history = expressEntryDraws
          .filter((d) => d.category === categoryFallback)
          .map((d) => ({
            drawNumber: d.drawNumber,
            date: d.date,
            category: d.category,
            crsMin: d.crsMin,
            itas: d.itas,
          }));
      }

      if (!cancelled) setRows(history);
    })();

    return () => {
      cancelled = true;
    };
  }, [code, categoryFallback]);

  return rows;
}

/** Lowest CRS from the most-recent draw that included this NOC (or its category fallback). */
export function recentCutoffFromHistory(rows: NocDrawRow[]): NocDrawRow | undefined {
  return rows[0];
}