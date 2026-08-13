// CRA ES6 Imports for Assets (src/assets/...)
import desktopMapImg from '../assets/img/apnaGhar/objectives-apna-ghar.jpeg';
// import mobileMapImg from '../assets/img/apnaGhar/mobile-image.webp';

// Home Tab Floor Plan Image Imports
import homeFloorPlanDesktopImg from '../assets/img/apnaGhar/home-tab.jpeg';
import homeFloorPlanMobileImg from '../assets/img/apnaGhar/home-tab.jpeg';
import mosque from '../assets/img/apnaGhar/mosque.png';
import school from '../assets/img/apnaGhar/school.png';

export const subTabsData = [
  { id: 'community-map', label: 'Community Map' },
  { id: 'home', label: 'Home' },
  { id: 'mosque', label: 'Mosque' },
  { id: 'hasnaing-school', label: 'Hasnaing Dream School' },
  { id: 'community-center', label: 'Community Center' },
  { id: 'livestock-farm', label: 'Livestock Farm' },
];

export const subTabsContentData = {
  // 1. Community Map Tab Data
  'community-map': {
    type: 'map-card',
    images: {
      desktopImg: desktopMapImg,
      mobileImg: desktopMapImg,
    },
    cardData: {
      title: 'Apna Ghar',
      description:
        'APNA GHAR is not just a housing project, it is a faith-anchored community of dignity, purpose, and transformation. It brings together shelter, Islam, skills, sustainability, and love. Through your generous support, this project becomes a Sadqa-e-Jariah that keeps on giving—a lifelong gift to the most deserving.',
      metrics: [
        { label: 'Total Area', val: '44 Kanals' },
        { label: 'Residential Housing', val: '102 Units' },
        { label: 'Commercial Shops', val: '20 Units' },
        { label: 'Dairy & Livestock Farm', val: '200+ Animals' },
        { label: 'Community Mosque & Islamic Institute', val: '1 Unit' },
      ],
    },
  },

  // 2. Home Tab Data
  'home': {
    type: 'side-by-side',
    images: {
      desktopImg: homeFloorPlanDesktopImg,
      mobileImg: homeFloorPlanMobileImg,
    },
    cardData: {
      title: 'Home',
      description: 'Secure, modest homes constructed for long-term use, each with:',
      points: [
        'Private sanitation, cooking area, ventilation',
        'Electricity, solar backup, and water connection',
        'Housing allocation is based on merit and need (not ownership)',
      ],
    },
  },

  // 3. Mosque Tab Data
  'mosque': {
    type: 'side-by-side',
     images: {
      desktopImg: mosque,
      mobileImg: mosque,
    },
    // isPlaceholderMap: true,
    // placeholderText: 'Map Will be uploaded soon...',
    cardData: {
      title: 'Mosque',
      description: 'Community mosque serving residents and local community with:',
      points: [
        'Capacity of 150+ worshippers',
        'Quranic and Hadith learning for both residents and local community',
        'Moral, ethical, and spiritual education',
        'Religious events and Islamic counseling for women and children',
      ],
    },
  },

  // 4. Hasnaing Dream School Tab Data
  'hasnaing-school': {
    type: 'side-by-side',
      images: {
      desktopImg: school,
      mobileImg: school,
    },
    // isPlaceholderMap: true,
    // placeholderText: 'Map Will be uploaded soon...',
    cardData: {
      title: 'Al-Hasnain Dream School',
      description: 'Comprehensive educational institution offering:',
      points: [
        'Modern religious and formal education',
        'Orphaned children receive scholarships',
        'After-school support, mentorship, and career mapping',
        'Collaborations with online education partners',
      ],
    },
  },

  // 5. Community Center Tab Data
  'community-center': {
    type: 'side-by-side',
      images: {
      desktopImg: homeFloorPlanDesktopImg,
      mobileImg: homeFloorPlanMobileImg,
    },
    // isPlaceholderMap: true,
    // placeholderText: 'Map Will be uploaded soon...',
    cardData: {
      title: 'Community Center',
      description: 'Dedicated space for community development and empowerment:',
      points: [
        'Female leadership and decision-making space',
        'Host parenting workshops, religious classes, and events',
        'Psychological counseling sessions',
        'Library, seminar room, and guest lounge',
      ],
    },
  },

  // 6. Livestock Farm Tab Data
  'livestock-farm': {
    type: 'side-by-side',
      images: {
      desktopImg: homeFloorPlanDesktopImg,
      mobileImg: homeFloorPlanMobileImg,
    },
    // isPlaceholderMap: true,
    // placeholderText: 'Map Will be uploaded soon...',
    cardData: {
      title: 'Dairy & Livestock Farm',
      description: 'DAIRY & LIVESTOCK FARM (200+ ANIMALS)',
      points: [
        'Operated and managed by trained residents',
        'Provides milk and meat for community use and income',
        'Links to MTJF nutrition program',
        'Integrates with livelihood + health strategy',
      ],
    },
  },
};