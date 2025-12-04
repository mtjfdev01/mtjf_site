import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/navbar';
import './App.css';
import StickyBar from "./components/stickybar";

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
const VolunteerRegistration = lazy(() => import("./pages/VolunteerRegistration"));



function App() {

  useEffect(() => {
    document.body.classList.add('banner-visible');
    return () => document.body.classList.remove('banner-visible');
  }, []);

  return (
    <Router>
      <CartProvider>
        <StickyBar />
        <Navbar />
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
            <Route path="/volunteerRegistration" element={<VolunteerRegistration />} />
          </Routes>
        </Suspense>
      </CartProvider>
    </Router>
  );
}

export default App;
