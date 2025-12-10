// import React from 'react'
import hero from '../../assets/img/hero/hero.webp';
import '../hero/hero.css';

const Hero = () => {
  return (
    <div className='banner_img'>
      <img src={hero} alt="hero background" style={{width:"100%" , height:"100%"}} />
    </div>
  )
}

export default Hero