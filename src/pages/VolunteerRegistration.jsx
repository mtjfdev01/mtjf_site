import React from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import image1 from '../assets/img/hero section for about/hero-about.webp'
import Footer from '../components/footer/Footer'
import VolunteerForm from '../components/volunteer/VolunteerForm'

const VolunteerRegistration = () => {
  return (
    <>
    <PageHeader title="Volunteer Registration" image={image1} />
    <VolunteerForm />
    <Footer />
    </>
    )
};

export default VolunteerRegistration;