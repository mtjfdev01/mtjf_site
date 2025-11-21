import Causes from "../components/causes/Causes";
import DonationFeatures from "../components/donationfeatures/DonationFeatures";
import Hero from "../components/hero/Hero";
import HeroContent from '../components/heroContent/HeroContent'
import Partners from "../components/partners/Partners";
import CtaCircles from "../components/ctaCircles/CtaCircles"; 
const Home = () => {
  return <>
     <Hero />
     <HeroContent />
     <DonationFeatures/>
     <CtaCircles/>
     {/* <Partners/> */}
     {/* <Causes/> */}
      </>
};
export default Home;
