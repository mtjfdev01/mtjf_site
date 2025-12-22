import PageHeader from '../components/pageHeader/PageHeader'
import DonationProjectsMenu from '../components/donation/projects_menu'
import Footer from '../components/footer/Footer'
import DonateImage from '../assets/img/donate/donate.png'


const Donate = () => {
  return (
    <>
    <PageHeader title={'Main Donation Page'} image={DonateImage}/>
    <DonationProjectsMenu />
    <Footer />
    </>
  )
}

export default Donate   