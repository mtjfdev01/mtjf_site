import React, { useRef, useState, useEffect } from 'react'
import '../../common/styles/base.css'
import '../../common/styles/common.css'
import './Team.css'

import chairman from '../../assets/img/team/molana.webp'
import viceChairman from '../../assets/img/team/yousaf.webp'
import memberCEO from '../../assets/img/team/IhtishamUllahQureshi.png'
import memberCFO from '../../assets/img/team/MuhammadRashidIqbal.png'
import memberFundraising from '../../assets/img/team/MairajKhalid.png'
import memberHR from '../../assets/img/team/MuhammadFarukh.png'

const teamMembers = [
   {
    id: 'Chairman',
    name: 'Molana Tariq Jamil',
    role: 'Chairman',
    image: chairman,
    accent: 'emerald',
    rounded: true,
  },
   {
    id: 'Vice Chairman',
    name: 'Molana Yousaf Jamil',
    role: 'Vice Chairman',
    image: viceChairman,
    accent: 'emerald',
    rounded: true,
  },
  {
    id: 'ceo',
    name: 'Ihtisham Ullah Qureshi',
    role: 'CEO',
    image: memberCEO,
    accent: 'emerald',
    rounded: true,
  },
  {
    id: 'cfo',
    name: 'Muhammad Rashid Iqbal',
    role: 'Chief Financial Officer',
    image: memberCFO,
    accent: 'sunset',
    rounded: true,
  },
  {
    id: 'Fundraising',
    name: 'Mairaj Khalid',
    role: 'Head of CRD ',
    image: memberFundraising,
    accent: 'aqua',
  },
  {
    id: 'hr',
    name: 'Muhammad Farukh',
    role: 'Head of HR',
    image: memberHR,
    accent: 'amber',
  },
  {
    id: 'Director of Programs',
    name: 'Ikram Seher',
    role: 'Director of Programs',
    // image: memberHR,
    accent: 'amber',
  },
]

const Team = () => {
  const cardRowRef = useRef(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const updateScrollState = () => {
    if (!cardRowRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = cardRowRef.current
    setCanScrollPrev(scrollLeft > 10)
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    updateScrollState()
    const container = cardRowRef.current
    if (!container) return

    container.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)

    return () => {
      container.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const scrollTo = (direction) => {
    if (!cardRowRef.current) return

    const container = cardRowRef.current
    const cardWidth = 230 + 24 // card width + gap
    const scrollAmount = cardWidth * 1.5 // scroll 1.5 cards at a time

    if (direction === 'prev') {
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      })
    } else {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <section className="team-section">
      <div className="container">
        <div className="team-heading-block p-32">
          <div className="team-heading-left">
            <h2 className="heading-primary team-tag">Our Team</h2>

            <div className="team-heading-row"> 
              <h2 className="team-title">
                The People Behind the Mission</h2>
                <p>Behind every project are dedicated leaders, specialists, and volunteers who turn compassion into impact.</p>
            </div>

            <div className="team-controls">
              <button 
                aria-label="Previous team members" 
                className={`team-arrow team-arrow--prev ${!canScrollPrev ? 'team-arrow--disabled' : ''}`}
                onClick={() => scrollTo('prev')}
                disabled={!canScrollPrev}
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button 
                aria-label="Next team members" 
                className={`team-arrow team-arrow--next ${!canScrollNext ? 'team-arrow--disabled' : ''}`}
                onClick={() => scrollTo('next')}
                disabled={!canScrollNext}
              >
                <span aria-hidden="true">›</span>
              </button>
            </div>
          </div>

          <div className="team-count-pill" aria-hidden="true">
            <span className="team-card__count-dot"></span>
            <span className="team-card__count-value">100+</span>
            <span className="team-card__count-label">Team Member</span>
          </div>
        </div>

        <div className="team-card-row" ref={cardRowRef}>
          {teamMembers.map((member) => {
            const cardClassNames = [
              'team-card',
              `team-card--${member.accent}`,
              member.rounded ? 'team-card--rounded' : '',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <article className={cardClassNames} key={member.id}>
                <div className="team-card__image-wrapper">
                  <img src={member.image} alt={member.name} className="team-card__image" />
                </div>

                <div className="team-card__body">
                  <p className="team-card__name">{member.name}</p>
                  <p className="team-card__role text-muted">{member.role}</p>
                  <span className="team-card__dot" aria-hidden="true"></span>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Team

