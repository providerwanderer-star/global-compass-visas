import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Building2, MapPin, DollarSign, Briefcase } from "lucide-react";
import SeoSchema from "@/components/SeoSchema";
import AuthorByline from "@/components/AuthorByline";
import EligibilityForm from "@/components/EligibilityForm";
import { getCityIndustry, CITY_INDUSTRIES } from "@/data/cityIndustryData";

const SITE = "https://www.gargbrothers.ca";
const YEAR = new Date().getFullYear();

const CityIndustryPage = () => {
  // NOTE: route is /city/:city/:industry — handled separately from /city/:slug (1-segment)
  const params = useParams<{ city: string; industry: string }>();
  const ci = getCityIndustry(params.city, params.industry);
  if (!ci) return <Navigate to="/" replace />;

  const canonical = `${SITE}/city/${ci.city}/${ci.industry}`;
  const headline = `${ci.industryShort} Jobs & Immigration in ${ci.cityName}, ${ci.province} (${YEAR})`;
  const metaTitle = `${ci.industryShort} Jobs in ${ci.cityName} ${YEAR} — Employers, Wage, PR | Garg Brothers`;
  const metaDescription = `${ci.industryName} in ${ci.cityName}, ${ci.province}: top employers, in-demand NOCs, median wage ${ci.medianWageCAD} and the ${ci.pnpStream} pathway. Garg Brothers Immigration Team.`;

  const faqs = [
    { q: `Is ${ci.industryShort.toLowerCase()} hiring in ${ci.cityName}?`, a: `Yes — top employers include ${ci.topEmployers.slice(0, 4).join(", ")}. Median wage is ${ci.medianWageCAD}.` },
    { q: `Which PR pathway works best?`, a: `${ci.pnpStream} is the most direct provincial route. Express Entry CEC works once you have 12 months of skilled work in Canada.` },
    { q: `What are the in-demand NOC codes?`, a: `${ci.inDemandNocs.map((n) => `NOC ${n.code} (${n.title})`).join(", ")} are currently in highest demand for ${ci.industryShort.toLowerCase()} in ${ci.cityName}.` },
    { q: `What's it like settling in ${ci.cityName}?`, a: ci.settlementNote },
    { q: `Do I need a job offer to immigrate?`, a: `Not always. Express Entry doesn't require a job offer (though it adds points). Most ${ci.pnpStream.split("—")[0].trim()} streams do require an offer.` }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    datePublished: `${YEAR}-01-15`,
    dateModified: new Date().toISOString().slice(0, 10),
    author: { "@type": "Organization", name: "Garg Brothers Immigration Team" },
    publisher: { "@type": "Organization", name: "Garg Brothers", logo: { "@type": "ImageObject", url: `${SITE}/placeholder.svg` } },
    mainEntityOfPage: canonical,
  };

  const sameCity = CITY_INDUSTRIES.filter((c) => c.city === ci.city && c.industry !== ci.industry);
  const sameIndustry = CITY_INDUSTRIES.filter((c) => c.industry === ci.industry && c.city !== ci.city);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>
      <SeoSchema breadcrumbs={[
        { name: ci.cityName, url: `/city/${ci.city}` },
        { name: ci.industryShort, url: `/city/${ci.city}/${ci.industry}` }
      ]} />

      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
              <Building2 className="h-3.5 w-3.5" /> {ci.cityName} · {ci.industryShort}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">{headline}</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Top employers, in-demand NOCs, wages and the realistic PR pathway for {ci.industryShort.toLowerCase()} workers in {ci.cityName}.
            </p>
            <div className="mt-6"><AuthorByline articleHeadline={headline} articleUrl={`/city/${ci.city}/${ci.industry}`} /></div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Stat icon={<MapPin className="h-4 w-4" />} label="City" value={`${ci.cityName}, ${ci.province}`} />
              <Stat icon={<DollarSign className="h-4 w-4" />} label="Median wage" value={ci.medianWageCAD} />
              <Stat icon={<Briefcase className="h-4 w-4" />} label="In-demand NOCs" value={`${ci.inDemandNocs.length} roles`} />
              <Stat icon={<Building2 className="h-4 w-4" />} label="PNP" value={ci.pnpStream.split("—")[0].trim()} />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">Top employers in {ci.cityName}</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ci.topEmployers.map((e) => (
              <div key={e} className="rounded-lg border border-border bg-card p-4 text-sm font-medium text-foreground">{e}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">In-demand NOCs</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {ci.inDemandNocs.map((n) => (
              <Link key={n.code} to={`/noc/${n.code}`} className="group rounded-lg border border-border bg-card p-4 transition hover:border-primary hover:shadow-md">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">NOC {n.code}</div>
                <div className="mt-1 text-sm font-semibold text-foreground group-hover:text-primary">{n.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl rounded-lg border border-border bg-muted/30 p-6">
          <h3 className="text-lg font-semibold text-foreground">PR pathway</h3>
          <p className="mt-2 text-sm text-muted-foreground">{ci.pnpStream}. {ci.settlementNote}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {ci.inDemandNocs.slice(0, 1).map((n) => {
              const occMap: Record<string, string> = {
                "21231": "software-engineer",
                "21223": "software-engineer",
                "21232": "software-engineer",
                "21311": "software-engineer",
                "21221": "software-engineer",
                "31301": "registered-nurse",
                "32101": "registered-nurse",
                "31102": "registered-nurse",
                "31300": "registered-nurse",
                "72200": "electrician",
                "72300": "electrician",
                "72020": "electrician",
                "72100": "electrician",
                "73300": "truck-driver",
              };
              const occ = occMap[n.code];
              if (!occ) return null;
              return (
                <Link key={n.code} to={`/jobs/${occ}/${ci.provinceSlug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  See {n.title} → {ci.province} PR pathway <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">FAQs</h2>
          <Accordion type="single" collapsible className="rounded-lg border border-border bg-card">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="px-4">
                <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">Free eligibility check — {ci.industryShort}, {ci.cityName}</h2>
              <p className="mt-2 text-muted-foreground">Our team will map your profile to the right {ci.cityName} employer + PNP route.</p>
            </div>
            <EligibilityForm sourcePage={`city-${ci.city}-${ci.industry}`} heading={`${ci.industryShort} in ${ci.cityName}`} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Other industries in {ci.cityName}</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {sameCity.map((c) => (
              <Link key={c.industry} to={`/city/${c.city}/${c.industry}`} className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md">
                <div className="text-base font-semibold text-foreground group-hover:text-primary">{c.industryName}</div>
                <div className="mt-1 text-sm text-muted-foreground">{c.medianWageCAD}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary">Open guide <ArrowRight className="h-3.5 w-3.5" /></div>
              </Link>
            ))}
          </div>
          <h2 className="mb-6 mt-12 text-2xl font-bold text-foreground">{ci.industryShort} in other cities</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {sameIndustry.map((c) => (
              <Link key={c.city} to={`/city/${c.city}/${c.industry}`} className="group rounded-lg border border-border bg-card p-5 transition hover:border-primary hover:shadow-md">
                <div className="text-base font-semibold text-foreground group-hover:text-primary">{c.industryShort} in {c.cityName}</div>
                <div className="mt-1 text-sm text-muted-foreground">{c.pnpStream.split("—")[0].trim()}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-sm text-primary">Open guide <ArrowRight className="h-3.5 w-3.5" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Stat = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="rounded-lg border border-border bg-card p-4">
    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{icon} {label}</div>
    <div className="mt-2 text-sm font-semibold text-foreground">{value}</div>
  </div>
);

export default CityIndustryPage;
