// src/pages/ApnaGharPage.jsx
import React from 'react';
import './ApnaGharPage.css';

// Importing components from src/components/apnaGhar/
import Header from '../components/apnaGhar/Header';
import Hero from '../components/apnaGhar/Hero';
import About from '../components/apnaGhar/About';
import Facilities from '../components/apnaGhar/Facilities';
import ProjectPlanning from '../components/apnaGhar/ProjectPlanning';
import QuickDonate from '../components/apnaGhar/QuickDonate';
import VisionMission from '../components/apnaGhar/VisionMission';
import Impact from '../components/apnaGhar/Impact';
import BrandArea from "../components/brands/brands";
import CtaBanner from '../components/apnaGhar/CtaBanner';
import Footer from '../components/footer/Footer'

const ApnaGharPage = () => {
  return (
    <div className="apna-ghar-page">
      {/* <Header /> */}
      <main>
        <Hero />
        <section className="wrap">
          <About />
        </section>
        <section className="wrap">
          <Facilities />
        </section>
        <section className="wrap">
          <ProjectPlanning />
        </section>
        <section className="wrap">
          <QuickDonate />
        </section>
        <section className="wrap">
          <VisionMission />
        </section>
        <section className="wrap">
          <Impact />
        </section>
           <BrandArea variant="small" />
        <section className="wrap">
          <CtaBanner />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ApnaGharPage;