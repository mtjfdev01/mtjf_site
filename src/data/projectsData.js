import image1 from '../assets/img/projects/camp.webp'
import image2 from '../assets/img/projects/convocation.webp'
import image3 from '../assets/img/projects/group of boys.webp'
import image4 from '../assets/img/projects/handpump.webp'
import image5 from '../assets/img/projects/molana yousaf.webp'
import image6 from '../assets/img/projects/marriage things.webp'
import image7 from '../assets/img/projects/plant.webp'
import image8 from '../assets/img/projects/rastion packs.webp'
import {
  FaSchool,
  FaGraduationCap,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaLaptopCode,
  FaUsers,
  FaComments,
  FaHospital,
  FaProcedures,
  FaStethoscope,
  FaUserMd,
  FaSyringe,
  FaAmbulance,
  FaHandHoldingHeart,
  FaHandsHelping,
  FaUtensils,
  FaHome,
  FaTint,
  FaTruck,
  FaWater,
  FaFaucet,
  FaCog,
  FaChartLine,
  FaShoppingCart,
  FaBriefcase,
  FaStar,
  FaGift,
  FaRing,
  FaChild,
  FaHammer,
  FaPeopleCarry,
  FaBoxOpen,
  FaLeaf,
  FaSmile,
  FaCalendarAlt,
  FaGlobeAsia,
  FaWarehouse,
  FaSeedling,
  FaShieldAlt
} from 'react-icons/fa'

export const PROJECTS_DETAIL_DATA = {
  education: {
    id: 'education',
    title: 'Education',
    headerImage: image2,
    stats: [
      { icon: FaSchool, number: '1,530', label: 'Schools Built/Renovated' },
      { icon: FaGraduationCap, number: '8,400', label: 'Scholarships Provided' },
      { icon: FaUserGraduate, number: '12,700', label: 'Students Enrolled' },
      { icon: FaChalkboardTeacher, number: '650', label: 'Teachers Trained' },
      { icon: FaBookOpen, number: '920', label: 'Libraries Set Up' },
      { icon: FaLaptopCode, number: '1,200', label: 'Computer Labs Installed' },
      { icon: FaUsers, number: '2,500,000', label: 'Total Beneficiaries' },
      { icon: FaComments, number: '3,100', label: 'Parent Engagement Workshops' }
    ],
    content: {
      paragraph1: 'At MTJ Foundation, we believe in nurturing the next generation of professionals, and our internship program is a testament to that commitment. Through an immersive experience, we aim to shape career paths, providing career counseling and gaining firsthand insights once placed in various departments.',
      paragraph2: 'Past interns, after receiving comprehensive exposure, have transitioned into roles within well-reputed organizations, serving as a testament to the success of our approach in preparing individuals for the workforce.',
      paragraph3: 'Molana Tariq Jamil Foundation provides scholarships to individuals in need of financial assistance to further their education. These scholarships can range in amount and are awarded based on various criteria such as academic merit, financial need, or specific fields of study.'
    },
    mainImage: image1,
    donateCategory: 'Education',
    donationOptions: {
      PKR: [2500, 5000, 10000, 25000],
      USD: [25, 50, 100, 250],
      EUR: [20, 40, 80, 200]
    }
  },
  health: {
    id: 'health',
    title: 'Health',
    headerImage: image1,
    stats: [
      { icon: FaHospital, number: '450', label: 'Health Centers Established' },
      { icon: FaProcedures, number: '12,000', label: 'Patients Treated' },
      { icon: FaStethoscope, number: '85', label: 'Medical Camps Organized' },
      { icon: FaUserMd, number: '120', label: 'Doctors Deployed' },
      { icon: FaSyringe, number: '5,600', label: 'Vaccinations Administered' },
      { icon: FaAmbulance, number: '230', label: 'Ambulances Provided' },
      { icon: FaUsers, number: '1,800,000', label: 'Total Beneficiaries' },
      { icon: FaHandHoldingHeart, number: '65', label: 'Hospitals Supported' }
    ],
    content: {
      paragraph1: 'Health is a blessing and is required to live life fully. It is very necessary for all of us to maintain a healthy lifestyle in order to be fit and fearless of diseases. Being healthy helps us to perform our daily activities without any hindrance.',
      paragraph2: 'MTJ Foundation is committed to providing quality healthcare services to underserved communities, ensuring that everyone has access to medical care regardless of their financial situation.',
      paragraph3: 'Through our health programs, we have established medical facilities, organized health camps, and provided essential medical services to thousands of individuals across Pakistan.'
    },
    mainImage: image2,
    donateCategory: 'Health',
    donationOptions: {
      PKR: [5000, 10000, 20000, 50000],
      USD: [50, 100, 200, 500],
      EUR: [45, 90, 180, 450]
    }
  },
  'disaster-management': {
    id: 'disaster-management',
    title: 'Disaster Management',
    headerImage: image3,
    stats: [
      { icon: FaHandsHelping, number: '150', label: 'Disaster Relief Operations' },
      { icon: FaUtensils, number: '500,000', label: 'Meals Distributed' },
      { icon: FaHome, number: '2,300', label: 'Shelters Provided' },
      { icon: FaTint, number: '45,000', label: 'Water Bottles Distributed' },
      { icon: FaHandHoldingHeart, number: '85', label: 'Emergency Response Teams' },
      { icon: FaBoxOpen, number: '12,000', label: 'Relief Packages Delivered' },
      { icon: FaUsers, number: '850,000', label: 'People Assisted' },
      { icon: FaTruck, number: '320', label: 'Relief Vehicles Deployed' }
    ],
    content: {
      paragraph1: 'MTJ Foundation is working for relief the people affected by the flood by distribution Cooked food, Dry Foods, Medical Camps & distributing medicine.',
      paragraph2: 'Our disaster management team responds quickly to natural calamities, providing immediate relief and long-term support to affected communities.',
      paragraph3: 'We coordinate with local authorities and international organizations to ensure efficient distribution of resources and aid to those in need during times of crisis.'
    },
    mainImage: image1,
    donateCategory: 'Disaster Relief',
    donationOptions: {
      PKR: [3000, 7000, 15000, 30000],
      USD: [30, 70, 150, 300],
      EUR: [28, 65, 140, 280]
    }
  },
  'clean-water': {
    id: 'clean-water',
    title: 'Clean Water',
    headerImage: image1,
    stats: [
      { icon: FaTint, number: '850', label: 'Water Wells Installed' },
      { icon: FaFaucet, number: '1,200', label: 'Water Filtration Plants' },
      { icon: FaUsers, number: '450,000', label: 'People Served' },
      { icon: FaHome, number: '320', label: 'Villages Covered' },
      { icon: FaCog, number: '1,800', label: 'Water Systems Maintained' },
      { icon: FaChartLine, number: '95%', label: 'Water Quality Rate' },
      { icon: FaWater, number: '2.5M', label: 'Liters Daily Capacity' },
      { icon: FaGlobeAsia, number: '15', label: 'Districts Covered' }
    ],
    content: {
      paragraph1: 'Clean Water project is a welfare project initiated by MTJ Foundation to address the dire need for safe drinking water in deprived areas of the country.',
      paragraph2: 'Access to clean water is a fundamental human right. Our clean water initiatives ensure that communities have sustainable access to safe drinking water through the installation of wells and filtration systems.',
      paragraph3: 'We work closely with local communities to maintain water facilities and educate people about water conservation and hygiene practices.'
    },
    mainImage: image2,
    donateCategory: 'Clean Water',
    donationOptions: {
      PKR: [4000, 8000, 16000, 32000],
      USD: [40, 80, 160, 320],
      EUR: [35, 70, 140, 280]
    }
  },
  'ecommerce-training': {
    id: 'ecommerce-training',
    title: 'E Commerce Training',
    headerImage: image2,
    stats: [
      { icon: FaLaptopCode, number: '1,200', label: 'Training Programs Conducted' },
      { icon: FaUserGraduate, number: '3,500', label: 'Participants Trained' },
      { icon: FaShoppingCart, number: '850', label: 'Online Stores Created' },
      { icon: FaChartLine, number: '65%', label: 'Employment Rate' },
      { icon: FaBriefcase, number: '2,100', label: 'Jobs Created' },
      { icon: FaGraduationCap, number: '45', label: 'Training Centers' },
      { icon: FaUsers, number: '180,000', label: 'Total Beneficiaries' },
      { icon: FaStar, number: '4.8', label: 'Average Rating' }
    ],
    content: {
      paragraph1: 'At the core of our mission, MTJ Foundation is dedicated to comprehensive livelihood support, committed to elevating the well-being of communities through sustainable economic empowerment initiatives.',
      paragraph2: 'Our e-commerce training programs equip individuals with the skills needed to start and manage online businesses, creating opportunities for financial independence.',
      paragraph3: 'Participants learn digital marketing, online store management, and customer service, enabling them to thrive in the digital economy.'
    },
    mainImage: image3,
    donateCategory: 'E-Commerce Training',
    donationOptions: {
      PKR: [3500, 9000, 18000, 36000],
      USD: [35, 90, 180, 360],
      EUR: [32, 80, 160, 320]
    }
  },
  'marriage-gift': {
    id: 'marriage-gift',
    title: 'Marriage Gift',
    headerImage: image3,
    stats: [
      { icon: FaGift, number: '2,500', label: 'Wedding Gifts Distributed' },
      { icon: FaRing, number: '2,500', label: 'Brides Supported' },
      { icon: FaBoxOpen, number: '15,000', label: 'Gift Items Provided' },
      { icon: FaHome, number: '180', label: 'Villages Covered' },
      { icon: FaUsers, number: '12,500', label: 'Family Members Benefited' },
      { icon: FaHandsHelping, number: '2,500', label: 'Weddings Supported' },
      { icon: FaSmile, number: '95%', label: 'Satisfaction Rate' },
      { icon: FaGlobeAsia, number: '25', label: 'Districts Reached' }
    ],
    content: {
      paragraph1: 'Molana Tariq Jamil Foundation is doing a truly remarkable and heartwarming favor to distribute wedding gifts to poor girls. In many parts of the world, poverty can be a significant barrier to celebrating life\'s important milestones, including weddings.',
      paragraph2: 'We provide essential household items and gifts to help families celebrate these special occasions with dignity and joy.',
      paragraph3: 'This initiative brings happiness to families and ensures that financial constraints do not prevent them from celebrating one of life\'s most important moments.'
    },
    mainImage: image1,
    donateCategory: 'Marriage Gift',
    donationOptions: {
      PKR: [6000, 12000, 25000, 50000],
      USD: [60, 120, 250, 500],
      EUR: [55, 110, 230, 460]
    }
  },
  maskan: {
    id: 'maskan',
    title: 'Maskan',
    headerImage: image1,
    stats: [
      { icon: FaHome, number: '1,850', label: 'Houses Built' },
      { icon: FaUsers, number: '9,250', label: 'People Housed' },
      { icon: FaWarehouse, number: '120', label: 'Communities Served' },
      { icon: FaHammer, number: '2,100', label: 'Houses Renovated' },
      { icon: FaGlobeAsia, number: '35', label: 'Districts Covered' },
      { icon: FaShieldAlt, number: '95%', label: 'Durability Rate' },
      { icon: FaPeopleCarry, number: '3,700', label: 'Families Supported' },
      { icon: FaSeedling, number: '45', label: 'Construction Projects' }
    ],
    content: {
      paragraph1: 'MTJ Foundation\'s Maskan Program is a revolutionary initiative to provide shelter to the homeless. Our dream is that no one in Pakistan should be left to sleep under open sky.',
      paragraph2: 'We build and renovate houses for families in need, providing them with safe and secure homes where they can build their futures.',
      paragraph3: 'Each home is constructed with quality materials and designed to withstand the elements, ensuring long-term security for the families we serve.'
    },
    mainImage: image2,
    donateCategory: 'Maskan',
    donationOptions: {
      PKR: [8000, 16000, 32000, 64000],
      USD: [80, 160, 320, 640],
      EUR: [75, 150, 300, 600]
    }
  },
  'monthly-ration': {
    id: 'monthly-ration',
    title: 'Monthly Ration',
    headerImage: image2,
    stats: [
      { icon: FaBoxOpen, number: '85,000', label: 'Ration Packages Distributed' },
      { icon: FaUsers, number: '425,000', label: 'People Fed' },
      { icon: FaHome, number: '450', label: 'Villages Covered' },
      { icon: FaLeaf, number: '2,100', label: 'Tons Food Distributed' },
      { icon: FaPeopleCarry, number: '85,000', label: 'Families Supported' },
      { icon: FaCalendarAlt, number: '12', label: 'Months of Support' },
      { icon: FaGlobeAsia, number: '50', label: 'Districts Reached' },
      { icon: FaHandHoldingHeart, number: '95%', label: 'Satisfaction Rate' }
    ],
    content: {
      paragraph1: 'Pakistan has a high rate of poverty and low development. This leads to citizens of lower socioeconomic classes suffering due to the lack of resources available to them. It is hard for many families to afford basic necessities including food.',
      paragraph2: 'Our monthly ration program provides essential food items to families in need, ensuring they have access to nutritious meals throughout the month.',
      paragraph3: 'We work with local communities to identify the most vulnerable families and provide them with regular food supplies, helping them maintain their dignity and health.'
    },
    mainImage: image3,
    donateCategory: 'Monthly Ration',
    donationOptions: {
      PKR: [2500, 6000, 12000, 24000],
      USD: [25, 60, 120, 240],
      EUR: [23, 55, 110, 220]
    }
  }
}


export const ALL_PROJECTS_DATA = [
  {
    id: 'health',
    title: 'Health',
    h1: 'Health2',
    description: 'Health is a blessing and is required to live life fully. It is very necessary for all of us to maintain a healthy lifestyle in order to be fit and fearless of diseases. Being healthy helps us to perform our daily activities without any hindrance.',
    image: image1,
    learnMorePath: '/projects/health',
    donatePath: '/donate/health'
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Molana Tariq Jamil Foundation provides scholarships to individuals in need of financial assistance to further their education. These scholarships can range in amount and are awarded based on various criteria such as academic merit, financial need, or specific fields of study.',
    image: image2,
    learnMorePath: '/projects/education',
    donatePath: '/donate/education'
  },
  {
    id: 'disaster-management',
    title: 'Disaster Management',
    description: 'MTJ Foundation is working for relief the people affected by the flood by distribution Cooked food, Dry Foods, Medical Camps & distributing medicine.',
    image: image3,
    learnMorePath: '/projects/disaster-management',
    donatePath: '/donate/disaster-management'
  },
  {
    id: 'clean-water',
    title: 'Clean Water',
    description: 'Clean Water project is a welfare project initiated by MTJ Foundation to address the dire need for safe drinking water in deprived areas of the country.',
    image: image4,
    learnMorePath: '/projects/clean-water',
    donatePath: '/donate/clean-water'
  },
  {
    id: 'ecommerce-training',
    title: 'E Commerce Training',
    description: 'At the core of our mission, MTJ Foundation is dedicated to comprehensive livelihood support, committed to elevating the well-being of communities through sustainable economic empowerment initiatives.',
    image: image5,
    learnMorePath: '/projects/ecommerce-training',
    donatePath: '/donate/ecommerce-training'
  },
  {
    id: 'marriage-gift',
    title: 'Marriage Gift',
    description: 'Molana Tariq Jamil Foundation is doing a truly remarkable and heartwarming favor to distribute wedding gifts to poor girls. In many parts of the world, poverty can be a significant barrier to celebrating life\'s important milestones, including weddings.',
    image: image6,
    learnMorePath: '/projects/marriage-gift',
    donatePath: '/donate/marriage-gift'
  },
  {
    id: 'maskan',
    title: 'Maskan',
    description: 'MTJ Foundation\'s Maskan Program is a revolutionary initiative to provide shelter to the homeless. Our dream is that no one in Pakistan should be left to sleep under open sky.',
    image: image7,
    learnMorePath: '/projects/maskan',
    donatePath: '/donate/maskan'
  },
  {
    id: 'monthly-ration',
    title: 'Monthly Ration',
    description: 'Pakistan has a high rate of poverty and low development. This leads to citizens of lower socioeconomic classes suffering due to the lack of resources available to them. It is hard for many families to afford basic necessities including food.',
    image: image8,
    learnMorePath: '/projects/monthly-ration',
    donatePath: '/donate/monthly-ration'
  }
]