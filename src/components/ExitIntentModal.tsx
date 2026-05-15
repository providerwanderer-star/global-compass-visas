import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useUserProfile } from "@/hooks/useUserProfile";

const STORAGE_KEY = "4aces_exit_intent_v1";
const COOLDOWN_DAYS = 7;

function shouldShow(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const { ts } = JSON.parse(raw) as { ts: number };
    const days = (Date.now() - ts) / (1000 * 60 * 60 * 24);
    return days > COOLDOWN_DAYS;
  } catch {
    return true;
  }
}

function markShown() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now() }));
  } catch {
    /* quota */
  }
}

/**
 * Site-wide exit-intent lead-capture modal.
 * Triggers on:
 *  - Desktop: mouseleave toward the top of the viewport
 *  - Mobile: 30s + scroll-up gesture
 * Cooldown: 7 days per browser.
 */
const ExitIntentModal = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { profile } = useUserProfile();

  useEffect(() => {
    if (!shouldShow()) return;

    let mobileTimer: number | undefined;
    let lastTouchY = 0;
    let armed = false;

    const trigger = () => {
      if (!shouldShow()) return;
      setOpen(true);
      markShown();
      cleanup();
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 8) trigger();
    };

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!armed) return;
      const y = e.touches[0]?.clientY ?? 0;
      if (y - lastTouchY > 40 && window.scrollY < 80) trigger();
    };

    mobileTimer = window.setTimeout(() => {
      armed = true;
    }, 30_000);

    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });

    function cleanup() {
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      if (mobileTimer) window.clearTimeout(mobileTimer);
    }

    return cleanup;
  }, []);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("leads").insert({
        full_name: "Exit-intent capture",
        email: email.trim(),
        phone: "n/a",
        destination_country: "Canada",
        visa_type: profile.intent ?? null,
        source_page: "exit-intent-modal",
      });
      if (error) throw error;
      toast.success("Thanks! We'll email you a free PR roadmap within 24h.");
      setOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or use the contact form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-4 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div className="relative w-full max-w-md bg-card rounded-2xl border border-border shadow-2xl p-6 sm:p-8">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 h-9 w-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
          <Sparkles className="h-3 w-3" /> Wait — free roadmap
        </div>

        <h2 id="exit-intent-title" className="font-display text-2xl font-bold text-foreground mb-2">
          Before you go — get your free Canada PR roadmap
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Drop your email and we'll send you a personalized PR pathway plan based on
          your latest CRS score and intent — no obligation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11"
          />
          <Button type="submit" className="w-full h-11" disabled={loading}>
            {loading ? "Sending…" : "Send my free roadmap"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Or take the{" "}
          <Link to="/quiz" className="text-primary font-semibold hover:underline" onClick={() => setOpen(false)}>
            60-second eligibility quiz
          </Link>
          {" "}for an instant pathway match.
        </p>
      </div>
    </div>
  );
};

export default ExitIntentModal;
