import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { nocCategories } from "@/data/nocData";
import { Copy, Download, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface CoverageReport {
  generatedAt: string;
  curated: number;
  esdcTotal: number;
  eeEligibleTotal: number;
  fullCoveragePct: number;
  eeCoveragePct: number;
  byTeer: { teer: number; total: number; have: number; pct: number }[];
  byMajor: {
    mg: string;
    name: string;
    total: number;
    have: number;
    eeTotal: number;
    eeHave: number;
    gap: number;
  }[];
  eeGaps: { code: string; teer: number; title: string }[];
  priorityGaps: { code: string; teer: number; title: string }[];
  missingFromMaster: { code: string; title: string }[];
}

type Gap = CoverageReport["eeGaps"][number];

// Heuristic: map the first 2 digits of an NOC to one of our existing site
// categories. Used as a sensible default in the import draft — easy to tweak
// before pasting into nocData.ts.
const majorGroupToCategory: Record<string, (typeof nocCategories)[number]> = {
  "21": "Engineering",
  "22": "Engineering",
  "20": "Engineering",
  "31": "Healthcare",
  "32": "Healthcare",
  "33": "Healthcare",
  "30": "Healthcare",
  "11": "Business & Finance",
  "10": "Business & Finance",
  "12": "Business & Finance",
  "13": "Business & Finance",
  "14": "Business & Finance",
  "00": "Business & Finance",
  "01": "Business & Finance",
  "41": "Education",
  "42": "Education",
  "43": "Education",
  "44": "Education",
  "72": "Trades & Skilled",
  "73": "Trades & Skilled",
  "74": "Trades & Skilled",
  "75": "Trades & Skilled",
  "70": "Trades & Skilled",
  "82": "Agriculture & Food",
  "83": "Agriculture & Food",
  "84": "Agriculture & Food",
  "85": "Agriculture & Food",
  "80": "Agriculture & Food",
  "92": "Trades & Skilled",
  "93": "Trades & Skilled",
  "94": "Trades & Skilled",
  "95": "Trades & Skilled",
  "90": "Trades & Skilled",
};

function inferCategory(code: string): string {
  return majorGroupToCategory[code.slice(0, 2)] ?? "Business & Finance";
}

function buildEntrySnippet(g: Gap): string {
  const category = inferCategory(g.code);
  const safeTitle = g.title.replace(/"/g, '\\"');
  return `  {
    code: "${g.code}",
    title: "${safeTitle}",
    teer: ${g.teer},
    category: "${category}",
    eeEligible: true,
    altTitles: [],
    salaryRange: "TBD",
    topProvinces: ["Ontario", "British Columbia", "Alberta"],
    description: "Imported from ESDC NOC 2021 master list. Review and enrich before publishing.",
  },`;
}

const TEER_OPTIONS = ["all", "0", "1", "2", "3"] as const;

const AdminNocCoveragePage = () => {
  const [report, setReport] = useState<CoverageReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [teerFilter, setTeerFilter] = useState<(typeof TEER_OPTIONS)[number]>("all");
  const [majorFilter, setMajorFilter] = useState<string>("all");
  const [scope, setScope] = useState<"priority" | "all">("priority");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const loadReport = () => {
    setLoading(true);
    setError(null);
    fetch(`/admin/coverage-report.json?t=${Date.now()}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<CoverageReport>;
      })
      .then((data) => {
        setReport(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message ?? "Failed to load report");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadReport();
  }, []);

  const sourceList = scope === "priority" ? report?.priorityGaps : report?.eeGaps;

  const filteredGaps = useMemo(() => {
    if (!sourceList) return [];
    const q = search.trim().toLowerCase();
    return sourceList.filter((g) => {
      if (teerFilter !== "all" && String(g.teer) !== teerFilter) return false;
      if (majorFilter !== "all" && g.code.slice(0, 2) !== majorFilter) return false;
      if (q && !`${g.code} ${g.title}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [sourceList, search, teerFilter, majorFilter]);

  const majorOptions = useMemo(() => {
    if (!report) return [];
    return report.byMajor
      .filter((m) => m.gap > 0)
      .map((m) => ({ value: m.mg, label: `${m.mg} — ${m.name} (${m.gap} gap)` }));
  }, [report]);

  const allFilteredSelected =
    filteredGaps.length > 0 && filteredGaps.every((g) => selected.has(g.code));

  const toggleAllFiltered = (checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) filteredGaps.forEach((g) => next.add(g.code));
      else filteredGaps.forEach((g) => next.delete(g.code));
      return next;
    });
  };

  const toggleOne = (code: string, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(code);
      else next.delete(code);
      return next;
    });
  };

  const selectedEntries = useMemo(() => {
    if (!report) return [] as Gap[];
    const pool = [...report.eeGaps, ...report.priorityGaps];
    const seen = new Set<string>();
    const out: Gap[] = [];
    for (const g of pool) {
      if (selected.has(g.code) && !seen.has(g.code)) {
        seen.add(g.code);
        out.push(g);
      }
    }
    return out.sort((a, b) => a.code.localeCompare(b.code));
  }, [selected, report]);

  const snippet = useMemo(() => {
    if (selectedEntries.length === 0) return "";
    const body = selectedEntries.map(buildEntrySnippet).join("\n");
    return `// Auto-generated import draft — paste into the appropriate category block
// inside src/data/nocData.ts. Review titles, salary, provinces, descriptions.
// Generated: ${new Date().toISOString()}
// Count: ${selectedEntries.length}

${body}
`;
  }, [selectedEntries]);

  const copySnippet = async () => {
    if (!snippet) return;
    try {
      await navigator.clipboard.writeText(snippet);
      toast.success(`Copied ${selectedEntries.length} NOC entr${selectedEntries.length === 1 ? "y" : "ies"} to clipboard`);
    } catch {
      toast.error("Clipboard write failed — copy manually from the box below");
    }
  };

  const downloadSnippet = () => {
    if (!snippet) return;
    const blob = new Blob([snippet], { type: "text/typescript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `noc-import-${selectedEntries.length}-entries.ts`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <Helmet>
        <title>{`Admin — NOC Coverage Audit | 4 Aces Visa`}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">NOC Coverage Audit</h1>
          <p className="text-muted-foreground mt-1">
            Compare curated NOC dataset against the official ESDC NOC 2021 master list.
            Bulk-select EE-eligible gaps to generate an import-ready snippet.
          </p>
        </div>
        <Button variant="outline" onClick={loadReport} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : <RefreshCw />}
          Reload report
        </Button>
      </div>

      {error && (
        <Card className="mb-6 border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive font-medium">Could not load coverage report: {error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Run <code className="bg-muted px-1.5 py-0.5 rounded">npm run audit:noc</code> first
              to generate <code className="bg-muted px-1.5 py-0.5 rounded">public/admin/coverage-report.json</code>.
            </p>
          </CardContent>
        </Card>
      )}

      {report && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <SummaryCard label="Curated NOCs" value={report.curated.toString()} />
            <SummaryCard label="ESDC master" value={report.esdcTotal.toString()} />
            <SummaryCard
              label="EE coverage"
              value={`${report.eeCoveragePct.toFixed(1)}%`}
              sub={`${report.byTeer.filter((t) => t.teer <= 3).reduce((s, t) => s + t.have, 0)}/${report.eeEligibleTotal}`}
            />
            <SummaryCard
              label="Full coverage"
              value={`${report.fullCoveragePct.toFixed(1)}%`}
              sub={`${report.curated}/${report.esdcTotal}`}
            />
          </div>

          <Tabs defaultValue="gaps" className="mb-8">
            <TabsList>
              <TabsTrigger value="gaps">EE Gaps ({report.eeGaps.length})</TabsTrigger>
              <TabsTrigger value="teer">By TEER</TabsTrigger>
              <TabsTrigger value="major">By Major Group</TabsTrigger>
            </TabsList>

            <TabsContent value="teer">
              <Card>
                <CardHeader>
                  <CardTitle>Coverage by TEER</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>TEER</TableHead>
                        <TableHead>EE eligible?</TableHead>
                        <TableHead className="text-right">Have</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="text-right">Coverage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {report.byTeer.map((t) => (
                        <TableRow key={t.teer}>
                          <TableCell className="font-medium">TEER {t.teer}</TableCell>
                          <TableCell>
                            {t.teer <= 3 ? <Badge>EE</Badge> : <Badge variant="secondary">No</Badge>}
                          </TableCell>
                          <TableCell className="text-right">{t.have}</TableCell>
                          <TableCell className="text-right">{t.total}</TableCell>
                          <TableCell className="text-right">{t.pct.toFixed(1)}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="major">
              <Card>
                <CardHeader>
                  <CardTitle>Coverage by major group (sorted by gap)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Code</TableHead>
                        <TableHead>Group</TableHead>
                        <TableHead className="text-right">EE Have</TableHead>
                        <TableHead className="text-right">EE Total</TableHead>
                        <TableHead className="text-right">Gap</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {report.byMajor.slice(0, 30).map((m) => (
                        <TableRow key={m.mg}>
                          <TableCell className="font-mono">{m.mg}</TableCell>
                          <TableCell>{m.name}</TableCell>
                          <TableCell className="text-right">{m.eeHave}</TableCell>
                          <TableCell className="text-right">{m.eeTotal}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={m.gap === 0 ? "secondary" : "destructive"}>{m.gap}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gaps">
              <Card>
                <CardHeader>
                  <CardTitle>Bulk-select missing EE-eligible NOCs</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <Input
                      placeholder="Search code or title…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Select value={scope} onValueChange={(v) => setScope(v as typeof scope)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="priority">Priority gaps ({report.priorityGaps.length})</SelectItem>
                        <SelectItem value="all">All EE gaps ({report.eeGaps.length})</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={teerFilter} onValueChange={(v) => setTeerFilter(v as typeof teerFilter)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All TEER (0–3)</SelectItem>
                        <SelectItem value="0">TEER 0</SelectItem>
                        <SelectItem value="1">TEER 1</SelectItem>
                        <SelectItem value="2">TEER 2</SelectItem>
                        <SelectItem value="3">TEER 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={majorFilter} onValueChange={setMajorFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Major group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All major groups</SelectItem>
                        {majorOptions.map((m) => (
                          <SelectItem key={m.value} value={m.value}>
                            {m.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      Showing <strong className="text-foreground">{filteredGaps.length}</strong> of{" "}
                      {sourceList?.length ?? 0} gaps · <strong className="text-foreground">{selected.size}</strong> selected
                    </span>
                    {selected.size > 0 && (
                      <Button variant="ghost" size="sm" onClick={() => setSelected(new Set())}>
                        Clear selection
                      </Button>
                    )}
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">
                            <Checkbox
                              checked={allFilteredSelected}
                              onCheckedChange={(c) => toggleAllFiltered(Boolean(c))}
                              aria-label="Select all visible"
                            />
                          </TableHead>
                          <TableHead className="w-24">Code</TableHead>
                          <TableHead className="w-20">TEER</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead className="w-40">Inferred category</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGaps.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                              No gaps match the current filters.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredGaps.map((g) => (
                            <TableRow key={g.code} data-state={selected.has(g.code) ? "selected" : undefined}>
                              <TableCell>
                                <Checkbox
                                  checked={selected.has(g.code)}
                                  onCheckedChange={(c) => toggleOne(g.code, Boolean(c))}
                                  aria-label={`Select ${g.code}`}
                                />
                              </TableCell>
                              <TableCell className="font-mono">{g.code}</TableCell>
                              <TableCell>
                                <Badge variant="secondary">T{g.teer}</Badge>
                              </TableCell>
                              <TableCell>{g.title}</TableCell>
                              <TableCell className="text-muted-foreground text-sm">
                                {inferCategory(g.code)}
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Import drawer */}
          {selectedEntries.length > 0 && (
            <Card className="border-primary">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle>One-click import draft</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedEntries.length} entr{selectedEntries.length === 1 ? "y" : "ies"} ready.
                    Paste into <code className="bg-muted px-1.5 py-0.5 rounded">src/data/nocData.ts</code> inside
                    the matching category block, then enrich titles/salary/provinces.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={copySnippet}>
                    <Copy />
                    Copy snippet
                  </Button>
                  <Button variant="outline" onClick={downloadSnippet}>
                    <Download />
                    Download .ts
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted rounded-md p-4 text-xs overflow-auto max-h-96 font-mono">
                  {snippet}
                </pre>
              </CardContent>
            </Card>
          )}

          <p className="text-xs text-muted-foreground mt-8">
            Report generated {new Date(report.generatedAt).toLocaleString()} ·{" "}
            <a href="/admin/coverage-report.json" className="underline" target="_blank" rel="noreferrer">
              raw JSON
            </a>{" "}
            ·{" "}
            <a href="/admin/noc-2021-master.csv" className="underline" target="_blank" rel="noreferrer">
              ESDC master CSV
            </a>
          </p>
        </>
      )}
    </div>
  );
};

const SummaryCard = ({ label, value, sub }: { label: string; value: string; sub?: string }) => (
  <Card>
    <CardContent className="pt-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </CardContent>
  </Card>
);

export default AdminNocCoveragePage;