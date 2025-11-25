import Causes from "../components/causes/Causes";
import DonationFeatures from "../components/donationfeatures/DonationFeatures";
import Hero from "../components/hero/Hero";
import HeroContent from '../components/heroContent/HeroContent'
import Partners from "../components/partners/Partners";
import CtaCircles from "../components/ctaCircles/CtaCircles"; 
import Projects from "../components/projects/Projects";
import Stats from "../components/stats/Stats";
import Events from "../components/events/Events";
import Blogs from "../components/blogs/Blogs";
import DonationCta from "../components/donationCta/DonationCta";
import Footer from "../components/footer/Footer";
import DonationForm from "../components/donationForm/DonationForm";
const Home = () => {
  return <>
     <Hero />
     <HeroContent />
     <DonationForm />
     <DonationFeatures/>
     <CtaCircles/>
     <Projects/>
     <Stats />
     <Events />
     <Blogs />
     <DonationCta />
     <Footer />
     {/* <Partners/> */}
      </>
};
export default Home;
