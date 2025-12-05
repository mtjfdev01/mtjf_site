import React from 'react'
import molana from '../../assets/img/heroContent/Image2.png'
import './heroContent.css'

const HeroContent = () => {
  return (
    <div className='text-white md:d-flex hero_content'>
        <div className='section-left text-center'>
         {/* <h4>
         — <span className='text-white'>MTJ Foundation</span> —
         </h4> */}
         <h2 className='heading-primary'>A Legacy of Compassion</h2>
         <h3>A Future of Hope <br/>
          Molana Tariq Jamil <br/>
           Foundation.
         </h3>
        </div>


        <div className='section-center'>
         <p className='px-16'>
        For decades, Molana Tariq Jamil has stood as a voice of compassion, kindness, and unity. His vision, to ease suffering and uplift vulnerable families, led to the creation of the MTJ Foundation. Today, his mission lives on through our work: providing healthcare, education, clean water, and life-changing support to communities in need. Every contribution from donors like you helps turn this vision into reality and brings hope to thousands of lives.
        </p>
        </div>
         <div className='right_img'>
          <img src={molana} alt=' Molana Tariq Jamil'/>
        </div>
    </div>
  )
}

export default HeroContent