export interface PrivacySection {
    id: string; // Unique identifier for linking sections
    title: string;
    content: (string | { type: 'list'; items: string[] })[];
}

export const policyDetails = {
    name: 'Electronic Transactions, Signatures & Payments Consent',
    lastUpdateDate: 'Jan 06, 2025',
    tagline: 'Less Paper, More Adventure!',
    notice:
        'We reserve the right to modify these Terms of Service at any time at our sole discretion. It is your responsibility to review these Terms periodically for updates. Your continued use of our services after changes are posted constitutes your acceptance of the revised Terms.',
};

export const PolicyData: PrivacySection[] = [
    {
        id: 'electronic-consent',
        title: 'Voluntary Consent to Electronic Transactions, Signature, and Payments',
        content: [
            "By using this website and engaging in transactions with us, you ('User' or 'you') consent to conduct business electronically, including but not limited to:",
            {
                type: 'list',
                items: [
                    'Submitting applications for insurance products.',
                    'Receiving and reviewing disclosures, policy documents, and agreements.',
                    'Providing electronic signatures in place of handwritten signatures.',
                    'Authorizing electronic payments.',
                ],
            },
            'Your consent applies to all interactions with us, including present and future transactions related to your insurance policy.',
        ],
    },
    {
        id: 'electronic-signatures',
        title: 'Electronic Signatures and Records',
        content: [
            'You acknowledge that electronic signatures carry the same legal weight as handwritten signatures under the <strong>E-SIGN Act (15 U.S.C. § 7001)</strong> and <strong>Uniform Electronic Transactions Act (UETA)</strong>.',
            {
                type: 'list',
                items: [
                    "Clicking buttons such as 'I Agree,' 'Submit,' or 'Purchase' constitutes a legally binding signature.",
                    'Electronic records of your transactions will be deemed valid and enforceable.',
                ],
            },
        ],
    },
    {
        id: 'electronic-communications',
        title: 'Consent to Receive Electronic Communications',
        content: [
            'Migration, ARRK, and its underwriters are required by law to provide policyholders with certain documents, notices, and payments related to insurance marketing, coverage agreements, and policy administration. By consenting to electronic delivery, you agree to receive the following documents electronically:',
            {
                type: 'list',
                items: [
                    'Policy documents, terms, and endorsements.',
                    'Important policyholder notices and updates.',
                    'Selection/Rejection Forms for coverage options.',
                    'Invoices, billing statements, and payment confirmations.',
                    'Claim acknowledgments and related correspondence.',
                    'Cancellation and Nonrenewal Notices.',
                    'Premium Increase or Conditional Renewal Notices.',
                    'State-required notices, including privacy disclosures and regulatory updates.',
                    'Claim notices, proof of loss documentation, and related materials.',
                ],
            },
            'You are responsible for maintaining a valid email address and regularly checking for updates.',
        ],
    },
    {
        id: 'withdraw-consent',
        title: 'Right to Withdraw Consent',
        content: [
            {
                type: 'list',
                items: [
                    "You may withdraw your consent for electronic transactions at any time by contacting us at <a href='mailto:support@migration.io'>support@migration.io</a>.",
                    'Withdrawal may result in the cancellation of your ability to transact electronically and could delay processing times.',
                    'Certain documents may still be provided electronically where permitted by law.',
                ],
            },
        ],
    },
    {
        id: 'hardware-software',
        title: 'Hardware and Software Requirements',
        content: [
            'To conduct business electronically, you must have:',
            {
                type: 'list',
                items: [
                    'A computer or mobile device with internet access.',
                    'A web browser capable of accessing our website.',
                    'Software to read and save PDF documents (e.g., Adobe Acrobat Reader).',
                    'A valid email account.',
                ],
            },
            'By continuing with your transaction, you confirm that you meet these requirements.',
        ],
    },
    {
        id: 'payment-authorization',
        title: 'Payment Authorization and Acknowledgment',
        content: [
            {
                type: 'list',
                items: [
                    'By providing payment information, you authorize us to process payments electronically.',
                    'Electronic payments are final and non-refundable, except as required by applicable law or policy terms.',
                    'Rejected or failed payments may result in fees, policy cancellation, or other actions.',
                ],
            },
        ],
    },
    {
        id: 'governing-law',
        title: 'Governing Law',
        content: [
            'This agreement is governed by the laws of <strong>[insert applicable state]</strong> and applicable federal regulations, including the <strong>E-SIGN Act and UETA</strong>.',
        ],
    },
    {
        id: 'acknowledgment',
        title: 'Acknowledgment and Acceptance',
        content: [
            {
                type: 'list',
                items: [
                    'You confirm that you have read, understand, and agree to this <strong>Voluntary Consent to Electronic Transactions, Signature, and Payments</strong>.',
                    'You acknowledge that your electronic signature is legally binding.',
                    'You confirm that you have the necessary technology to receive and retain electronic records.',
                ],
            },
        ],
    },
];
