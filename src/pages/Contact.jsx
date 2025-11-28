import ContactSection from '../components/contact/ContactSection'
import PageHeader from '../components/pageHeader/PageHeader'
import image1 from '../assets/img/causes/Rectangle 34625787.png'
import ContactMap from '../components/contant-us/ContactMap';
import InternationalOffices from '../components/contant-us/InternationalOffices';
import NationalOffices from '../components/contant-us/NationalOffices';
import Events from '../components/events/Events';
import Blogs from '../components/blogs/Blogs';
import DonationCta from '../components/donationCta/DonationCta';
import Footer from '../components/footer/Footer';
const Contact = () => {
  const handleSubmit = (data) => {
    console.log(data)
  }
  return <> 
  <PageHeader title="Contact" image={image1} />
  <ContactSection onSubmit={handleSubmit} />
  <InternationalOffices/>
  <NationalOffices/>  
  <ContactMap/>
  <Events />
  <Blogs />
  <DonationCta />
  <Footer />
  </>;
};
export default Contact;
