export interface PrivacySection {
    id: string; // Unique identifier for linking sections
    title: string;
    lastUpdated?: string; // Optional last updated date for sections
    content: (string | { type: 'list'; items: (string | { type: 'sub-list'; items: string[] })[] })[];
}

export const policyDetails = {
    name: 'Privacy Policy',
    lastUpdateDate: 'Jan 11, 2025',
    tagline: 'Because your privacy should travel safely too!',
    notice:
        'This Privacy Policy can be updated from time to time and, therefore, we ask you to check back periodically for the latest version of this Privacy Policy. If we implement material changes in the way we use your information, in a manner that is different from that stated at the time of collection, we will notify you by posting a notice on our Website or by other means and take any additional steps as required by applicable law.',
};

export const PolicyData: PrivacySection[] = [
    {
        id: 'scope',
        title: 'Scope',
        content: [
            "This Privacy Policy (“Policy”) describes how Migration, and our brands, affiliates, and subsidiaries (“Migration,” “we,” “us” and “our”) collect, use, and disclose your information, including Personal Information, in connection with our website https://migration.io/ (the 'Website'), download our mobile applications, or use any of our products or services that link to or otherwise reference this Policy.",
            'This policy does not apply to any non-Migration websites, services, or mobile applications that you may access via the Services. Those websites and services are governed by the privacy policies that appear on those sites and applications.',
            {
                type: 'list',
                items: [
                    'Your use of the Services is subject to this Policy and the Migration Terms of Use, including applicable terms of limitations on liability and the resolution of disputes.',
                    'By using our Services, you agree to the collection and use of your information in accordance with this Privacy Policy. If you do not agree, please do not use our Services.',
                ],
            },
        ],
    },
    // Scope section
    {
        id: 'sources',
        title: 'Personal Information We Collect',
        lastUpdated: 'January 11, 2025',
        content: [
            'We collect information that identifies, describes, or is reasonably capable of being associated with you (<strong>Personal Information</strong>).',
            'Personal Information does not include publicly available information, such as information lawfully made available from government records, information we have a reasonable basis to believe is lawfully made available to the general public by you or by widely distributed media, or by a person to whom you have disclosed the information and not restricted it to a specific audience, or deidentified or aggregated information.',
            'As described below, we collect Personal Information directly from you, automatically through your use of the Sites and Services, and from third-party sources. To the extent permitted by applicable law, we may combine the information we collect from publicly available or third-party sources. The Personal Information we collect varies based on your relationship with us.',
            {
                type: 'list',
                items: [
                    'Personal Information We Collect Directly From You',
                    'Personal Information We Collect Automatically',
                    'Personal Information We Collect from Other Sources',
                ],
            },
            '<h3>Personal Information We Collect Directly From You</h3>',
            'In order to access certain Services, we may collect Personal Information directly from you, including throughout the quoting, application, or claims handling processes. The Personal Information you provide directly to us may include:',
            {
                type: 'list',
                items: [
                    '<strong>Identifiers and Contact Information</strong> – We may collect personal identifiers and contact information such as your name, address, email address, phone number.',
                    '<strong>Government-Issued Identifiers</strong> – We also may collect information such as your driver’s license number, social security number, or other government-issued identifiers.',
                    '<strong>Account Details</strong> – If you register an account with us, we collect information such as your email, phone number, or user ID, and password used to log in to your account.',
                    '<strong>Policy or Claims Information</strong> – This includes policy information, claim information, including materials you submit as part of your claim, information provided for roadside assistance services, or other information you choose to provide us.',
                    '<strong>Payment Information</strong> – If you pay a bill, we may collect information necessary to process your payment such as bank account information, billing address, and any other related information.',
                    '<strong>Commercial Information</strong> – We may also collect information about the products, services, or coverage you purchase.',
                    '<strong>Message Contents</strong> – We may collect your messages, email contents, or any other information you so choose to provide when interacting with our customer service or agents.',
                    '<strong>Audio or Similar Information</strong> – If you speak with our customer service team by phone, we may collect a recording for quality assurance and training purposes.',
                    '<strong>Preferences</strong> – We may also collect information about the types of Services you use, your communications preferences, wish lists, and other preferences you may select in your account or profile.',
                    '<strong>Other Information</strong> – We also collect information when you complete online forms, surveys, or leave us product reviews. We also collect any other information you so choose to provide.',
                ],
            },
            '<h3>Personal Information We Collect Automatically</h3>',
            "As described below in the 'Cookies and Other Tracking Mechanisms' section, when you visit our Sites or use our Services, we may automatically collect certain Personal Information, including:",
            {
                type: 'list',
                items: [
                    '<strong>Device Identifiers</strong> – We automatically collect IP address, unique device ID, device type, browser type, location information, and information about your browser and browser language.',
                    '<strong>Network Activity</strong> – We may also collect information related to how you interact with the Services and advertisements, such as page views, links and items clicked, and other activity information, referring URL, browsing history, and other similar information. We may use analytics providers and technologies, including cookies, session replay, and similar tools, to collect this information.',
                    '<strong>Geolocation</strong> – We may also collect geolocation information, such as physical location or movements. Additionally, depending on your device settings, if you visit our Sites or use our mobile applications, we may collect geolocation information from your IP address which links to the region you live in.',
                ],
            },
            '<h3>Personal Information We Collect from Other Sources</h3>',
            'We may collect information about you through our affiliates, business partners, and vendors, including from administrators, adjusters, agents, brokers, or other representatives who provide services or products on our behalf. For example, we may collect information about your policies, including coverage or claim information, through these sources. We may also receive information from consumer reporting agencies, including motor vehicle reports or information about your credit or creditworthiness, and from other, publicly available sources.',
        ],
    },
    // Use section
    {
        id: 'use',
        title: 'How We Use Personal Information',
        content: [
            'We may use the Personal Information we collect for the following purposes:',
            {
                type: 'list',
                items: [
                    '<strong>Operate Our Business</strong> – We use the Personal Information we collect to allow you to maintain your account and otherwise run our day-to-day operations.',
                    '<strong>Provide You Products and Services</strong> – We use the Personal Information we collect to provide you with, renew or modify products and services. We also use this information to maintain your coverage and memberships, including to set up a product or service, service your policy, change your policy, handle a claim, or complete a transaction.',
                    '<strong>Communicate With You</strong> – We use the Personal Information we collect to communicate with you about your use of our Sites and Services, to respond to your inquiries, to provide you with the information and documents you request, and for other customer service purposes.',
                    '<strong>Evaluate and Improve Our Products and Services</strong> – We use the Personal Information we collect to evaluate, analyze, improve, and develop our products and Services, including this Site. We also use this information to tailor the content and information that we may send or display to you, to offer location customization and personalized help and instructions, and to otherwise personalize your experiences while using our Services.',
                    '<strong>Analytics Models to Support Our Business</strong> – We use the Personal Information we collect in analytics models, including actuarial, underwriting, claims, and loss control models, to facilitate and service our business (e.g., to create new products and features). We may also use this information to conduct actuarial or research studies to maintain and develop our products and Services, and to create new offerings or features. We also use this information to administer surveys and questionnaires, such as for market research or member satisfaction purposes.',
                    '<strong>Marketing and Advertising</strong> – We may use your Personal Information for marketing and promotional purposes, including to send you promotional communications about products, services, features, and options we believe may interest you. We may send communications via e-mail, regular mail or may send push notifications via a mobile device. We may also use your information to serve you advertisements or customized content online.',
                    '<strong>Inferences</strong> – We may use the information we collect to better understand how you access and use our Sites and the products and Services available on our Sites, both on an aggregated and individualized basis.',
                    '<strong>Find Locations on Request</strong> – At your request, we may use your information to obtain your location from the mobile device or the network using your device’s Global Positioning System (GPS) functionality, or directly from you. We may use your location information to help you search for information, including searching for an agent, searching for a service provider, identifying the location of an accident or identifying the location of a roadside event you are reporting. If you do not want location information used, you can disable the GPS functionality on your mobile device.',
                    '<strong>Fraud and Security Purposes</strong> – We may use the Personal Information we collect to mitigate fraud and protect Chubb and others. We also use this information to prevent and detect fraudulent, malicious, deceptive, infringements of our policies and contracts and other potential misuse of or illegal activity relating to our products, assets, and Services.',
                    '<strong>Legal Requirements</strong> – We use the Personal Information we collect to investigate, enforce, and apply this Policy and our Terms of Use, and to otherwise protect our own rights and interests, such as to resolve any disputes or to respond to requests from law enforcement, court orders, regulators, or other legal processes.',
                    '<strong>Business Transfers</strong> – We may also use the Personal Information we collect and receive to consider and implement mergers, acquisitions, reorganizations, refinancing, and other business transactions, and for the administration of our general business, accounting, recordkeeping, and other legal functions.',
                    '<strong>Other Operational and Business Purposes</strong> – We may use your Personal Information for other operational purposes, including to refer you to our third-party partners as part of a referral program, to comply with contracts related to products or services that we provide to you.',
                ],
            },
            '&nbsp;',
            'We also may use automated processes and combine or aggregate any of the information we collect through the Services or elsewhere for any of these purposes or for analyzing usage statistics and trends.',
        ],
    },
    // Share Section
    {
        id: 'sharing',
        title: 'How We Share Your Information',
        content: [
            'We may share your Personal Information with trusted partners, government agencies for compliance, affiliated companies, and third-party service providers.',
            {
                type: 'list',
                items: [
                    '<strong>Sharing with Migration and Legal Partners</strong> – We may share your personal information with trusted partners and third parties involved in the migration process. For example, when you request visa assistance or legal consultation through our platform, we may provide your details to migration lawyers, government agencies, or service providers to facilitate your application. This includes, but is not limited to, immigration consultants, legal representatives, background verification services, and translation providers.',
                    '<strong>Government Agencies and Compliance Authorities</strong> – To ensure compliance with migration laws and regulations, we may disclose your information to immigration authorities, embassies, consulates, border control agencies, and other regulatory bodies. This may be necessary to verify your identity, background, or legal status.',
                    '<strong>Sharing with Affiliated Companies</strong> – We may share your information with our affiliated companies and partners who help us provide migration-related services, such as document processing, employment verification, and relocation assistance.',
                    '<strong>Third-Party Service Providers</strong> – We work with third-party service providers who assist in processing your information for migration-related purposes, including:',
                    {
                        type: 'sub-list',
                        items: [
                            'Cloud service providers for secure document storage.',
                            'Legal and compliance experts for visa and residency applications.',
                            'Background check and identity verification platforms.',
                            'Translation and notarization service providers.',
                            'Financial institutions for payment processing.',
                            'Government agencies for eligibility verification.',
                            'Customer support and communication platforms.',
                            'Data analytics and tracking tools for service improvement.',
                        ],
                    },
                    '<strong>Legal and Compliance Obligations</strong> – If required by law or in response to legal proceedings, we may share your information with courts, regulatory authorities, law enforcement agencies, or other relevant bodies. This may include situations where we need to comply with immigration regulations, fraud investigations, or security audits.',
                    '<strong>Business Transfers and Mergers</strong> – If our business undergoes a merger, acquisition, restructuring, or sale, your information may be transferred to the new entity as part of the business transition. In such cases, we will ensure your data remains protected under the same privacy standards.',
                    '<strong>Your Consent</strong> – We will only share your personal data beyond the above scenarios with your explicit consent. If you opt-in to additional services, we may provide your details to third parties based on your requests.',
                ],
            },
        ],
    },
    // Right Section
    {
        id: 'rights',
        title: 'Your Privacy Rights',
        content: [
            '<strong>Your Rights Regarding Personal Information</strong> – Depending on applicable laws and your country of residence, you may have the following rights regarding your personal data:',
            {
                type: 'list',
                items: [
                    '<strong>Access:</strong> You have the right to request access to the personal information we hold about you and receive details on how it is processed.',
                    '<strong>Correction:</strong> If any of your personal information is incorrect or incomplete, you have the right to request corrections.',
                    '<strong>Deletion:</strong> In certain cases, you may request the removal of your personal information, subject to legal or regulatory requirements.',
                    '<strong>Processing Restriction:</strong> You may request that we limit the processing of your personal data in specific circumstances.',
                    '<strong>Data Portability:</strong> Where applicable, you may have the right to request a copy of your personal data in a structured, machine-readable format.',
                    '<strong>Objection to Processing:</strong> If you believe your data is being used improperly, you can object to its processing.',
                ],
            },
            "<strong>How to Exercise Your Rights</strong> – To make a request related to your privacy rights, please contact us at <a href='mailto:privacy@migration.io'>privacy@migration.io</a>.",
            {
                type: 'list',
                items: [
                    'Requests will be handled as promptly as possible within legal timeframes.',
                    'We may refuse requests that are excessive, repetitive, or unfounded.',
                    'If your request affects the rights of others (e.g., confidentiality obligations), we will balance your rights with applicable legal considerations.',
                    'In certain cases, we may be legally required to retain some personal data despite your request for deletion.',
                ],
            },
            '<strong>Marketing Communications – Opt-Out</strong> – If you no longer wish to receive marketing emails from us, you can:',
            {
                type: 'list',
                items: [
                    "Click the 'Unsubscribe' link at the bottom of any marketing email.",
                    "Send an email with the subject 'UNSUBSCRIBE' to <a href='mailto:unsubscribe@migration.io'>unsubscribe@migration.io</a>.",
                    'Please note that you may still receive transactional or service-related communications necessary for ongoing migration services.',
                ],
            },
        ],
    },
    // Third Party
    {
        id: 'third-party',
        title: 'Interaction with Third-Party Services',
        content: [
            "As part of our travel insurance services, we may provide links to or integrate with third-party websites, tools, or services, such as travel booking platforms, airline websites, payment processors, or assistance providers (each, a '<strong>Third-Party Service</strong>').",
            'These Third-Party Services operate independently and have their own privacy policies and data handling practices. We do not control, endorse, or take responsibility for their privacy policies, security measures, or how they process your information.',
            'Some Third-Party Services may collect personal information from you directly or request us to share specific details required for their services, such as claims processing, travel assistance, or policy verification. We encourage you to review their privacy policies and terms before engaging with them or sharing your information.',
        ],
    },
    // Cookies
    {
        id: 'cookies',
        title: 'Analytics Tools & Cookies',
        content: [
            'We use cookies and analytics tools to enhance your experience on our website and services. These tools help us understand website usage, improve functionality, and tailor content to user preferences.',
            'You can control how cookies and tracking technologies are used on your device. If you prefer, you may disable or delete cookies via your browser settings. However, doing so may impact the functionality of certain features on our website.',
            {
                type: 'list',
                items: [
                    "<strong>Google Analytics</strong>: This tool helps us track website visits, user behavior, and engagement trends. You can learn more or opt-out by visiting <a href='https://tools.google.com/dlpage/gaoptout/'>Google Analytics Opt-Out</a>.",
                    "<strong>Meta (Facebook) Pixel</strong>: We use this tool to measure ad performance and provide relevant promotions. You can manage your ad preferences at <a href='https://www.facebook.com/ads/settings'>Facebook Ad Settings</a>.",
                    "<strong>Hotjar</strong>: Hotjar helps us understand user experience by analyzing how visitors navigate our website. You can learn more at <a href='https://help.hotjar.com/hc/en-us/articles/115011789248-Hotjar-Cookies'>Hotjar Cookie Policy</a>.",
                ],
            },
            "In some cases, we allow advertising partners to use cookies and tracking technologies to show personalized ads based on your interests. This is commonly known as '<strong>interest-based advertising</strong>.'",
            'We may add or remove analytics tools and cookies as needed to improve our website and services.',
        ],
    },
    // California
    {
        id: 'california',
        title: 'California Privacy Rights',
        content: [
            'California residents have certain privacy rights under state law. If you are a resident of California, you may request details about how we collect, use, and share your personal information.',
            "<strong>Do Not Track (DNT) Notice:</strong> Some web browsers offer a 'Do Not Track' (DNT) setting that allows users to signal their privacy preferences. Currently, we do not respond to DNT signals, but we may work with third-party analytics providers that track online activity across different websites.",
            "For more details about your privacy rights or to make a request, please contact us at <a href='mailto:privacy@migration.io'>privacy@migration.io</a>.",
        ],
    },
    // Contact
    {
        id: 'contact',
        title: 'Contact Us',
        content: [
            'If you have any questions about our privacy practices, how we handle your data, or if you would like to exercise your privacy rights, please feel free to reach out to us. We’re happy to assist you.',
            "Email us at: <a href='mailto:privacy@migration.io'>privacy@migration.io</a>",
        ],
    },
];
