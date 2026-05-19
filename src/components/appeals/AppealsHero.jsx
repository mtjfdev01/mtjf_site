import { FaSearch } from 'react-icons/fa'
import { APPEAL_CATEGORIES } from '../../lib/appealsHelpers'
import './AppealsHero.css'

const AppealsHero = ({ search, category, onSearchChange, onCategoryChange, totalCount }) => {
  return (
    <section className="appeals-hero">
      <div className="appeals-hero__inner container">
        <div className="appeals-hero__copy">
          <span className="appeals-hero__eyebrow">Make a difference today</span>
          <h1 className="appeals-hero__title">Urgent Appeals</h1>
          <p className="appeals-hero__subtitle">
            Support verified cases and help people in need.
            {totalCount > 0 && (
              <span className="appeals-hero__count"> {totalCount} active cases</span>
            )}
          </p>

          <div className="appeals-hero__search">
            <FaSearch className="appeals-hero__search-icon" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search cases by name or keyword..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="appeals-hero__search-input"
              aria-label="Search appeals"
            />
          </div>

          <div className="appeals-hero__filters" role="tablist" aria-label="Filter by category">
            {APPEAL_CATEGORIES.map(({ value, label }) => (
              <button
                key={value || 'all'}
                type="button"
                role="tab"
                aria-selected={category === value}
                className={`appeals-hero__chip${category === value ? ' appeals-hero__chip--active' : ''}`}
                onClick={() => onCategoryChange(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="appeals-hero__visual" aria-hidden="true">
          <div className="appeals-hero__visual-ring">
            <div className="appeals-hero__visual-card">
              <span className="appeals-hero__visual-text">Help me continue my education</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppealsHero
