// import React from 'react'
import hero from '../../assets/img/hero/hero.webp';
import '../hero/hero.css';

const Hero = () => {
  return (
    <div className='banner_img'>
      <img src={hero} alt="hero background" style={{width:"100%", maxHeight:'70vh'}} />
    </div>
  )
}

export default Hero