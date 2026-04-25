import hero from '../assets/img/blogs/hero_blogs.webp'
import news from '../assets/img/mediapage/news.png'
import media from '../assets/img/mediapage/media.png'
import impact from '../assets/img/mediapage/impacts.png'
import download from '../assets/img/mediapage/downloads.png'
import video from '../assets/img/mediapage/video.png'

const mediaCards = [
  {
    id: 'news',
    title: 'News',
    image: news,
    link: '/news',
    cta: 'Learn More'
  },
  {
    id: 'blogs',
    title: 'Blogs',
    image: hero,
    link: '/blogs',
    cta: 'Learn More'
  },
  {
    id: 'media-coverage',
    title: 'Media Coverage',
    image: media,
    link: '/media/coverage',
    cta: 'Learn More'
  },
  {
    id: 'impacts',
    title: 'Impacts',
    image: impact,
    link: '/impacts',
    cta: 'Learn More'
  },
  {
    id: 'downloads',
    title: 'Downloads',
    image: download,
    link: '/downloads',
    cta: 'Learn More'
  },
  {
    id: 'videos',
    title: 'Videos',
    image: video,
    link: '/videos',
    cta: 'Learn More'
  }
]
export default mediaCards
