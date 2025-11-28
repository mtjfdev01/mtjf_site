import React from 'react'
import Events from '../components/events/Events'
import Blogs from '../components/blogs/Blogs'
import DonationCta from '../components/donationCta/DonationCta'
import Footer from '../components/footer/Footer'
import PageHeader from '../components/pageHeader/PageHeader'
import image1 from '../assets/img/causes/Rectangle 34625787.png'
const BlogsPage = () => {
  return (
    <>
    <PageHeader title="Blogs Page" image={image1} />
      <Events />
      {/* <Blogs /> */}
      <DonationCta />
      <Footer />
    </>
  )
};
export default BlogsPage;