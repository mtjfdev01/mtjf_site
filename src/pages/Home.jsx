import React, { Suspense, lazy, useEffect, useState } from "react";
import Hero from "../components/hero/Hero";
import { ALL_PROJECTS_DATA } from "../data/projectsData";

const HeroContent = lazy(() =>
  import("../components/heroContent/HeroContent")
);
const DonationForm = lazy(() =>
  import("../components/donationForm/DonationForm")
);
const DonationFeatures = lazy(() =>
  import("../components/donationfeatures/DonationFeatures")
);
const CtaCircles = lazy(() =>
  import("../components/ctaCircles/CtaCircles")
);
const Projects = lazy(() => import("../components/projects/Projects"));
const Stats = lazy(() => import("../components/stats/Stats"));
const Events = lazy(() => import("../components/events/Events"));
const Blogs = lazy(() => import("../components/blogs/Blogs"));
const DonationCta = lazy(() =>
  import("../components/donationCta/DonationCta")
);
const Footer = lazy(() => import("../components/footer/Footer"));
// const Partners = lazy(() => import("../components/partners/Partners"));

const Home = () => {
  const [showHeroContent, setShowHeroContent] = useState(false);
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [showRest, setShowRest] = useState(false);

  useEffect(() => {
    // Step-by-step reveal after initial Hero render
    const heroContentTimer = setTimeout(() => setShowHeroContent(true), 0);
    const donationFormTimer = setTimeout(() => setShowDonationForm(true), 0);
    const restTimer = setTimeout(() => setShowRest(true), 0);

    return () => {
      clearTimeout(heroContentTimer);
      clearTimeout(donationFormTimer);
      clearTimeout(restTimer);
    };
  }, []);

  return (
    <>
      <Hero />

      {showHeroContent && (
        <Suspense fallback={null}>
          <HeroContent />
        </Suspense>
      )}

      {showDonationForm && (
        <Suspense fallback={null}>
          <DonationForm
            layout="vertical"
            showProjectSelect={true}
            projects={ALL_PROJECTS_DATA}
          />
        </Suspense>
      )}

      {showRest && (
        <>
          <Suspense fallback={null}>
            <DonationFeatures />
          </Suspense>
          <Suspense fallback={null}>
            <CtaCircles />
          </Suspense>
          <Suspense fallback={null}>
            <Projects />
          </Suspense>
          <Suspense fallback={null}>
            <Stats />
          </Suspense>
          <Suspense fallback={null}>
            <Events />
          </Suspense>
          <Suspense fallback={null}>
            <Blogs />
          </Suspense>
          <Suspense fallback={null}>
            <DonationCta />
          </Suspense>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
          {/* <Suspense fallback={null}>
            <Partners />
          </Suspense> */}
        </>
      )}
    </>
  );
};

export default Home;
