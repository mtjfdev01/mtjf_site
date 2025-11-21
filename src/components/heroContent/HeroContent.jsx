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
         <h1 className='heading-primary'>MTJ Foundation</h1>
         <h3>Welcome to <br/>
          Molana Tariq Jamil <br/>
           Foundation.
         </h3>
        </div>


        <div className='section-center'>
         <p className='px-16'>
         Molana Tariq Jamil, a revered figure since the 1980s, has dedicated his life to philanthropy 
            with a mission to uplift those in need. Recognizing the deep-rooted need for support, he 
            established the MTJ Foundation as a beacon of hope for those in need. His lifelong commitment 
            to helping others is now embodied in the foundation, providing education <span>Read More</span>
        </p>
        </div>
         <div className='right_img'>
          <img src={molana} alt=' Molana Tariq Jamil'/>
        </div>
    </div>
  )
}

export default HeroContent