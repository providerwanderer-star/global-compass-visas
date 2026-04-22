import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import ProfileBanner from "@/components/ProfileBanner";
import SeoSchema from "@/components/SeoSchema";
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
import NotFound from "@/pages/NotFound";
import NOCFinderPage from "@/pages/NOCFinderPage";
import DrawHistoryPage from "@/pages/DrawHistoryPage";
import PNPTrackerPage from "@/pages/PNPTrackerPage";
import ProcessingTimesPage from "@/pages/ProcessingTimesPage";
import ImmigrationCostPage from "@/pages/ImmigrationCostPage";
import ComparisonPage from "@/pages/ComparisonPage";
import AustraliaSubPage from "@/pages/AustraliaSubPage";
import UKImmigrationPage from "@/pages/UKImmigrationPage";
import GermanyImmigrationPage from "@/pages/GermanyImmigrationPage";
import InDemandJobsPage from "@/pages/InDemandJobsPage";
import NOCDetailPage from "@/pages/NOCDetailPage";
import NewsHubPage from "@/pages/NewsHubPage";
import NewsDetailPage from "@/pages/NewsDetailPage";
import SearchResultsPage from "@/pages/SearchResultsPage";
import CanadaPRFromCountryPage from "@/pages/CanadaPRFromCountryPage";
import CRSBandPage from "@/pages/CRSBandPage";
import SettlementHubPage from "@/pages/SettlementHubPage";
import SettlementGuidePage from "@/pages/SettlementGuidePage";
import ProfileDashboardPage from "@/pages/ProfileDashboardPage";
import ExitIntentModal from "@/components/ExitIntentModal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <SeoSchema />
          <Navbar />
          <ProfileBanner />
          <main className="pt-16 md:pt-20">
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
              <Route path="/india/:slug" element={<StateHubPage />} />
              <Route path="/canada/:slug" element={<StateHubPage />} />
              {/* GEO/AIO Optimized New Pages */}
              <Route path="/compare" element={<ComparisonPage />} />
              <Route path="/australia/skilled-migration" element={<AustraliaSubPage />} />
              <Route path="/australia/subclass-189" element={<AustraliaSubPage />} />
              <Route path="/australia/subclass-190" element={<AustraliaSubPage />} />
              <Route path="/australia/subclass-491" element={<AustraliaSubPage />} />
              <Route path="/uk/skilled-worker" element={<UKImmigrationPage />} />
              <Route path="/uk/graduate-route" element={<UKImmigrationPage />} />
              <Route path="/germany/chancenkarte" element={<GermanyImmigrationPage />} />
              <Route path="/germany/eu-blue-card" element={<GermanyImmigrationPage />} />
              <Route path="/noc-finder" element={<NOCFinderPage />} />
              <Route path="/express-entry/draws" element={<DrawHistoryPage />} />
              <Route path="/pnp-tracker" element={<PNPTrackerPage />} />
              <Route path="/processing-times" element={<ProcessingTimesPage />} />
              <Route path="/immigration-cost-calculator" element={<ImmigrationCostPage />} />
              <Route path="/in-demand-jobs" element={<InDemandJobsPage />} />
              <Route path="/noc/:code" element={<NOCDetailPage />} />
              <Route path="/news" element={<NewsHubPage />} />
              <Route path="/news/:slug" element={<NewsDetailPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/canada-pr-from/:country" element={<CanadaPRFromCountryPage />} />
              <Route path="/canada-pr/crs/:band" element={<CRSBandPage />} />
              <Route path="/settle-in-canada" element={<SettlementHubPage />} />
              <Route path="/settle-in-canada/:slug" element={<SettlementGuidePage />} />
              <Route path="/dashboard" element={<ProfileDashboardPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
          <ExitIntentModal />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
