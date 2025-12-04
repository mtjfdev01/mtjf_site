import React, { Suspense, lazy, useEffect, useState } from "react";
import PageHeader from "../components/pageHeader/PageHeader";
import image1 from "../assets/img/career/hero career.webp";

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
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageHeader title="Careers Page" image={image1} />

      {showContent && (
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
    </>
  );
};
export default Careers;
