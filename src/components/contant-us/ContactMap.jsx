import './ContactOffices.css';

const ContactMap = () => (
  <section className="contact-map-section">
    <div className="container">
      <div className="contact-map-card">
        <div className="contact-map-frame">
          <iframe
            title="MTJ Foundation Headquarters Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d65403.19876645457!2d72.15027894767967!3d30.51164391020355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39234f02c38000eb%3A0xdfb1161e353314b4!2sMolana%20Tariq%20Jamil%20Foundation!5e0!3m2!1sen!2s!4v1764143935739!5m2!1sen!2s"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </section>
);

export default ContactMap;

