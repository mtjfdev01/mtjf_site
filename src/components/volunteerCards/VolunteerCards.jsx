// VolunteerCards.jsx
import React from "react";
import "./VolunteerCards.css"; // put the CSS from before in this file

const cards = [
  {
    title: "Volunteers",
    text: "As an individual volunteer you can work with our partner school helping facilitate recess games, sports leagues.",
    bgClass: "volunteer-bg-1",
  },
  {
    title: "Partner with us",
    text: "You and your team can make an impact by working directly with kids or engaging in a playground project.",
    bgClass: "volunteer-bg-2",
  },
  {
    title: "Work with us",
    text: "Raising a generation of leaders takes a team of the best teachers, counselors, and coordinators.",
    bgClass: "volunteer-bg-3",
  },
];

function VolunteerCards() {
  return (
    <section className="volunteer-section">
      {cards.map((card) => (
        <div className="volunteer-card" key={card.title}>
          <div className={`volunteer-bg ${card.bgClass}`} />
          <div className="volunteer-content">
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <div className="volunteer-btn" disabled>Volunteer</div>
          </div>
        </div>
      ))}
    </section>
  );
}
export default VolunteerCards;
