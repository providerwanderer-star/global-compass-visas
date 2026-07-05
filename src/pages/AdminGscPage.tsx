import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { ArrowUpRight, ExternalLink, RefreshCw } from "lucide-react";

type Site = { siteUrl: string; permissionLevel: string };
type Row = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number };

const DEFAULT_SITE = "https://www.gargbrothers.ca/";
const RANGES: { label: string; days: number }[] = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 28 days", days: 28 },
  { label: "Last 90 days", days: 90 },
];

function isoDaysAgo(days: number) {
  const d = new Date();
  // GSC data lags ~2 days; add a small buffer.
  d.setUTCDate(d.getUTCDate() - days - 2);
  return d.toISOString().slice(0, 10);
}
function isoToday() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 2);
  return d.toISOString().slice(0, 10);
}

async function callGsc<T = unknown>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke("gsc-analytics", { body });
  if (error) throw error;
  if (data && typeof data === "object" && "error" in data) {
    throw new Error(String((data as { error: unknown }).error));
  }
  return data as T;
}

function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card className="p-5">
      <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{label}</div>
      <div className="text-3xl font-display font-bold text-foreground mt-1">{value}</div>
      {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
    </Card>
  );
}

const AdminGscPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const [sites, setSites] = useState<Site[]>([]);
  const [siteUrl, setSiteUrl] = useState<string>(DEFAULT_SITE);
  const [rangeDays, setRangeDays] = useState<number>(28);
  const [busy, setBusy] = useState(false);
  const [totals, setTotals] = useState<Row | null>(null);
  const [trend, setTrend] = useState<Row[]>([]);
  const [queries, setQueries] = useState<Row[]>([]);
  const [pages, setPages] = useState<Row[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoaded(true); });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(null); return; }
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("user_roles")
        .select("role").eq("user_id", session.user.id).eq("role", "admin").maybeSingle();
      if (!cancelled) setIsAdmin(!!data);
    })();
    return () => { cancelled = true; };
  }, [session]);

  // Load sites list once admin confirmed
  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      try {
        const res = await callGsc<{ siteEntry?: Site[] }>({ action: "sites" });
        setSites(res.siteEntry ?? []);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to load sites");
      }
    })();
  }, [isAdmin]);

  const loadData = useMemo(() => async () => {
    if (!siteUrl) return;
    setBusy(true);
    setErrorMsg(null);
    const startDate = isoDaysAgo(rangeDays);
    const endDate = isoToday();
    try {
      const [totalsRes, trendRes, queriesRes, pagesRes] = await Promise.all([
        callGsc<{ rows?: Row[] }>({ action: "search_analytics", siteUrl, startDate, endDate, dimensions: [], rowLimit: 1 }),
        callGsc<{ rows?: Row[] }>({ action: "search_analytics", siteUrl, startDate, endDate, dimensions: ["date"], rowLimit: 1000 }),
        callGsc<{ rows?: Row[] }>({ action: "search_analytics", siteUrl, startDate, endDate, dimensions: ["query"], rowLimit: 25 }),
        callGsc<{ rows?: Row[] }>({ action: "search_analytics", siteUrl, startDate, endDate, dimensions: ["page"], rowLimit: 25 }),
      ]);
      setTotals(totalsRes.rows?.[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 });
      setTrend(trendRes.rows ?? []);
      setQueries(queriesRes.rows ?? []);
      setPages(pagesRes.rows ?? []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to fetch GSC data";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  }, [siteUrl, rangeDays]);

  useEffect(() => { if (isAdmin) loadData(); }, [isAdmin, loadData]);

  if (!loaded) return <div className="min-h-screen bg-background" />;
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-display font-bold">Sign in required</h1>
          <Button asChild><Link to="/admin">Go to admin sign-in</Link></Button>
        </div>
      </div>
    );
  }
  if (isAdmin === null) return <div className="min-h-screen bg-background" />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-display font-bold">Access denied</h1>
          <p className="text-muted-foreground">Your account does not have admin access.</p>
        </div>
      </div>
    );
  }

  const trendData = trend.map((r) => ({
    date: r.keys?.[0] ?? "",
    clicks: r.clicks,
    impressions: r.impressions,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>GSC Traffic · Admin · Garg Brothers</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <header className="border-b border-border bg-card">
        <div className="container-narrow mx-auto py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-display text-xl font-bold">Search Console traffic</h1>
            <p className="text-xs text-muted-foreground">Live data from Google Search Console</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild><Link to="/admin">← Admin</Link></Button>
            <Button size="sm" onClick={() => loadData()} disabled={busy}>
              <RefreshCw className={`h-4 w-4 mr-1 ${busy ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="container-narrow mx-auto py-8 px-4 space-y-6">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[260px]">
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Property</label>
            <Select value={siteUrl} onValueChange={setSiteUrl}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {(sites.length ? sites : [{ siteUrl: DEFAULT_SITE, permissionLevel: "" }]).map((s) => (
                  <SelectItem key={s.siteUrl} value={s.siteUrl}>{s.siteUrl}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Range</label>
            <Select value={String(rangeDays)} onValueChange={(v) => setRangeDays(parseInt(v, 10))}>
              <SelectTrigger className="min-w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {RANGES.map((r) => <SelectItem key={r.days} value={String(r.days)}>{r.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {errorMsg && (
          <Card className="p-4 border-destructive/30 bg-destructive/5 text-sm">
            <div className="font-semibold text-destructive mb-1">Couldn't load traffic data</div>
            <div className="text-muted-foreground">{errorMsg}</div>
            <div className="text-muted-foreground mt-2">
              If this property isn't verified yet, publish the site (the verification meta tag is
              already in <code>index.html</code>) and I'll finish verification next turn.
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Kpi label="Clicks" value={(totals?.clicks ?? 0).toLocaleString()} hint={`Last ${rangeDays}d`} />
          <Kpi label="Impressions" value={(totals?.impressions ?? 0).toLocaleString()} hint={`Last ${rangeDays}d`} />
          <Kpi label="Avg CTR" value={`${((totals?.ctr ?? 0) * 100).toFixed(2)}%`} />
          <Kpi label="Avg Position" value={(totals?.position ?? 0).toFixed(1)} />
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-foreground">Traffic trend</h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis yAxisId="left" fontSize={11} />
                <YAxis yAxisId="right" orientation="right" fontSize={11} />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="impressions" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Tabs defaultValue="queries">
          <TabsList>
            <TabsTrigger value="queries">Top queries</TabsTrigger>
            <TabsTrigger value="pages">Top pages</TabsTrigger>
          </TabsList>
          <TabsContent value="queries">
            <Card className="p-0 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Query</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                    <TableHead className="text-right">Impr.</TableHead>
                    <TableHead className="text-right">CTR</TableHead>
                    <TableHead className="text-right">Pos.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queries.map((r, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{r.keys?.[0]}</TableCell>
                      <TableCell className="text-right">{r.clicks.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{r.impressions.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{(r.ctr * 100).toFixed(1)}%</TableCell>
                      <TableCell className="text-right">{r.position.toFixed(1)}</TableCell>
                    </TableRow>
                  ))}
                  {queries.length === 0 && !busy && (
                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No query data yet.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
          <TabsContent value="pages">
            <Card className="p-0 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                    <TableHead className="text-right">Impr.</TableHead>
                    <TableHead className="text-right">CTR</TableHead>
                    <TableHead className="text-right">Pos.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pages.map((r, i) => {
                    const url = r.keys?.[0] ?? "";
                    return (
                      <TableRow key={i}>
                        <TableCell className="font-medium max-w-[380px] truncate">
                          <a href={url} target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                            {url.replace(/^https?:\/\/[^/]+/, "") || "/"}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TableCell>
                        <TableCell className="text-right">{r.clicks.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{r.impressions.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{(r.ctr * 100).toFixed(1)}%</TableCell>
                        <TableCell className="text-right">{r.position.toFixed(1)}</TableCell>
                      </TableRow>
                    );
                  })}
                  {pages.length === 0 && !busy && (
                    <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No page data yet.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <ArrowUpRight className="h-3 w-3" />
          Data lags ~2 days behind real time (Google Search Console standard).
        </p>
      </main>
    </div>
  );
};

export default AdminGscPage;