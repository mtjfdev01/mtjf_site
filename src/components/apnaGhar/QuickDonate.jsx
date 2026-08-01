import React from 'react';
import './QuickDonate.css';

const donateItems = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v10h14V10" />
      </svg>
    ),
    title: 'Lay the Foundation of a New Life',
    tag: 'Donate a Brick',
    amount: '500 PKR',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M9 3v18M15 3v18M4 9h16M4 15h16" />
      </svg>
    ),
    title: 'Raise Walls of Safety & Strength',
    tag: 'Contribute Toward a Wall',
    amount: '2,500 PKR',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="6" y="3" width="12" height="18" rx="1" />
        <path d="M14 12v.01" />
      </svg>
    ),
    title: 'Open Doors to a Brighter Future',
    tag: 'Sponsor a Door',
    amount: '1,500 PKR',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 11l9-7 9 7" />
        <path d="M5 10v10h14V10" />
      </svg>
    ),
    title: 'Shelter Them Under a Roof of Love',
    tag: 'Fund a Roof',
    amount: '5,000 PKR',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="6" width="16" height="12" rx="1" />
        <path d="M12 6v12" />
      </svg>
    ),
    title: 'Let Hope Shine Through Their Window',
    tag: 'Gift a Window',
    amount: '\u00A0',
  },
];

export default function QuickDonate() {
  return (
    <section id="donate">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Quick Donate</span>
          <h2>Building Hope, Brick by Brick</h2>
        </div>
        <div className="donate-grid">
          {donateItems.map((item, idx) => (
            <div className="donate-card" key={idx}>
              <div className="icon-circle">{item.icon}</div>
              <h4>{item.title}</h4>
              <p className="tag">{item.tag}</p>
              <div className="donate-price">
                <span className="amount">{item.amount}</span>
                <button className="add-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}