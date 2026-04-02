import React, { Suspense, lazy } from "react";
import PageHeader from "../components/pageHeader/PageHeader";
import image1 from "../assets/img/career/hero_career.webp";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const Career = lazy(() => import("../components/career/Career"));
const JoinTeam = lazy(() => import("../components/JoinTeam/JoinTeam"));
const WhistleblowerPolicy = lazy(() =>
  import("../components/WhistleblowerPolicy/WhistleblowerPolicy")
);
// const Pagination = lazy(() => import("../components/pagination/Pagination"));
const Events = lazy(() => import("../components/events/Events"));
const QuickBlogs = lazy(() => import("../components/quickblogs/index"));
const DonationCta = lazy(() =>
  import("../components/donationCta/DonationCta")
);
const Footer = lazy(() => import("../components/footer/Footer"));
const Newsletter = lazy(() => import("../components/newsletter/Newsletter"));

const Careers = () => {
  // First component after header - loads immediately
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '50px',
    loadImmediately: true 
  });
  // Rest of components - loads on more scroll
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
      <PageHeader title="Careers Page" image={image1} />

      {/* First component after header - loads immediately */}
      <div ref={firstSectionRef}>
        {showFirstSection && (
          <Suspense fallback={null}>
            <Career />
          </Suspense>
        )}
      </div>

      {/* Next component - loads on short scroll */}
      <div ref={restRef} style={{ minHeight: '200px' }}>
        {showRest && (
          <>
            <Suspense fallback={null}>
              <JoinTeam />
            </Suspense>
            <Suspense fallback={null}>
              <WhistleblowerPolicy />
            </Suspense>
            {/* <Suspense fallback={null}>
              <Pagination />
            </Suspense> */}
            {/* <Suspense fallback={null}>
              <Events />
            </Suspense> */}
            {/* <Suspense fallback={null}>
              <QuickBlogs />
            </Suspense> */}
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
export default Careers;
