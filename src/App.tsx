import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import ScrollToTop from "@/components/ScrollToTop";
import HomePage from "@/pages/HomePage";
import CountryPage from "@/pages/CountryPage";
import ServicePage from "@/pages/ServicePage";
import CityPage from "@/pages/CityPage";
import BlogListPage from "@/pages/BlogListPage";
import BlogPostPage from "@/pages/BlogPostPage";
import ContactPage from "@/pages/ContactPage";
import QuizPage from "@/pages/QuizPage";
import ExpressEntryLandingPage from "@/pages/ExpressEntryLandingPage";
import IndiaHubPage from "@/pages/IndiaHubPage";
import IndiaStudyPermitPage from "@/pages/IndiaStudyPermitPage";
import IndiaWorkPermitPage from "@/pages/IndiaWorkPermitPage";
import IndiaPRPage from "@/pages/IndiaPRPage";
import CRSCalculatorPage from "@/pages/CRSCalculatorPage";
import StateHubPage from "@/pages/StateHubPage";
import DocumentsPage from "@/pages/DocumentsPage";
import FAQPage from "@/pages/FAQPage";
import H1BToCanadaPRPage from "@/pages/H1BToCanadaPRPage";
import USAToCanadaPage from "@/pages/USAToCanadaPage";
import CanadaPRForIndiansPage from "@/pages/CanadaPRForIndiansPage";
import ToolsHubPage from "@/pages/ToolsHubPage";
import ExpressEntryDrawsPage from "@/pages/ExpressEntryDrawsPage";
import PNPDrawsPage from "@/pages/PNPDrawsPage";
import ProcessingTimesPage from "@/pages/ProcessingTimesPage";
import NOCFinderPage from "@/pages/NOCFinderPage";
import ComparePathwaysPage from "@/pages/ComparePathwaysPage";
import FamilySponsorshipHubPage from "@/pages/FamilySponsorshipHubPage";
import StudyToPRPage from "@/pages/StudyToPRPage";
import ProvinceHubPage from "@/pages/ProvinceHubPage";
import CaregiverPathwayPage from "@/pages/CaregiverPathwayPage";
import IrccFeesPage from "@/pages/IrccFeesPage";
import ImmigrationCostCalculatorPage from "@/pages/ImmigrationCostCalculatorPage";
import EligibilityCheckerPage from "@/pages/EligibilityCheckerPage";
import OPTToCanadaPage from "@/pages/OPTToCanadaPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <main className="pt-16 md:pt-20 pb-20 md:pb-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/immigration/:slug" element={<CountryPage />} />
              <Route path="/express-entry" element={<ExpressEntryLandingPage />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/city/:slug" element={<CityPage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/india" element={<IndiaHubPage />} />
              <Route path="/india/study-permit-india" element={<IndiaStudyPermitPage />} />
              <Route path="/india/work-permit-india" element={<IndiaWorkPermitPage />} />
              <Route path="/india/canada-pr-india" element={<IndiaPRPage />} />
              <Route path="/crs-calculator" element={<CRSCalculatorPage />} />
              <Route path="/documents/:slug" element={<DocumentsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/h1b-to-canada-pr" element={<H1BToCanadaPRPage />} />
              <Route path="/usa-to-canada-immigration" element={<USAToCanadaPage />} />
              <Route path="/canada-pr-for-indians" element={<CanadaPRForIndiansPage />} />
              <Route path="/tools" element={<ToolsHubPage />} />
              <Route path="/tools/express-entry-draws" element={<ExpressEntryDrawsPage />} />
              <Route path="/tools/pnp-draws" element={<PNPDrawsPage />} />
              <Route path="/tools/processing-times" element={<ProcessingTimesPage />} />
              <Route path="/tools/noc-finder" element={<NOCFinderPage />} />
              <Route path="/tools/compare-pathways" element={<ComparePathwaysPage />} />
              <Route path="/tools/ircc-fees" element={<IrccFeesPage />} />
              {/* Spec-aliased flat routes (mirror /tools/* for SEO) */}
              <Route path="/noc-finder" element={<NOCFinderPage />} />
              <Route path="/express-entry/draws" element={<ExpressEntryDrawsPage />} />
              <Route path="/pnp-tracker" element={<PNPDrawsPage />} />
              <Route path="/processing-times" element={<ProcessingTimesPage />} />
              <Route path="/immigration-cost-calculator" element={<ImmigrationCostCalculatorPage />} />
              <Route path="/eligibility-checker" element={<EligibilityCheckerPage />} />
              <Route path="/tools/eligibility-checker" element={<EligibilityCheckerPage />} />
              <Route path="/opt-to-canada" element={<OPTToCanadaPage />} />
              <Route path="/family-sponsorship" element={<FamilySponsorshipHubPage />} />
              <Route path="/study-to-pr" element={<StudyToPRPage />} />
              <Route path="/caregiver-pathway" element={<CaregiverPathwayPage />} />
              <Route path="/canada-pnp/:slug" element={<ProvinceHubPage />} />
              <Route path="/india/:slug" element={<StateHubPage />} />
              <Route path="/canada/:slug" element={<StateHubPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <StickyMobileCTA />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
