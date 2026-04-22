import { supabase } from "@/integrations/supabase/client";
import { expressEntryDraws } from "@/data/expressEntryDraws";
import { pnpDraws } from "@/data/pnpDraws";
import { blogPosts } from "@/data/blogData";

export interface NewsItem {
  id: string;
  type: "policy" | "draw" | "pnp" | "blog" | "announcement";
  title: string;
  summary: string;
  url: string; // external URL OR internal route
  source: string;
  publishedAt: string; // ISO
  meta?: Record<string, string | number>;
  internal?: boolean;
  body?: string; // optional long-form content for internal items
}

function toISO(dateStr: string): string {
  const t = Date.parse(dateStr);
  return isNaN(t) ? new Date().toISOString() : new Date(t).toISOString();
}

export function buildInternalFeed(): NewsItem[] {
  const drawItems: NewsItem[] = expressEntryDraws.slice(0, 12).map((d) => ({
    id: `ee-${d.drawNumber}`,
    type: "draw",
    title: `Express Entry Draw #${d.drawNumber} — ${d.category} (CRS ${d.crsMin})`,
    summary: `${d.itas.toLocaleString()} ITAs issued in the ${d.category} category. Cutoff CRS dropped to ${d.crsMin}.`,
    url: "/express-entry/draws",
    source: "IRCC Express Entry",
    publishedAt: toISO(d.date),
    meta: { crs: d.crsMin, itas: d.itas, category: d.category },
    internal: true,
    body: `On ${d.date}, IRCC ran Express Entry draw #${d.drawNumber} under the ${d.category} category. A total of ${d.itas.toLocaleString()} Invitations to Apply (ITAs) were issued, with a minimum CRS cutoff of ${d.crsMin}. Candidates above this score in the eligible pool received an ITA for Canadian permanent residence and have 60 days to submit a complete application.`,
  }));

  const pnpItems: NewsItem[] = pnpDraws.slice(0, 12).map((p, i) => ({
    id: `pnp-${p.provinceCode}-${i}-${p.date}`,
    type: "pnp",
    title: `${p.province} PNP — ${p.stream} (${p.invitations} invites)`,
    summary: `${p.province} issued ${p.invitations} nominations${p.minScore ? ` with minimum score ${p.minScore}` : ""}.${p.notes ? ` ${p.notes}` : ""}`,
    url: "/pnp-tracker",
    source: `${p.province} PNP`,
    publishedAt: toISO(p.date),
    meta: { invitations: p.invitations, minScore: p.minScore ?? "—" },
    internal: true,
    body: `${p.province} held a Provincial Nominee Program draw under the ${p.stream} stream on ${p.date}, issuing ${p.invitations} nominations${p.minScore ? ` with a minimum score of ${p.minScore}` : ""}. ${p.notes ?? ""} A provincial nomination adds 600 CRS points and effectively guarantees an Express Entry ITA in the next federal draw.`,
  }));

  const blogItems: NewsItem[] = blogPosts.slice(0, 10).map((b) => ({
    id: `blog-${b.slug}`,
    type: "blog",
    title: b.title,
    summary: b.excerpt,
    url: `/blog/${b.slug}`,
    source: `4 Aces Visa · ${b.category}`,
    publishedAt: toISO(b.date),
    internal: true,
  }));

  return [...drawItems, ...pnpItems, ...blogItems];
}

export async function fetchExternalNews(): Promise<{ items: NewsItem[]; fetchedAt: string }> {
  const { data, error } = await supabase.functions.invoke("immigration-news");
  if (error) throw error;
  return {
    items: (data?.items ?? []) as NewsItem[],
    fetchedAt: data?.fetchedAt ?? new Date().toISOString(),
  };
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${Math.max(mins, 1)}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
