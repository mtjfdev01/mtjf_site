import CoreValues from "../components/coreValues/CoreValues";
import Directors from "../components/directors/Directors";
import Footer from "../components/footer/Footer";
import Mission from "../components/mission/Mission";
import OurStory from "../components/ourStory/OurStory";
import Team from "../components/team/Team";

const About = () => {
  return <>
     <OurStory/>
     <Mission/>
     <CoreValues/>
     <Directors/>
     {/* <Team/> */}
     <Footer />
  </>;
};
export default About;
