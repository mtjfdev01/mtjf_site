import React from 'react'
import PageHeader from '../components/pageHeader/PageHeader'
import MediaContentSection from '../components/mediaContentSection/MediaContentSection'
import {
  MEDIA_COVERAGE_DATA,
  MEDIA_COVERAGE_PAGE_DATA
} from '../data/media_coverage_data'
import './MediaCoverageCardsList.css'

const MediaCoverageCardsList = () => {
  const subProjects = MEDIA_COVERAGE_DATA.map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    image: item.image,
    description: item.content?.description || '',
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
    </div>
  )
}

export default MediaCoverageCardsList
