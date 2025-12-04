import React, { Suspense, lazy } from "react";
import PageHeader from "../components/pageHeader/PageHeader";
import image1 from "../assets/img/career/hero career.webp";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

const Career = lazy(() => import("../components/career/Career"));
const JoinTeam = lazy(() => import("../components/JoinTeam/JoinTeam"));
// const Pagination = lazy(() => import("../components/pagination/Pagination"));
const Events = lazy(() => import("../components/events/Events"));
const Blogs = lazy(() => import("../components/blogs/Blogs"));
const DonationCta = lazy(() =>
  import("../components/donationCta/DonationCta")
);
const Footer = lazy(() => import("../components/footer/Footer"));
const Newsletter = lazy(() => import("../components/newsletter/Newsletter"));

const Careers = () => {
  const [firstSectionRef, showFirstSection] = useIntersectionObserver({ 
    rootMargin: '100px',
    loadImmediately: true 
  });
  const [restRef, showRest] = useIntersectionObserver({ 
    rootMargin: '200px'
  });

  return (
    <>
      <PageHeader title="Careers Page" image={image1} />

      <div ref={firstSectionRef}>
        {showFirstSection && (
          <>
            <Suspense fallback={null}>
              <Career />
            </Suspense>
            <Suspense fallback={null}>
              <JoinTeam />
            </Suspense>
            {/* <Suspense fallback={null}>
              <Pagination />
            </Suspense> */}
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
export default Careers;
