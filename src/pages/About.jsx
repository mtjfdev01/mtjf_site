import Blogs from "../components/blogs/Blogs";
import CoreValues from "../components/coreValues/CoreValues";
import Directors from "../components/directors/Directors";
import DonationCta from "../components/donationCta/DonationCta";
import Events from "../components/events/Events";
import Footer from "../components/footer/Footer";
import Mission from "../components/mission/Mission";
import OurStory from "../components/ourStory/OurStory";
import Team from "../components/team/Team";
import PageHeader from "../components/pageHeader/PageHeader";
import image1 from "../assets/img/causes/Rectangle 34625787.png";

const About = () => {
  return <>
  <PageHeader title="About Us" image={image1} /> 
     <OurStory/>
     <Mission/>
     <CoreValues/>
     <Directors/>
     <Directors
      imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgxoxDWGzrBzuBi957aO2lG99WxQMZvavUfQ&usqp=CAU"
      directorName="Molana Yousaf Jamil"
      directorRole="Vice Chairman"
      directorTexts={[
        "Molana Yousaf Jamil continues the legacy of service with a relentless focus on community uplift. He oversees programs that bring educational and spiritual guidance to families across Pakistan.",
        "As Vice Chairman, he champions initiatives that strengthen social welfare, ensuring transparency and compassion remain at the heart of every MTJ Foundation project.",
        "His vision inspires our teams to lead with humility, fostering a culture rooted in faith, integrity, and inclusive progress."
      ]}
     />
     {/* <Team/> */}
     <Events />
     <Blogs />
     <DonationCta />
     <Footer />
  </>;
};
export default About;
