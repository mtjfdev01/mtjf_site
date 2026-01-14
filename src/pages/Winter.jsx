import HeroWithTyping from "../components/hero/HeroWithTyping"
import winter_1 from "../assets/img/campaigns/winter_mtjf.webp"
import winter_2 from "../assets/img/campaigns/winter_mtjf_2.webp"
import winter_6 from "../assets/img/campaigns/winter_mtjf_6.webp"
import winter_7 from "../assets/img/campaigns/winter_mtjf_7.webp"
import winter_8 from "../assets/img/campaigns/winter_mtjf_8.webp"
import winter_10 from "../assets/img/campaigns/winter_mtjf_10.webp"
import winter_right from '../assets/img/hero/winter_right.webp'

import "../common/styles/winter.css"
import DonationForm from "../components/donationForm/DonationForm"
import MediaContentSection from "../components/mediaContentSection/MediaContentSection"
import FAQs from "../components/faqs/FAQs"
import Footer from "../components/footer/Footer"

const winterSubProjects = [
  {
    id: 'al-husnain-school-system', 
    title: 'WINTER PACKS DISTRIBUTION',
    subtitle: 'PROTECTION THAT GOES BEYOND WARMTH',
    description: 'To help families survive the winter season with dignity and safety, MTJ Foundation is providing essential winter support to vulnerable and flood-affected families. This initiative ensures timely relief for those facing life-threatening cold conditions. Winter Pack Includes.',
    programs: [ 
      'Shawl',
      'Warm Clothing',
      'Winter Cap',
      'Blanket'
    ],
    image: winter_10,
    donateButtonText: 'Sponsor Winter Relief'
  },
  {
    id: 'al-hasanain-college-women',
    title: 'Winter & Clothing Support for Vulnerable Families',
    subtitle: 'RESTORING DIGNITY AFTER DISASTER',
    description: 'In response to the needs of flood-affected and underprivileged families, MTJ Foundation is implementing structured winter assistance programs. These efforts focus on protecting families, restoring dignity, and supporting recovery during one of the harshest seasons of the year. Estimated Cost',
    programs: [
      'PKR 10,000 per family',
    ],
    image: winter_8,
    impact: '',
    donateButtonText: 'Support a Family This Winter'
  },
  {
    id: 'educational-scholarship-programs',
    title: 'Blanket Support – Basic Winter Assistance',
    subtitle: 'IMMEDIATE RELIEF FROM THE COLD',
    description: `For families requiring essential winter protection, particularly flood-affected households, MTJ Foundation provides basic blanket support to reduce exposure to freezing temperatures and prevent cold-related illness. What's Included`,
     programs: [
      'Blankets per household',
      'Estimated Cost(PKR 5,000 per family)'
    ],
    image: winter_2,
    impact: '',
    donateButtonText: 'Donate Blankets'
  },
  {
    id: 'al-hasanain-madaris-system',
    title: 'The Harsh Reality of Winter',
    subtitle: 'WHEN COLD BECOMES LIFE-THREATENING',
    description: 'Every year, thousands of people in Pakistan suffer or lose their lives due to extreme winter conditions. Without proper clothing, bedding, or heating, cold nights become dangerous, especially for children, the elderly, and flood-affected families already living in fragile conditions.Your donation is not just an act of charity. It is an intervention that saves lives.',
    programs: [
      'Be the reason someone survives this winter'
    ],
    image: winter_7,
    impact: '',
    donateButtonText: 'Help a Family Stay Warm'
  },
  {
    id: 'education-program-impact',
    title: 'Helping Hands, Warming Hearts',
    subtitle: 'COMPASSION IN ACTION',
    description: 'From distributing winter supplies in remote areas to supporting families displaced by floods, MTJ Foundation ensures that your generosity reaches those who need it most. Every effort is carried out with care, transparency, and accountability.',
    programs:['Support for flood-affected communities',
    'Protection for children and elderly',
    'Emergency winter relief',
    'Transparent distribution process'],
    image: winter_1, 
    donateButtonText: 'Donate to Spread Warmth'
  },
  {
    id: 'quarterly-education-reports',
    title: 'Sharing Happiness',
    subtitle: 'OUR WINTER RELIEF GALLERY',
    description: 'Witness the impact of your generosity through moments captured on the ground. Each image reflects hope, resilience, and the warmth your support brings to families rebuilding their lives after floods during the winter season.',
    image: winter_6,
    donateButtonText: 'Spread Happiness'
  }
];
const winterFaqs = {
  id: 'frequently-asked-questions',
  title: 'Frequently Asked Questions',
  subtitle: 'Everything You Need to Know About MTJ Foundation\'s Winter Servings',
  description: '',
  faqs: [
    {
      question: 'Who receives winter relief support?',
      answer: 'Winter relief support is provided to the most vulnerable families across Pakistan, with special priority given to flood-affected households, widows, elderly individuals, orphan-led families, and communities living below the poverty line. Beneficiaries are identified through field assessments and local coordination to ensure aid reaches those in genuine need.'
    },
    {
      question: 'What does each winter package include?',
      answer: 'Each winter support package is designed to help families stay warm and protected during extreme cold conditions. The support includes essential winter items such as warm clothing, blankets, and related necessities, ensuring comfort, safety, and dignity throughout the winter season.'
    },
    {
      question: 'Is this campaign Zakat-eligible?',
      answer: 'Yes. Winter relief provided to eligible families falls under Zakat-compliant categories, including support for the poor, needy, and disaster-affected individuals. Donations are managed with care to ensure Shariah compliance where applicable.'
    },
    {
      question: 'How does MTJF distribute winter items?',
      answer: 'MTJ Foundation distributes winter aid directly through its field teams and verified community partners. Distributions are conducted in underserved areas and flood-affected regions to ensure transparency, accountability, and dignified delivery to each family.'
    },
    {
      question: 'Can I make a one-time donation?',
      answer: 'Yes. You can make a one-time donation to support winter relief efforts. Every contribution, regardless of amount, helps protect families from harsh winter conditions and brings immediate relief.'
    },
    {
      question: 'Can I support more than one family?',
      answer: 'Absolutely. Donors are encouraged to support multiple families or contribute toward larger winter relief initiatives. Your generosity can extend warmth and protection to several households in need.'
    },
    {
      question: 'How do I know my donation is making an impact?',
      answer: 'MTJ Foundation is committed to transparency and accountability. We regularly share updates, reports, and on-ground visuals showcasing distributions and beneficiary impact, so donors can see how their support is changing lives.'
    }
  ],
  donateButtonText: 'Donate Now'
}

export const Winter = () => { 
    return (
    <div className="winter_hero">  
      <HeroWithTyping 
        imageUrl={winter_right}
        imageAlt="Winter Hero image"
        staticText="Winter Shouldn’t Hurt"
        typingText="وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى  — “Help one another in goodness.” (Qur’an 5:2)"
        subtitle="Freezing nights, empty hands, and no protection from the cold. Through your support, we are collecting winter donations to ensure no one is left alone to suffer this winter."
        textPosition="left"
        backgroundColor="#f5f5f5"
        imageWidth="100%"
        imageHeight="100%"
        typingSpeed={200}
      /> 
     <DonationForm 
              formId="vertical-donation-form"
              layout="vertical"
              showProjectSelect={true}
              projects={[{id: 'winter', title: 'Winter'}]}
              donationOptions={{
                PKR: [5000, 10000, 25000, 50000],
                USD: [50, 100, 250, 500],
                EUR: [45, 90, 225, 450]
              }}
              categoryOptions={['General', 'Sadqa', 'Zakat']}
              defaultCategory="General"
            />
            <MediaContentSection
            subProjects={winterSubProjects}
            faqs={winterFaqs}
            />
            <FAQs
              title={winterFaqs.title}
              subtitle={winterFaqs.subtitle}
              faqs={winterFaqs.faqs}
            />
            <Footer />
      </div>
    )
}