import React, { Suspense, lazy } from "react";
import Hero from "../components/hero/Hero";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import BrandArea from "../components/brands/brands";
  import QuickBlogs from "../components/quickblogs";
import HomeInfoSection from "../components/homeInfoSection/HomeInfoSection";
import ProjectsTestimonial from "../components/projectsTestimonial/ProjectsTestimonial";
import { home_testimonials } from "../utils/variables";
import Stats from "../components/stats/Stats";
import AnimatedSection from "../components/common/AnimatedSection";
import "../components/projects/ProjectsCardsAnimation.css";
// import HeroWithTypingTest from "../components/hero/HeroWithTyping.test";
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
const Events = lazy(() => import("../components/events/Events"));
const DonationCta = lazy(() =>
  import("../components/donationCta/DonationCta")
);
const FeaturedIn = lazy(() => import("../components/featuredIn/FeaturedIn"));
const Footer = lazy(() => import("../components/footer/Footer"));
const Newsletter = lazy(() => import("../components/newsletter/Newsletter"));
// const Partners = lazy(() => import("../components/partners/Partners"));

const Home = ({ showHomeInfoSection = false }) => {
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
      <div className="home-page-animated">
        <AnimatedSection index={0}>
          <DonationForm
            formId="home-donation-form"
            layout="vertical"
            showProjectSelect={true}
          />
        </AnimatedSection>

        <AnimatedSection index={1}>
          <HeroContent />
        </AnimatedSection>

        <div ref={restRef} style={{ minHeight: '200px' }}>
          <AnimatedSection index={2}>
            <DonationFeatures />
          </AnimatedSection>

          <AnimatedSection index={3}>
            <CtaCircles />
          </AnimatedSection>

          <AnimatedSection index={4}>
            <Projects />
          </AnimatedSection>

          <AnimatedSection index={5}>
            <Stats />
          </AnimatedSection>

          <AnimatedSection index={6}>
            <BrandArea />
          </AnimatedSection>

          <AnimatedSection index={7}>
            <ProjectsTestimonial
              videos={home_testimonials.videos}
              title={home_testimonials.title}
              subtitle={home_testimonials?.subtitle}
            />
          </AnimatedSection>

          {showHomeInfoSection && (
            <AnimatedSection index={8}>
              <HomeInfoSection />
            </AnimatedSection>
          )}

          <AnimatedSection index={showHomeInfoSection ? 9 : 8}>
            <Newsletter />
          </AnimatedSection>

          <AnimatedSection index={showHomeInfoSection ? 10 : 9}>
            <DonationCta />
          </AnimatedSection>

          <AnimatedSection index={showHomeInfoSection ? 11 : 10}>
            <Footer />
          </AnimatedSection>
        </div>
      </div>
    </>
  );
};

export default Home;
