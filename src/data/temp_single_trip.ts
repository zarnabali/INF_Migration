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
import parisImage from '@/assets/images/programs/paris.svg';

const ProgramData: ImageAccordianType[] = [
  {
    title: 'Protect Your Health',
    image: heartImage,
    icon: 'solar:health-outline',
    items: [
      {
        title: 'What medical expenses are covered during my trip?',
        subtitle: 'Medical Coverage That Travels With You',
        text: "When you're more than 100 miles from home, you're protected with up to $25,000 for medically necessary covered expenses! The policy covers physician services, hospital charges, X-rays, ambulance services, and prescription medications, plus up to $500 for emergency dental care during your trip. Initial treatment must be received during your trip to be covered.",
      },
      {
        title: 'What happens if I need emergency medical transport while traveling?',
        subtitle: 'Worldwide Emergency Evacuation When You Need It Most',
        text: "Your safety comes first with our $250,000 emergency evacuation coverage for trips at least 100 miles from home! When ordered by an onsite physician, we'll arrange transportation to the nearest adequate medical facility or to your home for further treatment. Plus, if medically recommended, we'll cover the costs of a qualified medical escort.",
      },
      {
        title: 'Is help available if I need hospital admission abroad?',
        subtitle: 'Assistance When You Need It',
        text: 'Yes - our policy covers advance payment arrangements for hospital admissions when required! All arrangements must be authorized in advance by the company or its representatives, and hospital confinement must be certified as medically necessary by the attending physician.',
      },
      {
        title: 'What protection is provided in case of a serious accident?',
        subtitle: 'Comprehensive Accident Protection',
        text: 'Your safety is our priority—our policy provides up to $25,000 in Accidental Death & Dismemberment (AD&D) benefits for injuries sustained during your trip. This benefit applies if you experience a covered accident resulting in loss of life, limb, eyesight, speech, or hearing within 365 days of the accident. Full benefits apply for total loss, while partial payouts are available for the loss of a single hand, foot, or eye. We also cover unavoidable exposure to extreme conditions and include a disappearance clause if an accident occurs and you are not found within one year.',
      },
    ],
  },
  {
    title: 'Protect Your Stuff',
    image: luggageImage,
    icon: 'fluent:luggage-48-regular',
    items: [
      {
        title: 'What coverage is provided for my baggage and personal items?',
        subtitle: 'Protect Your Belongings',
        text: 'Travel confidently with up to $1,500 coverage for lost, stolen, or damaged baggage and personal effects during your trip! Special coverage of up to $500 is provided for valuable items like jewelry, watches, electronics, cameras, and computers. For items over $150, just keep your original receipts for seamless claims processing.',
      },
      {
        title: 'What if my baggage is delayed by the airline?',
        subtitle: 'Delayed Baggage Relief',
        text: 'If your baggage is delayed, you won’t be left without essentials! Our policy provides up to $200 to purchase necessary personal items such as toiletries, clothing, and essential medications while waiting for your luggage. Coverage applies if your checked baggage is delayed for more than 12 hours due to a covered trip delay or more than 24 hours by a common carrier. To process your claim, you’ll need official delay documentation from the airline and receipts for essential purchases. This benefit is not applicable once you’ve reached your return destination.',
      },
      {
        title: 'Are my important documents like passport and visa covered?',
        subtitle: 'Personal Documents Protection',
        text: "Yes - your travel documents, passports, visas, and credit cards are protected under the baggage coverage! If these essential items are lost, stolen, or damaged during your trip, they're included in your baggage protection. For extra security, we'll even extend coverage if your common carrier delays delivering these items.",
      },
      {
        title: 'How quickly will my baggage claim be processed?',
        subtitle: 'Efficient Claims Processing',
        text: "Our policy commits to prompt claims settlement for your convenience! Claims for damaged items will be paid immediately upon proof of damage, while lost item claims are paid after a reasonable time if items aren't recovered. We'll always pay the actual cash value of your items or the cost of replacement, whichever is less.",
      },
    ],
  },
  {
    title: 'Protect Your Travel',
    image: planeImage,
    icon: 'la:plane',
    items: [
      {
        title: 'What happens if I need to cancel my trip before departure?',
        subtitle: 'Trip Cancellation Protection',
        text: "Your prepaid trip costs are protected up to $25,000 if you need to cancel for covered reasons! Whether it's a serious illness, injury, natural disaster making your home uninhabitable, or even jury duty - we've got you covered. Plus, we'll reimburse your single occupancy fees if your traveling companion has to cancel for a covered reason.",
      },
      {
        title: 'What if I have to cut my trip short?',
        subtitle: 'Trip Interruption Safeguard',
        text: 'We understand plans can change, which is why we provide up to 150% of your trip cost (maximum $37,500) for trip interruption! This extra coverage helps with both the unused portion of your prepaid expenses AND the additional transportation costs to return home or rejoin your trip. Coverage applies to the same events as trip cancellation, including family emergencies or natural disasters.',
      },
      {
        title: 'What assistance do I get if my trip is delayed?',
        subtitle: 'Travel Delay Protection',
        text: "Don't stress about unexpected delays - we provide up to $200 per day (maximum $1,000) for reasonable additional expenses! Coverage kicks in after a 12-hour delay due to covered reasons like carrier delays, lost passports, natural disasters, or traffic accidents. This benefit can be used for essential needs like meals, accommodations, and phone calls.",
      },
      {
        title: 'What if a delay causes me to miss my cruise or tour departure?',
        subtitle: 'Missed Connection Coverage',
        text: 'Unexpected delays shouldn’t ruin your trip! If your flight, cruise, or tour departure is delayed by 3+ hours due to covered reasons like severe weather or carrier disruptions, our policy provides up to $1,000 to help you rejoin your itinerary. This coverage includes additional transportation costs (such as rebooking flights, rental cars, or alternative cruise departures) and reimburses unused prepaid expenses. To file a claim, you must provide official documentation of the delay and receipts for additional transportation costs.',
      },
    ],
  },
];

const ProgramTopBanner: TopBannerType = {
  title: 'Adventure Assurance, Travel Without Worry',
  image: parisImage,
};

const ProgramProducts: Product[] = [
  { name: 'Basics', color: '#00c9a5', link: '/pricing' },
  { name: 'Essentials', color: '#005047', link: '/pricing' },
  { name: 'Choice', color: '#0078fc', link: '/pricing' },
];

const ProgramBenefits: Benefit[] = [
  {
    name: 'Trip Cancellation',
    description:
      'Reimburses prepaid, non-refundable trip costs if you cancel for a covered reason.',
    values: {
      basics: '100% Trip Cost | $25,000 max',
      essentials: '100% Trip Cost | $25,000 max',
      choice: '100% Trip Cost | $25,000 max',
    },
  },
  {
    name: 'Trip Interruption',
    description:
      'Covers unused travel expenses and additional costs if your trip is interrupted due to a covered event.',
    values: {
      basics: '100% Trip Cost | $25,000 max',
      essentials: '150% Trip Cost | $37,500 max',
      choice: '150% Trip Cost | $37,500 max',
    },
  },
  {
    name: 'Trip Delay',
    description:
      'Covers meals, accommodations, and other expenses if your trip is delayed for a covered reason.',
    values: {
      basics: '$100 per day | $500 max',
      essentials: '$200 per day | $1,000 max',
      choice: '$200 per day | $1,000 max',
    },
  },
  {
    name: 'Missed Connection',
    description:
      'Provides reimbursement for additional transportation costs and unused expenses if you miss a flight, cruise, or tour due to a covered delay.',
    values: {
      basics: '$500',
      essentials: '$1,000',
      choice: '$1,000',
    },
  },
  {
    name: 'Baggage & Personal Effects',
    description:
      'Reimburses for lost, stolen, or damaged baggage and personal items during your trip.',
    values: {
      basics: '$750 | $50 deductible',
      essentials: '$1,500',
      choice: '$1,500',
    },
  },
  {
    name: 'Baggage Delay',
    description:
      'Covers essential purchases if your checked baggage is delayed for more than 12 hours.',
    values: {
      basics: '$100',
      essentials: '$200',
      choice: '$200',
    },
  },
  {
    name: 'Accidental Sickness & Medical Expense',
    description: 'Covers emergency medical expenses if you become sick or injured while traveling.',
    values: {
      basics: '$15,000',
      essentials: '$25,000',
      choice: '$25,000',
    },
  },
  {
    name: 'Emergency Dental Treatment',
    description: 'Provides coverage for emergency dental care while traveling.',
    values: {
      basics: '$500',
      essentials: '$500',
      choice: '$500',
    },
  },
  {
    name: 'Emergency Evacuation & Repatriation of Remains',
    description:
      'Covers transportation to the nearest adequate medical facility or repatriation of remains in case of death.',
    values: {
      basics: '$100,000',
      essentials: '$250,000',
      choice: '$250,000',
    },
  },
  {
    name: 'Accidental Death & Dismemberment',
    description:
      'Provides benefits for accidental death or the loss of limbs, eyesight, or speech due to a covered accident.',
    values: {
      basics: '$10,000',
      essentials: '$25,000',
      choice: '$25,000',
    },
  },
  {
    name: '',
    description: '',
    values: {
      basics: 'starting at 7.5% of covered amount',
      essentials: 'starting at 8.5% of covered amount',
      choice: 'starting at 10.5% of covered amount',
    },
  },
];

const ProgramFineprint: string[] = [
  'Coverage is valid only when the full plan cost is paid before departure. Trip Cancellation begins at 12:01 a.m. the day after purchase, and all other benefits start on your departure date.',
  '&nbsp;&nbsp;&nbsp;* Pre-existing medical conditions within 90 days before purchase are not covered.',
  '&nbsp;&nbsp;&nbsp;* Medical benefits apply only if your destination is 100+ miles from your home.',
  '&nbsp;&nbsp;&nbsp;* Coverage ends on your return date or when you return home, whichever comes first.',
  '&nbsp;&nbsp;&nbsp;* One single trip is covered with no trip length limit.',
  //"&nbsp;&nbsp;&nbsp;* Maximum trip cost coverage: $25,000.",
  'Coverage is subject to the policy’s full terms, conditions, and exclusions. Availability and benefits may vary by state. Refer to your policy documents for details.',
];

const ProgramTermsSection: TermsSectionType = {
  icon: 'carbon:information',
  text: 'Coverage is valid only when the full plan cost is paid before departure. Trip Cancellation begins at 12:01 a.m. the day after purchase, while all other benefits start on the departure date. Pre-existing medical conditions within 90 days before purchase are not covered. Medical benefits apply only if your destination is at least 100 miles from home. Coverage ends on your scheduled return date or when you return home, whichever comes first. The plan covers one single trip with no trip length limit, and the maximum trip cost coverage is $25,000. All coverage is subject to the policy’s full terms, conditions, and exclusions, which may vary by state. Refer to your policy documents for complete details.',
};

export {
  ProgramData,
  ProgramTopBanner,
  ProgramProducts,
  ProgramBenefits,
  ProgramFineprint,
  ProgramTermsSection,
};
