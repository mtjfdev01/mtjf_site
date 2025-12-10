// import React from 'react'
import hero from '../../assets/img/hero/hero.webp';
import hero_mob from '../../assets/img/hero/hero_mob.webp';

import '../hero/hero.css';

const Hero = () => {
  return (<>
    <div className='banner_img d-none md:d-block'>
      <img src={hero} alt="hero background" style={{width:"100%" , height:"100%"}} />
    </div>
    <div className='banner_img sm:d-block md:d-none'>
      <img src={hero_mob} alt="hero background" style={{width:"100%" , height:"100%"}} />
    </div>
    </>
  )
}

export default Hero