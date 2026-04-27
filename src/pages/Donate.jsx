import PageHeader from '../components/pageHeader/PageHeader'
import DonationProjectsMenu from '../components/donation/projects_menu'
import Footer from '../components/footer/Footer'
import DonateImage from '../assets/img/donate/donate.png'
import DonateLgImage from '../assets/img/donate/donate_xs.png'


const Donate = () => {
  return (
    <>
    <div className='d-none md:d-block'>
    
      <PageHeader title={'Main Donation Page'} image={DonateLgImage}/>
    </div>
    <div className='md:d-none'>
    <PageHeader title={'Main Donation Page'} image={DonateImage}/>
    </div>
    <DonationProjectsMenu />
    <Footer />
    </>
  )
}

export default Donate   