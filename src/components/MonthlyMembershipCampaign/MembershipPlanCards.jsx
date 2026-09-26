import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDonation } from '../../contexts/DonationContext'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import './MembershipPlanCards.css'

const PLAN_COLORS = ['#eaaa00', '#00a3e0', '#e4002b', '#009a44']

/** Map membership plan labels to website project ids. */
const PLAN_PROJECT_IDS = {
  member: 'membership-campaign',
  '250,000 movement': 'membership-campaign',
  education: 'education',
  'food & ration': 'monthly-ration',
  'clean water': 'clean-water',
  housing: 'apna-ghar',
  'skills development': 'kasb-skill-development',
  'emergency relief': 'disaster-management',
  'community services': 'community-services',
  'marriage gift': 'marriage-gift',
  'financial assistance': 'community-services',
  'aas lab & diagnostics': 'aas-lab-diagnostics',
}

function getPlanProjectId(planName) {
  const key = String(planName || '').trim().toLowerCase()
  if (PLAN_PROJECT_IDS[key]) return PLAN_PROJECT_IDS[key]
  const slug = key.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return slug || 'membership-campaign'
}

function isLightColor(hex) {
  const raw = String(hex || '').replace('#', '')
  if (raw.length !== 6) return false
  const r = parseInt(raw.slice(0, 2), 16)
  const g = parseInt(raw.slice(2, 4), 16)
  const b = parseInt(raw.slice(4, 6), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 160
}

const MembershipPlanCards = ({ plans = [] }) => {
  const navigate = useNavigate()
  const { updateProjectDonation, setDonationFormData } = useDonation()
  const [sectionRef, isInView] = useInViewOnce({ threshold: 0.08, rootMargin: '40px' })
  const scrollContainerRef = useRef(null)
  const [selected, setSelected] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchScrollLeft, setTouchScrollLeft] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const { scrollLeft: left, scrollWidth, clientWidth } = container
    setCanScrollPrev(left > 0)
    setCanScrollNext(left < scrollWidth - clientWidth - 1)
  }

  const handleMouseDown = (event) => {
    setIsDragging(true)
    setStartX(event.pageX - scrollContainerRef.current.offsetLeft)
    setScrollLeft(scrollContainerRef.current.scrollLeft)
    scrollContainerRef.current.style.cursor = 'grabbing'
    scrollContainerRef.current.style.userSelect = 'none'
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.cursor = 'grab'
      scrollContainerRef.current.style.userSelect = 'auto'
    }
  }

  const handleMouseUp = handleMouseLeave

  const handleMouseMove = (event) => {
    if (!isDragging || !scrollContainerRef.current) return
    event.preventDefault()
    const x = event.pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollContainerRef.current.scrollLeft = scrollLeft - walk
    checkScrollPosition()
  }

  const handleTouchStart = (event) => {
    setTouchStart(event.touches[0].pageX - scrollContainerRef.current.offsetLeft)
    setTouchScrollLeft(scrollContainerRef.current.scrollLeft)
  }

  const handleTouchMove = (event) => {
    if (!scrollContainerRef.current) return
    const x = event.touches[0].pageX - scrollContainerRef.current.offsetLeft
    const walk = (x - touchStart) * 2
    scrollContainerRef.current.scrollLeft = touchScrollLeft - walk
    checkScrollPosition()
  }

  const scrollTo = (direction) => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const firstCard = container.querySelector('.membership-plan-card')
    const grid = container.querySelector('.membership-plan-cards__grid')
    const gridStyles = grid ? window.getComputedStyle(grid) : null
    const gap = gridStyles ? parseFloat(gridStyles.columnGap || gridStyles.gap || '0') : 0
    const scrollAmount = firstCard
      ? firstCard.getBoundingClientRect().width + gap
      : container.clientWidth

    container.scrollBy({
      left: direction === 'prev' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
    setTimeout(checkScrollPosition, 300)
  }

  const goToCheckout = (index, plan) => {
    setSelected(index)
    const amount = Number(plan.amount) || 0
    const planTitle = String(plan.name || '').trim() || 'Member'
    const projectId = getPlanProjectId(planTitle)
    setDonationFormData({
      frequency: 'monthly',
      donation_frequency: 'monthly',
    })
    updateProjectDonation({
      projectId,
      initiativeId: `membership-plan-${index}`,
      projectTitle: planTitle,
      quantity: 1,
      donationType: 'general',
      basePrice: amount,
      customAmount: 0,
      totalAmount: amount,
      frequency: 'monthly',
      donation_frequency: 'monthly',
    })
    navigate('/checkout')
  }

  useEffect(() => {
    checkScrollPosition()
    const container = scrollContainerRef.current
    if (!container) return
    container.addEventListener('scroll', checkScrollPosition)
    window.addEventListener('resize', checkScrollPosition)
    return () => {
      container.removeEventListener('scroll', checkScrollPosition)
      window.removeEventListener('resize', checkScrollPosition)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`membership-section membership-plan-cards ${isInView ? 'is-visible' : ''}`}
      id="membership-plans"
      aria-labelledby="plan-cards-title"
    >
      <div className="membership-shell">
        <div className="membership-plan-cards__heading membership-heading">
          <h2 id="plan-cards-title">Choose Your Impact Level</h2>
          <p>Pick a monthly amount that&apos;s right for you. Every level supports MTJ&apos;s work year-round.</p>
        </div>

        <div className="membership-plan-cards__wrapper">
          <button
            className="membership-plan-cards__nav membership-plan-cards__nav--prev"
            onClick={() => scrollTo('prev')}
            disabled={!canScrollPrev}
            aria-label="Previous membership plans"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="membership-plan-cards__scroll"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <div className="membership-plan-cards__grid">
              {plans.map((plan, index) => {
                const color = PLAN_COLORS[index % PLAN_COLORS.length]
                const light = isLightColor(color)
                return (
                  <Link
                    key={`${plan.name}-${index}`}
                    to="/checkout"
                    onClick={() => goToCheckout(index, plan)}
                    className={`membership-plan-card ${selected === index ? 'is-selected' : ''} ${light ? 'is-light' : 'is-dark'}`}
                    style={{
                      '--plan-color': color,
                      '--plan-delay': `${Math.min(index, 8) * 70}ms`,
                    }}
                  >
                    <span className="membership-plan-card__shine" aria-hidden="true" />
                    <span className="membership-plan-card__label">{plan.name}</span>
                    {index === 0 && <span className="membership-plan-card__badge">Start here</span>}
                    <strong className="membership-plan-card__amount">
                      <small>Rs.</small> {plan.amount}
                    </strong>
                    <span className="membership-plan-card__month">per month</span>
                    <span className="membership-plan-card__detail">{plan.detail}</span>
                    <button
                      className="membership-plan-card__action"
                      type="button"
                      aria-pressed={selected === index}
                      onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                        goToCheckout(index, plan)
                      }}
                    >
                      Become a member
                    </button>
                  </Link>
                )
              })}
            </div>
          </div>

          <button
            className="membership-plan-cards__nav membership-plan-cards__nav--next"
            onClick={() => scrollTo('next')}
            disabled={!canScrollNext}
            aria-label="Next membership plans"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default MembershipPlanCards
