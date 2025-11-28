import Career from "../components/career/Career";
import JoinTeam from "../components/JoinTeam/JoinTeam";
import Pagination from "../components/pagination/Pagination";
// import Careers from "../components/career/Career"
import PageHeader from "../components/pageHeader/PageHeader"
import image1 from "../assets/img/causes/Rectangle 34625787.png"
import Events from "../components/events/Events"
import Blogs from "../components/blogs/Blogs"
import DonationCta from "../components/donationCta/DonationCta"
import Footer from "../components/footer/Footer"

const Careers = () => {
  return <>
  <PageHeader title="Careers Page" image={image1} />
<Career/>
<JoinTeam/>
  {/* <Pagination/> */}
  <Events />
  <Blogs />
  <DonationCta />
  <Footer />
  </>;
};
export default Careers;
