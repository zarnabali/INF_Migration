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
import olderCouple from '@/assets/images/programs/elderly.svg';

const ProgramData: ImageAccordianType[] = [
  {
    title: 'Protect Your Health',
    image: heartImage,
    icon: 'solar:health-outline',
    items: [
      {
        title: 'What sets these travel medical insurance plans apart?',
        subtitle: 'Exceptional Emergency Medical Protection While You Travel',
        text: 'Choose the protection that fits your journey! Our Multi-Trip Basics ($10,000), Multi-Trip Essentials ($20,000), and premium Multi-Trip Choice ($50,000) plans provide comprehensive medical coverage, plus $500 for dental care—ensuring peace of mind wherever your travels take you!',
      },
      {
        title: 'What if I need specialized medical care during my trip?',
        subtitle: 'World-Class Emergency Transportation',
        text: 'With a $500,000 emergency evacuation benefit, you’re covered if local medical care isn’t sufficient. We’ll arrange transportation to the nearest appropriate facility and provide up to $25,000 for medical escort services if recommended by a physician—your global safety net!',
      },
      {
        title: 'What if I need emergency evacuation due to security concerns?',
        subtitle: 'Security Evacuation & Assistance',
        text: 'Multi-Trip Choice and Multi-Trip Essentials provide coverage for emergency security evacuations due to political unrest, natural disasters, or other covered events. Coverage limits and availability vary by plan and state.',
      },
      {
        title: 'How easy is it to get care when traveling?',
        subtitle: 'Seamless Care When You Need It Most',
        text: "We've made getting care stress-free! Just seek treatment from any qualified physician during your trip, and if you're at least 100 miles from home, we'll take care of the rest. No need to worry about finding in-network providers - we focus on getting you the care you need, when you need it.",
      },
      {
        title: 'Does the coverage extend after my trip?',
        subtitle: 'Recovery Support That Goes the Extra Mile',
        text: "With our Multi-Trip Choice and Multi-Trip Essentials plans, your recovery doesn't stop when your journey ends! Enjoy up to $2,000 in physical therapy benefits for up to 90 days after returning home. Because we understand that getting back to full health is part of your travel story.",
      },
    ],
  },
  {
    title: 'Protect Your Stuff',
    image: luggageImage,
    icon: 'fluent:luggage-48-regular',
    items: [
      {
        title: 'How much coverage do the plans offer for baggage and personal effects?',
        subtitle: 'Protection for Your Personal Belongings',
        text: 'Your belongings are well-protected! Multi-Trip Choice leads with $2,000 coverage, Multi-Trip Essentials offers $1,500, and Multi-Trip Basics provides $1,000 for your baggage and personal effects during your journey.',
      },
      {
        title: 'What compensation is available for delayed baggage?',
        subtitle: 'Quick Relief for Delayed Baggage',
        text: "Don't let delayed baggage disrupt your trip! After just 12 hours of delay, Multi-Trip Choice provides up to $250 per day (max $500), Multi-Trip Essentials offers up to $250 total, and Multi-Trip Basics covers up to $100 for essential purchases.",
      },
      {
        title: 'How does the plan protect my expensive items?',
        subtitle: 'Special Coverage for Electronics and Valuables',
        text: 'All plans include $500 total coverage for valuables like electronics, cameras, and jewelry—covering up to $500 for the first item and $250 for each additional item. Be sure to keep receipts for items over $150!',
      },
      {
        title: 'How do I file a claim for lost or damaged baggage?',
        subtitle: 'Fast and Fair Claims Process',
        text: 'Filing a claim is simple! Report any theft immediately, take reasonable steps to protect your belongings, and receive reimbursement based on either the actual cash value or replacement cost—whichever is lower.',
      },
    ],
  },
  {
    title: 'Protect Your Travel',
    image: planeImage,
    icon: 'la:plane',
    items: [
      {
        title: 'What coverage is available for trip cancellations?',
        subtitle: 'Trip Protection That Gives You Peace of Mind',
        text: 'Protect your travel investment! Multi-Trip Choice covers up to $4,000, Multi-Trip Essentials up to $2,500, while Multi-Trip Basics provides trip delay benefits instead of trip cancellation coverage.',
      },
      {
        title: 'What compensation is available for trip delays?',
        subtitle: 'Generous Travel Delay Coverage',
        text: 'Stay comfortable during unexpected delays! All plans offer daily delay benefits after 12 hours: Multi-Trip Choice provides up to $150/day (max $1,500), Multi-Trip Essentials up to $150/day (max $1,000), and Multi-Trip Basics up to $150/day (max $500) for reasonable additional expenses.',
      },
      {
        title: 'What if I miss a flight or cruise connection?',
        subtitle: 'Missed Connection Protection',
        text: 'If your trip is delayed due to covered reasons, Multi-Trip Essentials covers up to $500, while Multi-Trip Choice provides up to $1,000 to help you catch up with your itinerary.',
      },
      {
        title: 'What coverage is available for trip interruptions?',
        subtitle: 'Trip Interruption Protection',
        text: 'Both Multi-Trip Choice and Multi-Trip Essentials reimburse up to 100% of your interrupted trip cost (Choice up to $4,000, Essentials up to $2,500). This includes unused prepaid expenses and transportation costs to return home or rejoin your trip!',
      },
      {
        title: 'What coverage is available for weather-related cancellations?',
        subtitle: 'Weather-Related Coverage',
        text: 'Yes! If Inclement Weather causes cancellations or delays of at least 24 consecutive hours, you’re covered. Special coverage is also available if a named hurricane makes your destination inaccessible.',
      },
      {
        title: 'Does my plan cover rental car damage?',
        subtitle: 'Rental Car Collision Protection',
        text: 'Multi-Trip Choice and Multi-Trip Essentials may include optional rental car damage coverage up to $25,000. This covers collision damage, theft, and vandalism, subject to policy terms and exclusions.',
      },
    ],
  },
];

const ProgramTopBanner: TopBannerType = {
  title: 'Stay Covered on Every Trip—Anywhere, Anytime!',
  image: olderCouple,
};

const ProgramProducts: Product[] = [
  { name: 'Multi-Trip Basic', color: '#00c9a5', link: '/pricing' },
  { name: 'Multi-Trip Essentials', color: '#005047', link: '/pricing' },
  { name: 'Multi-Trip Choice', color: '#0078fc', link: '/pricing' },
];

const ProgramBenefits: Benefit[] = [
  {
    name: 'Trip Cancellation',
    description:
      'Reimburses forfeited pre-paid trip costs up to the maximum limit shown in the schedule of benefits for trips that are cancelled due to a covered unforeseen event prior to the scheduled departure date.',
    values: {
      'multi-tripbasic': false,
      'multi-tripessentials': '100% Trip Costs | $2500 max',
      'multi-tripchoice': '100% Trip Costs | $4000 max',
    },
  },
  {
    name: 'Trip Interruption',
    description:
      'Reimburses the unused portion of non-refundable pre-paid trip costs and any additional covered transportation expenses incurred up to the maximum limit shown in the schedule of benefits.',
    values: {
      'multi-tripbasic': '$750 (Return Air Only)',
      'multi-tripessentials': '100% Trip Costs | $2500 max',
      'multi-tripchoice': '100% Trip Costs | $2500 max',
    },
  },
  {
    name: 'Trip Delay',
    description:
      'Reimburses for reasonable additional expenses incurred until travel becomes possible to the originally scheduled destination if your trip is delayed 12 or more consecutive hours because of a covered unforeseen event.',
    values: {
      'multi-tripbasic': '$500 | $150 per day',
      'multi-tripessentials': '$1,000 | $150 per day',
      'multi-tripchoice': '$1500 | $150 per day)',
    },
  },
  {
    name: 'Missed Connection',
    description:
      'Reimburses for unused, non-refundable, pre-paid trip payments or additional transportation expenses incurred if you miss a trip departure because of a delay or cancellation of 3 or more consecutive hours due to inclement weather or a common carrier caused delay.',
    values: {
      'multi-tripbasic': false,
      'multi-tripessentials': '$250',
      'multi-tripchoice': '$500',
    },
  },
  {
    name: 'Baggage & Personal Effects',
    description:
      'Reimburses for loss, theft, or damage to your baggage, personal effects, passports, credit cards, travel documents, and visas during a trip.',
    values: {
      'multi-tripbasic': '$1,000',
      'multi-tripessentials': '$1,500',
      'multi-tripchoice': '$2,000',
    },
  },
  {
    name: 'Baggage Delay',
    description:
      'Reimburses for the purchase of necessary personal effects if your baggage is delayed or misdirected by the common carrier for more than 12 hours.',
    values: {
      'multi-tripbasic': '$300 | $150 per day',
      'multi-tripessentials': '$500 | $250 per day',
      'multi-tripchoice': '$1000 | $250 per day)',
    },
  },
  {
    name: 'Accidental & Sickness Medical Expense *',
    description:
      'Pays a benefit for reasonable and customary charges if you suffer an injury or sickness requiring you to be treated by a physician while on a trip and will reimburse for medically necessary covered expenses incurred to treat an injury or sickness during the course of the trip provided the initial documented treatment was received from a physician during the trip. The injury or sickness must first begin while on an overnight trip with a destination of at least 100 miles from your primary residence.',
    values: {
      'multi-tripbasic': '$15,000',
      'multi-tripessentials': '$25,000',
      'multi-tripchoice': '$50,000',
    },
  },
  {
    name: 'Emergency Evacuation & Repatriation of Remains',
    description:
      'Covers the evacuation and transportation to the nearest adequate licensed medical facility, if ordered by the onsite physician. In the case of death, covers expenses for returning home. Trip must be overnight and destination must be at least 100 miles from your primary residence.',
    values: {
      'multi-tripbasic': '$150,000',
      'multi-tripessentials': '$250,000',
      'multi-tripchoice': '$500,000',
    },
  },
  {
    name: 'Accidental Death & Dismemberment',
    description: 'Provides coverage for loss of life or limb due to an accident during the trip.',
    values: {
      'multi-tripbasic': false,
      'multi-tripessentials': '$25,000',
      'multi-tripchoice': '$50,000',
    },
  },
  {
    name: 'Security Evacuation',
    description: 'Provides coverage for loss of life or limb due to an accident during the trip.',
    values: {
      'multi-tripbasic': false,
      'multi-tripessentials': '$25,000',
      'multi-tripchoice': '$50,000',
    },
  },
  {
    name: 'Car Rental Collision Coverage',
    description: '',
    values: {
      'multi-tripbasic': false,
      'multi-tripessentials': '$25,000',
      'multi-tripchoice': '$50,000',
    },
  },
  {
    name: 'Assistance Service',
    description: '',
    values: {
      'multi-tripbasic': 'Included',
      'multi-tripessentials': 'Included',
      'multi-tripchoice': 'Included',
    },
  },
  {
    name: 'Pre-Existing Medical Condition Exclusion Waiver&#8224;',
    description: '',
    values: {
      'multi-tripbasic': 'Included',
      'multi-tripessentials': 'Included',
      'multi-tripchoice': 'Included',
    },
  },
];

const ProgramFineprint: string[] = [
  "Coverage is valid only when the full plan cost is paid before the plan's effective date.",
  'Trip Cancellation begins at 12:01 a.m. the day after booking, and all other benefits start on the departure date.',
  '&nbsp;&nbsp;&nbsp;&#8224; Pre-existing medical conditions within 90 days before purchase are not covered unless the policy has been in effect for at least 90 days or immediately renewed after expiration.',
  '&nbsp;&nbsp;&nbsp;* Medical benefits apply only if the trip is at least 100 miles from the Insured’s Primary Residence.',
  '&nbsp;&nbsp;&nbsp;* Coverage applies to multiple trips taken within the policy year, subject to plan terms.',
  //"&nbsp;&nbsp;&nbsp;* Each trip covered under the plan must not exceed 60 days in length.",
  '&nbsp;&nbsp;&nbsp;* Coverage ends at 11:59 p.m. on the last day of the policy term or when the last benefit is exhausted.',
  'Benefit amounts shown above are maximum limits per policy issued and are aggregate amounts that will diminish in value per paid claim during the Individual Coverage Term for Annual Plans.',
  'Coverage is subject to the policy’s full terms, conditions, and exclusions. Availability and benefits may vary by state. Refer to your policy documents for complete details.',
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
