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
const VolunteerRegistration = lazy(() => import("./pages/VolunteerRegistration"));
const Checkout = lazy(() => import("./pages/Checkout"));
const DonationCardsPage = lazy(() => import("./components/donation/projects_menu/DonationCardsPage"));
const WaysToDonate = lazy(() => import("./pages/WaysToDonate"));
const Thanks = lazy(() => import("./components/thanks"));
const ZakatCalculator = lazy(() => import("./pages/ZakatCalculator"));
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
          <StickyBar />
          <Navbar />
          <StickyQuickDonationForm />
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/getInvolved" element={<GetInvolved />} />
              <Route path="/donorResources" element={<DonorResources />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:id" element={<JobDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogs/:id" element={<BlogsDetails />} />
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
            </Routes>
          </Suspense>
          <AnimatedButton />
        </DonationProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
