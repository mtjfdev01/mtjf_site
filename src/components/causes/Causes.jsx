// import image1 from "../../../public/assets/img/causes/Rectangle 34625787.png"
import image1 from "../../assets/img/causes/Rectangle 34625787.png"
import image2 from "../../assets/img/causes/Rectangle 34625788.png"
import image3 from "../../assets/img/causes/Rectangle 34625789.png"
import './Causes.css'

const Causes = () => {
  return (
    <section className='causes-section'>
    <div className='header'>
     <h5>CAUSES</h5>
      <h2>Some causes we have in World</h2>
      <button className='btn'>Join With Us</button> 
    </div>
    <div className='causes-container'>
      <div className='cause-card'>
        <img src={image1} alt="Cause Image"/>
        <h3>Save money, Give Aid & Shelter for Needy</h3>
        <p>Help the poor and needy families by giving them food and shelter.</p>
        <span className='progress'>Goal: $10,000 | Raised: $6,500</span>
        <button className='donate-btn'>Donate Now</button>
      </div>

      <div className='cause-card'>
        <img src={image2} alt="Cause Image"/>
        <h3>Education for Backward Children</h3>
        <p>Support children to get education and brighter future.</p>
        <span className='progress'>Goal: $8,000 | Raised: $4,200</span>
        <button className='donate-btn'>Donate Now</button>
      </div>

      <div className='cause-card'>
        <img src={image3} alt="Cause Image"/>
        <h3>Support to Basic Health Facilities</h3>
        <p>Help us provide health care to rural and poor communities.</p>
        <span className='progress'>Goal: $12,000 | Raised: $7,600</span>
        <button className='donate-btn'>Donate Now</button>
      </div>
    </div>
    </section>
  )
}

export default Causes