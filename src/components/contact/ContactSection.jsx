import ContactGuide from './ContactGuide'
import ContactForm from './ContactForm'
import './ContactSection.css'

const ContactSection = ({ onSubmit }) => {
  return (
    <section className="contact-section container py-64">
      <div className="contact-card">
        <ContactGuide />
        <ContactForm onSubmit={onSubmit} />
      </div>
    </section>
  )
}

export default ContactSection

