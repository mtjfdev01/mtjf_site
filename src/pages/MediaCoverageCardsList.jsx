import React, { Suspense, lazy } from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import MediaContentSection from '../components/mediaContentSection/MediaContentSection'
import {
  MEDIA_COVERAGE_DATA,
  MEDIA_COVERAGE_PAGE_DATA
} from '../data/media_coverage_data'
import './MediaCoverageCardsList.css'
import MediaContentVideoSection from '../mediaContentVideoSection'

const Newsletter = lazy(() => import('../components/newsletter/Newsletter'))
const DonationCta = lazy(() => import('../components/donationCta/DonationCta'))
const Footer = lazy(() => import('../components/footer/Footer'))
const ProjectsTestimonial = lazy(() => import('../components/projectsTestimonial/ProjectsTestimonial'))


const MediaCoverageCardsList = () => {
  const subProjects = MEDIA_COVERAGE_DATA.map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    image: item.image,
    description: item.content?.description || '',
    readFullNewsText: item.readFullNewsText,
    donateButtonText: item.donateButtonText,
    donationUrl: item.donationUrl,
    openInNewTab: item.openInNewTab
  }))

  return (
    <div className="media-coverage-page">
      <PageHeader
        title={MEDIA_COVERAGE_PAGE_DATA.title}
        image={MEDIA_COVERAGE_PAGE_DATA.headerImage}
      />

      <MediaContentSection subProjects={subProjects} />
      <Suspense fallback={null}>
        <MediaContentVideoSection
          videos={[
            'https://www.youtube.com/watch?v=S8ThPzyp4s0',
            'https://www.youtube.com/watch?v=S8ThPzyp4s0',
            'https://www.youtube.com/watch?v=S8ThPzyp4s0',
            'https://www.youtube.com/watch?v=S8ThPzyp4s0',
            'https://www.youtube.com/watch?v=S8ThPzyp4s0',
           ]}
          title="Our Impact in Action"
        />
      </Suspense>
      <Newsletter />
      <DonationCta />
      <Footer />
    </div>
  )
}

export default MediaCoverageCardsList
