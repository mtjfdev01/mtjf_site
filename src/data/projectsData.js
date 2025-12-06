import image1 from '../assets/img/projects/camp.webp'
import image2 from '../assets/img/projects/convocation.webp'
import image3 from '../assets/img/projects/group of boys.webp'
import Health from '../assets/img/projects/project-image/health.webp'
import Education from '../assets/img/projects/project-image/education.webp'
import CleanWater from '../assets/img/projects/project-image/cleanwater.webp'
import ApnaGhar from '../assets/img/projects/project-image/apnaghar.webp'
import DisasterRelief from '../assets/img/projects/project-image/disasterrelief.webp'
import KasbSkill from '../assets/img/projects/project-image/kasbskill.webp'
import SeedsOfChange from '../assets/img/projects/project-image/seeds.webp'
import Qurbani from '../assets/img/projects/project-image/qurbani.webp'
import AASLab from '../assets/img/projects/project-image/aaslab.webp'
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
    title: 'Education – Knowledge for Every Child, Opportunity for Every Dream',
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
      paragraph1: 'At MTJ Foundation, we believe education is a right, not a privilege.',
      paragraph2: 'Every child deserves the chance to learn, grow, and reach their potential, regardless of their circumstances.',
      paragraph3: 'In underserved areas across Pakistan, many children are forced to leave school due to poverty or lack of resources. Through your support, we provide free schools, scholarships, and Islamic education programs, giving children the tools to build a brighter tomorrow, and young women the confidence to lead.'
    },
    mainImage: image1,
    donateCategory: 'Education',
    donateButtonText: 'Support Education Programs',
    donationOptions: {
      PKR: [2500, 5000, 10000, 25000],
      USD: [25, 50, 100, 250],
      EUR: [20, 40, 80, 200]
    },
    subProjects: [
      {
        id: 'al-husnain-school-system',
        title: 'Al Husnain School System',
        subtitle: 'Free Schools for Children in Underserved Communities',
        description: 'For many children, simply having a classroom and books is a dream. Al Husnain Schools ensure that children in underprivileged districts can access quality education, school supplies, and a safe space to learn.',
        locations: [
          { name: 'Shokat Mor', students: 40 },
          { name: 'Muhallah Mistrian, Tulamba', students: 45 },
          { name: 'Tawylan Wala Khoh', students: 42 },
          { name: 'Chak 13/8 R', students: 38 },
          { name: 'Chak 8/8 R, Rady Wala', students: 40 }
        ],
        impact: '205 students currently enrolled across 5 schools, with over 10 micro-schools in operation. Our goal is to expand further, reaching more children in need.',
        donateButtonText: 'Sponsor a Child\'s Education'
      },
      {
        id: 'al-hasanain-college-women',
        title: 'Al Hasanain College for Women',
        subtitle: 'Equipping Young Women to Lead',
        description: 'In many underserved communities, girls are often denied higher education. Al Hasanain College for Women in Mian Channu provides free and subsidized education to empower young women with knowledge, skills, and leadership confidence.',
        programs: [
          'Full scholarships for deserving students',
          'Courses in Science, Commerce, and Humanities',
          'Leadership and personal development programs'
        ],
        donateButtonText: 'Empower a Young Woman'
      },
      {
        id: 'educational-scholarship-programs',
        title: 'Educational Scholarship Programs',
        subtitle: 'Breaking Barriers, Creating Opportunities',
        description: 'Talented students should never miss out on education due to financial limitations. Our scholarship program covers tuition, transport, books, accommodation, and mentorship, ensuring every student has a holistic academic journey.',
        impact: '300+ scholarships awarded, 90% retention rate, Beneficiaries placed in top schools and colleges',
        donateButtonText: 'Fund a Scholarship'
      },
      {
        id: 'al-hasanain-madaris-system',
        title: 'Al Hasanain Madaris System',
        subtitle: 'Nurturing Islamic Scholars for the Future',
        description: 'Founded by Molana Tariq Jamil in 1998, Jamia Al-Hasanain has grown from a small mosque in Faisalabad to one of Pakistan\'s leading Islamic education institutes. With ten branches nationwide, including North America, our Madaris system combines rigorous religious studies with practical Arabic language skills.',
        programs: [
          'Dars-e-Nizami (Almiyyah Program): 6-year course',
          'Dars-e-Nizami (Almiyyah Program): 4-year course',
          'Hifz-ul-Quran & Nazra Programs'
        ],
        mainCampus: {
          description: '1.5-acre campus with classrooms, library, hostel, mosque, and playfield',
          library: 'Library with 500+ books covering multiple subjects',
          mosque: 'Mosque capacity of 1,000+ worshippers',
          darulIfta: 'Dar-ul-Ifta issuing 120 verified fatwas annually'
        },
        impact: '1,300 students enrolled, 170 graduates annually, highly proficient in Arabic and Islamic studies, ready to serve their communities.',
        donateButtonText: 'Support Islamic Education'
      },
      {
        id: 'education-program-impact',
        title: 'Education Program Impact – Stories of Transformation',
        subtitle: 'Watch Young Lives You Helped Change',
        description: 'See the real impact of your support through the stories of students whose lives have been transformed.',
        videos: [
          'https://www.youtube.com/watch?v=4A8q8Al7TMs&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=7',
          'https://www.youtube.com/watch?v=gNt5XZyRGDk&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=25',
          'https://www.youtube.com/watch?v=_rQhKds84rc&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=49'
        ],
        donateButtonText: 'Support Education Programs'
      },
      {
        id: 'quarterly-education-reports',
        title: 'Quarterly Education Reports (FY 2024–2025)',
        subtitle: 'Full Transparency. Real Impact.',
        description: 'We believe in complete transparency. Every quarter, we publish detailed reports so donors can see the exact impact of their generosity.',
        reportIncludes: [
          'Number of students enrolled',
          'Scholarships awarded',
          'Schools and micro-schools operational',
          'Academic achievements and placements',
          'Geographic coverage',
          'Cost transparency'
        ],
        donateButtonText: 'Download All Reports'
      },
      {
        id: 'your-support-builds-futures',
        title: 'Your Support Builds Futures',
        subtitle: 'Be a Beacon of Hope Today',
        description: 'Every child taught… Every young woman empowered… Every student supported… begins with a donor who cared.',
        donateButtonText: 'Donate to Education Programs'
      },
      {
        id: 'impact-metrics',
        title: 'Impact at a Glance',
        subtitle: 'Your Generosity Transformed Young Minds Across Pakistan',
        description: 'Below are the key educational outcomes made possible through your support. (All figures will be added once shared by the Education Department)',
        metrics: [
          {
            title: 'Students Enrolled in Al Husnain Schools',
            number: '',
            impact: 'Hundreds of children in underserved communities now have access to quality education.'
          },
          {
            title: 'Scholarships Awarded to Deserving Students',
            number: '',
            impact: 'Talented children and young women continue their studies without financial barriers.'
          },
          {
            title: 'Graduates of Al Hasanain Madaris System',
            number: '',
            impact: 'Students equipped with Islamic knowledge and Arabic proficiency to serve their communities.'
          },
          {
            title: 'Micro-Schools & Outreach Centers Operational',
            number: '',
            impact: 'Education reaches remote villages, bringing hope to children who had no access to schooling.'
          }
        ],
        donateButtonText: 'View Detailed Quarterly Reports'
      }
    ]
  },
  health: {
    id: 'health',
    title: 'Health – Restoring Dignity, One Patient at a Time',
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
      paragraph1: 'At MTJ Foundation, we believe health is not a privilege—it is a right.',
      paragraph2: 'Every day, thousands of families in Pakistan face impossible choices: buy medicine or buy food? Visit a doctor or save money for rent?',
      paragraph3: 'For those living on the margins, even a minor illness can become life-threatening. Through your support, we bring quality, compassionate, and completely free healthcare to the doorsteps of the most vulnerable, so no mother loses hope, no father suffers in silence, and no child is denied the chance to grow up healthy.'
    },
    mainImage: image2,
    donateCategory: 'Health',
    donateButtonText: 'Support Healthcare Services',
    donationOptions: {
      PKR: [5000, 10000, 20000, 50000],
      USD: [50, 100, 200, 500],
      EUR: [45, 90, 180, 450]
    },
    subProjects: [
      {
        id: 'direct-medical-aid',
        title: 'Direct Medical Aid',
        subtitle: 'When Illness Strikes, We Step In: Immediately',
        description: 'When a family has nowhere to go and no means to afford treatment, MTJ Foundation becomes their lifeline. From emergency interventions to life-saving procedures, we provide immediate medical support for those who cannot bear the cost.',
        services: [
          'Lifesaving treatments for critical patients',
          'Diagnostic support for illnesses often left undetected',
          'Emergency response for urgent medical cases',
          'Long-term care for chronic patients who have no financial backing'
        ],
        impact: 'Every contribution you make becomes someone\'s chance to survive.',
        donateButtonText: 'Donate to Save Lives'
      },
      {
        id: 'free-opd',
        title: 'Free OPD (Outpatient Department)',
        subtitle: 'Compassionate Care for Every Family',
        description: 'For many in underserved communities, a simple doctor\'s visit is unaffordable. Our Free OPD ensures that every person: child, adult, or elderly, can receive medical attention with dignity.',
        services: [
          'Free consultations with qualified doctors',
          'Basic diagnostics',
          'Preventive health screening',
          'Immediate and empathetic care'
        ],
        impact: 'Every patient who walks into our OPD leaves with the reassurance that their life matters.',
        donateButtonText: 'Support Free Medical Checkups'
      },
      {
        id: 'free-medicines',
        title: 'Free Medicines',
        subtitle: 'No One Should Suffer Because They Can\'t Afford Medicine',
        description: 'In poverty-hit households, buying medicine often means sacrificing food or basic needs. We bridge this gap by providing completely free medications prescribed by our doctors.',
        services: [
          'Chronic illness medication (diabetes, BP, heart)',
          'Antibiotics and essential drugs',
          'Vitamins and supplements for malnourished patients',
          'Post-surgery medication support'
        ],
        impact: 'When you donate, you\'re not just giving medicine: you\'re giving relief, comfort, and hope.',
        donateButtonText: 'Provide Medicines to a Family'
      },
      {
        id: 'free-medical-camps',
        title: 'Free Medical Camps',
        subtitle: 'Reaching the Unreached: Healthcare Beyond Walls',
        description: 'Our Free Medical Camps travel to remote villages, underserved areas, and communities with no access to healthcare. These camps become a place of healing, where hundreds receive treatment in a single day.',
        services: [
          'Basic checkups',
          'Specialist consultations',
          'Free diagnostic tests',
          'Medicine distribution',
          'Health awareness and prevention sessions'
        ],
        impact: 'For many, this is the only healthcare they receive all year.',
        donateButtonText: 'Sponsor a Medical Camp'
      },
      {
        id: 'surgeries-post-operative-care',
        title: 'Surgeries & Post-Operative Care',
        subtitle: 'Healing That Goes Beyond the Operating Room',
        description: 'A surgery that costs thousands in private hospitals is completely out of reach for poor families. MTJ Foundation provides free surgical procedures, from minor operations to life-changing major surgeries.',
        services: [
          'Pre-operative assessments',
          'The surgical procedure',
          'Post-operative medication',
          'Follow-up care for full recovery'
        ],
        impact: 'Your generosity helps someone walk again, see again, work again, and live again.',
        donateButtonText: 'Fund a Surgery'
      },
      {
        id: 'health-program-impact',
        title: 'Health Program Impact – Stories of Hope',
        subtitle: 'Watch Lives You Helped Change',
        description: 'See the real impact of your support through the stories of patients whose lives have been transformed.',
        videos: [
          'https://www.youtube.com/watch?v=6bqunG0PeNQ&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=8',
          'https://www.youtube.com/watch?v=jK4a0OeDwXI&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=14',
          'https://www.youtube.com/watch?v=DAnXnVpICys&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=42',
          'https://www.youtube.com/watch?v=r8Kz53e9yZY&list=PLwuAnGkonZSIggK0nwd-V_5QNSjM-uClN&index=48'
        ],
        donateButtonText: 'Support Healthcare Services'
      },
      {
        id: 'quarterly-health-reports',
        title: 'Quarterly Health Reports (FY 2024–2025)',
        subtitle: 'Full Transparency. Real Impact.',
        description: 'We believe in complete transparency. Every quarter, we publish detailed reports so donors can see the exact impact of their generosity.',
        reports: [
          'Q1: July–September 2024',
          'Q2: October–December 2024',
          'Q3: January–March 2025',
          'Q4: April–June 2025'
        ],
        reportIncludes: [
          'Number of patients served',
          'Medicines distributed',
          'Surgeries completed',
          'Camps conducted',
          'Geographic coverage',
          'Cost transparency'
        ],
        donateButtonText: 'Download All Reports'
      },
      {
        id: 'your-support-saves-lives',
        title: 'Your Support Saves Lives',
        subtitle: 'Be Someone\'s Hope Today',
        description: 'Every child healed… Every mother comforted… Every life saved… begins with a donor who cared.',
        donateButtonText: 'Donate to Health Services'
      },
      {
        id: 'impact-metrics',
        title: 'Impact at a Glance',
        subtitle: 'Your Generosity Transformed Lives Across Pakistan',
        description: 'Below are the key health outcomes made possible through your support. (All figures will be added once shared by the Health Department.)',
        metrics: [
          {
            title: 'Patients Treated Through Free OPD',
            number: '',
            impact: 'Thousands of families received timely, compassionate care without worrying about cost.'
          },
          {
            title: 'Free Medicines Distributed',
            number: '',
            impact: 'Critical medication reached patients who would otherwise have gone without treatment.'
          },
          {
            title: 'Lives Saved Through Direct Medical Aid',
            number: '',
            impact: 'Emergency support prevented untold suffering and gave families renewed hope.'
          },
          {
            title: 'Surgeries Performed',
            number: '',
            impact: 'Life-changing procedures that restored mobility, sight, and health to the most vulnerable.'
          },
          {
            title: 'Free Medical Camps Conducted',
            number: '',
            impact: 'Healthcare reached remote communities where no doctor or clinic is available.'
          },
          {
            title: 'Total Beneficiaries Impacted This Year',
            number: '',
            impact: 'Behind every number is a mother, a father, a child — a story transformed through your kindness.'
          }
        ],
        donateButtonText: 'View Detailed Quarterly Reports'
      }
    ]
  },
  'disaster-management': {
    id: 'disaster-management',
    title: 'Disaster Relief',
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
      paragraph1: 'When disaster strikes, MTJ Foundation mobilizes swiftly to bring life-saving support and comfort to those in urgent need. Our approach combines immediate relief with long-term recovery, ensuring families can survive, rebuild, and regain dignity.',
      paragraph2: 'From earthquakes in Turkey and Morocco, to humanitarian crises in Gaza and Lebanon, to the devastating 2025 floods in Pakistan, MTJF stands as a beacon of hope, guided by the Islamic principle of Khidmat-e-Khalq fi Sabeelillah—serving humanity solely for the pleasure of Allah.',
      paragraph3: '"Whoever saves one life, it is as if he has saved all of mankind." — Surah Al-Maidah 5:32'
    },
    mainImage: image1,
    donateCategory: 'Disaster Relief',
    donateButtonText: 'Donate for Disaster Relief',
    donationOptions: {
      PKR: [3000, 7000, 15000, 30000],
      USD: [30, 70, 150, 300],
      EUR: [28, 65, 140, 280]
    },
    subProjects: [
      {
        id: 'gaza-relief',
        title: 'Gaza Relief',
        subtitle: '',
        description: 'In response to ongoing humanitarian crises in Gaza, MTJ Foundation partnered with trusted on-ground organizations to provide comprehensive life-saving aid to displaced families. The region has faced years of conflict, restricted access to essential services, and food insecurity, leaving vulnerable families—especially children, women, and the elderly—at risk of malnutrition, illness, and trauma.',
        support: [
          'Food rations and groceries to ensure families can meet basic nutritional needs. Each ration bag was carefully designed to feed a family for a month, prioritizing households headed by widows and the elderly.',
          'Clean drinking water delivered to households and community centers, helping prevent waterborne diseases that are common in conflict zones.',
          'Baby formula milk and diapers, providing crucial support to infants and toddlers who are most at risk in humanitarian crises.',
          'Hygiene kits and tents, giving families a safe, sanitary environment and temporary shelter after displacement.'
        ],
        impact: 'Through this holistic support, MTJF addressed both immediate survival needs and long-term sustenance, helping families regain stability, dignity, and hope. Beyond the material aid, our presence reassured communities that they were not forgotten, restoring a sense of humanity amid the chaos of conflict.',
        testimonial: '"Receiving food, water, and tents from MTJ Foundation made us feel seen and protected. Our children can sleep safely tonight because someone cared." — Ayesha, mother of 3, Gaza',
        donateButtonText: 'Support Gaza Relief'
      },
      {
        id: 'turkey-morocco-earthquakes',
        title: 'Turkey & Morocco Earthquakes',
        subtitle: '',
        description: 'During the devastating earthquakes in Turkey and Morocco, MTJ Foundation launched rapid-response operations, delivering emergency relief within hours to communities where infrastructure had collapsed and access to basic necessities was cut off. Families were trapped without shelter, food, or clean water, and medical facilities were overwhelmed by injuries.',
        response: [
          'Emergency shelter materials, such as tents, blankets, and bedding, providing immediate safety to families who had lost their homes.',
          'Ration packs containing essential groceries and nutrition supplies, ensuring families had access to food during the critical first days following the disaster.',
          'Medical assistance, including on-ground medical teams and first aid kits, reaching injured and displaced communities who were unable to access hospitals due to damaged roads and overwhelmed health systems.'
        ],
        impact: 'Our teams coordinated closely with local authorities and NGOs to identify the most vulnerable households, ensuring aid reached children, elderly, and those with disabilities first. The timely intervention significantly reduced casualties, prevented secondary health crises, and offered families a sense of stability during the most frightening moments of their lives.',
        testimonial: '"We had nowhere to go, no food, no water. The MTJ Foundation team arrived with tents, meals, and medicine—they brought us life when everything was lost." — Ahmed, survivor, Turkey',
        donateButtonText: 'Support Earthquake Relief'
      },
      {
        id: 'pakistan-floods-2022',
        title: 'Pakistan Floods – 2022',
        subtitle: '',
        description: 'Before the catastrophic 2025 floods, MTJ Foundation played a crucial role in Pakistan\'s 2022 flood response, when torrential monsoon rains and overflowing rivers caused widespread devastation across Sindh, Punjab, and Khyber Pakhtunkhwa. Tens of thousands of families were displaced, their homes submerged, crops destroyed, and livelihoods disrupted.',
        response: [
          'Cooked meals and ration distribution, providing immediate nourishment to families stranded by floodwaters. Over 20,000 meals were distributed in the first week, targeting widows, elderly, and households with young children.',
          'Emergency shelter and non-food items (NFIs), including tents, blankets, and basic clothing, giving families a safe place to sleep while their homes were uninhabitable.',
          'Medical camps and mobile health units, treating injuries, waterborne illnesses, and chronic conditions aggravated by the floods. Our teams provided medicines, vaccinations, and hygiene education to prevent outbreaks.',
          'Constructions of Mosques and Homes, to ensure people had a shelter and a place to pray'
        ],
        impact: 'Through these efforts, MTJF reached over 50,000 individuals across the most affected regions, combining emergency relief with long-term recovery planning. The team\'s approach emphasized not just survival but resilience, ensuring families had the tools to rebuild and recover after the waters receded.',
        testimonial: '"The MTJ Foundation team saved our family. We had no food, no home, but their tents, meals, and medicine gave us hope and strength to start again." — Karim, farmer, Sindh',
        donateButtonText: 'Support Flood Relief'
      },
      {
        id: 'pakistan-floods-2025',
        title: 'Pakistan Floods – 2025 Response',
        subtitle: 'Introduction',
        description: 'The 2025 floods were among the most destructive in Pakistan\'s recent history. Torrential rains, cloudbursts in Khyber Pakhtunkhwa, and water inflows from India caused widespread devastation across multiple provinces, destroying lives, homes, and livelihoods. MTJF launched the "Nusrat-e-Insaniat" Emergency Response, grounded in the belief: "Indeed, Allah will help His servant as long as His servant helps his brother." (Sahih Muslim)',
        phases: [
          {
            title: 'Phase-I – Early Response in Khyber Pakhtunkhwa (August 2025)',
            description: 'MTJF teams were among the first responders, reaching Buner, Swat, Shangla, and Dir within hours of the emergency.',
            interventions: [
              'Medical Assistance: 15 mobile medical camps, 5,250+ patients treated, 2.5 tonnes of medicines distributed',
              'Food & Nutrition: 25,000+ cooked meals, 2,800 ration bags distributed to widows, elderly, and differently-abled families',
              'Shelter & NFIs: 700 families provided with tents, bedding, and clothing',
              'Assessment for Rehabilitation: 500+ homes and 48 educational/religious institutions surveyed for reconstruction'
            ],
            testimonial: '"The first days were critical. Our camps were the only medical relief for miles." — Dr. Sidra Gulzar, MTJF Medical Officer, Buner'
          },
          {
            title: 'Phase-II – Expanded Response in Southern Punjab (Late August to September 2025)',
            description: 'As monsoon rains intensified, MTJF scaled operations to southern Punjab districts including Khanewal, Multan, Muzaffargarh, Bahawalpur, Okara, Sahiwal, Toba Tek Singh, and Vehari.',
            interventions: [
              'Cooked food & ration distribution to 37,000+ individuals',
              'Tent villages and emergency shelter',
              'Medical camps & medicine support',
              'Livestock feed, WASH facilities, and livelihood planning'
            ]
          },
          {
            title: 'Phase-III – Rehabilitation & Winterization (October 2025 onward)',
            description: 'With receding floodwaters, MTJF shifted focus to long-term recovery.',
            interventions: [
              'Disaster-Resilient Homes: Constructing 750+ permanent homes under the Maskan initiative',
              'Livelihood & Agriculture Support: Seed/fertilizer distribution, livestock aid, and small-business grants',
              'Cash Assistance: Direct financial aid for affected families',
              'Winterization Kits: Warm clothing, bedding, and kitchen supplies',
              'Education & Religious Infrastructure: Rehabilitation of schools, masjids, and madaris'
            ]
          }
        ],
        donateButtonText: 'Support 2025 Flood Relief'
      },
      {
        id: 'accountability-transparency',
        title: 'Accountability & Transparency',
        subtitle: '',
        description: 'Every contribution to MTJF\'s Flood Relief Pool Fund is handled with full transparency:',
        points: [
          'Swift allocation to urgent needs across regions',
          'PPRA-compliant procurement procedures',
          'Field verification and centralized MEAL (Monitoring, Evaluation, Accountability & Learning) oversight',
          'Every rupee treated as Amanat (Trust)'
        ],
        donateButtonText: 'Donate for Disaster Relief'
      },
      {
        id: 'voices-from-field',
        title: 'Voices from the Field',
        subtitle: '',
        description: '',
        testimonials: [
          '"When floods destroyed our home, we thought we were forgotten. But the tents and meals from MTJ Foundation gave us comfort and faith." — Fatima Bibi, Widow, Alipur',
          '"Our children were hungry for days. The Foundation reached us when no one else could. May Allah bless those who made it possible." — Muhammad Karim, Farmer, Dir'
        ],
        donateButtonText: 'Donate for Disaster Relief'
      },
      {
        id: 'call-to-action',
        title: 'Call to Action',
        subtitle: '',
        description: 'Through your support, MTJF can continue providing life-saving relief, shelter, and hope to families affected by disasters across Pakistan and beyond. Every donation embodies the teaching: "And they give food, in spite of love for it, to the needy, the orphan, and the captive, [saying], \'We feed you only for the Countenance of Allah.\'" (Surah Al-Insan 76:8–9)',
        donateButtonText: 'Donate for Disaster Relief'
      }
    ]
  },
  'clean-water': {
    id: 'clean-water',
    title: 'Clean Water for Every Family, A Lifeline of Sadaqah Jariyah',
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
      paragraph1: 'Millions of people across Pakistan face daily struggles due to lack of clean drinking water. Unsafe water leads to waterborne diseases, child mortality, and enormous hardship, especially for women and children who often walk miles carrying heavy pots just to fetch water. MTJ Foundation is turning this struggle into hope.',
      paragraph2: 'With over 60 handpumps installed and 3 major water filtration plants operational, we provide safe, sustainable water solutions that save lives, restore dignity, and create lasting change. Supporting these projects is not only a humanitarian act: it is Sadaqah Jariyah, an ongoing source of blessings that continues to benefit people for years to come.',
      paragraph3: ''
    },
    mainImage: image2,
    donateCategory: 'Clean Water',
    donateButtonText: 'Sponsor a Handpump or Filtration Plant',
    donationOptions: {
      PKR: [4000, 8000, 16000, 32000],
      USD: [40, 80, 160, 320],
      EUR: [35, 70, 140, 280]
    },
    subProjects: [
      {
        id: 'our-clean-water-programs',
        title: 'Our Clean Water Programs',
        subtitle: '',
        description: '',
        programs: [
          {
            id: 'individual-handpumps',
            title: 'Individual Handpumps',
            description: 'A handpump is not just a source of water: it is a lifeline for a family. Installed within homes or nearby, our individual handpumps provide immediate access to clean drinking water, dramatically improving health and quality of life. Mothers no longer walk for hours each day, children can drink safely, and families are protected from deadly waterborne diseases. For donors, every handpump becomes a continuous act of charity (Sadaqah Jariyah), benefiting generations.',
            benefits: [
              'Protects families from waterborne diseases such as cholera and hepatitis',
              'Reduces the daily burden on women and children',
              'Provides dignity, ease, and health to families',
              'Serves as Sadaqah Jariyah, earning ongoing blessings'
            ],
            donateButtonText: 'Sponsor an Individual Handpump'
          },
          {
            id: 'community-handpumps',
            title: 'Community Handpumps',
            description: 'In villages and neighborhoods where water scarcity affects multiple households, MTJ Foundation installs community handpumps. These shared water points ensure equitable access for all, strengthen social bonds, and promote hygiene and public health. Supporting a community handpump is a long-term, impactful charity, serving numerous families for years and generating continuous spiritual reward for donors.',
            benefits: [
              'Serves multiple households efficiently',
              'Improves public health and reduces waterborne diseases',
              'Strengthens community ties and resilience',
              'Acts as Sadaqah Jariyah, benefiting generations'
            ],
            donateButtonText: 'Sponsor a Community Handpump'
          },
          {
            id: 'water-filtration-plants',
            title: 'Water Filtration Plants',
            description: 'Large-scale filtration plants provide safe, chemical-free drinking water to rural and peri-urban communities daily. These plants fight life-threatening illnesses such as cholera and hepatitis and reach hundreds or thousands of families at once. Donating to a water filtration plant is one of the most significant acts of Sadaqah Jariyah, as it creates a lasting, life-saving impact for entire communities.',
            benefits: [
              'Ensures consistent, safe drinking water for large populations',
              'Reduces disease prevalence and improves long-term health',
              'Supports sustainable community development',
              'Leaves a lasting charitable legacy for donors'
            ],
            donateButtonText: 'Sponsor a Water Filtration Plant'
          }
        ]
      },
      {
        id: 'impact-highlights',
        title: 'Impact Highlights',
        subtitle: '',
        description: '',
        highlights: [
          { label: 'Individual handpumps installed', value: '60+' },
          { label: 'Community handpumps installed', value: '' },
          { label: 'Water filtration plants operational', value: '3' },
          { label: 'Families benefiting daily', value: '' }
        ],
        donateButtonText: 'Sponsor a Handpump or Filtration Plant'
      },
      {
        id: 'faq-clean-water',
        title: 'FAQ – Clean Water Projects',
        subtitle: '',
        description: '',
        faqs: [
          {
            question: 'Why is clean water considered Sadaqah Jariyah?',
            answer: 'Clean water continues to benefit families and communities for years, earning ongoing spiritual reward for the donor as long as it is used.'
          },
          {
            question: 'How do you select communities for water projects?',
            answer: 'We prioritize underserved areas where water scarcity is severe and families are at highest risk of waterborne diseases.'
          },
          {
            question: 'Can donors sponsor specific water projects?',
            answer: 'Yes! Donors can fund individual handpumps, community pumps, or filtration plants, directly transforming lives and creating Sadaqah Jariyah.'
          },
          {
            question: 'How are water solutions maintained?',
            answer: 'Local communities are trained to manage and maintain pumps and filtration plants, ensuring sustainable, long-term impact.'
          }
        ],
        donateButtonText: 'Sponsor a Handpump or Filtration Plant'
      },
      {
        id: 'call-to-action',
        title: 'Call to Action',
        subtitle: '',
        description: 'Be the reason a child drinks safely today. Sponsor a Handpump or Filtration Plant and earn ongoing blessings through Sadaqah Jariyah. Your contribution transforms lives, restores dignity, and leaves a lasting legacy.',
        donateButtonText: 'Sponsor a Handpump or Filtration Plant'
      }
    ]
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
  },
  'kasb-skill-development': {
    id: 'kasb-skill-development',
    title: 'KASB Skill Development – Skills That Build Futures',
    headerImage: image1,
    stats: [
      { icon: FaUsers, number: '1,200', label: 'Participants Trained' },
      { icon: FaLaptopCode, number: '850', label: 'Training Programs Conducted' },
      { icon: FaShoppingCart, number: '650', label: 'Online Stores Created' },
      { icon: FaChartLine, number: '65%', label: 'Employment Rate' },
      { icon: FaBriefcase, number: '2,100', label: 'Jobs Created' },
      { icon: FaGraduationCap, number: '45', label: 'Training Centers' },
      { icon: FaUsers, number: '180,000', label: 'Total Beneficiaries' },
      { icon: FaStar, number: '4.8', label: 'Average Rating' }
    ],
    content: {
      paragraph1: 'At MTJ Foundation, we believe that empowering women with marketable skills is key to breaking the cycle of poverty.',
      paragraph2: 'Many women in underserved communities were once the sole breadwinners of their households, earning meager amounts by cleaning homes or performing odd jobs. With KASB, we give them an opportunity to earn dignified, sustainable income while gaining confidence and independence.',
      paragraph3: ''
    },
    mainImage: image2,
    donateCategory: 'KASB Skill Development',
    donateButtonText: 'Support Women\'s Skill Development',
    donationOptions: {
      PKR: [3500, 9000, 18000, 36000],
      USD: [35, 90, 180, 360],
      EUR: [32, 80, 160, 320]
    },
    subProjects: [
      {
        id: 'football-stitching-training-center',
        title: 'Football Stitching Training Center',
        subtitle: 'From Training to Global Markets',
        description: 'Women first receive hands-on training at no cost, along with all necessary tools and raw materials provided by the Foundation. Once trained, they begin stitching professional-grade footballs.',
        workflow: [
          'Women learn the stitching process using tools and materials provided free by MTJ Foundation.',
          'A well-trained woman can produce 3–5 footballs per day; some even take materials home to work at their own pace.',
          'Completed footballs are submitted to the trainer at the KASB center for quality checks.',
          'Once verified, women are paid fairly based on the number of footballs produced.',
          'The finished footballs are exported globally by our partner, some even reaching FIFA events.'
        ],
        impact: [
          'Women transition from low-income, unstable work to dignified, consistent livelihoods.',
          'Families achieve financial stability and improved living standards.',
          'Trainees contribute to the global sports industry, fostering pride and purpose.'
        ],
        donateButtonText: 'Empower a Woman Through Skill Training'
      },
      {
        id: 'community-trainer-program',
        title: 'Community Trainer Program',
        subtitle: 'Building a Self-Sustaining Cycle of Development',
        description: 'To ensure long-term impact, MTJ Foundation empowers women who have already completed the KASB training to become community trainers. These trained women are given the liberty to open KASB centers at their own homes, where they teach other women the skills they\'ve learned. This approach not only expands the program\'s reach but also ensures that more women gain valuable skills and income opportunities.',
        impact: [
          'Knowledge and skills reach a wider pool of women across communities',
          'Women achieve financial independence and help others do the same',
          'Communities become more self-reliant and economically empowered',
          'Women develop leadership and mentoring capabilities'
        ],
        donateButtonText: 'Support Community Trainers'
      },
      {
        id: 'kasb-program-impact',
        title: 'KASB Program Impact – Stories of Change',
        subtitle: 'Witness Lives Transformed Through Skill Development',
        description: 'Watch our CEO on-site explain the KASB initiative and hear directly from the women whose lives have been transformed through this program. The video highlights their work, confidence, and the financial independence they\'ve gained through skill development.',
        donateButtonText: 'Watch the Transformation'
      },
      {
        id: 'quarterly-kasb-reports',
        title: 'Quarterly KASB Reports (FY 2024–2025)',
        subtitle: 'Full Transparency. Real Impact.',
        description: 'Every quarter, we publish detailed reports so donors can see the exact impact of their support.',
        reportIncludes: [
          'Number of women trained',
          'Number of community trainers certified',
          'Footballs produced and exported',
          'Household income uplift',
          'Program expansion and geographic coverage'
        ],
        donateButtonText: 'Download All Reports'
      },
      {
        id: 'your-support-creates-opportunity',
        title: 'Your Support Creates Opportunity',
        subtitle: 'Be a Catalyst for Change',
        description: 'Every skill taught… Every woman empowered… Every livelihood transformed… begins with a donor who cared.',
        donateButtonText: 'Donate to KASB Skill Development'
      },
      {
        id: 'impact-metrics',
        title: 'Impact at a Glance',
        subtitle: 'Your Generosity Transformed Women\'s Lives Across Communities',
        description: '(All figures to be updated by the KASB Department)',
        metrics: [
          {
            title: 'Women Trained in Football Stitching',
            number: '',
            impact: 'Women gain practical skills, income, and confidence to support their households.'
          },
          {
            title: 'Community Trainers Certified',
            number: '',
            impact: 'Knowledge is passed on, creating a self-sustaining skill development cycle.'
          },
          {
            title: 'Footballs Produced for International Markets',
            number: '',
            impact: 'Trainees actively contribute to global supply chains, with products used even in FIFA events.'
          }
        ],
        donateButtonText: 'View Detailed Quarterly Reports'
      }
    ]
  }   
}


// export const ALL_PROJECTS_DATA = [
//   {
//     id: 'health',
//     title: 'Health',
//     subtitle: 'Ensuring Access to Dignified, Affordable Healthcare',
//     description: 'We provide free OPDs, medical camps, essential treatments, and life-saving surgeries to vulnerable families who cannot afford healthcare.',
//     impactStatement: 'Every patient we serve moves one step closer to a healthier, dignified life, because healthcare should never be a privilege.',
//     image: image1,
//     donateButtonText: 'Support Healthcare Services',
//     learnMorePath: '/projects/health',
//     donatePath: '/donate/health'
//   },
//   {
//     id: 'education',
//     title: 'Education',
//     subtitle: 'Opening Doors to Learning and Opportunity',
//     description: 'We offer quality education, Islamic learning, scholarships, and support for out-of-school children to help them build brighter futures.',
//     impactStatement: 'Education transforms lives and your support ensures no child is left behind.',
//     image: image1,
//     donateButtonText: 'Educate a Child',
//     learnMorePath: '/projects/education',
//     donatePath: '/donate/education'
//   },
//   {
//     id: 'clean-water',
//     title: 'Clean Water',
//     subtitle: 'Providing Safe Water for Healthier Communities',
//     description: 'We install hand pumps, filtration systems, and community water solutions where families struggle for safe drinking water.',
//     impactStatement: 'Clean water reduces disease, restores dignity, and protects generations.',
//     image: image1,
//     donateButtonText: 'Sponsor a Water Project',
//     learnMorePath: '/projects/clean-water',
//     donatePath: '/donate/clean-water'
//   },
//   {
//     id: 'apna-ghar',
//     title: 'Apna Ghar',
//     subtitle: 'Safe Shelter for Orphans and Widows',
//     description: 'Apna Ghar provides a nurturing home, education, emotional care, and long-term stability and independence for widows and orphaned children.',
//     impactStatement: 'Here, safety becomes healing, and broken lives begin again.',
//     image: image1,
//     donateButtonText: 'Support Apna Ghar',
//     learnMorePath: '/projects/apna-ghar',
//     donatePath: '/donate/apna-ghar'
//   },
//   {
//     id: 'disaster-relief',
//     title: 'Disaster Relief',
//     subtitle: 'Rapid Response When Crisis Strikes',
//     description: 'Our teams deliver food, shelter, medical assistance, and long-term recovery support to families affected by floods, earthquakes, and emergencies.',
//     impactStatement: 'Your support ensures no family faces disaster alone.',
//     image: image1,
//     donateButtonText: 'Help in Emergencies',
//     learnMorePath: '/projects/disaster-relief',
//     donatePath: '/donate/disaster-relief'
//   },
//   {
//     id: 'kasb-skill-development',
//     title: 'KASB Skill Development',
//     subtitle: 'Empowering Youth and Women Through Skills',
//     description: 'We offer vocational training, digital skills, and tailoring that help individuals earn a stable income.',
//     impactStatement: 'When someone gains a skill, they gain the power to change their own future.',
//     image: image1,
//     donateButtonText: 'Sponsor Skill Training',
//     learnMorePath: '/projects/kasb-skill-development',
//     donatePath: '/donate/kasb-skill-development'
//   },
//   {
//     id: 'seeds-of-change',
//     title: 'Seeds of Change',
//     subtitle: 'Protecting the Environment for Future Generations',
//     description: 'Through plantation drives, climate awareness, and community engagement, we strengthen environmental resilience and promote sustainable living.',
//     impactStatement: 'Every tree planted brings us closer to a cleaner, safer world.',
//     image: image1,
//     donateButtonText: 'Plant a Tree',
//     learnMorePath: '/projects/seeds-of-change',
//     donatePath: '/donate/seeds-of-change'
//   },
//   {
//     id: 'qurbani-barai-mustehqeen',
//     title: 'Qurbani Barai Mustehqeen',
//     subtitle: 'Delivering Qurbani Meat to Families in Need',
//     description: 'We carry out donor Qurbanis with transparency and Shariah compliance, distributing fresh meat to families who rarely enjoy this blessing.',
//     impactStatement: 'Your sacrifice becomes their joy, nourishment, and hope.',
//     image: image1,
//     donateButtonText: 'Book Your Qurbani',
//     learnMorePath: '/projects/qurbani-barai-mustehqeen',
//     donatePath: '/donate/qurbani-barai-mustehqeen'
//   },
//   {
//     id: 'aas-lab-diagnostics',
//     title: 'AAS Lab & Diagnostics',
//     subtitle: 'Accessible and Affordable Diagnostic Care for all',
//     description: 'We provide accurate and affordable CT scans, MRIs, ultrasounds, and essential lab tests in underserved areas where such facilities never existed. These tests are also done free of cost for the more deserving patients.',
//     impactStatement: 'A correct diagnosis can save a life and your support makes it possible.',
//     image: image1,
//     donateButtonText: 'Support Diagnostic Care',
//     learnMorePath: '/projects/aas-lab-diagnostics',
//     donatePath: '/donate/aas-lab-diagnostics'
//   },
//   {
//     id: 'community-services',
//     title: 'Community Services',
//     subtitle: 'Supporting Vulnerable Families With Essential Relief',
//     description: 'We provide financial assistance, ration support, winter kits, marriage support, and cooked food to families struggling with daily survival.',
//     impactStatement: 'Your generosity turns hardship into hope for those who need it most.',
//     image: image1,
//     donateButtonText: 'Support a Family',
//     learnMorePath: '/projects/community-services',
//     donatePath: '/donate/community-services'
//   }
// ] 









export const ALL_PROJECTS_DATA = [
  {
    id: 'health',
    title: 'Health',
    subtitle: 'Ensuring Access to Dignified, Affordable Healthcare',
    description: 'We provide free OPDs, medical camps, essential treatments, and life-saving surgeries to vulnerable families who cannot afford healthcare.',
    impactStatement: 'Every patient we serve moves one step closer to a healthier, dignified life, because healthcare should never be a privilege.',
    image: Health,
    donateButtonText: 'Support Healthcare Services',
    learnMorePath: '/projects/health',
    donatePath: '/donate/health'
  },
  {
    id: 'education',
    title: 'Education',
    subtitle: 'Opening Doors to Learning and Opportunity',
    description: 'We offer quality education, Islamic learning, scholarships, and support for out-of-school children to help them build brighter futures.',
    impactStatement: 'Education transforms lives and your support ensures no child is left behind.',
    image: Education,
    donateButtonText: 'Educate a Child',
    learnMorePath: '/projects/education',
    donatePath: '/donate/education'
  },
  {
    id: 'clean-water',
    title: 'Clean Water',
    subtitle: 'Providing Safe Water for Healthier Communities',
    description: 'We install hand pumps, filtration systems, and community water solutions where families struggle for safe drinking water.',
    impactStatement: 'Clean water reduces disease, restores dignity, and protects generations.',
    image: CleanWater,
    donateButtonText: 'Sponsor a Water Project',
    learnMorePath: '/projects/clean-water',
    donatePath: '/donate/clean-water'
  },
  {
    id: 'apna-ghar',
    title: 'Apna Ghar',
    subtitle: 'Safe Shelter for Orphans and Widows',
    description: 'Apna Ghar provides a nurturing home, education, emotional care, and long-term stability and independence for widows and orphaned children.',
    impactStatement: 'Here, safety becomes healing, and broken lives begin again.',
    image: ApnaGhar,
    donateButtonText: 'Support Apna Ghar',
    learnMorePath: '/projects/apna-ghar',
    donatePath: '/donate/apna-ghar'
  },
  {
    id: 'disaster-relief',
    title: 'Disaster Relief',
    subtitle: 'Rapid Response When Crisis Strikes',
    description: 'Our teams deliver food, shelter, medical assistance, and long-term recovery support to families affected by floods, earthquakes, and emergencies.',
    impactStatement: 'Your support ensures no family faces disaster alone.',
    image: DisasterRelief,
    donateButtonText: 'Help in Emergencies',
    learnMorePath: '/projects/disaster-relief',
    donatePath: '/donate/disaster-relief'
  },
  {
    id: 'kasb-skill-development',
    title: 'KASB Skill Development',
    subtitle: 'Empowering Youth and Women Through Skills',
    description: 'We offer vocational training, digital skills, and tailoring that help individuals earn a stable income.',
    impactStatement: 'When someone gains a skill, they gain the power to change their own future.',
    image: KasbSkill,
    donateButtonText: 'Sponsor Skill Training',
    learnMorePath: '/projects/kasb-skill-development',
    donatePath: '/donate/kasb-skill-development'
  },
  {
    id: 'seeds-of-change',
    title: 'Seeds of Change',
    subtitle: 'Protecting the Environment for Future Generations',
    description: 'Through plantation drives, climate awareness, and community engagement, we strengthen environmental resilience and promote sustainable living.',
    impactStatement: 'Every tree planted brings us closer to a cleaner, safer world.',
    image: SeedsOfChange,
    donateButtonText: 'Plant a Tree',
    learnMorePath: '/projects/seeds-of-change',
    donatePath: '/donate/seeds-of-change'
  },
  {
    id: 'qurbani-barai-mustehqeen',
    title: 'Qurbani Barai Mustehqeen',
    subtitle: 'Delivering Qurbani Meat to Families in Need',
    description: 'We carry out donor Qurbanis with transparency and Shariah compliance, distributing fresh meat to families who rarely enjoy this blessing.',
    impactStatement: 'Your sacrifice becomes their joy, nourishment, and hope.',
    image: Qurbani,
    donateButtonText: 'Book Your Qurbani',
    learnMorePath: '/projects/qurbani-barai-mustehqeen',
    donatePath: '/donate/qurbani-barai-mustehqeen'
  },
  {
    id: 'aas-lab-diagnostics',
    title: 'AAS Lab & Diagnostics',
    subtitle: 'Accessible and Affordable Diagnostic Care for all',
    description: 'We provide accurate and affordable CT scans, MRIs, ultrasounds, and essential lab tests in underserved areas where such facilities never existed. These tests are also done free of cost for the more deserving patients.',
    impactStatement: 'A correct diagnosis can save a life and your support makes it possible.',
    image: AASLab,
    donateButtonText: 'Support Diagnostic Care',
    learnMorePath: '/projects/aas-lab-diagnostics',
    donatePath: '/donate/aas-lab-diagnostics'
  },
  {
    id: 'community-services',
    title: 'Community Services',
    subtitle: 'Supporting Vulnerable Families With Essential Relief',
    description: 'We provide financial assistance, ration support, winter kits, marriage support, and cooked food to families struggling with daily survival.',
    impactStatement: 'Your generosity turns hardship into hope for those who need it most.',
    image: image1,
    donateButtonText: 'Support a Family',
    learnMorePath: '/projects/community-services',
    donatePath: '/donate/community-services'
  }
]