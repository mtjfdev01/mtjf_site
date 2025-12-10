import React, { Suspense, lazy } from "react";
import PageHeader from "../components/pageHeader/PageHeader";
import image1 from '../assets/img/about/hero-image.webp'
import viceChairmanImage from '../assets/img/about/yousaf_sb.webp'
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import HeroContent from "../components/heroContent/HeroContent";

const OurStory = lazy(() => import("../components/ourStory/OurStory"));
const Mission = lazy(() => import("../components/mission/Mission"));
const Vision = lazy(() => import("../components/vision/Vision"));

const CoreValues = lazy(() =>
  import("../components/coreValues/CoreValues")
);
const Directors = lazy(() => import("../components/directors/Directors"));
const Team = lazy(() => import("../components/team/Team"));
const Events = lazy(() => import("../components/events/Events"));
const Blogs = lazy(() => import("../components/blogs/Blogs"));
const DonationCta = lazy(() =>
  import("../components/donationCta/DonationCta")
);
const Footer = lazy(() => import("../components/footer/Footer"));
const Newsletter = lazy(() => import("../components/newsletter/Newsletter"));

const About = () => {
  // First component after header - loads immediately
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  });
  // Next component - loads on short scroll
  const [secondSectionRef, showSecondSection] = useIntersectionObserver({ 
    rootMargin: '100px'
  });
  // Rest of components - loads on more scroll
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
      <PageHeader title="About Us" image={image1} />
      <HeroContent />

      {/* First component after header - loads immediately */}
      <div ref={firstSectionRef}>
        {showFirstSection && (
          <Suspense fallback={null}>
            <OurStory />
          </Suspense>
        )}
      </div>

      {/* Next components - load on short scroll */}
      <div ref={secondSectionRef} style={{ minHeight: '200px' }}>
        {showSecondSection && (
          <>
            <Suspense fallback={null}>
              <Mission />
            </Suspense>
            <Suspense fallback={null}>
              <Vision />
            </Suspense>
            <Suspense fallback={null}>
              <CoreValues />
            </Suspense>
            <Suspense fallback={null}>
              <Directors
                directorRole="Chairman"
               />
            </Suspense>
            <Suspense fallback={null}>
              <Directors
                imageUrl={viceChairmanImage}
                directorName="Molana Yousaf Jamil"
                directorRole="Vice Chairman"
                directorTexts={[
                  "Molana Yousaf Jamil continues the legacy of service with a relentless focus on community uplift. He oversees programs that bring educational and spiritual guidance to families across Pakistan.",
                  "As Vice Chairman, he champions initiatives that strengthen social welfare, ensuring transparency and compassion remain at the heart of every MTJ Foundation project.",
                  "His vision inspires our teams to lead with humility, fostering a culture rooted in faith, integrity, and inclusive progress.",
                ]}
              />
            </Suspense>
            <Suspense fallback={null}>
              <Team />
            </Suspense>
          </>
        )}
      </div>

      {/* Rest of components - load on more scroll */}
      <div ref={restRef} style={{ minHeight: '200px' }}>
        {showRest && (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default About;
