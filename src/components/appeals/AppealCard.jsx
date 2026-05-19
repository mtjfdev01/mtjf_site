import { Link } from 'react-router-dom'
import AppealProgress from './AppealProgress'
import {
  CATEGORY_LABELS,
  formatProgress,
  getAppealImage,
  getDonateUrl,
} from '../../lib/appealsHelpers'
import './AppealCard.css'

const AppealCard = ({ appeal, variant = 'grid' }) => {
  if (!appeal) return null

  const stats = formatProgress(appeal)
  const image = getAppealImage(appeal)
  const categoryLabel = CATEGORY_LABELS[appeal.category] || appeal.category

  return (
    <article className={`appeal-card appeal-card--${variant}`}>
      <Link to={`/appeals/${appeal.slug}`} className="appeal-card__image-link">
        <div className="appeal-card__image-wrap">
          <img src={image} alt="" loading="lazy" className="appeal-card__image" />
          <div className="appeal-card__badges">
            {appeal.is_urgent && <span className="appeal-badge appeal-badge--urgent">Urgent</span>}
            <span className="appeal-badge appeal-badge--category">{categoryLabel}</span>
          </div>
        </div>
      </Link>

      <div className="appeal-card__body">
        <Link to={`/appeals/${appeal.slug}`} className="appeal-card__title">
          {appeal.title}
        </Link>
        {appeal.short_description && (
          <p className="appeal-card__desc">{appeal.short_description}</p>
        )}

        <div className="appeal-card__funding">
          <span className="appeal-card__raised">
            {stats.raised} raised of {stats.goal}
          </span>
          <AppealProgress percent={stats.percent} size="sm" />
        </div>

        <p className="appeal-card__donors">{stats.donors.toLocaleString()} donors</p>

        <div className="appeal-card__actions">
          <Link to={`/appeals/${appeal.slug}`} className="appeal-card__btn appeal-card__btn--outline">
            View Case
          </Link>
          <Link to={getDonateUrl(appeal)} className="appeal-card__btn appeal-card__btn--primary">
            Donate
          </Link>
        </div>
      </div>
    </article>
  )
}

export default AppealCard
