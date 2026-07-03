import { Helmet } from "react-helmet-async";

const PrivacyPage = () => (
  <div className="min-h-screen bg-background">
    <Helmet>
      <title>Privacy Policy | Garg Brothers</title>
      <meta name="description" content="How Garg Brothers collects, uses, stores, and protects personal information submitted through our website and consultation forms." />
      <link rel="canonical" href="https://www.gargbrothers.ca/privacy" />
    </Helmet>
    <div className="container mx-auto max-w-3xl px-4 py-16 prose prose-slate">
      <h1>Privacy Policy</h1>
      <p><em>Last updated: July 2026</em></p>

      <p>Garg Brothers ("we", "our", "us") respects your privacy. This policy explains what personal information we collect through www.gargbrothers.ca, how we use it, and the choices you have.</p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Contact details</strong> you provide via forms: name, email, phone/WhatsApp, current country, and immigration goals.</li>
        <li><strong>Assessment answers</strong> from eligibility quizzes and CRS calculators.</li>
        <li><strong>Usage data</strong> such as pages visited, device/browser type, and referring URL, collected via cookies and analytics.</li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>Respond to your inquiry and provide the consultation or service you requested.</li>
        <li>Assess eligibility and prepare recommendations for immigration pathways.</li>
        <li>Send service updates and, where you have opted in, relevant immigration news.</li>
        <li>Improve our website content and user experience.</li>
      </ul>

      <h2>Sharing</h2>
      <p>We do not sell your personal information. We share it only with our internal team and trusted service providers (hosting, email, analytics) who process it on our behalf, or when required by law.</p>

      <h2>Data storage & security</h2>
      <p>Lead submissions are stored in our secured backend with row-level access controls. Only authorized team members can view them. We retain records for as long as needed to serve you and to meet legal or regulatory obligations.</p>

      <h2>Your choices</h2>
      <ul>
        <li>Request a copy, correction, or deletion of your personal information.</li>
        <li>Unsubscribe from marketing emails at any time using the link in the message.</li>
        <li>Control cookies through your browser settings.</li>
      </ul>

      <h2>Regulated advice disclaimer</h2>
      <p>Content on this site is educational. Personalized immigration advice is provided only under a signed retainer with an authorized representative on our team.</p>

      <h2>Contact</h2>
      <p>Questions about this policy? Email <a href="mailto:sahil280389@gmail.com">sahil280389@gmail.com</a> or WhatsApp <a href="https://wa.me/16478622190">+1 (647) 862-2190</a>.</p>
    </div>
  </div>
);

export default PrivacyPage;