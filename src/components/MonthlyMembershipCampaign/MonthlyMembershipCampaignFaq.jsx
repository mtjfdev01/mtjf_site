import { useState } from 'react'

const MonthlyMembershipCampaignFaq = ({ faqs }) => {
  const [open, setOpen] = useState('0-0')
  return <section className="membership-section membership-faq" aria-labelledby="faq-title"><div className="membership-shell"><div className="membership-faq__heading"><h2 id="faq-title">Frequently asked questions</h2></div><div className="membership-faq__columns">{faqs.map((category, categoryIndex) => <div className="membership-faq__column" key={category.title}><p className="membership-faq__category">{category.title}</p><div className="membership-faq__list">{category.items.map((faq, itemIndex) => { const itemKey = `${categoryIndex}-${itemIndex}`; const isOpen = open === itemKey; return <div className={`membership-faq__item ${isOpen ? 'is-open' : ''}`} key={faq.question}><button type="button" onClick={() => setOpen(isOpen ? '' : itemKey)} aria-expanded={isOpen}><span>{faq.question}</span><b aria-hidden="true">{isOpen ? '−' : '+'}</b></button>{isOpen && faq.answer && <p>{faq.answer}</p>}</div> })}</div></div>)}</div></div></section>
}

export default MonthlyMembershipCampaignFaq
