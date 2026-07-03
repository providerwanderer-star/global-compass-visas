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
import ComparePage from "@/pages/ComparePage";
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
import AdminNocCoveragePage from "@/pages/AdminNocCoveragePage";
import AdminPage from "@/pages/AdminPage";
import ForAIPage from "@/pages/ForAIPage";
import AboutPage from "@/pages/AboutPage";
import ToolsHubPage from "@/pages/ToolsHubPage";
import OriginCountryPage from "@/pages/OriginCountryPage";
import OriginCityPage from "@/pages/OriginCityPage";
import MoveCorridorPage from "@/pages/MoveCorridorPage";
import OccupationProvincePage from "@/pages/OccupationProvincePage";
import StudyFieldProvincePage from "@/pages/StudyFieldProvincePage";
import FrancophonePathwayPage from "@/pages/FrancophonePathwayPage";
import SponsorshipPage from "@/pages/SponsorshipPage";
import RefusalPage from "@/pages/RefusalPage";
import CityIndustryPage from "@/pages/CityIndustryPage";
import ProcessingTimePage from "@/pages/ProcessingTimePage";
import CostPage from "@/pages/CostPage";
import VsComparisonPage from "@/pages/VsComparisonPage";
import LmiaPage from "@/pages/LmiaPage";
import ChangeStatusPage from "@/pages/ChangeStatusPage";
import BringFamilyPage from "@/pages/BringFamilyPage";
import AppealPage from "@/pages/AppealPage";
import RestorationPage from "@/pages/RestorationPage";
import CitizenshipPage from "@/pages/CitizenshipPage";
import ProfessionPage from "@/pages/ProfessionPage";
import StudyCanadaPage from "@/pages/StudyCanadaPage";
import PgwpPrPage from "@/pages/PgwpPrPage";
import BusinessImmigrationPage from "@/pages/BusinessImmigrationPage";
import PilotPage from "@/pages/PilotPage";
import ProcedurePage from "@/pages/ProcedurePage";
import VisitCanadaPage from "@/pages/VisitCanadaPage";
import WorkPermitPage from "@/pages/WorkPermitPage";
import PrMaintenancePage from "@/pages/PrMaintenancePage";
import PackagesPage from "@/pages/PackagesPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";
import OntarioWorkforcePriorityStreamPage from "@/pages/OntarioWorkforcePriorityStreamPage";
import USImmigrationHubPage from "@/pages/USImmigrationHubPage";
import USVisaPage from "@/pages/USVisaPage";

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
              <Route path="/packages" element={<PackagesPage />} />
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
              <Route path="/compare/:slug" element={<ComparePage />} />
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
              <Route path="/pnp/ontario/workforce-priority-stream" element={<OntarioWorkforcePriorityStreamPage />} />
              {/* US immigration reference pages — informational only, RCIC disclaimer required */}
              <Route path="/us-immigration" element={<USImmigrationHubPage />} />
              <Route path="/us-immigration/:slug" element={<USVisaPage />} />
              <Route path="/processing-times" element={<ProcessingTimesPage />} />
              <Route path="/immigration-cost-calculator" element={<ImmigrationCostPage />} />
              <Route path="/tools" element={<ToolsHubPage />} />
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
              <Route path="/admin/noc-coverage" element={<AdminNocCoveragePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/for-ai" element={<ForAIPage />} />
              <Route path="/about" element={<AboutPage />} />
              {/* Wave 2 — Origin geo targeting (USA, UK, Australia → Canada) */}
              <Route path="/usa" element={<OriginCountryPage />} />
              <Route path="/uk" element={<OriginCountryPage />} />
              <Route path="/australia" element={<OriginCountryPage />} />
              <Route path="/from/:country/:city" element={<OriginCityPage />} />
              {/* Wave 3 — Move corridors: origin city → Canadian city via program */}
              <Route path="/move/:corridor/:program" element={<MoveCorridorPage />} />
              {/* Wave 4 — Occupation × Province landing pages */}
              <Route path="/jobs/:occupation/:province" element={<OccupationProvincePage />} />
              {/* Wave 5 — Study field × Province pages */}
              <Route path="/study/:field/:province" element={<StudyFieldProvincePage />} />
              {/* Wave 6 — French pathways + Family sponsorship */}
              <Route path="/francophone/:pathway" element={<FrancophonePathwayPage />} />
              <Route path="/sponsor/:type" element={<SponsorshipPage />} />
              {/* Wave 7 — Refusal recovery + City × Industry */}
              <Route path="/refusal/:type" element={<RefusalPage />} />
              <Route path="/city/:city/:industry" element={<CityIndustryPage />} />
              {/* Wave 8 — Processing time + Cost + Vs comparisons */}
              <Route path="/processing-time/:program" element={<ProcessingTimePage />} />
              <Route path="/cost/:program" element={<CostPage />} />
              <Route path="/vs/:comparison" element={<VsComparisonPage />} />
              {/* Wave 9 — LMIA + Change-status + Bring-family */}
              <Route path="/lmia/:stream" element={<LmiaPage />} />
              <Route path="/change-status/:transition" element={<ChangeStatusPage />} />
              <Route path="/bring-family/:relation" element={<BringFamilyPage />} />
              {/* Wave 10 — Appeals + Restoration + Citizenship */}
              <Route path="/appeal/:type" element={<AppealPage />} />
              <Route path="/restoration/:scenario" element={<RestorationPage />} />
              <Route path="/citizenship/:topic" element={<CitizenshipPage />} />
              {/* Wave 11 — Profession guides + Study lifecycle + PGWP→PR */}
              <Route path="/immigrate-as/:profession" element={<ProfessionPage />} />
              <Route path="/study-canada/:topic" element={<StudyCanadaPage />} />
              <Route path="/pgwp-to-pr/:path" element={<PgwpPrPage />} />
              {/* Wave 12 — Business immigration + Atlantic/Rural pilots + IRCC procedures */}
              <Route path="/business-immigration/:program" element={<BusinessImmigrationPage />} />
              <Route path="/pilot/:program" element={<PilotPage />} />
              <Route path="/procedure/:topic" element={<ProcedurePage />} />
              {/* Wave 13 — Visit Canada + Work permit streams + PR maintenance */}
              <Route path="/visit-canada/:topic" element={<VisitCanadaPage />} />
              <Route path="/work-permit/:stream" element={<WorkPermitPage />} />
              <Route path="/pr-maintenance/:topic" element={<PrMaintenancePage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
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
