import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

const EligibilityForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Thank you! Our immigration expert will contact you within 24 hours.");
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
        <Input placeholder="Full Name *" required className="bg-card border-border" />
        <Input type="email" placeholder="Email *" required className="bg-card border-border" />
        <Input type="tel" placeholder="Phone Number *" required className="bg-card border-border" />
        <Select required>
          <SelectTrigger className="bg-card border-border">
            <SelectValue placeholder="Destination Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="canada">🇨🇦 Canada</SelectItem>
            <SelectItem value="australia">🇦🇺 Australia</SelectItem>
            <SelectItem value="germany">🇩🇪 Germany</SelectItem>
            <SelectItem value="not-sure">Not Sure Yet</SelectItem>
          </SelectContent>
        </Select>
        <Select required>
          <SelectTrigger className="bg-card border-border">
            <SelectValue placeholder="Visa Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pr">Permanent Residency</SelectItem>
            <SelectItem value="work">Work Permit</SelectItem>
            <SelectItem value="study">Study Visa</SelectItem>
            <SelectItem value="jobseeker">Job Seeker Visa</SelectItem>
            <SelectItem value="family">Family Sponsorship</SelectItem>
            <SelectItem value="visitor">Visitor Visa</SelectItem>
          </SelectContent>
        </Select>
        <Select>
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
      <Button type="submit" className="w-full bg-gold text-accent-foreground hover:bg-gold-dark font-semibold text-base py-6 shadow-gold">
        Check My Eligibility — Free Assessment
      </Button>
      <p className="text-xs text-muted-foreground text-center">100% confidential. No spam. Expert response within 24 hours.</p>
    </form>
  );
};

export default EligibilityForm;
