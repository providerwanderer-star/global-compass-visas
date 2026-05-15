import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { nocData as staticNoc, type NOCEntry } from "@/data/nocData";

function salaryRange(median: number | null): string {
  if (!median) return "Salary varies";
  const low = Math.round((median * 0.8) / 1000) * 1000;
  const high = Math.round((median * 1.2) / 1000) * 1000;
  return `$${low.toLocaleString()} – $${high.toLocaleString()}`;
}

export function useNocCodes(): NOCEntry[] {
  const [codes, setCodes] = useState<NOCEntry[]>(staticNoc);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from("noc_codes")
      .select("code, title, alt_titles, teer, category, median_salary, express_entry_eligible, description")
      .limit(1000)
      .then(({ data, error }) => {
        if (cancelled || error || !data || data.length === 0) return;
        // Build a map of static entries by code so we can preserve fields not in the DB (topProvinces).
        const staticByCode = new Map(staticNoc.map((n) => [n.code, n]));
        const mapped: NOCEntry[] = data.map((r: any) => {
          const fallback = staticByCode.get(r.code);
          return {
            code: r.code,
            title: r.title,
            teer: r.teer as NOCEntry["teer"],
            category: r.category,
            eeEligible: r.express_entry_eligible,
            altTitles: r.alt_titles ?? [],
            salaryRange: salaryRange(r.median_salary),
            topProvinces: fallback?.topProvinces ?? [],
            description: r.description,
            medianSalary: r.median_salary ?? undefined,
          };
        });
        setCodes(mapped);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return codes;
}