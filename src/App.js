import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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



function App() {
  return (
    
      <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
