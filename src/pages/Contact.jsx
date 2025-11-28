import ContactSection from '../components/contact/ContactSection'
import PageHeader from '../components/pageHeader/PageHeader'
import image1 from '../assets/img/causes/Rectangle 34625787.png'
import ContactMap from '../components/contant-us/ContactMap';
import InternationalOffices from '../components/contant-us/InternationalOffices';
import NationalOffices from '../components/contant-us/NationalOffices';
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
  </>;
};
export default Contact;
