import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SearchFilters {
  q: string;
  origin: string;
  pathway: string;
  crs: string;
  province: string;
  jobOffer: string;
  timeline: string;
}

const defaultFilters: SearchFilters = {
  q: "",
  origin: "any",
  pathway: "any",
  crs: "any",
  province: "any",
  jobOffer: "any",
  timeline: "any",
};

const ORIGINS = [
  "India",
  "United States",
  "United Arab Emirates",
  "Philippines",
  "Nigeria",
  "United Kingdom",
  "Pakistan",
  "Other",
];

const PATHWAYS = [
  { value: "express-entry", label: "Express Entry (PR)" },
  { value: "pnp", label: "Provincial Nominee (PNP)" },
  { value: "study", label: "Study → PR" },
  { value: "work", label: "Work Permit / LMIA" },
  { value: "family", label: "Family Sponsorship" },
  { value: "visitor", label: "Visitor / Super Visa" },
];

const CRS_BANDS = [
  { value: "<350", label: "Under 350" },
  { value: "350-400", label: "350 – 400" },
  { value: "400-450", label: "400 – 450" },
  { value: "450-500", label: "450 – 500" },
  { value: "500+", label: "500+" },
  { value: "unknown", label: "I don't know yet" },
];

const PROVINCES = [
  "Ontario",
  "British Columbia",
  "Alberta",
  "Saskatchewan",
  "Manitoba",
  "Nova Scotia",
  "New Brunswick",
  "Quebec",
  "Newfoundland & Labrador",
  "PEI",
];

const TIMELINES = [
  { value: "0-6", label: "Within 6 months" },
  { value: "6-12", label: "6 – 12 months" },
  { value: "12-24", label: "1 – 2 years" },
  { value: "24+", label: "2+ years (planning)" },
];

interface Props {
  variant?: "hero" | "compact";
  className?: string;
}

const GlobalImmigrationSearch = ({ variant = "hero", className = "" }: Props) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const update = <K extends keyof SearchFilters>(k: K, v: SearchFilters[K]) =>
    setFilters((f) => ({ ...f, [k]: v }));

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v && v !== "any") params.set(k, v);
    });
    navigate(`/search${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const isCompact = variant === "compact";

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-card border border-border rounded-2xl shadow-elevated p-4 md:p-6 ${className}`}
      role="search"
      aria-label="Find your immigration pathway"
    >
      {/* Primary row */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={filters.q}
            onChange={(e) => update("q", e.target.value)}
            placeholder="Search NOC, occupation, province, pathway…"
            className="pl-10 h-12 text-base"
            aria-label="Search occupation, NOC, or pathway"
          />
        </div>
        <div className="grid grid-cols-2 md:flex gap-3">
          <Select value={filters.pathway} onValueChange={(v) => update("pathway", v)}>
            <SelectTrigger className="h-12 md:w-[180px]" aria-label="Pathway">
              <SelectValue placeholder="Pathway" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any pathway</SelectItem>
              {PATHWAYS.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" size="lg" className="h-12 px-6">
            Search <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Toggle advanced filters */}
      {!isCompact && (
        <button
          type="button"
          onClick={() => setShowAdvanced((s) => !s)}
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          aria-expanded={showAdvanced}
          aria-controls="advanced-filters"
        >
          <Filter className="h-4 w-4" />
          {showAdvanced ? "Hide filters" : "More filters (origin, CRS, province…)"}
        </button>
      )}

      {/* Advanced filters */}
      {!isCompact && showAdvanced && (
        <div
          id="advanced-filters"
          className="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
              Country of origin
            </label>
            <Select value={filters.origin} onValueChange={(v) => update("origin", v)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any country</SelectItem>
                {ORIGINS.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
              CRS score band
            </label>
            <Select value={filters.crs} onValueChange={(v) => update("crs", v)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any score</SelectItem>
                {CRS_BANDS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
              Preferred province
            </label>
            <Select value={filters.province} onValueChange={(v) => update("province", v)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any province</SelectItem>
                {PROVINCES.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
              Have a job offer?
            </label>
            <Select value={filters.jobOffer} onValueChange={(v) => update("jobOffer", v)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="yes">Yes — Canadian employer</SelectItem>
                <SelectItem value="lmia">Yes — with LMIA</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">
              Target timeline
            </label>
            <Select value={filters.timeline} onValueChange={(v) => update("timeline", v)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Flexible</SelectItem>
                {TIMELINES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => setFilters(defaultFilters)}
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              Reset filters
            </button>
          </div>
        </div>
      )}

      {/* Quick chips */}
      {!isCompact && (
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground mr-1 self-center">Try:</span>
          {[
            { label: "Software Developer", q: "Software Developer" },
            { label: "Nurse", q: "Nurse" },
            { label: "Truck Driver", q: "Truck Driver" },
            { label: "PR with CRS 400–450", q: "", crs: "400-450", pathway: "express-entry" },
            { label: "Ontario PNP", q: "", province: "Ontario", pathway: "pnp" },
          ].map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => {
                const next = { ...defaultFilters, ...chip, q: chip.q ?? "" } as SearchFilters;
                setFilters(next);
                const params = new URLSearchParams();
                Object.entries(next).forEach(([k, v]) => {
                  if (v && v !== "any") params.set(k, v);
                });
                navigate(`/search${params.toString() ? `?${params.toString()}` : ""}`);
              }}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-background hover:border-primary hover:text-primary transition-colors"
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}
    </form>
  );
};

export default GlobalImmigrationSearch;