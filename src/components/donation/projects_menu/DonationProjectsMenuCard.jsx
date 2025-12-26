import React from 'react'
import './DonationProjectsMenuCard.css'

const DonationProjectsMenuCard = ({ card, selected, onSelect }) => {
  // console.log('DonationProjectsMenuCard rendered:', { card, selected, hasOnSelect: !!onSelect })
  
  const handleClick = (e) => {
    console.log('Card clicked!', card)
    e.preventDefault()
    e.stopPropagation()
    if (onSelect) {
      console.log('Calling onSelect with card:', card)
      onSelect(card)
    } else {
      console.error('onSelect is not defined!')
    }
  }

  return (
    <div
      className={`project-menu-card ${selected ? "selected" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          if (onSelect) {
            onSelect(card)
          }
        }
      }}
    >
      <div className="icon">
        <img src={card.icon} alt={card.title} className="icon-img" />
      </div>
      <h3>{card.title}</h3>
      {card.subtitle && (
        <p className="card-subtitle">{card.subtitle}</p>
      )}
    </div>
  )
}

export default DonationProjectsMenuCard

