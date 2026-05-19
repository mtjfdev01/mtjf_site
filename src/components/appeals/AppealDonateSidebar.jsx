import { Link } from 'react-router-dom'
import { FaHeart, FaShareAlt, FaLock } from 'react-icons/fa'
import AppealProgress from './AppealProgress'
import { formatProgress, getDonateUrl } from '../../lib/appealsHelpers'
import './AppealDonateSidebar.css'

const AppealDonateSidebar = ({ appeal }) => {
  if (!appeal) return null

  const stats = formatProgress(appeal)

  return (
    <aside className="appeal-donate-sidebar">
      <div className="appeal-donate-sidebar__card">
        <div className="appeal-donate-sidebar__progress-row">
          <AppealProgress percent={stats.percent} size="ring" />
          <div>
            <p className="appeal-donate-sidebar__raised">{stats.raised}</p>
            <p className="appeal-donate-sidebar__goal">raised of {stats.goal}</p>
            <p className="appeal-donate-sidebar__donors">
              {stats.donors.toLocaleString()} donations
            </p>
          </div>
        </div>

        <div className="appeal-donate-sidebar__stats">
          {stats.daysLeft != null && (
            <div>
              <strong>{stats.daysLeft}</strong>
              <span>Days left</span>
            </div>
          )}
          <div>
            <strong>{stats.donors.toLocaleString()}</strong>
            <span>Donors</span>
          </div>
          <div>
            <strong>{Math.round(stats.percent)}%</strong>
            <span>Funded</span>
          </div>
        </div>

        <Link to={getDonateUrl(appeal)} className="appeal-donate-sidebar__donate-btn">
          <FaHeart /> Donate Now
        </Link>
        <button type="button" className="appeal-donate-sidebar__share-btn" onClick={() => {
          if (navigator.share) {
            navigator.share({ title: appeal.title, url: window.location.href })
          } else {
            navigator.clipboard?.writeText(window.location.href)
          }
        }}>
          <FaShareAlt /> Share This Appeal
        </button>

        <p className="appeal-donate-sidebar__secure">
          <FaLock /> 100% secure donations
        </p>
      </div>
    </aside>
  )
}

export default AppealDonateSidebar
