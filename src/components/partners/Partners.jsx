import './Partners.css'
import image36 from '../../assets/img/partners/image 1636.png'
import image37 from '../../assets/img/partners/image 1637.png'
import image38 from '../../assets/img/partners/image 1638.png'
import image39 from '../../assets/img/partners/image 1639.png'
import image40 from '../../assets/img/partners/image 1640.png'
import image41 from '../../assets/img/partners/image 1641.png'
const Partners = () => {
  return (
    <div className='partners-wrap'>
     <div className='small-label' style={{color:'white'}}>Partners</div>
     <h2 className='partners-title' style={{color:'white'}}>Our CSR Partners</h2>
     
      {/* Logos */}
     <div className='logos'>
     <div className='logo-card'><img src={image36} alt='MTJ logo'/></div>  
     <div className='logo-card'><img src={image37} alt='IU logo'/></div> 
     <div className='logo-card'><img src={image38} alt='Artistic Milliners logo'/></div> 
     <div className='logo-card'><img src={image39} alt='Roti Koi logo'/></div> 
     <div className='logo-card'><img src={image40} alt='Malka logo'/></div> 
     <div className='logo-card'><img src={image41} alt='Abad logo'/></div> 
     </div>

     <div className='dots'>
        <span className='dot'></span>
        <span className='dot active'></span>
        <span className='dot'></span>
     </div>
    </div>
  )
}

export default Partners