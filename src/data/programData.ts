// ========================================
// ANNUAL GROUP PROGRAM DATA
// ========================================

export const AnnualGroupProgramData = [
    {
        title: "Protect Your Family's Health",
        icon: 'solar:health-outline',
        image: '/images/programs/heart.svg',
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
                text: "Yes! No need to search for in-network providers—simply seek care from any <strong>licensed physician</strong> while traveling <strong>100+ miles from home</strong>, and we'll handle the rest. Whether it's a minor illness or a major emergency, your family has access to quality care.",
            },
            {
                title: 'Does coverage extend after we return home?',
                subtitle: 'Post-Trip Recovery Support for Your Household',
                text: "Yes! If a family member needs additional care after returning home, <strong>Vacation Essential 365 and Vacation Choice 365</strong> include up to <strong>$2,000 in physical therapy benefits for up to 90 days</strong>. Because recovery shouldn't end when your trip does.",
            },
        ],
    },
    {
        title: "Protect Your Family's Belongings",
        icon: 'fluent:luggage-48-regular',
        image: '/images/programs/luggage.svg',
        items: [
            {
                title: 'How much coverage does my family get for lost baggage?',
                subtitle: "Protection for Every Family Member's Personal Belongings",
                text: "Your entire family's luggage and valuables are protected! <strong>Vacation Choice 365 covers up to $2,000 per traveler</strong>, <strong>Vacation Essential 365 offers $1,500 per traveler</strong>, and <strong>Vacation Basics 365 provides $1,000 per traveler</strong> for baggage loss, theft, or damage.",
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
                title: "What's the claims process for baggage protection?",
                subtitle: 'Simple Claims & Fast Reimbursements',
                text: "If your baggage is lost or stolen, <strong>report it immediately</strong>, take necessary precautions to protect your belongings, and submit your claim with receipts. We'll reimburse you based on the <strong>actual cash value or replacement cost—whichever is lower.</strong>",
            },
        ],
    },
    {
        title: "Protect Your Family's Travel Plans",
        icon: 'la:plane',
        image: '/images/programs/plane.svg',
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
                subtitle: "Weather Protection for Your Family's Travel Plans",
                text: "If severe weather causes cancellations or delays <strong>for 24+ hours</strong>, your <strong>family's trip costs are protected</strong>. Plus, if a <strong>named hurricane renders your destination inaccessible</strong>, you'll be reimbursed for non-refundable expenses!",
            },
        ],
    },
];

export const AnnualGroupTopBanner = {
    title: 'Keep Your Entire Household Covered - All Year Long!',
    image: '/images/programs/family.svg'
};

export const AnnualGroupProducts = [
    { name: 'Basics 365', link: '/pricing', color: '#00c9a5' },
    { name: 'Essentials 365', link: '/pricing', color: '#005047' },
    { name: 'Choice 365', link: '/pricing', color: '#0078fc' },
];

export const AnnualGroupBenefits = [
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

export const AnnualGroupFineprint = [
    "Coverage is valid only when the full plan cost is paid before the plan's effective date. Trip Cancellation begins at 12:01 a.m. the day after booking, and all other benefits start on the departure date.",
    '&nbsp;&nbsp;&nbsp;* Pre-existing medical conditions within 90 days before purchase are not covered.',
    "&nbsp;&nbsp;&nbsp;* Medical benefits apply only if the trip is at least 100 miles from the Insured's Primary Residence.",
    '&nbsp;&nbsp;&nbsp;* Coverage applies to multiple trips taken within the policy year, subject to plan terms.',
    '&nbsp;&nbsp;&nbsp;* Coverage ends at 11:59 p.m. on the last day of the policy term or when the last benefit is exhausted.',
    'Benefit amounts shown above are maximum limits per policy issued and are aggregate amounts that will diminish in value per paid claim during the Individual Coverage Term for Annual Plans.',
    "Coverage is subject to the policy's full terms, conditions, and exclusions. Benefits and availability may vary by state. Refer to your policy documents for complete details.",
];

export const AnnualGroupTermsSection = {
    text: "Coverage begins at 12:01 a.m. on your plan's effective date after payment. Valid for multiple trips throughout the year, with each trip limited to 60 days maximum. Trips must be at least 100 miles from your primary residence for medical benefits. Pre-existing medical conditions within 90 days prior to coverage are not covered. Maximum trip cost coverage is $3,000 per trip. Plan remains in effect for 364 days (365 in leap years) from the effective date.",
};

// ========================================
// ANNUAL INDIVIDUAL PROGRAM DATA
// ========================================

export const AnnualIndividualProgramData = [
    {
        title: 'Protect Your Health',
        icon: 'solar:health-outline',
        image: '/images/programs/heart.svg',
        items: [
            {
                title: 'What sets these travel medical insurance plans apart?',
                subtitle: 'Exceptional Emergency Medical Protection While You Travel',
                text: 'Choose the protection that fits your journey! Our Multi-Trip Basics ($10,000), Multi-Trip Essentials ($20,000), and premium Multi-Trip Choice ($50,000) plans provide comprehensive medical coverage, plus $500 for dental care—ensuring peace of mind wherever your travels take you!',
            },
            {
                title: 'What if I need specialized medical care during my trip?',
                subtitle: 'World-Class Emergency Transportation',
                text: "With a $500,000 emergency evacuation benefit, you're covered if local medical care isn't sufficient. We'll arrange transportation to the nearest appropriate facility and provide up to $25,000 for medical escort services if recommended by a physician—your global safety net!",
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
        icon: 'fluent:luggage-48-regular',
        image: '/images/programs/luggage.svg',
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
        icon: 'la:plane',
        image: '/images/programs/plane.svg',
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
                text: "Yes! If Inclement Weather causes cancellations or delays of at least 24 consecutive hours, you're covered. Special coverage is also available if a named hurricane makes your destination inaccessible.",
            },
            {
                title: 'Does my plan cover rental car damage?',
                subtitle: 'Rental Car Collision Protection',
                text: 'Multi-Trip Choice and Multi-Trip Essentials may include optional rental car damage coverage up to $25,000. This covers collision damage, theft, and vandalism, subject to policy terms and exclusions.',
            },
        ],
    },
];

export const AnnualIndividualTopBanner = {
    title: 'Stay Covered on Every Trip—Anywhere, Anytime!',
    image: '/images/programs/elderly.svg'
};

export const AnnualIndividualProducts = [
    { name: 'Multi-Trip Basic', link: '/pricing', color: '#00c9a5' },
    { name: 'Multi-Trip Essentials', link: '/pricing', color: '#005047' },
    { name: 'Multi-Trip Choice', link: '/pricing', color: '#0078fc' },
];

export const AnnualIndividualBenefits = [
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

export const AnnualIndividualFineprint = [
    "Coverage is valid only when the full plan cost is paid before the plan's effective date.",
    'Trip Cancellation begins at 12:01 a.m. the day after booking, and all other benefits start on the departure date.',
    '&nbsp;&nbsp;&nbsp;&#8224; Pre-existing medical conditions within 90 days before purchase are not covered unless the policy has been in effect for at least 90 days or immediately renewed after expiration.',
    "&nbsp;&nbsp;&nbsp;* Medical benefits apply only if the trip is at least 100 miles from the Insured's Primary Residence.",
    '&nbsp;&nbsp;&nbsp;* Coverage applies to multiple trips taken within the policy year, subject to plan terms.',
    '&nbsp;&nbsp;&nbsp;* Coverage ends at 11:59 p.m. on the last day of the policy term or when the last benefit is exhausted.',
    'Benefit amounts shown above are maximum limits per policy issued and are aggregate amounts that will diminish in value per paid claim during the Individual Coverage Term for Annual Plans.',
    "Coverage is subject to the policy's full terms, conditions, and exclusions. Availability and benefits may vary by state. Refer to your policy documents for complete details.",
];

export const AnnualIndividualTermsSection = {
    text: "Coverage begins at 12:01 a.m. on your plan's effective date after payment. Valid for multiple trips throughout the year, with each trip limited to 60 days maximum. Trips must be at least 100 miles from your primary residence for medical benefits. Pre-existing medical conditions within 90 days prior to coverage are not covered. Maximum trip cost coverage is $3,000 per trip. Plan remains in effect for 364 days (365 in leap years) from the effective date.",
};

// ========================================
// SINGLE TRIP PROGRAM DATA
// ========================================

export const SingleTripProgramData = [
    {
        title: 'Protect Your Health',
        icon: 'solar:health-outline',
        image: '/images/programs/heart.svg',
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
        icon: 'fluent:luggage-48-regular',
        image: '/images/programs/luggage.svg',
        items: [
            {
                title: 'What coverage is provided for my baggage and personal items?',
                subtitle: 'Protect Your Belongings',
                text: 'Travel confidently with up to $1,500 coverage for lost, stolen, or damaged baggage and personal effects during your trip! Special coverage of up to $500 is provided for valuable items like jewelry, watches, electronics, cameras, and computers. For items over $150, just keep your original receipts for seamless claims processing.',
            },
            {
                title: 'What if my baggage is delayed by the airline?',
                subtitle: 'Delayed Baggage Relief',
                text: "If your baggage is delayed, you won't be left without essentials! Our policy provides up to $200 to purchase necessary personal items such as toiletries, clothing, and essential medications while waiting for your luggage. Coverage applies if your checked baggage is delayed for more than 12 hours due to a covered trip delay or more than 24 hours by a common carrier. To process your claim, you'll need official delay documentation from the airline and receipts for essential purchases. This benefit is not applicable once you've reached your return destination.",
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
        icon: 'la:plane',
        image: '/images/programs/plane.svg',
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
                text: "Unexpected delays shouldn't ruin your trip! If your flight, cruise, or tour departure is delayed by 3+ hours due to covered reasons like severe weather or carrier disruptions, our policy provides up to $1,000 to help you rejoin your itinerary. This coverage includes additional transportation costs (such as rebooking flights, rental cars, or alternative cruise departures) and reimburses unused prepaid expenses. To file a claim, you must provide official documentation of the delay and receipts for additional transportation costs.",
            },
        ],
    },
];

export const SingleTripTopBanner = {
    title: 'Adventure Assurance, Travel Without Worry',
    image: '/images/programs/paris.svg'
};

export const SingleTripProducts = [
    { name: 'Basics', link: '/pricing', color: '#00c9a5' },
    { name: 'Essentials', link: '/pricing', color: '#005047' },
    { name: 'Choice', link: '/pricing', color: '#0078fc' },
];

export const SingleTripBenefits = [
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

export const SingleTripFineprint = [
    'Coverage is valid only when the full plan cost is paid before departure. Trip Cancellation begins at 12:01 a.m. the day after purchase, and all other benefits start on your departure date.',
    '&nbsp;&nbsp;&nbsp;* Pre-existing medical conditions within 90 days before purchase are not covered.',
    '&nbsp;&nbsp;&nbsp;* Medical benefits apply only if your destination is 100+ miles from your home.',
    '&nbsp;&nbsp;&nbsp;* Coverage ends on your return date or when you return home, whichever comes first.',
    '&nbsp;&nbsp;&nbsp;* One single trip is covered with no trip length limit.',
    "Coverage is subject to the policy's full terms, conditions, and exclusions. Availability and benefits may vary by state. Refer to your policy documents for details.",
];

export const SingleTripTermsSection = {
    text: "Coverage is valid only when the full plan cost is paid before departure. Trip Cancellation begins at 12:01 a.m. the day after purchase, while all other benefits start on the departure date. Pre-existing medical conditions within 90 days before purchase are not covered. Medical benefits apply only if your destination is at least 100 miles from home. Coverage ends on your scheduled return date or when you return home, whichever comes first. The plan covers one single trip with no trip length limit, and the maximum trip cost coverage is $25,000. All coverage is subject to the policy's full terms, conditions, and exclusions, which may vary by state. Refer to your policy documents for complete details.",
};
