import eventImage1 from '../assets/img/causes/meet box.webp'
import eventImage2 from '../assets/img/causes/poor boy.webp'
import eventImage3 from '../assets/img/causes/power of clean water.webp'
import eventImage4 from '../assets/img/causes/marriage_gift.webp'
import eventsHero from '../assets/img/events/event_hero.webp'

export const EVENTS_PAGE_DATA = {
  id: 'events',
  title: 'Events & Activities',
  headerImage: eventsHero
}

export const EVENTS_DATA = [
  {
    id: 'grand-iftar',
    title: 'Grand Iftar Gathering',
    subtitle: 'March 14, 2026',
    image: eventImage1,
    description: `Join us for a blessed Grand Iftar gathering where we come together to break our fast and support orphans, widows, and elderly residents of old age homes. This special event brings communities together in the spirit of generosity and compassion.

The event will feature prayers, community iftar, and distribution of Eid gifts to those in need. Our CEO Mr. Ihtesham Ullah Qureshi will be present to address the gathering about MTJ Foundation's ongoing humanitarian efforts.`,
    donateButtonText: 'Register Now',
    donationUrl: '/volunteerRegistration',
    openInNewTab: false
  },
  {
    id: 'clean-water-drive',
    title: 'Clean Water Installation Drive',
    subtitle: 'April 5, 2026',
    image: eventImage3,
    description: `A community-led initiative to install clean water hand pumps in underserved rural areas across Punjab. Access to clean drinking water is a fundamental human right, and through this drive, we aim to provide sustainable water solutions to communities that lack this basic necessity.

Each hand pump installation serves approximately 500-700 people, providing them with safe, clean water and reducing waterborne diseases. Your participation can transform entire villages.`,
    donateButtonText: 'Support This Cause',
    donationUrl: '/donate/clean-water',
    openInNewTab: false
  },
  {
    id: 'education-awareness-camp',
    title: 'Education Awareness Camp',
    subtitle: 'April 20, 2026',
    image: eventImage2,
    description: `Spreading awareness about the importance of education and enrolling underprivileged children in schools across the city. Education is the most powerful weapon which you can use to change the world, and every child deserves the opportunity to learn and grow.

Our education camps provide free enrollment, school supplies, and scholarship opportunities for deserving students. We believe that quality education should be accessible to all, regardless of financial circumstances.`,
    donateButtonText: 'Sponsor a Child',
    donationUrl: '/donate/education',
    openInNewTab: false
  },
  {
    id: 'marriage-support-program',
    title: 'Marriage Support Program',
    subtitle: 'May 10, 2026',
    image: eventImage4,
    description: `MTJ Foundation supports deserving families by assisting with marriage arrangements for girls from low-income households. The rising costs of weddings have become a significant burden for many families, often leading to debt and financial hardship.

Through this program, we provide financial assistance, wedding essentials, and organizational support to ensure that every family can celebrate this joyous occasion with dignity and without financial stress.`,
    donateButtonText: 'Contribute',
    donationUrl: '/donate/marriage-support',
    openInNewTab: false
  }
]
