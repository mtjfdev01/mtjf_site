import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDonation } from '../../contexts/DonationContext'

const MonthlyMembershipCampaignPlans = ({ plans }) => {
  const navigate = useNavigate()
  const { updateProjectDonation } = useDonation()
  const scrollContainerRef = useRef(null)
  const [selected, setSelected] = useState(0)
  const [billing, setBilling] = useState('monthly')
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchScrollLeft, setTouchScrollLeft] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const getPlanAmount = (plan) => {
    if (billing !== 'yearly') return plan.amount

    const monthlyAmount = Number(plan.amount)
    return Number.isFinite(monthlyAmount)
      ? (monthlyAmount * 12).toLocaleString('en-IN')
      : plan.amount
  }

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const { scrollLeft, scrollWidth, clientWidth } = container

    setCanScrollPrev(scrollLeft > 0)
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 1)
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
    const firstCard = container.querySelector('.membership-plan')
    const grid = container.querySelector('.membership-plans__grid')
    const gridStyles = grid ? window.getComputedStyle(grid) : null
    const gap = gridStyles ? parseFloat(gridStyles.columnGap || gridStyles.gap || '0') : 0
    const scrollAmount = firstCard
      ? firstCard.getBoundingClientRect().width + gap
      : container.clientWidth

    container.scrollBy({
      left: direction === 'prev' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })

    setTimeout(checkScrollPosition, 300)
  }

  const goToCheckout = (index, plan) => {
    setSelected(index)
    const monthlyAmount = Number(plan.amount)
    const amount = billing === 'yearly'
      ? (Number.isFinite(monthlyAmount) ? monthlyAmount * 12 : 0)
      : monthlyAmount || 0
    updateProjectDonation({
      projectId: 'membership-campaign',
      initiativeId: `membership-plan-${index}`,
      projectTitle: plan.name,
      quantity: 1,
      donationType: 'general',
      basePrice: amount,
      customAmount: 0,
      totalAmount: amount,
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
    <section className="membership-section membership-plans" id="membership-plans" aria-labelledby="plans-title">
      <div className="membership-shell">
        <div className="membership-plans__heading">
          <div className="membership-heading">
            <h2 id="plans-title">Choose Your Impact Level</h2>
            <p>Pick a {billing === 'yearly' ? 'yearly' : 'monthly'} amount that's right for you. Every level supports MTJ’s work year-round.</p>
          </div>
          <div className="membership-billing" role="group" aria-label="Choose billing frequency">
            <button className={billing === 'monthly' ? 'is-active' : ''} type="button" onClick={() => setBilling('monthly')}>Monthly</button>
            <button className={billing === 'yearly' ? 'is-active' : ''} type="button" onClick={() => setBilling('yearly')}>Yearly</button>
          </div>
        </div>
        <div className="membership-plans__wrapper">
          <button
            className="slider-nav-btn slider-nav-prev"
            onClick={() => scrollTo('prev')}
            disabled={!canScrollPrev}
            aria-label="Previous membership plans"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="membership-plans__scroll-container"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <div className="membership-plans__grid">
              {plans.map((plan, index) => (
                <Link
                  key={`${plan.amount}-${index}`}
                  to="/checkout"
                  onClick={() => goToCheckout(index, plan)}
                  className={`membership-plan ${selected === index ? 'is-selected' : ''}`}
                >
                  <span className="membership-plan__label">{plan.name}</span>
                  {index === 0 && <span className="membership-plan__badge">Start here</span>}
                  <strong><small>Rs.</small> {getPlanAmount(plan)}</strong>
                  <span className="membership-plan__month">per {billing === 'yearly' ? 'year' : 'month'}</span>
                  <span className="membership-plan__detail">{plan.detail}</span>
                  <button
                    className="membership-plan__action"
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      goToCheckout(index, plan)
                    }}
                    type="button"
                    aria-pressed={selected === index}
                  >
                    Become a member
                  </button>
                </Link>
              ))}
            </div>
          </div>

          <button
            className="slider-nav-btn slider-nav-next"
            onClick={() => scrollTo('next')}
            disabled={!canScrollNext}
            aria-label="Next membership plans"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default MonthlyMembershipCampaignPlans
