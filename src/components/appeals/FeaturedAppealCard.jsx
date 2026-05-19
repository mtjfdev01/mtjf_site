import { Link } from 'react-router-dom'
import { FaHeart, FaShieldAlt } from 'react-icons/fa'
import AppealProgress from './AppealProgress'
import {
  CATEGORY_LABELS,
  formatProgress,
  getAppealImage,
  getDonateUrl,
} from '../../lib/appealsHelpers'
import './FeaturedAppealCard.css'

const FeaturedAppealCard = ({ appeal }) => {
  if (!appeal) return null

  const stats = formatProgress(appeal)
  const image = getAppealImage(appeal)
  const categoryLabel = CATEGORY_LABELS[appeal.category] || appeal.category

  return (
    <article className="featured-appeal-card">
      <Link to={`/appeals/${appeal.slug}`} className="featured-appeal-card__media">
        <img src={image} alt="" loading="lazy" />
        <span className="featured-appeal-card__featured-tag">Featured Appeal</span>
      </Link>

      <div className="featured-appeal-card__content">
        <div className="featured-appeal-card__badges">
          {appeal.is_urgent && <span className="appeal-badge appeal-badge--urgent">Urgent</span>}
          <span className="appeal-badge appeal-badge--category">{categoryLabel}</span>
        </div>

        <h2 className="featured-appeal-card__title">
          <Link to={`/appeals/${appeal.slug}`}>{appeal.title}</Link>
        </h2>

        {appeal.short_description && (
          <p className="featured-appeal-card__desc">{appeal.short_description}</p>
        )}

        <div className="featured-appeal-card__stats">
          <span>{stats.raised} raised of {stats.goal}</span>
          <AppealProgress percent={stats.percent} />
        </div>

        <div className="featured-appeal-card__meta">
          <span>{stats.donors.toLocaleString()} donations</span>
          {appeal.is_verified && (
            <span className="featured-appeal-card__verified">
              <FaShieldAlt /> Verified Case
            </span>
          )}
        </div>

        <div className="featured-appeal-card__actions">
          <Link to={`/appeals/${appeal.slug}`} className="featured-appeal-card__btn featured-appeal-card__btn--primary">
            View Case
          </Link>
          <Link to={getDonateUrl(appeal)} className="featured-appeal-card__btn featured-appeal-card__btn--donate">
            <FaHeart /> Donate Now
          </Link>
        </div>
      </div>
    </article>
  )
}

export default FeaturedAppealCard
