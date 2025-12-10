import VolunteerGuide from './VolunteerGuide'
import VolunteerForm from './VolunteerForm'
import '../contact/ContactSection.css'

const VolunteerSection = ({ onSubmit }) => {
  return (
    <section className="contact-section container py-64">
      <div className="contact-card">
        <VolunteerGuide />
        <VolunteerForm onSubmit={onSubmit} />
      </div>
    </section>
  )
}

export default VolunteerSection


