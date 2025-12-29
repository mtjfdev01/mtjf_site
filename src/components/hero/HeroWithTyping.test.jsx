import HeroWithTyping from './HeroWithTyping'
import heroImage from '../../assets/img/hero/hero.webp'

// Test component to demonstrate usage
const HeroWithTypingTest = () => {
  return (
    <div>
      {/* Example 1: Text on left, image on right, with typing effect */}
      <HeroWithTyping
        imageUrl={heroImage}
        imageAlt="Hero image"
        staticText="Welcome to MTJ Foundation"
        subtitle="Making a difference in communities worldwide"
        typingText="ENGLISH"
        textPosition="left"
        backgroundColor="#f5f5f5"
        imageWidth="100%"
        imageHeight="100%"
        enableTyping={true}
        typingSpeed={100}
        deleteSpeed={50}
        pauseTime={2000}
        buttonText="Donate Now"
        buttonOnClick={() => console.log('Button clicked')}
      />

      {/* Example 2: Text on right, image on left, without typing effect */}
      <HeroWithTyping
        imageUrl={heroImage}
        imageAlt="Hero image"
        staticText="Making a Difference"
        subtitle="Join us in our mission to serve humanity"
        typingText="HELPING OTHERS"
        textPosition="right"
        backgroundColor="#ffffff"
        imageWidth="90%"
        imageHeight="80%"
        enableTyping={false}
        buttonText="Learn More"
        buttonOnClick={() => console.log('Learn more clicked')}
      />

      {/* Example 3: Custom styling with width/height percentages */}
      <HeroWithTyping
        imageUrl={heroImage}
        imageAlt="Hero image"
        staticText="Join Our Mission"
        subtitle="Together we can create positive change"
        typingText="COMMUNITY"
        textPosition="left"
        backgroundColor="#e8f4f8"
        imageWidth="85%"
        imageHeight="75%"
        enableTyping={true}
        typingSpeed={80}
        deleteSpeed={40}
        pauseTime={1500}
        buttonText="Get Involved"
        buttonClassName="custom-button-class"
        buttonOnClick={() => window.location.href = '/volunteer'}
      />
    </div>
  )
}

export default HeroWithTypingTest

