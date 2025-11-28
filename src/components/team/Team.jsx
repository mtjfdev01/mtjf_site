import React from 'react'
import '../../common/styles/base.css'
import '../../common/styles/common.css'
import './Team.css'

import memberCEO from '../../assets/img/team/IhtishamUllahQureshi.png'
import memberCFO from '../../assets/img/team/MuhammadRashidIqbal.png'
import memberFundraising from '../../assets/img/team/MairajKhalid.png'
import memberHR from '../../assets/img/team/MuhammadFarukh.png'

const teamMembers = [
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
    role: 'CFO',
    image: memberCFO,
    accent: 'sunset',
    rounded: true,
  },
  {
    id: 'fundraising',
    name: 'Mairaj Khalid',
    role: 'Fundraising Manager',
    image: memberFundraising,
    accent: 'aqua',
    featured: true,
  },
  {
    id: 'hr',
    name: 'Muhammad Farukh',
    role: 'HR Manager',
    image: memberHR,
    accent: 'amber',
  },
  {
    id: 'director1',
    name: 'Director 1',
    role: 'Director',
    image: memberHR,
    accent: 'amber',
  },
  {
    id: 'director2',
    name: 'Director 2',
    role: 'Director',
    image: memberHR,
    accent: 'amber',
  },
]

const Team = () => {
  return (
    <section className="team-section">
      <div className="container">
        <div className="team-heading-block">
          <p className="heading-primary team-tag">Team</p>

          <div className="team-heading-row">
            <h2 className="team-title">
              Meet Our The best
              <br/>
              Team Members
            </h2>
          </div>

          <div className="team-controls">
            <button aria-label="Previous team members" className="team-arrow team-arrow--prev">
              <span aria-hidden="true">‹</span>
            </button>
            <button aria-label="Next team members" className="team-arrow team-arrow--next">
              <span aria-hidden="true">›</span>
            </button>
          </div>
        </div>

        <div className="team-card-row">
          {teamMembers.map((member) => {
            const cardClassNames = [
              'team-card',
              `team-card--${member.accent}`,
              member.rounded ? 'team-card--rounded' : '',
              member.featured ? 'team-card--featured' : '',
            ]
              .filter(Boolean)
              .join(' ')

            if (member.featured) {
              return (
                <div className="team-feature-block" key={member.id}>
                  <article className={cardClassNames}>
                    <div className="team-card__image-wrapper">
                      <img src={member.image} alt={member.name} className="team-card__image" />
                    </div>

                    <div className="team-card__body">
                      <p className="team-card__name">{member.name}</p>
                      <p className="team-card__role text-muted">{member.role}</p>
                      <span className="team-card__dot" aria-hidden="true"></span>
                    </div>
                  </article>

                  <div className="team-count-pill" aria-hidden="true">
                    <span className="team-card__count-dot"></span>
                    <span className="team-card__count-value">100+</span>
                    <span className="team-card__count-label">Team Member</span>
                  </div>
                </div>
              )
            }

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

