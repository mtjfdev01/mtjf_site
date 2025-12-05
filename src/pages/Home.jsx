import React, { Suspense, lazy } from "react";
import Hero from "../components/hero/Hero";
import { ALL_PROJECTS_DATA } from "../data/projectsData";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

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
const Newsletter = lazy(() => import("../components/newsletter/Newsletter"));
// const Partners = lazy(() => import("../components/partners/Partners"));

const Home = () => {
  // Simple progressive loading - components load when they're about to enter viewport
  const [heroContentRef, showHeroContent] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true // Load immediately
  });
  const [donationFormRef, showDonationForm] = useIntersectionObserver({ 
    rootMargin: '100px'
  });
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
      <Hero />

      {/* Hero Content - Load immediately */}
      <div ref={heroContentRef}>
        {showHeroContent && (
          <Suspense fallback={null}>
            <HeroContent />
            <DonationForm
              formId="home-donation-form"
              layout="vertical"
              showProjectSelect={true}
              projects={ALL_PROJECTS_DATA}
            />
          </Suspense>
        )}
      </div>

      {/* Donation Form - Load when near viewport */}
      {/* <div ref={donationFormRef} style={{ minHeight: '200px' }}>
        {showDonationForm && (
          <Suspense fallback={null}>

          </Suspense>
        )}
      </div> */}

      {/* Rest of components - Load when near viewport */}
      <div ref={restRef} style={{ minHeight: '200px' }}>
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
              <Newsletter />
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
      </div>
    </>
  );
};

export default Home;
