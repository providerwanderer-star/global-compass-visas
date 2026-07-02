import { Helmet } from "react-helmet-async";

const TermsPage = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>Terms of Service | 4 Aces Visa</title>
      <meta name="description" content="Terms governing your use of the 4 Aces Visa website, educational content, calculators, and consultation requests." />
      <link rel="canonical" href="https://www.4acesvisa.com/terms" />
    </Helmet>
    <div className="container mx-auto max-w-3xl px-4 py-16 prose prose-slate">
      <h1>Terms of Service</h1>
      <p><em>Last updated: July 2026</em></p>

      <p>By accessing www.4acesvisa.com you agree to these Terms. If you do not agree, please do not use the site.</p>

      <h2>Educational content only</h2>
      <p>All articles, guides, calculators (CRS, cost, processing time), quizzes, and comparisons on this site are provided for general information. They do not constitute legal or immigration advice and are not a substitute for personalized advice from an authorized representative.</p>

      <h2>No representative relationship</h2>
      <p>Submitting a form, using a calculator, or contacting us does not create a client-representative relationship. Such a relationship is formed only after a signed retainer agreement with our team.</p>

      <h2>Accuracy</h2>
      <p>Immigration rules change frequently. We work to keep information current but do not warrant that all content is accurate, complete, or up to date. Always verify with the official IRCC website or a licensed representative before acting.</p>

      <h2>Acceptable use</h2>
      <ul>
        <li>Do not submit false, misleading, or third-party personal information without consent.</li>
        <li>Do not attempt to disrupt, scrape at scale, or reverse-engineer the site.</li>
        <li>Do not use our content to impersonate an authorized representative.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>Site content, branding, and layouts are owned by 4 Aces Visa. You may share links freely; reproducing substantial content requires written permission.</p>

      <h2>Third-party links</h2>
      <p>We link to government and partner resources for convenience. We are not responsible for the content or policies of those sites.</p>

      <h2>Limitation of liability</h2>
      <p>To the fullest extent permitted by law, 4 Aces Visa is not liable for any indirect, incidental, or consequential loss arising from use of this site or reliance on its content.</p>

      <h2>Changes</h2>
      <p>We may update these Terms at any time. Continued use of the site after changes means you accept the revised Terms.</p>

      <h2>Contact</h2>
      <p>Questions? Email <a href="mailto:sahil280389@gmail.com">sahil280389@gmail.com</a> or WhatsApp <a href="https://wa.me/16478622190">+1 (647) 862-2190</a>.</p>
    </div>
  </div>
);

export default TermsPage;