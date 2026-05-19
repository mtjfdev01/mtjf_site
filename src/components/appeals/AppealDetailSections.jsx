import { useState } from 'react'
import { FaCheckCircle, FaMapMarkerAlt, FaUser } from 'react-icons/fa'
import { CATEGORY_LABELS, formatMoney, getAppealImage } from '../../lib/appealsHelpers'
import './AppealDetailSections.css'

export const AppealDetailHero = ({ appeal }) => {
  if (!appeal) return null

  const categoryLabel = CATEGORY_LABELS[appeal.category] || appeal.category
  const tags = appeal.tags ? appeal.tags.split(',').map((t) => t.trim()).filter(Boolean) : []

  return (
    <section className="appeal-detail-hero">
      <div className="appeal-detail-hero__image-wrap">
        <img src={getAppealImage(appeal)} alt="" className="appeal-detail-hero__image" />
        <div className="appeal-detail-hero__overlay">
          <div className="appeal-detail-hero__badges">
            {appeal.is_urgent && <span className="appeal-badge appeal-badge--urgent">Urgent</span>}
            <span className="appeal-badge appeal-badge--category">{categoryLabel}</span>
            {tags.slice(0, 2).map((tag) => (
              <span key={tag} className="appeal-badge appeal-badge--tag">{tag}</span>
            ))}
          </div>
          <h1 className="appeal-detail-hero__title">{appeal.title}</h1>
          {appeal.organizer_name && (
            <p className="appeal-detail-hero__organizer">
              Organized by {appeal.organizer_name}
              {appeal.organizer_verified && (
                <FaCheckCircle className="appeal-detail-hero__verified" aria-label="Verified" />
              )}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export const AppealStory = ({ appeal }) => {
  const [expanded, setExpanded] = useState(false)
  if (!appeal) return null

  const story = appeal.story || ''
  const isLong = story.length > 480
  const displayStory = !isLong || expanded ? story : `${story.slice(0, 480)}…`

  return (
    <section className="appeal-detail-section">
      <h2 className="appeal-detail-section__title">Story</h2>
      {appeal.short_description && (
        <p className="appeal-detail-section__intro">{appeal.short_description}</p>
      )}
      {story && (
        <div className="appeal-detail-section__story" style={{ whiteSpace: 'pre-wrap' }}>
          {displayStory}
        </div>
      )}
      {isLong && (
        <button type="button" className="appeal-detail-section__read-more" onClick={() => setExpanded((e) => !e)}>
          {expanded ? 'Read less' : 'Read full story'}
        </button>
      )}

      {(appeal.beneficiary || appeal.goal_amount) && (
        <div className="appeal-detail-meta-pills">
          {appeal.goal_amount != null && (
            <span>Goal: {formatMoney(appeal.goal_amount, appeal.currency)}</span>
          )}
          {appeal.beneficiary?.age != null && <span>Age: {appeal.beneficiary.age}</span>}
          {appeal.beneficiary?.location && (
            <span><FaMapMarkerAlt /> {appeal.beneficiary.location}</span>
          )}
        </div>
      )}

      {appeal.impact_points?.length > 0 && (
        <div className="appeal-detail-impact">
          <h3>How your support helps</h3>
          <ul>
            {appeal.impact_points.map((point) => (
              <li key={point}><FaCheckCircle /> {point}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export const AppealUpdates = ({ updates = [] }) => {
  if (!updates.length) return null

  const sorted = [...updates].sort((a, b) => {
    const da = new Date(a.published_at || 0).getTime()
    const db = new Date(b.published_at || 0).getTime()
    return db - da
  })

  return (
    <section className="appeal-detail-section">
      <h2 className="appeal-detail-section__title">Latest Updates</h2>
      <div className="appeal-updates-list">
        {sorted.map((update) => (
          <article key={update.id} className="appeal-update-item">
            <div className="appeal-update-item__head">
              {update.is_highlighted && <span className="appeal-update-item__new">NEW</span>}
              {update.published_at && (
                <time dateTime={update.published_at}>
                  {new Date(update.published_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
              )}
            </div>
            <h3>{update.title}</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{update.content}</p>
            {update.image_urls?.length > 0 && (
              <div className="appeal-update-item__images">
                {update.image_urls.map((url) => (
                  <img key={url} src={url} alt="" loading="lazy" />
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export const AppealOrganizer = ({ appeal }) => {
  if (!appeal?.organizer_name) return null

  return (
    <section className="appeal-detail-section appeal-organizer-card">
      <h2 className="appeal-detail-section__title">About the Organizer</h2>
      <div className="appeal-organizer-card__row">
        {appeal.organizer_image_url ? (
          <img src={appeal.organizer_image_url} alt="" className="appeal-organizer-card__avatar" />
        ) : (
          <span className="appeal-organizer-card__avatar appeal-organizer-card__avatar--placeholder">
            <FaUser />
          </span>
        )}
        <div>
          <p className="appeal-organizer-card__name">
            {appeal.organizer_name}
            {appeal.organizer_verified && (
              <FaCheckCircle className="appeal-detail-hero__verified" aria-label="Verified" />
            )}
          </p>
          {appeal.organizer_location && <p>{appeal.organizer_location}</p>}
          {appeal.organizer_bio && <p className="appeal-organizer-card__bio">{appeal.organizer_bio}</p>}
        </div>
      </div>
      {(appeal.is_verified || appeal.donation_protected) && (
        <div className="appeal-organizer-card__trust">
          {appeal.is_verified && <span><FaCheckCircle /> Verified by MTJ Foundation</span>}
          {appeal.donation_protected && <span><FaCheckCircle /> Donation protected</span>}
        </div>
      )}
    </section>
  )
}
