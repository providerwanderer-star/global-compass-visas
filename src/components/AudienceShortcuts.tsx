import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const audiences = [
  { flag: "🇮🇳", title: "I'm in India", desc: "Canada PR pathways from India.", href: "/canada-pr-for-indians" },
  { flag: "🇺🇸", title: "I'm on H1B", desc: "Switch from US to Canada PR.", href: "/h1b-to-canada-pr" },
  { flag: "🎓", title: "I'm a student", desc: "Study in Canada → PGWP → PR.", href: "/services/student-visa" },
];

const AudienceShortcuts = () => (
  <section className="section-padding section-light">
    <div className="container-narrow mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
          Where are you starting from?
        </h2>
        <p className="text-muted-foreground text-sm">Jump to the playbook that matches your situation.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {audiences.map((a) => (
          <Link key={a.title} to={a.href} className="block group">
            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 h-full card-interactive">
              <div className="text-4xl mb-3">{a.flag}</div>
              <h3 className="font-display text-lg font-bold mb-1">{a.title}</h3>
              <p className="text-sm text-primary-foreground/80 mb-4">{a.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold group-hover:gap-2 transition-all">
                See the pathway <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default AudienceShortcuts;
