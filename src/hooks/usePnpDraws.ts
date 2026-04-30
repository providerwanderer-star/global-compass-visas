import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { pnpDraws as staticPnp, type PNPDraw } from "@/data/pnpDraws";

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function usePnpDraws(): PNPDraw[] {
  const [draws, setDraws] = useState<PNPDraw[]>(staticPnp);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("pnp_draws")
      .select("province, province_code, stream, draw_date, min_score, invitations, source_url, notes")
      .order("draw_date", { ascending: false })
      .then(({ data, error }) => {
        if (cancelled || error || !data || data.length === 0) return;
        const mapped: PNPDraw[] = data.map((r: any) => ({
          province: r.province,
          provinceCode: r.province_code,
          stream: r.stream,
          date: formatDate(r.draw_date),
          minScore: r.min_score ?? undefined,
          invitations: r.invitations,
          officialUrl: r.source_url ?? "",
          notes: r.notes ?? undefined,
        }));
        setDraws(mapped);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return draws;
}