import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConnectedFooter from "@/components/ConnectedFooter";

const SITE = "https://www.gargbrothers.ca";

/**
 * /brand — Public rebrand notice: 4 Aces Visa → Garg Brothers.
 * Cements entity consolidation for Google Knowledge Graph + AI engines
 * (Perplexity/ChatGPT/Claude/Gemini) after 4acesvisa.com is 301'd here.
 */
const BrandPage = () => {
  const url = `${SITE}/brand`;
  const title = "4 Aces Visa is now Garg Brothers — Same Team, Same Mission";
  const description =
    "4 Aces Visa has rebranded to Garg Brothers. Same licensed team, same 98% approval rate, 15,000+ successful visas since 2016. All 4acesvisa.com pages now redirect to gargbrothers.ca.";

  const faqs = [
    {
      q: "Is Garg Brothers the same company as 4 Aces Visa?",
      a: "Yes. Garg Brothers is the new brand name for the immigration consultancy previously known as 4 Aces Visa. Same founders, same licensed team, same office, same phone number (+1-647-862-2190), same email (sahil280389@gmail.com). Only the name and website domain have changed.",
    },
    {
      q: "Why did 4 Aces Visa rebrand to Garg Brothers?",
      a: "The Garg Brothers name reflects the founding family that built this consultancy and better represents our 'by immigrants, for immigrants' mission across Canada, Australia, Germany, and the UK.",
    },
    {
      q: "Does 4acesvisa.com still work?",
      a: "Yes. Every page on 4acesvisa.com automatically redirects (HTTP 301) to the matching page on gargbrothers.ca, so old bookmarks, search results, and shared links all still work.",
    },
    {
      q: "Are my previous 4 Aces Visa applications and files still valid?",
      a: "Absolutely. Nothing changes about ongoing applications, contracts, or client relationships. Existing clients can continue to reach us at the same phone, WhatsApp (+1-647-862-2190), and email address.",
    },
    {
      q: "Do I need to sign new contracts because of the rebrand?",
      a: "No. All existing agreements, retainer contracts, and service commitments remain in full force under Garg Brothers as the legal continuation of 4 Aces Visa.",
    },
  ];

  const brandLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Garg Brothers",
        alternateName: ["4 Aces Visa", "4acesvisa", "4 Aces Immigration"],
        url: SITE,
        sameAs: [
          "https://www.4acesvisa.com",
          "https://4acesvisa.com",
          "https://wa.me/16478622190",
        ],
        foundingDate: "2016",
        email: "sahil280389@gmail.com",
        telephone: "+1-647-862-2190",
      },
      {
        "@type": "AboutPage",
        "@id": `${url}#aboutpage`,
        url,
        name: title,
        description,
        mainEntity: { "@id": `${SITE}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(brandLD)}</script>
      </Helmet>

      <section className="bg-gradient-to-br from-blue-50 via-white to-red-50 border-b">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold mb-4">
            OFFICIAL REBRAND NOTICE
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            4 Aces Visa is now <span className="text-blue-700">Garg Brothers</span>
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            Same licensed team. Same 98% approval rate. Same phone, email, and office.
            Just a new name and new website.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            All <strong>4acesvisa.com</strong> URLs now permanently redirect to{" "}
            <strong>gargbrothers.ca</strong>.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-blue-700 hover:bg-blue-800">
              <Link to="/">
                Explore Garg Brothers <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contact">Contact the team</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          What stays exactly the same
        </h2>
        <ul className="grid md:grid-cols-2 gap-3 mb-12">
          {[
            "Founders, licensed team, and office",
            "Phone / WhatsApp: +1-647-862-2190",
            "Email: sahil280389@gmail.com",
            "15,000+ successful visas since 2016",
            "98% approval rate",
            "All ongoing applications and contracts",
            "Service coverage: Canada, Australia, Germany, UK",
            "Languages: English, Hindi, Punjabi",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-gray-700">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Frequently asked questions about the rebrand
        </h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group border rounded-lg p-4 bg-white shadow-sm"
            >
              <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                {f.q}
                <span className="text-blue-600 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="mt-3 text-gray-700 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <ConnectedFooter />
    </div>
  );
};

export default BrandPage;