import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { CartProvider } from './contexts/CartContext';
import { DonationProvider } from './contexts/DonationContext';
import Navbar from './components/navbar';
import './App.css';
import StickyBar from "./components/stickybar";
import Donate from "./pages/Donate";
import AnimatedButton from './components/waysToDonate/AnimatedButton';
import { Winter } from "./pages/Winter";
import StickyQuickDonationForm from "./components/donation/StickyQuickDonationForm";
import PromoPopup from './components/promoPopup';
import PublicNoticePopup from './components/publicNoticePopup';
import ramzanZakatWebPopup from './assets/img/zakat/ramzan_zakat_web_popup.webp';
import ramzanZakatMobPopup from './assets/img/zakat/ramzan_zakat_mob_popup.webp';
import GlobeSection from "./components/globe/GlobeSection";
// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Publications = lazy(() => import("./pages/Publications"));
const GetInvolved = lazy(() => import("./pages/GetInvolved"));
const DonorResources = lazy(() => import("./pages/DonorResources"));
const Careers = lazy(() => import("./pages/Careers"));
const JobDetail = lazy(() => import("./pages/JobDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const BlogsPage = lazy(() => import("./pages/Blogs"));
const BlogsDetails = lazy(() => import("./pages/BlogsDetails"));
const BlogsDetailsV2 = lazy(() => import("./pages/BlogsDetailsV2"));
const VolunteerRegistration = lazy(() => import("./pages/VolunteerRegistration"));
const Checkout = lazy(() => import("./pages/Checkout"));
const DonationCardsPage = lazy(() => import("./components/donation/projects_menu/DonationCardsPage"));
const WaysToDonate = lazy(() => import("./pages/WaysToDonate"));
const Thanks = lazy(() => import("./components/thanks"));
const ZakatCalculator = lazy(() => import("./pages/ZakatCalculator"));
const DownloadsPage = lazy(() => import("./pages/Downloads"));
const MediaPage = lazy(() => import("./pages/MediaPage"));
const MediaCoverageCardsList = lazy(() => import("./pages/MediaCoverageCardsList"));
const NewsPage = lazy(() => import("./pages/News"));
const EventsPage = lazy(() => import("./pages/EventsPage"));
// const QuickBlogs = lazy(() => import("./components/quickblogs"));

 

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // or smooth:
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

function App() {

  useEffect(() => {
    document.body.classList.add('banner-visible');
    return () => document.body.classList.remove('banner-visible');
  }, []);

  return (
    <Router>
      <CartProvider>
        <DonationProvider>
          <ScrollToTop />
          <PromoPopup
            routes={['/', '/home']}
            redirectUrl="/projects/ramzan-zakat"
            desktopImage={ramzanZakatWebPopup} 
            mobileImage={ramzanZakatMobPopup}
            bannerStyle="standard"
            storageKey="ramzan_zakat_promo_popup_shown"
            showOnce={false}
            delay={3000}
            altText="Calculate and Pay Your Ramzan Zakat - MTJ Foundation"
          />
          {/* <PublicNoticePopup
            routes={['/donate', '/ways-to-donate', '/zakat-calculator', '/projects/ramzan-zakat']}
            storageKey="mtj_public_notice_popup_shown"
            showOnce={false}
            delay={2000}
          /> */}
          <StickyBar />
          <Navbar />
          <StickyQuickDonationForm />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/testinfo" element={<Home showHomeInfoSection={true} />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/fitrana" element={<ProjectDetail forcedProjectId="fitrana" />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/getInvolved" element={<GetInvolved />} />
              <Route path="/donorResources" element={<DonorResources />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:id" element={<JobDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogs/:id" element={<BlogsDetailsV2/>} />
              <Route path="/blogs/details-v2" element={<BlogsDetails/>} />
              <Route path="/volunteerRegistration" element={<VolunteerRegistration />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/donate/:projectId" element={<Donate />} />
              <Route path="/donation" element={<Donate />} />
              <Route path="/donate/cards" element={<DonationCardsPage />} />
              <Route path="/ways-to-donate" element={<WaysToDonate />} />
              <Route path="/thanks" element={<Thanks />} />
              <Route path="/winter-packages" element={<Winter />} />
              <Route path="/zakat-calculator" element={<ZakatCalculator />} />
              <Route path="/media1" element={<DownloadsPage />} />
              <Route path="/media/downloads" element={<DownloadsPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/media/coverage" element={<MediaCoverageCardsList />} />
              <Route path="/media/news" element={<NewsPage />} />
              <Route path="/globe" element={<GlobeSection />} />
              <Route path="/events" element={<EventsPage />} />
              
            </Routes>
          </Suspense>
          <AnimatedButton />
        </DonationProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
