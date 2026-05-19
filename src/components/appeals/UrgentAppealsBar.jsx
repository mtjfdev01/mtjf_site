import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { fetchUrgentHeader } from '../../lib/appealsApi'
import { getAppealImage } from '../../lib/appealsHelpers'
import './UrgentAppealsBar.css'

const ROTATE_MS = 5000

const UrgentAppealsBar = () => {
  const [items, setItems] = useState([])
  const [index, setIndex] = useState(0)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const hoverRef = useRef(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    fetchUrgentHeader(5)
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]))
  }, [])

  useEffect(() => {
    if (items.length < 2) return undefined
    intervalRef.current = setInterval(() => {
      if (!hoverRef.current) {
        setIndex((i) => (i + 1) % items.length)
      }
    }, ROTATE_MS)
    return () => clearInterval(intervalRef.current)
  }, [items])

  useEffect(() => {
    if (!dropdownOpen) return undefined
    const t = setTimeout(() => {
      if (!hoverRef.current) setDropdownOpen(false)
    }, 4000)
    return () => clearTimeout(t)
  }, [dropdownOpen, index])

  if (items.length === 0) {
    return (
      <div className="urgent-appeals-bar urgent-appeals-bar--link-only">
        <Link to="/appeals" className="urgent-appeals-bar__trigger">
          <span className="urgent-appeals-bar__dot" aria-hidden="true" />
          <span className="urgent-appeals-bar__label">Urgent Appeals</span>
        </Link>
      </div>
    )
  }

  const current = items[index]

  return (
    <div
      className="urgent-appeals-bar"
      onMouseEnter={() => {
        hoverRef.current = true
        setDropdownOpen(true)
      }}
      onMouseLeave={() => {
        hoverRef.current = false
        setDropdownOpen(false)
      }}
    >
      <button
        type="button"
        className="urgent-appeals-bar__trigger"
        onClick={() => setDropdownOpen((o) => !o)}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        <span className="urgent-appeals-bar__dot" aria-hidden="true" />
        <span className="urgent-appeals-bar__label">Urgent Appeals</span>
        <img
          src={getAppealImage(current)}
          alt=""
          className="urgent-appeals-bar__thumb"
        />
        <span className="urgent-appeals-bar__title">{current.title}</span>
      </button>

      {dropdownOpen && (
        <div className="urgent-appeals-bar__dropdown" role="menu">
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/appeals/${item.slug}`}
              className="urgent-appeals-bar__dropdown-item"
              role="menuitem"
              onClick={() => setDropdownOpen(false)}
            >
              <img src={getAppealImage(item)} alt="" />
              <span>{item.title}</span>
            </Link>
          ))}
          <Link to="/appeals" className="urgent-appeals-bar__view-all">
            View all urgent cases →
          </Link>
        </div>
      )}
    </div>
  )
}

export default UrgentAppealsBar
