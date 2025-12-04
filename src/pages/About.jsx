import React, { Suspense, lazy } from "react";
import PageHeader from "../components/pageHeader/PageHeader";
import image1 from '../assets/img/hero section for about/hero-about.webp'
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const OurStory = lazy(() => import("../components/ourStory/OurStory"));
const Mission = lazy(() => import("../components/mission/Mission"));
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
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '100px',
    loadImmediately: true 
  });
  const [secondSectionRef, showSecondSection] = useIntersectionObserver({ 
    rootMargin: '100px'
  });
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
      <PageHeader title="About Us" image={image1} />

      <div ref={firstSectionRef}>
        {showFirstSection && (
          <>
            <Suspense fallback={null}>
              <OurStory />
            </Suspense>
            <Suspense fallback={null}>
              <Mission />
            </Suspense>
            <Suspense fallback={null}>
              <CoreValues />
            </Suspense>
          </>
        )}
      </div>

      <div ref={secondSectionRef} style={{ minHeight: '50px' }}>
        {showSecondSection && (
          <>
            <Suspense fallback={null}>
              <Directors
                directorRole="Chairman"
               />
            </Suspense>
            <Suspense fallback={null}>
              <Directors
                imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgxoxDWGzrBzuBi957aO2lG99WxQMZvavUfQ&usqp=CAU"
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

      <div ref={restRef} style={{ minHeight: '50px' }}>
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
