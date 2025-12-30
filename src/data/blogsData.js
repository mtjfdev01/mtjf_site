// blogsData.js - Unified blog data for all components
import ceo from '../assets/img/blogs/ceo.webp'
import blog1 from '../assets/img/causes/poor boy.webp'
import blog2 from '../assets/img/causes/meet box.webp'
import heroBlogs from '../assets/img/blogs/hero_blogs.webp'
import powerOfCleanWater from '../assets/img/blogs/power of clean water.webp'
import poorMan from '../assets/img/blogs/poor man.webp'
import poorChild from '../assets/img/blogs/poor child.webp'
import imageBlog3 from '../assets/img/blogs/image blog 3.webp'
import handpump from '../assets/img/blogs/handpump.webp'
import bull from '../assets/img/blogs/bull.webp'

export const blogs = [
  {
    id: 'qurbani-meaning',
    date: 'June 15, 2018',
    title: 'Understanding Qurbani: Its Meaning, Rules, and Significance in Islam',
    category: 'Qurbani',
    image: blog2,
    excerpt: 'Every year, as the sacred days of Dhul Hijjah draw near, Muslims around the world prepare to honour the powerful legacy of Prophet Ibrahim (AS) through the act of Qurbani.',
    link: '/blogs/qurbani-meaning',
    badge: null,
    featured: true
  },
  {
    id: 'waqf-qurbani',
    date: 'June 15, 2018',
    title: 'What Waqf Qurbani Means with MTJ Foundation',
    category: 'Food',
    image: blog1,
    excerpt: `As the sacred days of Dhul al-Hijjah approach, we're reminded of the story that lies at the heart of Qurbani — a story of unwavering faith and sacrifice.`,
    link: '/blogs/waqf-qurbani',
    badge: '96% of people in Gaza are facing high levels of food insecurity',
    featured: false
  },
  {
    id: 'diabetes-awareness',
    date: 'May 9, 2025',
    title: 'MTJ Foundation Advances Community Health Through Diabetes Awareness Session',
    category: 'Health',
    image: ceo,
    excerpt: 'The Molana Tariq Jamil (MTJ) Foundation\'s Health Department recently conducted a Diabetes Awareness and Lifestyle Management Session for 30 registered beneficiaries, as part of its ongoing efforts to promote preventive healthcare.',
    link: '/blogs/diabetes-awareness',
    badge: null,
    featured: false
  },
  {
    id: 'sadqah-jariyah',
    date: 'June 15, 2018',
    title: 'How sadqah Jariyah Creates Eternal Blessings for Generations',
    category: 'Sadqah',
    image: poorMan,
    excerpt: 'Discover how continuous charity (Sadqah Jariyah) creates lasting impact and eternal rewards that benefit generations to come.',
    link: '/blogs/sadqah-jariyah',
    badge: null,
    featured: false
  },
  {
    id: 'clean-water',
    date: 'June 15, 2018',
    title: 'The Power of Clean Water: Transforming Lives One Drop at a Time',
    category: 'Water',
    image: powerOfCleanWater,
    excerpt: 'Clean water is a fundamental human right. Learn how access to safe drinking water transforms communities and saves lives.',
    link: '/blogs/clean-water',
    badge: null,
    featured: false
  },
  {
    id: 'education-poverty',
    date: 'June 15, 2018',
    title: 'Why Education is the Key to Breaking the Cycle of Poverty',
    category: 'Education',
    image: poorChild,
    excerpt: 'Education empowers individuals and communities, providing the tools needed to break free from poverty and build a better future.',
    link: '/blogs/education-poverty',
    badge: null,
    featured: false
  }
];

// Helper function to get featured blog
export const getFeaturedBlog = () => {
  return blogs.find(blog => blog.featured === true) || blogs[0];
};

// Helper function to get regular blogs (non-featured)
export const getRegularBlogs = () => {
  return blogs.filter(blog => blog.featured !== true);
};

// Helper function to get blog by ID
export const getBlogById = (id) => {
  return blogs.find(blog => blog.id === id);
};
