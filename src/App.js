import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Navbar from './components/navbar';
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Publications from "./pages/Publications";
import GetInvolved from "./pages/GetInvolved";
import DonorResources from "./pages/DonorResources"
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import './App.css';
import StickyBar from "./components/stickybar";
import BlogsPage from "./pages/Blogs";



function App() {

  useEffect(() => {
    document.body.classList.add('banner-visible');
    return () => document.body.classList.remove('banner-visible');
  }, []);

  return (
    
      <Router>
      <StickyBar />
      <Navbar />
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
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<BlogsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
