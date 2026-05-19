import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchAppealBySlug, fetchAppealsList } from '../lib/appealsApi'
import {
  AppealDetailHero,
  AppealStory,
  AppealUpdates,
  AppealOrganizer,
} from '../components/appeals/AppealDetailSections'
import AppealDonateSidebar from '../components/appeals/AppealDonateSidebar'
import RelatedAppeals from '../components/appeals/RelatedAppeals'
import AppealsTrustBar from '../components/appeals/AppealsTrustBar'
import Footer from '../components/footer/Footer'
import './AppealDetail.css'

const AppealDetail = () => {
  const { slug } = useParams()
  const [appeal, setAppeal] = useState(null)
  const [allAppeals, setAllAppeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setNotFound(false)
    setError(null)

    Promise.all([
      fetchAppealBySlug(slug),
      fetchAppealsList().catch(() => []),
    ])
      .then(([detail, list]) => {
        if (!detail) {
          setNotFound(true)
          return
        }
        setAppeal(detail)
        setAllAppeals(Array.isArray(list) ? list : [])
      })
      .catch((err) => setError(err.message || 'Failed to load appeal'))
      .finally(() => setLoading(false))
  }, [slug])

  useEffect(() => {
    if (!appeal?.title) return
    document.title = `${appeal.title} | MTJ Foundation`
  }, [appeal])

  if (loading) {
    return (
      <div className="appeal-detail-page appeal-detail-page--center">
        <p>Loading appeal…</p>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="appeal-detail-page appeal-detail-page--center">
        <h1>Appeal not found</h1>
        <p>This case may have ended or been removed.</p>
        <Link to="/appeals">View all appeals</Link>
      </div>
    )
  }

  if (error || !appeal) {
    return (
      <div className="appeal-detail-page appeal-detail-page--center">
        <h1>Unable to load appeal</h1>
        <p>{error}</p>
        <Link to="/appeals">Back to appeals</Link>
      </div>
    )
  }

  const gallery = (appeal.media || [])
    .filter((m) => m.media_type === 'gallery')
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))

  return (
    <div className="appeal-detail-page">
      <nav className="appeal-detail-page__breadcrumbs container" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/appeals">All Appeals</Link>
        <span>/</span>
        <span>{appeal.title}</span>
      </nav>

      <div className="appeal-detail-page__layout container">
        <div className="appeal-detail-page__main">
          <AppealDetailHero appeal={appeal} />
          <AppealStory appeal={appeal} />
          <AppealUpdates updates={appeal.updates} />

          {gallery.length > 0 && (
            <section className="appeal-detail-section">
              <h2 className="appeal-detail-section__title">Gallery</h2>
              <div className="appeal-detail-gallery">
                {gallery.map((item) => (
                  <img key={item.id} src={item.url} alt={item.caption || ''} loading="lazy" />
                ))}
              </div>
            </section>
          )}

          <AppealOrganizer appeal={appeal} />
        </div>

        <AppealDonateSidebar appeal={appeal} />
      </div>

      <RelatedAppeals appeals={allAppeals} currentId={appeal.id} />
      <AppealsTrustBar />
      <Footer />
    </div>
  )
}

export default AppealDetail
