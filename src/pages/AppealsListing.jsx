import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
import { BiSolidDonateHeart } from 'react-icons/bi'
import { fetchAppealsList, fetchFeaturedAppeal } from '../lib/appealsApi'
import { filterAppeals } from '../lib/appealsHelpers'
import AppealsHero from '../components/appeals/AppealsHero'
import FeaturedAppealCard from '../components/appeals/FeaturedAppealCard'
import AppealCard from '../components/appeals/AppealCard'
import AppealsTrustBar from '../components/appeals/AppealsTrustBar'
import Footer from '../components/footer/Footer'
import './AppealsListing.css'

const AppealsListing = () => {
  const [appeals, setAppeals] = useState([])
  const [featured, setFeatured] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    Promise.all([fetchAppealsList(), fetchFeaturedAppeal()])
      .then(([list, feat]) => {
        setAppeals(Array.isArray(list) ? list : [])
        setFeatured(feat || null)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load appeals')
        setAppeals([])
        setFeatured(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(
    () => filterAppeals(appeals, { search, category }),
    [appeals, search, category]
  )

  const gridAppeals = useMemo(() => {
    if (!featured?.id) return filtered
    return filtered.filter((a) => a.id !== featured.id)
  }, [filtered, featured])

  return (
    <div className="appeals-listing-page">
      <AppealsHero
        search={search}
        category={category}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        totalCount={appeals.length}
      />

      <div className="appeals-listing-page__body container">
        {loading && <p className="appeals-listing-page__status">Loading appeals…</p>}

        {error && (
          <div className="appeals-listing-page__error">
            <p>{error}</p>
            <p className="appeals-listing-page__error-hint">
              Check that <code>REACT_APP_BACKEND_URL</code> is set and the API allows this site origin.
            </p>
          </div>
        )}

        {!loading && !error && featured && (
          <section className="appeals-listing-page__featured">
            <FeaturedAppealCard appeal={featured} />
          </section>
        )}

        {!loading && !error && (
          <section className="appeals-listing-page__grid-section">
            <div className="appeals-listing-page__grid-header">
              <h2>All Cases</h2>
              <span>{gridAppeals.length} case{gridAppeals.length !== 1 ? 's' : ''}</span>
            </div>

            {gridAppeals.length === 0 ? (
              <div className="appeals-listing-page__empty">
                <p>No appeals match your search.</p>
                <Link to="/donate" className="appeals-listing-page__empty-cta">
                  Donate to General Fund
                </Link>
              </div>
            ) : (
              <div className="appeals-listing-page__grid">
                {gridAppeals.map((appeal) => (
                  <AppealCard key={appeal.id} appeal={appeal} />
                ))}
              </div>
            )}
          </section>
        )}

        {!loading && appeals.length === 0 && !error && (
          <div className="appeals-listing-page__empty">
            <p>No active appeals at the moment.</p>
            <Link to="/donate" className="appeals-listing-page__empty-cta">
              Donate to General Fund
            </Link>
          </div>
        )}
      </div>

      <AppealsTrustBar />

      <section className="appeals-listing-page__general-cta container">
        <div className="appeals-general-fund-card">
          <div className="appeals-general-fund-card__icon" aria-hidden="true">
            <BiSolidDonateHeart />
          </div>
          <div className="appeals-general-fund-card__copy">
            <h3 className="appeals-general-fund-card__title">
              Can&apos;t find a case that feels right for you?
            </h3>
            <p className="appeals-general-fund-card__text">
              Donate to our General Fund and support all verified cases.
            </p>
          </div>
          <Link to="/donate" className="appeals-general-fund-card__btn">
            Donate General Fund
            <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AppealsListing
