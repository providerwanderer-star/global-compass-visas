import { useState } from "react";
import { Bell, RefreshCw, Bookmark, CheckCircle, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

/**
 * ReturnLoopCard — engagement / retention block.
 * Email capture writes to leads table with source_page='draw_alerts:<route>'.
 */
const ReturnLoopCard = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !phone) {
      toast({ title: "Missing info", description: "Please fill name, email and phone.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      full_name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      destination_country: "Canada",
      visa_type: "Draw alerts",
      source_page: `draw_alerts:${location.pathname}`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Couldn't subscribe", description: error.message, variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "You're in!", description: "We'll email you after every Express Entry & PNP draw." });
  };

  return (
    <section className="py-10 px-4 bg-card border-t border-border">
      <div className="container-narrow mx-auto max-w-3xl">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-border rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 text-primary mb-3">
            <Bell className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Stay updated</span>
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            New Canada draws every 2 weeks. Don't miss yours.
          </h3>
          <p className="text-muted-foreground mb-5">
            Get a 1-minute email after every Express Entry & PNP draw — cut-off, ITAs, and what it means for your CRS.
          </p>

          {submitted ? (
            <div className="flex items-center gap-3 bg-card border border-border rounded-xl p-4">
              <CheckCircle className="h-6 w-6 text-green-600 shrink-0" />
              <div>
                <p className="font-bold text-foreground">You're subscribed.</p>
                <p className="text-sm text-muted-foreground">Watch your inbox after the next draw.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="flex gap-2">
                <Input
                  type="tel"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" disabled={loading} className="bg-gold text-accent-foreground hover:bg-gold-dark font-semibold shadow-gold whitespace-nowrap">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Notify me"}
                </Button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-3 gap-3 mt-5 text-center">
            <div className="flex flex-col items-center gap-1">
              <RefreshCw className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Recheck your score every 30 days</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Bell className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Track your chances per draw</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Bookmark className="h-4 w-4 text-primary" />
              <p className="text-xs text-muted-foreground">Bookmark for instant return</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReturnLoopCard;