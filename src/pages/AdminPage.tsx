import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate } from "react-router-dom";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const EE_CATEGORIES = ["General", "STEM", "Healthcare", "Trades", "Transport", "Agriculture", "French", "Education"] as const;
const PROVINCES: { name: string; code: string }[] = [
  { name: "Ontario", code: "ON" },
  { name: "British Columbia", code: "BC" },
  { name: "Alberta", code: "AB" },
  { name: "Saskatchewan", code: "SK" },
  { name: "Manitoba", code: "MB" },
  { name: "Nova Scotia", code: "NS" },
  { name: "New Brunswick", code: "NB" },
  { name: "Prince Edward Island", code: "PE" },
  { name: "Newfoundland and Labrador", code: "NL" },
  { name: "Yukon", code: "YT" },
  { name: "Northwest Territories", code: "NT" }
];

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
}

function LoginCard({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      onSignedIn();
    } catch (err: any) {
      toast.error(err.message ?? "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4 bg-card border border-border rounded-xl p-6 shadow-card">
        <h1 className="text-2xl font-display font-bold text-foreground">Admin sign-in</h1>
        <p className="text-sm text-muted-foreground">Authorized personnel only.</p>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
        </div>
        <Button type="submit" disabled={busy} className="w-full">
          {busy ? "Please wait…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}

function FormShell({ title, children, onSubmit, busy }: { title: string; children: React.ReactNode; onSubmit: (e: React.FormEvent) => void; busy: boolean }) {
  return (
    <form onSubmit={onSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-display font-bold text-foreground">{title}</h2>
      {children}
      <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</Button>
    </form>
  );
}

function EEForm() {
  const [drawNumber, setDrawNumber] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState<string>("General");
  const [crsMin, setCrsMin] = useState("");
  const [itas, setItas] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("express_entry_draws").insert({
      draw_number: parseInt(drawNumber, 10),
      draw_date: date,
      category,
      crs_min: parseInt(crsMin, 10),
      itas: parseInt(itas, 10),
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(`Draw #${drawNumber} added`);
    setDrawNumber(""); setDate(""); setCrsMin(""); setItas("");
  }

  return (
    <FormShell title="Add Express Entry Draw" onSubmit={submit} busy={busy}>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>Draw number</Label><Input type="number" value={drawNumber} onChange={(e) => setDrawNumber(e.target.value)} required /></div>
        <div><Label>Date</Label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></div>
        <div>
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{EE_CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>CRS minimum</Label><Input type="number" value={crsMin} onChange={(e) => setCrsMin(e.target.value)} required /></div>
        <div><Label>ITAs issued</Label><Input type="number" value={itas} onChange={(e) => setItas(e.target.value)} required /></div>
      </div>
    </FormShell>
  );
}

function PNPForm() {
  const [provinceCode, setProvinceCode] = useState("ON");
  const [stream, setStream] = useState("");
  const [date, setDate] = useState("");
  const [minScore, setMinScore] = useState("");
  const [invitations, setInvitations] = useState("");
  const [officialUrl, setOfficialUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const province = PROVINCES.find((p) => p.code === provinceCode)!.name;
    const { error } = await supabase.from("pnp_draws").insert({
      province,
      province_code: provinceCode,
      stream,
      draw_date: date,
      min_score: minScore ? parseInt(minScore, 10) : null,
      invitations: parseInt(invitations, 10),
      source_url: officialUrl || null,
      notes: notes || null,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("PNP draw added");
    setStream(""); setDate(""); setMinScore(""); setInvitations(""); setOfficialUrl(""); setNotes("");
  }

  return (
    <FormShell title="Add PNP Draw" onSubmit={submit} busy={busy}>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Province</Label>
          <Select value={provinceCode} onValueChange={setProvinceCode}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{PROVINCES.map((p) => <SelectItem key={p.code} value={p.code}>{p.name}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>Stream</Label><Input value={stream} onChange={(e) => setStream(e.target.value)} required /></div>
        <div><Label>Date</Label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></div>
        <div><Label>Min score (optional)</Label><Input type="number" value={minScore} onChange={(e) => setMinScore(e.target.value)} /></div>
        <div><Label>Invitations</Label><Input type="number" value={invitations} onChange={(e) => setInvitations(e.target.value)} required /></div>
        <div className="col-span-2"><Label>Official URL</Label><Input type="url" value={officialUrl} onChange={(e) => setOfficialUrl(e.target.value)} /></div>
        <div className="col-span-2"><Label>Notes</Label><Input value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
      </div>
    </FormShell>
  );
}

function BlogForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Immigration Guide");
  const [readTime, setReadTime] = useState("6 min");
  const [metaDescription, setMetaDescription] = useState("");
  const [published, setPublished] = useState(true);
  const [busy, setBusy] = useState(false);
  const [slugTouched, setSlugTouched] = useState(false);

  function onTitleChange(v: string) {
    setTitle(v);
    if (!slugTouched) setSlug(slugify(v));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("blog_posts").insert({
      title, slug, excerpt, content, category, read_time: readTime,
      meta_description: metaDescription, published,
      date: new Date().toISOString().slice(0, 10),
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Blog post added");
    setTitle(""); setSlug(""); setExcerpt(""); setContent(""); setMetaDescription(""); setSlugTouched(false);
  }

  return (
    <FormShell title="New Blog Post" onSubmit={submit} busy={busy}>
      <div className="space-y-3">
        <div><Label>Title</Label><Input value={title} onChange={(e) => onTitleChange(e.target.value)} required /></div>
        <div><Label>Slug</Label><Input value={slug} onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }} required /></div>
        <div><Label>Excerpt</Label><Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} /></div>
        <div><Label>Content (markdown)</Label><Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} required /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Category</Label><Input value={category} onChange={(e) => setCategory(e.target.value)} /></div>
          <div><Label>Read time</Label><Input value={readTime} onChange={(e) => setReadTime(e.target.value)} /></div>
        </div>
        <div><Label>Meta description</Label><Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={2} /></div>
        <div className="flex items-center gap-2"><Switch checked={published} onCheckedChange={setPublished} /><span className="text-sm">Published</span></div>
      </div>
    </FormShell>
  );
}

function NocForm() {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [teer, setTeer] = useState("1");
  const [category, setCategory] = useState("");
  const [altTitles, setAltTitles] = useState("");
  const [medianSalary, setMedianSalary] = useState("");
  const [eeEligible, setEeEligible] = useState(true);
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("noc_codes").insert({
      code, title, teer: parseInt(teer, 10), category,
      alt_titles: altTitles.split(",").map((s) => s.trim()).filter(Boolean),
      median_salary: medianSalary ? parseInt(medianSalary, 10) : null,
      express_entry_eligible: eeEligible,
      description,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(`NOC ${code} added`);
    setCode(""); setTitle(""); setCategory(""); setAltTitles(""); setMedianSalary(""); setDescription("");
  }

  return (
    <FormShell title="Add NOC Code" onSubmit={submit} busy={busy}>
      <div className="grid grid-cols-2 gap-3">
        <div><Label>NOC code</Label><Input value={code} onChange={(e) => setCode(e.target.value)} required /></div>
        <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
        <div>
          <Label>TEER</Label>
          <Select value={teer} onValueChange={setTeer}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{[0,1,2,3,4,5].map((t) => <SelectItem key={t} value={String(t)}>TEER {t}</SelectItem>)}</SelectContent>
          </Select>
        </div>
        <div><Label>Category</Label><Input value={category} onChange={(e) => setCategory(e.target.value)} required /></div>
        <div className="col-span-2"><Label>Alternate titles (comma separated)</Label><Input value={altTitles} onChange={(e) => setAltTitles(e.target.value)} /></div>
        <div><Label>Median salary (CAD)</Label><Input type="number" value={medianSalary} onChange={(e) => setMedianSalary(e.target.value)} /></div>
        <div className="flex items-center gap-2 mt-7"><Switch checked={eeEligible} onCheckedChange={setEeEligible} /><span className="text-sm">Express Entry eligible</span></div>
        <div className="col-span-2"><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} required /></div>
      </div>
    </FormShell>
  );
}

const AdminPage = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoaded(true); });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) { setIsAdmin(null); return; }
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!cancelled) setIsAdmin(!error && !!data);
    })();
    return () => { cancelled = true; };
  }, [session]);

  if (!loaded) return <div className="min-h-screen bg-background" />;

  if (!session) return (
    <>
      <Helmet><title>Admin · Garg Brothers</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <LoginCard onSignedIn={() => { /* state updates via listener */ }} />
    </>
  );

  if (isAdmin === null) return <div className="min-h-screen bg-background" />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-display font-bold">Access denied</h1>
          <p className="text-muted-foreground">Your account does not have admin access.</p>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>Sign out</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet><title>Admin · Garg Brothers</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <header className="border-b border-border bg-card">
        <div className="container-narrow mx-auto py-4 flex items-center justify-between">
          <h1 className="font-display text-xl font-bold">Admin panel</h1>
          <Button variant="outline" size="sm" onClick={() => supabase.auth.signOut()}>Sign out</Button>
        </div>
      </header>
      <main className="container-narrow mx-auto py-8 px-4">
        <Tabs defaultValue="ee">
          <TabsList className="mb-6">
            <TabsTrigger value="ee">EE Draw</TabsTrigger>
            <TabsTrigger value="pnp">PNP Draw</TabsTrigger>
            <TabsTrigger value="blog">Blog Post</TabsTrigger>
            <TabsTrigger value="noc">NOC Code</TabsTrigger>
          </TabsList>
          <TabsContent value="ee"><EEForm /></TabsContent>
          <TabsContent value="pnp"><PNPForm /></TabsContent>
          <TabsContent value="blog"><BlogForm /></TabsContent>
          <TabsContent value="noc"><NocForm /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPage;