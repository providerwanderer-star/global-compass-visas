import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

interface EligibilityFormProps {
  sourcePage?: string;
  defaultValues?: {
    destination_country?: string;
    visa_type?: string;
    education_level?: string;
  };
  heading?: string;
}

const EligibilityForm = ({ sourcePage = "general", defaultValues, heading }: EligibilityFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    destination_country: defaultValues?.destination_country ?? "",
    visa_type: defaultValues?.visa_type ?? "",
    education_level: defaultValues?.education_level ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("leads").insert({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        destination_country: formData.destination_country || null,
        visa_type: formData.visa_type || null,
        education_level: formData.education_level || null,
        source_page: sourcePage,
      });

      if (error) throw error;

      // Send email notification
      await fetch("https://formsubmit.co/ajax/sahil280389@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          _subject: `🆕 New Lead from 4 Aces Visa — ${sourcePage}`,
          Name: formData.full_name,
          Email: formData.email,
          Phone: formData.phone,
          "Destination Country": formData.destination_country || "Not specified",
          "Visa Type": formData.visa_type || "Not specified",
          "Education Level": formData.education_level || "Not specified",
          "Source Page": sourcePage,
          _template: "table",
        }),
      });

      // GA4 — lead conversion
      trackEvent("generate_lead", {
        event_category: "Lead",
        event_label: "Eligibility Form",
        value: 1,
        source_page: sourcePage,
      });

      setSubmitted(true);
      toast.success("Thank you! Our immigration expert will contact you within 24 hours.");
    } catch {
      toast.error("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground">Our immigration expert will contact you within 24 hours with your eligibility assessment.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          placeholder="Full Name *"
          required
          className="bg-card border-border"
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email *"
          required
          className="bg-card border-border"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <Input
          type="tel"
          placeholder="Phone Number *"
          required
          className="bg-card border-border"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <Select value={formData.destination_country || undefined} onValueChange={(v) => setFormData({ ...formData, destination_country: v })}>
          <SelectTrigger className="bg-card border-border">
            <SelectValue placeholder="Destination Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="canada">🇨🇦 Canada</SelectItem>
            <SelectItem value="australia">🇦🇺 Australia</SelectItem>
            <SelectItem value="germany">🇩🇪 Germany</SelectItem>
            <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
            <SelectItem value="not-sure">Not Sure Yet</SelectItem>
          </SelectContent>
        </Select>
        <Select value={formData.visa_type || undefined} onValueChange={(v) => setFormData({ ...formData, visa_type: v })}>
          <SelectTrigger className="bg-card border-border">
            <SelectValue placeholder="Visa Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pr">Permanent Residency</SelectItem>
            <SelectItem value="work">Work Permit</SelectItem>
            <SelectItem value="study">Student Visa</SelectItem>
            <SelectItem value="lmia">LMIA Assistance</SelectItem>
            <SelectItem value="pnp">PNP Application</SelectItem>
            <SelectItem value="visitor">Visitor Visa / Super Visa</SelectItem>
            <SelectItem value="restoration">Visa Restoration</SelectItem>
            <SelectItem value="family">Family Sponsorship</SelectItem>
            <SelectItem value="citizenship">Citizenship Application</SelectItem>
            <SelectItem value="jobseeker">Job Seeker Visa</SelectItem>
            <SelectItem value="insurance">Visitor Visa Insurance</SelectItem>
          </SelectContent>
        </Select>
        <Select value={formData.education_level || undefined} onValueChange={(v) => setFormData({ ...formData, education_level: v })}>
          <SelectTrigger className="bg-card border-border">
            <SelectValue placeholder="Education Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="highschool">High School</SelectItem>
            <SelectItem value="diploma">Diploma</SelectItem>
            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
            <SelectItem value="masters">Master's Degree</SelectItem>
            <SelectItem value="phd">PhD</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-accent-foreground hover:bg-gold-dark font-semibold text-base py-6 shadow-gold"
      >
        {loading ? "Submitting..." : "Check My Eligibility — Free Assessment"}
      </Button>
      <p className="text-xs text-muted-foreground text-center">100% confidential. No spam. Expert response within 24 hours.</p>
    </form>
  );
};

export default EligibilityForm;
