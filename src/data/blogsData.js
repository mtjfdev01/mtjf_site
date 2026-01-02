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
import h_2 from '../assets/img/projects/projects-details/Health/h_2.webp'
import h_3 from '../assets/img/projects/projects-details/Health/health_free_opd.webp'
import h_4 from '../assets/img/projects/projects-details/Health/health_free_medicines.webp'
import h_5 from '../assets/img/projects/projects-details/Health/health_free_medical_camps.webp'
import h_6 from '../assets/img/projects/projects-details/Health/surgeries.webp'
import h_7 from '../assets/img/projects/projects-details/Health/Health_health_program.webp'
import h_8 from '../assets/img/projects/projects-details/Health/health_dircet_aid.webp'
import h_9 from '../assets/img/projects/projects-details/Health/support.webp'
import h_10 from '../assets/img/projects/projects-details/Health/surgeries.webp'


export const blogs = [ 
  {
    id: 'sadqah-jariyah',
    date: 'June 15, 2018',
    title: 'How sadqah Jariyah Creates Eternal Blessings for Generations',
    category: 'Sadqah',
    image: poorMan,
    excerpt: 'There are some acts of kindness so powerful that they don’t just help in the moment—they continue to bring blessings for generations to come. Sadaqah Jariyah is one of those rare, beautiful gifts that keeps giving, not just in this world but in the hereafter.',
    content: 'content',
    subProjects: [
      {
        id: 'what-is-sadaqah-jariyah',
        title: 'What is Sadaqah Jariyah?',
        // subtitle: 'When Illness Strikes, We Step In: Immediately',
        image: h_2,
        description: 'Sadaqah Jariyah, or ongoing charity, is a form of giving that continues to benefit people long after the giver has passed. Unlike one-time charity (Sadaqah), which provides immediate relief, Sadaqah Jariyah ensures continuous reward for as long as people benefit from it.',
        descriptionBold: null,
        description2Bold:'The Prophet Muhammad (ﷺ) said:',
        description2:'“When a person dies, all their deeds end except three: a continuing charity, knowledge that benefits others, or a righteous child who prays for them.” (Muslim 1631).',
        description3:'This means that your generosity can become your legacy, bringing endless rewards even after you leave this world.',
        description3Bold: null,
      },
      {
        id: 'types-of-sadaqah-jariyah',
        title: 'Types of Sadaqah Jariyah',
        impact:'Sadaqah Jariyah can take many forms, each carrying its own ripple effect of blessings:',
        image: h_3,
        descriptionBold: 'Providing Clean Water – Installing hand pumps, wells, or water filtration plants.',
        description: 'Imagine someone quenching their thirst, making wudu, or preparing food with the water you provided—every drop earns you reward! At MTJ Foundation, we run the Clean Water Program, installing hand pumps and water filtration plants in water-scarce areas, ensuring access to safe drinking water for thousands.',
        description2Bold: 'Building Mosques – A place where countless prayers are offered.',
        description2: 'Whoever builds a mosque for the sake of Allah, Allah will build for him a house in Jannah.” (Bukhari & Muslim)',

        bottomText: 'Every letter a child reads, every lesson learned, every dua made by a student of knowledge—all will add to your rewards. MTJ Foundation runs an Educational Program, providing children with learning opportunities, scholarships, and academic resources to help build a brighter future.',
        // bottomTextBold: 'Every act of charity (sadaqah) is a form of sadaqah Jariyah, creating continuous rewards for generations to come.',
        // bottomTextSubTitle:"The best of you are those who learn the Quran and teach it. (Bukhari)",
      },
      {
        id: 'supporting-medical-aid',
        title: 'Supporting Medical Aid – Funding hospitals, clinics, or treatments.',
        impact:'',
        image: h_3,
        descriptionBold: '',
        description: 'Helping the sick and needy ensures that lives are saved and communities remain healthy.Our Healthcare Initiative at MTJ Foundation provides medical aid, medicines, and healthcare support to underprivileged families, ensuring access to essential treatment.',
        bottomText: '',
        bottomTextBold: '',

      },  
      {
        id: 'planting-trees',
        title: 'Planting Trees – A simple act that benefits generations.',
        impact:'The Prophet (ﷺ) said, “If a Muslim plants a tree or sows seeds, and then birds, or a person, or an animal eats from it, it is regarded as charity for him.” (Bukhari)',
        image: h_3,
        descriptionBold: '',
        description: 'MTJ Foundation conducts plantation drives across different areas, promoting a greener, healthier environment that benefits both people and nature. Why Should You Give Sadaqah Jariyah?',
        description2Bold: '',
          services: [
            '✨ It Protects You from Hardships – “Charity extinguishes sins just as water extinguishes fire.” (Tirmidhi 614)',
            '✨ It Multiplies in Reward – “The example of those who spend their wealth in the way of Allah is like a seed that grows seven spikes; in each spike is a hundred grains.” (Qur’an 2:261)',
            '✨ It Brings Barakah to Your Wealth – Your generosity never decreases your wealth; instead, it invites endless blessings.',
          ],
        description2: ''
      },
      {
        id: 'how-to-contribute',
        title: 'How You Can Contribute to Sadaqah Jariyah Through MTJ Foundation',
        impact:'',
        image: h_3,
        descriptionBold: '',
        description: 'At MTJ Foundation, we are dedicated to empowering communities through impactful projects that qualify as Sadaqah Jariyah. You can take part by contributing to:',
        services:[
          '✅ Clean Water Program – Fund a hand pump or filtration plant to ensure families have access to clean drinking water.',
          '✅ Educational Support – Sponsor a child’s education and help break the cycle of poverty.',
          '✅ Healthcare Aid – Provide medical care to those who cannot afford it.',
          '✅ Plantation Activity – Support tree-planting initiatives that benefit communities for generations.',
        ],
        bottomText:'Your one-time donation or continuous support can create a legacy of blessings that lives beyond your lifetime.'
      },
      {
        id: 'your-chance-to-build-your-akhirah',
        title: 'Your Chance to Build Your Akhirah',
        impact:'🌙 This Ramadan, be a source of endless mercy and reward. Give Sadaqah Jariyah today, and let your kindness illuminate lives for generations to come.',
        image: h_3,
        descriptionBold: '',
        description: 'Sadaqah Jariyah is more than just charity—it is an everlasting investment in your hereafter. Every drop of clean water, every child’s education, every life-saving treatment you support creates a ripple effect of blessings that continues long after you have left this world.',
        donateButtonText: 'Donate Now',
      },
    ], 
    link: '/blogs/sadqah-jariyah', 
    badge: null, 
    featured: false,
  },
  {
    id: 'clean-water',
    date: 'June 15, 2018',
    title: 'The Power of Clean Water: Transforming Lives One Drop at a Time',
    category: 'Water',
    image: powerOfCleanWater,
    excerpt: 'Clean water is a fundamental human right. Learn how access to safe drinking water transforms communities and saves lives.',
    content: 'content',
    subProjects: 'subProjects',
    link: '/blogs/clean-water',
    badge: null,
    featured: false,
    subProjects:[
      {
        id: 'what-is-sadaqah-jariyah',
        title: 'The Power of Clean Water: Transforming Lives One Drop at a Time',
        // subtitle: 'When Illness Strikes, We Step In: Immediately',
        image: h_2,
        description: 'Water is life. It nourishes, cleanses, and sustains us. Yet, for millions across the world, access to clean drinking water is still a distant dream. Imagine a mother walking miles under the scorching sun, carrying a heavy container just to fetch water that may not even be safe to drink. Imagine a child, too weak to attend school, suffering from preventable waterborne diseases. This is not just a scenario—it is the reality of many communities in Pakistan and beyond.',
        description2:'At MTJ Foundation, we believe that access to clean water is not a privilege; it is a fundamental right. It is not just about quenching thirst—it is about dignity, health, and the chance for a better future. Our mission is to ensure that every drop of water brings hope, healing, and transformation.',
        bottomText:'In Pakistan, more than 80% of the population lacks access to clean drinking water. This crisis disproportionately affects children, leading to waterborne diseases such as cholera, diarrhea, and typhoid. According to UNICEF, these diseases contribute to over 50,000 child deaths every year in the country. The impact is heartbreaking—lives are lost, dreams are shattered, and communities are left in perpetual struggle.'  
      },
      {
        id: 'commitment',
        title: 'MTJ Foundation’s Commitment to Change',
        // subtitle: 'When Illness Strikes, We Step In: Immediately',
        image: h_2,
        description: 'At MTJ Foundation, we are not just witnessing this crisis—we are actively working to change the narrative. Through our Clean Water Initiative, we are reaching out to the most vulnerable communities, providing them with sustainable solutions for safe and accessible water. Our projects focus on:',
        services:[
          'Hand Pump Installations – Bringing water closer to families and communities who previously had to walk miles to fetch it.',
          'Water Filtration Plants – Ensuring that drinking water is safe and free from contaminants.',
          'Emergency Water Relief – Providing immediate access to clean water in disaster-affected areas.'
        ]
      },
      {
        id:'water-as-a-lifeline-in-gaza',
        title:'Water as a Lifeline in Gaza',
        image: h_2,
        description:'Beyond Pakistan, we are also extending our help to those suffering in conflict zones. Our foundation has been sending essential aid to Gaza, where families are displaced and struggling for survival. With limited access to safe drinking water, the crisis in Gaza is worsening every day. Through our relief efforts, we are providing formula milk powder and other necessities, ensuring that displaced families, especially children and mothers, receive the care they need.',
        description2:'For us, clean water is not just about health—it is about giving people a fighting chance. It is about allowing children to go to school without suffering from illness. It is about empowering women, who no longer have to spend hours fetching water. It is about restoring hope in places where despair looms large.',
        videos: [
          'https://youtu.be/q0uSWku1YEk?si=-m127cpcaevWOfRJ'
        ]
      },
      {
        id:'impacting-lives-through-clean-water-access',
        title:'Impacting Lives Through Clean Water Access',
        image: h_2,
        description:'With the installation of our hand pumps and water filtration plants, we have impacted the lives of more than 300,000 people, bringing hope and ease to communities that once struggled for something as basic as water. Families no longer have to walk miles for water, a struggle we heard from countless beneficiaries. Mothers shared how they would set out before sunrise, walking for hours with heavy pots, only to return home exhausted, leaving little time for their children or household needs. Children, instead of attending school, would accompany their parents on these long, tiring journeys.',
        description2:'But now, with access to clean water just steps away, their lives have taken a new turn. Children can finally focus on their education without the burden of water collection. Mothers have more time to care for their families and pursue small income-generating activities. We have seen entire communities thrive, with gardens growing fresh vegetables and livestock staying healthy.',
        bottomText:'The risk of waterborne diseases, which once caused untold suffering, has significantly decreased. Villagers no longer live in fear of contaminated water harming their loved ones. Now, they celebrate healthier, brighter days. The ripple effect of clean water is profound—it’s not just about survival but about living with dignity and hope.'
      },
      {
        id:'why-your-support-matters',
        title:'Why Your Support Matters:',
        image: h_2,
        description:'At MTJ Foundation, every drop matters because every life matters. Each hand pump installed means a mother no longer has to risk her life walking miles for water. Each water filtration plant means a child can go to school healthy and happy. Every donation, every action, and every shared story brings us closer to a world where no one has to suffer from the lack of clean water.',
        description2:'Together, we can turn the tide—one drop at a time. Your support isn’t just a donation; it’s a lifeline. Will you help us bring clean water and hope to those who need it most?',
        bottomText:'The fight for clean water is far from over. Every day, millions of people still live without access to safe drinking water, but together, we can change that. With your support, we can bring more clean water, more smiles, and more hope to communities in need. Whether through donations, spreading awareness, or participating in our projects, your contribution has the power to transform lives.'    
      },
      {
        id:'how-you-can-make-a-difference',
        title:'How You Can Make a Difference',
        image: h_2,
        descriptionBold:'💧 Spread Awareness:',
        description:'Be a voice for those who struggle every day. Share the message with your friends, family, and social networks. When more people know about the water crisis, more people will care—and together, we can drive greater change. Your voice has power. Use it to advocate for clean water for all.',
        description2Bold:'💧 Join Our Campaigns:',
        description2:'Become a part of the movement. Participate in our clean water projects and witness the impact firsthand. Whether it’s volunteering at events, fundraising in your community, or helping us install hand pumps, your time and effort can directly change lives.',
        description3:'Your contribution can directly fund life-saving projects such as installing hand pumps and water filtration systems in the most water-deprived areas. You can choose to:',
        services:[
          'Donate a Handpump for PKR 60,000 to 80,000, providing a family or small community with easy access to safe water.',
          'Sponsor a Community Handpump for PKR 125,000, serving larger villages and ensuring that more people benefit from clean water daily.',
        ],
        bottomText:'With just one donation, you can help provide a community with access to clean water for years to come. Every drop you help provide brings safety, dignity, and opportunity to families who have suffered without it.',
        donateButtonText:'Donate Now'
      },
      {
        id:'your-role-in-creating-a-clean-water-legacy',
        title:'Your Role in Creating a Clean Water Legacy',
        image: h_2,
        description:'',
        description2:''
      },
  ]
  },
  {
  id:'marriage-in-need',
  date: 'June 15, 2018',
  title: 'The Significance of Marriage and the Growing Challenges Amidst Inflation',
  category: 'Marriage',
  image: h_2,
  excerpt: 'Every year, thousands of families in Pakistan struggle to provide a decent wedding for their children. Learn how our community stepped in to help, transforming dreams into reality.',
  content: 'content',
  subProjects: 'subProjects',
  link: '/blogs/marriage-in-need',
  subProjects:[
    {
    id:'',
    title:'The Significance of Marriage and the Growing Challenges Amidst Inflation',
    image: h_2,
    description:'Marriage, an institution deeply rooted in tradition, culture, and faith, is more than just a social contract. It signifies the union of two souls, the foundation of a family, and the cornerstone of a stable society. In Islam, marriage holds immense value, as it is considered half of one’s faith, encouraging companionship, mutual support, and societal harmony. However, with rising inflation and financial challenges, many families today struggle to fulfill this fundamental social obligation.',
    description2Bold:"Marriage in Islam: A Sacred Bond",

    description2:'Islam views marriage as a sacred bond that fosters love, compassion, and mercy between spouses. The Quran beautifully highlights this significance:',
    description3:`And among His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy." (Surah Ar-Rum, 30:21)`,
    // bottomTextBold:'The Rising Cost of Marriage: A Growing Concern',
    bottomText: `In recent years, inflation has made it increasingly difficult for middle- and lower-income families to bear the expenses associated with weddings. What were once considered basic necessities—bedding, kitchenware, and household items—have now become unaffordable luxuries for many. In Pakistan, where marriage is a communal celebration, families often feel disheartened when they are unable to arrange even a simple ceremony for their children.
    Parents spend years saving for these special occasions, but rising costs often force them to delay or even abandon wedding plans, causing emotional distress for the entire family. Unfortunately, these financial challenges sometimes push families into debt or lead them to make sacrifices that impact their day-to-day well-being.
    Recognizing this growing concern, compassionate individuals and organizations have come forward to offer support, understanding that marriage is not just a personal milestone but a societal necessity.`,
  },
  {
    id:'',
    title:'A Day of Joy: Mass Wedding for 50 Couples in Badin',
    image: h_2,
    description:'Just last week, in the heart of Badin, 50 deserving couples were united in marriage during a simple yet joyful mass wedding ceremony. The event brought together not only the couples and their families but also community members who came to celebrate this beautiful occasion. Among the guests was Member of the Provincial Assembly, Ms. Sumbul Ayamin Shah, who appreciated the collective effort in making these weddings possible.',
    description2:'The couples were provided with essential household items, including bedding, kitchenware, and other necessities to help them begin their new lives with dignity and ease. Witnessing the joy and relief on the faces of the newlyweds and their parents was a heartwarming reminder of the profound impact that collective kindness can have.',
    bottomText:'Since 2019, efforts like these have supported many families struggling to manage wedding expenses. These initiatives stem from a belief in the power of community and the importance of preserving the sanctity of marriage, especially for those facing financial hardships.',
    // donateButtonText:'Donate Now'
  },
  {
    id:'',
    title:'Community Support: A Collective Responsibility',
    image: h_2,
    description:'Marriage is not just a family event; it is a societal milestone that binds communities together. Islam encourages the community to support those who are less fortunate in this regard. Prophet Muhammad (PBUH) said:',
    description2:'The most blessed marriage is the one with the least expenses." (Mishkat al-Masabih 3097)',
    description3:'This hadith serves as a reminder that simplicity, sincerity, and community solidarity matter more than the grandeur of any event. When communities come together to help struggling families, they become part of a greater purpose—one that reflects the true spirit of compassion and unity.',
    bottomText:'The mass wedding in Badin was made possible by the generosity of individuals who chose to extend a helping hand. It was a testament to the strength of collective action and the belief that no family should be burdened by financial challenges when it comes to such an essential life event.',
  },
  {
    id:'',
    title:'The Path Forward: Simplifying Marriage in Challenging Times',
    // image: h_2,
    description:'As inflation continues to challenge household incomes, simplifying marriage customs and encouraging community support can make a significant difference. Here are a few steps that can help ease this challenge:',
    services:[
      'Promote Simple Marriages: Advocate for modest ceremonies that focus on the essence of the union rather than the extravagance of the event.',
      'Community Contributions: Establish local funds or charitable initiatives to support families in need of wedding assistance.',
      'Raise Awareness: Educate communities about the Islamic perspective on simple, cost-effective marriages, reducing societal pressures around lavish events.',
      'Collaborate with Charities: Encourage individuals and businesses to collaborate with charitable organizations to provide essential items and financial support to underprivileged families.'
    ],
    description2:'',
    bottomText:`Marriage, as a cornerstone of family life, brings stability, love, and growth to individuals and society. In Islam, it is a sacred bond that carries both spiritual and worldly significance. Yet, for many, the rising cost of living has made this milestone increasingly difficult to achieve.The mass wedding in Badin was a reminder of how, together, we can alleviate these challenges. We are deeply grateful to all the donors and supporters who made this event possible. Your generosity gave 50 couples a hopeful start to their married lives—something that would have been unattainable without your help. We hope to continue supporting families in need through similar initiatives in the future. If you'd like to be a part of this cause and contribute to making dreams come true for more couples, donate today.Together, we can uphold the sacred tradition of marriage and continue to spread happiness in the lives of those who need it most.`
  
    }

]
  },
  {
    id:'education',
    title:'',
    image: h_2,
    description:'',
    description2:'',
    bottomText:'',
    donateButtonText:'Donate Now',
    subProjects:[
      {
        id:'',
        title:'',
        image: h_2,
        description:'',
        description2:'',
        bottomText:'',
        donateButtonText:'Donate Now'
      }
    ]
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
