import type {
  ImageAccordianType,
  TopBannerType,
  Product,
  Benefit,
  TermsSectionType,
} from '@/types/components/front-pages/main';
import heartImage from '@/assets/images/programs/heart.svg';
import luggageImage from '@/assets/images/programs/luggage.svg';
import planeImage from '@/assets/images/programs/plane.svg';
import familyImage from '@/assets/images/programs/family.svg';

const ProgramData: ImageAccordianType[] = [
  {
    title: 'Protect Your Family’s Health',
    image: heartImage,
    icon: 'solar:health-outline',
    items: [
      {
        title: 'How does this plan protect my entire family while traveling?',
        subtitle: 'Comprehensive Emergency Medical Coverage for Your Household',
        text: 'With a single plan, your entire family is covered for medical emergencies anywhere in the world! Choose from <strong>Vacation Basics 365 ($10,000 per traveler)</strong>, <strong>Vacation Essential 365 ($20,000 per traveler)</strong>, or <strong>Vacation Choice 365 ($50,000 per traveler)</strong>, plus <strong>$500 in emergency dental care per person</strong>. Travel confidently knowing everyone is protected.',
      },
      {
        title: 'What happens if one of us needs emergency medical transport?',
        subtitle: 'Emergency Medical Evacuation for the Whole Family',
        text: 'If a family member experiences a medical emergency, our plan covers up to <strong>$500,000 in emergency evacuation and repatriation services</strong>, ensuring they are transported to the nearest adequate medical facility. Additionally, we provide up to <strong>$25,000 for a medical escort</strong> if physician-recommended.',
      },
      {
        title: 'Is it easy to access medical care for any family member while traveling?',
        subtitle: 'Hassle-Free Access to Healthcare Anywhere',
        text: 'Yes! No need to search for in-network providers—simply seek care from any <strong>licensed physician</strong> while traveling <strong>100+ miles from home</strong>, and we’ll handle the rest. Whether it’s a minor illness or a major emergency, your family has access to quality care.',
      },
      {
        title: 'Does coverage extend after we return home?',
        subtitle: 'Post-Trip Recovery Support for Your Household',
        text: 'Yes! If a family member needs additional care after returning home, <strong>Vacation Essential 365 and Vacation Choice 365</strong> include up to <strong>$2,000 in physical therapy benefits for up to 90 days</strong>. Because recovery shouldn’t end when your trip does.',
      },
    ],
  },
  {
    title: 'Protect Your Family’s Belongings',
    image: luggageImage,
    icon: 'fluent:luggage-48-regular',
    items: [
      {
        title: 'How much coverage does my family get for lost baggage?',
        subtitle: 'Protection for Every Family Member’s Personal Belongings',
        text: 'Your entire family’s luggage and valuables are protected! <strong>Vacation Choice 365 covers up to $2,000 per traveler</strong>, <strong>Vacation Essential 365 offers $1,500 per traveler</strong>, and <strong>Vacation Basics 365 provides $1,000 per traveler</strong> for baggage loss, theft, or damage.',
      },
      {
        title: 'What happens if our baggage is delayed?',
        subtitle: 'Fast Coverage for Delayed Luggage',
        text: 'If baggage is delayed for <strong>12+ hours</strong>, each traveler can claim: <strong>Vacation Choice 365 – $500 total ($250 per day)</strong>, <strong>Vacation Essential 365 – $250 total</strong>, and <strong>Vacation Basics 365 – $100 total</strong> for emergency purchases like clothing and toiletries.',
      },
      {
        title: 'How does this plan protect high-value items?',
        subtitle: 'Coverage for Family Electronics, Jewelry & More',
        text: 'Every plan includes <strong>$500 aggregate coverage</strong> for electronics, jewelry, and valuable items, with <strong>$500 for the first item and $250 per additional item</strong>. Make sure to keep receipts for items valued over $150 to ensure easy claims processing.',
      },
      {
        title: 'What’s the claims process for baggage protection?',
        subtitle: 'Simple Claims & Fast Reimbursements',
        text: 'If your baggage is lost or stolen, <strong>report it immediately</strong>, take necessary precautions to protect your belongings, and submit your claim with receipts. We’ll reimburse you based on the <strong>actual cash value or replacement cost—whichever is lower.</strong>',
      },
    ],
  },
  {
    title: 'Protect Your Family’s Travel Plans',
    image: planeImage,
    icon: 'la:plane',
    items: [
      {
        title: 'How much trip cancellation coverage does my family get?',
        subtitle: 'Trip Cancellation Protection for the Entire Household',
        text: 'If unforeseen events force you to cancel your trip, your family is covered! <strong>Vacation Choice 365 reimburses up to $3,000 per traveler</strong>, <strong>Vacation Essential 365 up to $1,500 per traveler</strong>, while <strong>Vacation Basics 365 does not include trip cancellation but provides trip delay benefits.</strong>',
      },
      {
        title: 'What if our trip is delayed?',
        subtitle: 'Stay Comfortable During Unexpected Delays',
        text: 'After <strong>12+ hours of delay</strong>, each traveler is eligible for reimbursement: <strong>Vacation Choice 365 – $200/day (max $1,500)</strong>, <strong>Vacation Essential 365 – $200/day (max $1,000)</strong>, and <strong>Vacation Basics 365 – $200/day (max $600)</strong> to cover meals, lodging, and necessary expenses.',
      },
      {
        title: 'How am I protected if a family member needs to cut their trip short?',
        subtitle: 'Trip Interruption Protection for Your Family',
        text: '<strong>Vacation Choice 365 and Vacation Essential 365</strong> reimburse up to <strong>100% of the interrupted trip cost</strong>. <strong>Vacation Choice 365 covers up to $3,000 per traveler</strong>, while <strong>Vacation Essential 365 covers up to $1,500 per traveler.</strong>',
      },
      {
        title: 'What if bad weather disrupts our trip?',
        subtitle: 'Weather Protection for Your Family’s Travel Plans',
        text: 'If severe weather causes cancellations or delays <strong>for 24+ hours</strong>, your <strong>family’s trip costs are protected</strong>. Plus, if a <strong>named hurricane renders your destination inaccessible</strong>, you’ll be reimbursed for non-refundable expenses!',
      },
    ],
  },
];

const ProgramTopBanner: TopBannerType = {
  title: 'Keep Your Entire Household Covered - All Year Long!',
  image: familyImage,
};

const ProgramProducts: Product[] = [
  { name: 'Basics 365', color: '#00c9a5', link: '/pricing' },
  { name: 'Essentials 365', color: '#005047', link: '/pricing' },
  { name: 'Choice 365', color: '#0078fc', link: '/pricing' },
];

const ProgramBenefits: Benefit[] = [
  {
    name: 'Trip Cancellation',
    description:
      'Reimburses forfeited pre-paid trip costs up to the maximum limit for trips canceled due to a covered unforeseen event before departure.',
    values: {
      basics365: false,
      essentials365: '100% of Trip Costs | $1,500 max',
      choice365: '100% of Trip Costs | $3,000 max',
    },
  },
  {
    name: 'Trip Interruption',
    description:
      'Reimburses unused non-refundable trip costs and additional transportation expenses if your trip is interrupted due to a covered event.',
    values: {
      basics365: false,
      essentials365: '100% of Trip Costs | $1,500 max',
      choice365: '100% of Trip Costs | $3,000 max',
    },
  },
  {
    name: 'Trip Delay',
    description:
      'Covers reasonable additional expenses if your trip is delayed 12+ hours due to a covered event.',
    values: {
      basics365: '$600 ($200 per day)',
      essentials365: '$1,000 ($200 per day)',
      choice365: '$1,500 ($200 per day)',
    },
  },
  {
    name: 'Baggage & Personal Effects',
    description:
      'Reimburses loss, theft, or damage to baggage, personal effects, passports, travel documents, and visas during a trip.',
    values: {
      basics365: '$1,000',
      essentials365: '$1,500',
      choice365: '$2,000',
    },
  },
  {
    name: 'Baggage Delay',
    description: 'Covers necessary personal effects purchases if baggage is delayed 12+ hours.',
    values: {
      basics365: '$100',
      essentials365: '$250',
      choice365: '$500 ($250 per day)',
    },
  },
  {
    name: 'Accident & Sickness Medical Expense',
    description:
      'Reimburses reasonable and customary charges for medical expenses if an injury or sickness occurs while traveling.',
    values: {
      basics365: '$10,000',
      essentials365: '$20,000',
      choice365: '$50,000',
    },
  },
  {
    name: 'Emergency Evacuation & Repatriation of Remains',
    description:
      'Covers medically necessary evacuation to the nearest medical facility or transportation home in case of death.',
    values: {
      basics365: '$500,000',
      essentials365: '$500,000',
      choice365: '$500,000',
    },
  },
  {
    name: 'Accidental Death & Dismemberment',
    description:
      'Provides benefits for accidental death or loss of limbs, eyesight, or speech during the trip.',
    values: {
      basics365: '$10,000',
      essentials365: '$10,000',
      choice365: '$25,000',
    },
  },
  {
    name: '24/7 Assistance Services',
    description:
      'Provides access to emergency medical, travel, security, and personal assistance services worldwide.',
    values: {
      basics365: 'Included',
      essentials365: 'Included',
      choice365: 'Included',
    },
  },
];

const ProgramFineprint: string[] = [
  "Coverage is valid only when the full plan cost is paid before the plan's effective date. Trip Cancellation begins at 12:01 a.m. the day after booking, and all other benefits start on the departure date.",
  '&nbsp;&nbsp;&nbsp;* Pre-existing medical conditions within 90 days before purchase are not covered.',
  '&nbsp;&nbsp;&nbsp;* Medical benefits apply only if the trip is at least 100 miles from the Insured’s Primary Residence.',
  '&nbsp;&nbsp;&nbsp;* Coverage applies to multiple trips taken within the policy year, subject to plan terms.',
  '&nbsp;&nbsp;&nbsp;* Coverage ends at 11:59 p.m. on the last day of the policy term or when the last benefit is exhausted.',
  //"   * Travel delay benefits begin after a 12-hour delay.",
  //"   * Baggage & personal effects coverage applies to lost, stolen, or damaged items.",
  //"   * Emergency medical benefits, including accident & sickness coverage, are available during the coverage period.",
  //"   * Emergency evacuation & repatriation benefits are included.",
  'Benefit amounts shown above are maximum limits per policy issued and are aggregate amounts that will diminish in value per paid claim during the Individual Coverage Term for Annual Plans.',
  'Coverage is subject to the policy’s full terms, conditions, and exclusions. Benefits and availability may vary by state. Refer to your policy documents for complete details.',
];

const ProgramTermsSection: TermsSectionType = {
  icon: 'carbon:information',
  text: "Coverage begins at 12:01 a.m. on your plan's effective date after payment. Valid for multiple trips throughout the year, with each trip limited to 60 days maximum. Trips must be at least 100 miles from your primary residence for medical benefits. Pre-existing medical conditions within 90 days prior to coverage are not covered. Maximum trip cost coverage is $3,000 per trip. Plan remains in effect for 364 days (365 in leap years) from the effective date.",
};

export {
  ProgramData,
  ProgramTopBanner,
  ProgramProducts,
  ProgramBenefits,
  ProgramFineprint,
  ProgramTermsSection,
};
