export interface PrivacySection {
    id: string; // Unique identifier for linking sections
    title: string;
    content: (string | { type: 'list'; items: (string | { type: 'sub-list'; items: string[] })[] })[];
}

export const policyDetails = {
    name: 'Terms Of Service',
    lastUpdateDate: 'Jan 06, 2025',
    tagline: 'Because smooth travels start with clear terms!',
    notice:
        'We reserve the right to modify these Terms of Service at any time at our sole discretion. It is your responsibility to review these Terms periodically for updates. Your continued use of our services after changes are posted constitutes your acceptance of the revised Terms.',
};

export const PolicyData: PrivacySection[] = [
    {
        id: 'introduction',
        title: 'Introduction',
        content: [
            "This Terms of Use (the 'Agreement') applies to your access to, and/or use of, (i) Migration.io and its subdomains ('Website'); (ii) the mobile software applications ('App'), as well as any widgets, tools, functionalities, and services made available via either of the foregoing (collectively, the 'Services').",
            'Your access to and use of this Website (as well as any other websites owned by ARRK) are subject to the following Terms of Use, as well as all applicable laws and regulations. Please read these terms carefully. If you do not accept and agree to be bound by any of these terms or conditions, you are not authorized to access or otherwise use this Website or any Content, Services, or Software contained on this Website. Your access to and use of this Website constitute your acceptance of and agreement to abide by each of these terms and conditions set forth below.',
            '<strong>IF YOU DO NOT AGREE WITH ANY OF THE TERMS AND CONDITIONS OF THIS AGREEMENT, YOU MAY NOT ACCESS OR USE THE SERVICES.</strong>',
            '<strong>These Terms of Use may be changed, modified, supplemented, or updated by the Owner from time to time without advance notice.</strong> Unless otherwise indicated, any new Products and Services, Content, and Software added to this Website will also be subject to these Terms of Use effective upon the date of any such addition. You are encouraged to review the Website periodically for updates and changes.',
            '<strong>The information contained on this Website is not for use within any country or jurisdiction or by any persons where such use would constitute a violation of law.</strong> If this applies to you, you are not authorized to access or use any of the information on this Website.',
            "This Agreement is a binding agreement between you and ARRK LLC., a Delaware corporation located at 37443 Teel Hill Road N, Davenport, WA, 99122, USA (doing business as 'Migration') ('Migration.io', 'Migration', 'ARRK', 'ARRK.IO', 'we', 'us', and 'our'). Migration is the brand name for customizable travel protection plans offered by ARRK, LLC, with travel insurance in the plans administered by Cavanaugh Insurance on behalf of CHUBB. Cavanaugh Insurance, LLC is licensed insurance producer in all states where it offers products. Where required, CHUBB is a licensed adjuster or third-party administrator in all states where it administers insurance. License information is available <a href='https://migration.io/additional-disclosures/'>here</a>.",
            "Migration reserves the right to modify these Terms of Use at any time at our sole discretion. It is your responsibility to review these Terms periodically for updates. Your continued use of our services after changes are posted constitutes your acceptance of the revised Terms.to modify this Agreement at any time by posting the modified Agreement. Such modifications will be effective ten (10) days after such posting (unless we specify a later effective date). In such cases, we will also update the 'Last Updated' reference set forth at the beginning of this Agreement.",
            '<strong>ARBITRATION NOTICE: THIS AGREEMENT CONTAINS A MANDATORY ARBITRATION AGREEMENT (MANDATORY ARBITRATION) AND ITS RELATED DETAILS.</strong> PLEASE READ THAT SCHEDULE CAREFULLY, SINCE IT MAY REQUIRE YOU AND MIGRATION TO ARBITRATE CERTAIN DISPUTES AND LIMIT THE MANNER IN WHICH BOTH PARTIES CAN SEEK RELIEF. THERE IS, HOWEVER, AN OPTION TO OPT-OUT.',
        ],
    },
    {
        id: 'definitions',
        title: 'Definitions',
        content: [
            'This Agreement contains a range of capitalized terms, some of which are defined in this Section and some of which are defined elsewhere. The Section headings in this Agreement are for convenience of reading only and may not to be used or relied upon for interpretive purposes.',
            {
                type: 'list',
                items: [
                    '"Migration Affiliate" means, ARRK LLC, Cavanaugh Insurance LLC and CHUBB',
                    '"Migration Materials" means, collectively, the Services and any Content appearing or displayed on or in the Services.',
                    '"Content" means any text, data, information, images, graphics, sounds, videos, audio clips, links, and/or similar materials and content.',
                    '"Dispute" means any claim, dispute or controversy under, or otherwise in connection with, this Agreement. For U.S. residents, a "Dispute" does not include any claim, dispute or controversy relating to a travel protection plan with travel insurance underwritten by United States Fire Insurance Company.',
                    '"Intellectual Property Rights" means any and all rights, titles, and interests (under any jurisdiction or treaty, whether protectable or not, whether registered or unregistered, and whether vested, contingent, or future) in and to inventions, discoveries, works of authorship, designs, software, technical information, databases, know-how, mask works, methods, technology, and other intellectual property (collectively, "Intellectual Property"), and includes but is not limited to patents, copyrights and similar authorship rights, moral (and similar personal) rights, mask work rights, data and database rights, trade secret rights and similar rights in confidential information and other non-public information, design rights, trademark, service mark, trade name, trade dress and similar branding rights, as well as: (i) all applications, registrations, renewals, reexaminations, extensions, continuations, continuations-in-part, provisionals, substitutions, divisions or reissues of or for the foregoing; and (ii) all goodwill associated with the foregoing.',
                ],
            },
        ],
    },
    {
        id: 'services',
        title: 'Services',
        content: [
            'Migration permits you to link to the Services provided that you adhere to the following guidelines:',
            {
                type: 'list',
                items: [
                    'You link to (but do not replicate) any page on this Service.',
                    'The hyperlink text accurately describes the Content as it appears on the Service.',
                    'You shall not misrepresent your relationship with Migration or present any false information about Migration.',
                    'You shall not link from a website which prohibits linking to third parties.',
                    'The website from which you link to the Services does not contain Content that is offensive or controversial.',
                    'You, and your website, comply with this Agreement and applicable Law.',
                ],
            },
        ],
    },
    {
        id: 'third-party-content',
        title: 'Third Party Content and Affiliate Marketing',
        content: [
            'The Services may display, link to, and/or otherwise allow you to view, access, or interact with Content from third parties and other sources that are not owned or controlled by Migration.',
            "Migration does not assume any responsibility or liability for Third-Party Content, or any Third-Party Provider's terms of use, privacy policies, actions, omissions, or practices.",
        ],
    },
    {
        id: 'third-party-merchants',
        title: 'Third Party Merchants',
        content: [
            'If you choose to correspond, participate in a promotion, including the use of Internet of Things ("IOT") devices, or engage in transactions with any merchant found on or through this Services, you acknowledge and agree that Migration is not a party to, and will not be responsible for, your interaction with such merchant, including its treatment of your information and the terms and conditions applicable to any transaction between you and the merchant.',
            'The terms of your interaction with any merchant are solely between you and such merchant. You agree that Migration will have no responsibility or liability for any loss or damage of any kind that you may suffer as the result of any such interaction or the presence of such merchants on this Services.',
        ],
    },
    {
        id: 'third-party-services',
        title: 'Third Party Service Providers',
        content: [
            'Migration may offer you access to a variety of travel-related services through independent contractors third-party service providers ("Service Providers"). These services may include, but are not limited to, obtaining visas, fulfilling medical requirements for upcoming trips, medical services during your trip and arranging transportation at destinations.',
            "Migration's Services may enable you to engage, connect and further retain Third Party services or products as well as may include links to Service Providers' webpages or mobile software applications where you can directly purchase services offered by such Service Providers. These links are provided for your convenience to facilitate access to travel-related services that may be of interest to you.",
            'You acknowledge and agree that regardless of the manner in which such Third Party services and products may be offered to you Migration has no control over, does not endorse in any manner and assumes no responsibility or liability for, the services, their quality and timely supply, content, terms and conditions, privacy policies, or practices of any Service Provider.',
            'You acknowledge and agree that Migration shall not be responsible or liable for any loss or damage of any sort incurred as the result of any dealings with Service Providers or as the result of the services offered by such Service Providers.',
            'Any questions, complaints, or claims related to any product or service provided by a Service Provider should be directed to the respective Service Provider.',
            "We recommend that you review the Service Provider's terms and conditions, privacy policy, and any other relevant documentation before proceeding with retaining the Third Party services and products.",
            'Your interaction with these Service Providers is at your own risk.',
        ],
    },
    {
        id: 'intellectual-property',
        title: 'Intellectual Property',
        content: [
            'Migration (and/or its Affiliates, licensors and suppliers, as applicable) is and shall remain the sole and exclusive owner of all right, title, and interest (including, but not limited to, all Intellectual Property Rights) in and to:',
            {
                type: 'list',
                items: [
                    'the Migration Materials, as well as any computer programs (including APIs), databases, or other Intellectual Property underlying, operating, or otherwise embodied in any Migration Materials; and',
                    'the trademarks, service marks, trade names, service names, trade dress, symbols, brands, and logos displayed on contained on or in any Migration Materials ("Trademarks").',
                ],
            },
            'You acknowledge that the items in paragraphs (a) and (b) above may be protected by Intellectual Property Rights treaties and Laws. Without limiting paragraph (b) above, Migration™ and its respective logos and design, are the Trademarks of Migration or a Migration Affiliate. Other Trademarks displayed on contained on or in any Migration Materials are the property of their respective third party owners.',
            'Except for the License, Migration (and its Affiliates, licensors and suppliers, as applicable) reserve all rights in and to their respective Intellectual Property Rights.',
        ],
    },
    {
        id: 'warranty-disclaimers',
        title: 'Warranty Disclaimers',
        content: [
            "The above disclaimers apply to the maximum extent permitted by applicable Law. You may have legal rights in your country of residence which would prohibit the above disclaimers from (fully or partially) applying to you (for example, some jurisdictions' Laws do not allow the disclaimer of certain implied warranties or conditions, and do not allow limitations to be imposed on statutory rights), and, to the extent the above disclaimers are prohibited, then you and Migration agree that they will not apply to you.",
            "YOU ARE SOLELY RESPONSIBLE AND LIABLE FOR ALL INFORMATION AND DATA YOU PROVIDE, AND YOU REPRESENT AND WARRANT THAT YOU SUCH INFORMATION AND DATA WILL NOT INFRINGE OR VIOLATE ANY THIRD PARTY'S PROPRIETARY RIGHTS OR PRIVACY RIGHTS, OR ANY APPLICABLE LAW.",
            'In connection with the Services, Migration may provide you with certain information regarding travel insurance, global Covid-19 travel restrictions, and other related information. ALTHOUGH EVERY EFFORT HAS BEEN MADE TO PROVIDE COMPLETE AND ACCURATE INFORMATION, Migration MAKES NO WARRANTIES, EXPRESS OR IMPLIED, OR REPRESENTATIONS AS TO THE ACCURACY OF SUCH INFORMATION. Migration ASSUMES NO LIABILITY OR RESPONSIBILITY FOR ANY ERROR OR OMISSIONS IN THE INFORMATION CONTAINED IN THE WEBSITE, APP, AND/OR OTHERWISE PROVIDED TO YOU IN CONNECTION THEREWITH.',
        ],
    },
    {
        id: 'limitation-of-liability',
        title: 'Limitation of Liability',
        content: [
            "EXCEPT FOR A PARTY'S LIABILITY FOR BREACH OF THE OTHER PARTY'S INTELLECTUAL PROPERTY RIGHTS (SUCH AS A BREACH BY YOU OF THE LICENSE), IN NO EVENT SHALL EITHER PARTY BE LIABLE UNDER, OR OTHERWISE IN CONNECTION WITH, THIS AGREEMENT, FOR:",
            {
                type: 'list',
                items: [
                    'ANY CONSEQUENTIAL, INDIRECT, SPECIAL, INCIDENTAL, OR PUNITIVE DAMAGES;',
                    'ANY LOSS OF PROFITS, LOSS OF BUSINESS, LOSS OF REVENUE, LOSS OF ANTICIPATED SAVINGS, LOSS OF OPPORTUNITY, WASTED TIME OR EXPENDITURE, OR OTHER ECONOMIC LOSS;',
                    'ANY LOSS OF, OR DAMAGE OR INTERRUPTION TO, DATA, NETWORKS, INFORMATION SYSTEMS, REPUTATION, OR GOODWILL; AND/OR',
                    'THE COST OF COVER, OR OF PROCURING ANY SUBSTITUTE GOODS OR SERVICES.',
                ],
            },
            'THE COMBINED AGGREGATE LIABILITY OF MIGRATION AND ALL MIGRATION AFFILIATES UNDER, OR OTHERWISE IN CONNECTION WITH, THIS AGREEMENT SHALL NOT EXCEED FIVE US DOLLARS (US$ 5).',
            'THE FOREGOING EXCLUSIONS AND LIMITATIONS SHALL APPLY: (i) TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW (SUCH AS, FOR EXAMPLE, IF A JURISDICTION DOES NOT ALLOW THE EXCLUSION OR THE LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, OR OF LIABILITY FOR PERSONAL INJURY OR DEATH CAUSED BY NEGLIGENCE); (ii) EVEN IF A PARTY HAS BEEN ADVISED, OR SHOULD HAVE BEEN AWARE, OF THE POSSIBILITY OF LOSSES, DAMAGES, OR COSTS; (iii) EVEN IF ANY REMEDY IN THIS AGREEMENT FAILS OF ITS ESSENTIAL PURPOSE; AND (iv) REGARDLESS OF THE THEORY OR BASIS OF LIABILITY, INCLUDING WITHOUT LIMITATION BREACH OF WARRANTY, NEGLIGENCE, MISREPRESENTATION, STRICT LIABILITY, OR OTHER CONTRACT, TORT OR STATUTORY LIABILITY.',
            'For U.S. residents, this provision does not apply to any claim, dispute or controversy relating to a travel protection plan with travel insurance underwritten by CHUBB.',
        ],
    },
    {
        id: 'indemnification',
        title: 'Indemnification',
        content: [
            'If any third party (including, but not limited to, a regulatory or governmental authority) makes or institutes any demand, claim, suit, action or proceeding against Migration, a Migration Affiliate, and/or any of our or their respective directors, officers, employees, or representatives (each, an "Indemnitee"), and it is based upon or arises from any breach by you under this Agreement (in each case, an "Indemnity Claim"), then, upon written request by Migration (to be decided in our sole discretion), you agree to assume full control of the defense and settlement of the Indemnity Claim; provided, however, that (a) Migration reserves the right, at any time thereafter, to take over full or partial control of the defense and/or settlement of the Indemnity Claim, and in such cases you agree to reasonably cooperate with Migration\'s defense counsel and activities at your own cost and expense; and (b) you shall not settle any Indemnity Claim, or admit to any liability thereunder, without the express prior written consent of the Indemnitee(s).',
            "In addition, and regardless of whether (or the extent to which) you controlled or participated in the defense and/or settlement of an Indemnity Claim, you agree to indemnify and hold harmless the Indemnitee(s) for and against: (A) any costs and expenses (including reasonable attorneys' fees) incurred by the Indemnitee(s) in the defense of the Indemnity Claim; and (b) any amounts awarded against, or imposed upon, the Indemnitee(s) under such Indemnity Claim, or otherwise paid in settlement of the Indemnity Claim (including, but not limited to, any fines or penalties).",
        ],
    },
    {
        id: 'governing-law',
        title: 'Governing Law',
        content: [
            'This Agreement (including without limitation its validity) shall be governed by, and construed in accordance with, the laws of the State of New York, USA without regard to any conflicts of laws rules or principles.',
        ],
    },
    {
        id: 'mandatory-arbitration',
        title: 'Mandatory Arbitration',
        content: [
            'In the event of any Dispute, such Dispute shall be resolved exclusively by arbitration in accordance with Schedule A attached hereto. However, if the Dispute is not subject to arbitration (either because you opted-out of the arbitration in the manner described in Schedule A, or because a court of competent jurisdiction determined that the agreement to arbitrate does not to apply to you or the Dispute) then the Dispute shall be subject to the exclusive jurisdiction and venue of the competent courts located in New York County, New York, USA, and the parties hereby irrevocably and unconditionally submit to the personal jurisdiction of such courts and waive any jurisdictional, improper venue, inconvenient forum, or other objections to such jurisdiction and venue.',
            "Regardless of any Law to the contrary, you agree that any claim or cause of action arising under, or otherwise in connection with, this Agreement (other than to seek equitable relief or to otherwise protect or enforce a party's Intellectual Property Rights) must be filed within ONE (1) YEAR after such claim or cause of action arose, or else you agree that such claim or cause of action will be barred forever.",
        ],
    },
    {
        id: 'usage-rules',
        title: 'Usage Rules',
        content: [
            'If you are downloading the App from a third party mobile device platform or service provider ("Distributor"), please be aware that the Distributor may have established usage rules which also govern your use of the App ("Usage Rules"). We specifically refer to the Usage Rules of certain Distributors below in the section below entitled \'Distributor Requirements and Usage Rules\', but other Usage Rules may be applicable depending on where the App has been downloaded from.',
            'You acknowledge that, prior to downloading the App from a Distributor, you have had the opportunity to review and understand, and will comply with its Usage Rules. The Usage Rules that are applicable to your use of the App are incorporated into this Agreement by this reference. You represent that you are not prohibited by any applicable Usage Rules and/or applicable law from using the App; if you are unable to make such a representation you are prohibited from installing and/or using the App.',
        ],
    },
    {
        id: 'distributor-requirements',
        title: 'Distributor Requirements and Usage Rules',
        content: [
            'If you download the App from the Apple, Inc. ("Apple") App Store (or in any event if you download an Apple iOS App) then, without derogating from the warranty disclaimers and limitation of liability as set forth in the Agreement:',
            {
                type: 'list',
                items: [
                    'You acknowledge and agree that:',
                    {
                        type: 'sub-list',
                        items: [
                            'This Agreement is concluded between Migration and you only, and not with Apple, and Migration and its licensors, and not Apple, are solely responsible for the App and the content thereof.',
                            'Your use of the App is also subject to the Usage Rules established by Apple, including those set forth in the Apple App Store Terms of Service, effective as of the date that you enter into this Agreement.',
                            'The License granted herein is limited to a non-transferable right to use the App on an Apple iPhone, iPod Touch, iPad, or other Apple-branded product that you own or control and that runs the iOS.',
                            'Migration is solely responsible for providing any maintenance and support services with respect to the App, as specified in this Agreement, or as required under applicable law. Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the App.',
                            "Migration is solely responsible for any product warranties, whether express or implied by law, to the extent not effectively disclaimed. In the event of any failure of the App to conform to any applicable warranty, you may notify Apple, and Apple will, to the extent applicable, refund any purchase price paid (if any) by you for the App to you. To the maximum extent permitted by applicable law, Apple will have no other warranty obligation whatsoever with respect to the App, and, any other claims, losses, liabilities, damages, costs or expenses attributable to any failure to conform to any warranty will be Migration's sole responsibility (unless otherwise disclaimed by Migration).",
                            "Migration, and not Apple, is responsible for addressing any product claims you, or any third party, may have relating to the App or your possession and/or use of the App (unless otherwise disclaimed by Migration), including, but not limited to: (a) product liability claims; (b) any claim that the App fails to conform to any applicable legal or regulatory requirement; and (c) claims arising under consumer protection or similar legislation, including in connection with the App's use of HealthKit and HomeKit frameworks.",
                            "In the event of any third party claim that the App or your possession and use of the App infringes that third party's intellectual property rights, Apple shall not be responsible for the investigation, defense, settlement and discharge of any such intellectual property infringement claim.",
                            'Apple, and its subsidiaries, are third party beneficiaries of this Agreement, and that, upon your acceptance of the terms and conditions of this Agreement, Apple will have the right (and will be deemed to have accepted the right) to enforce this Agreement against you as a third party beneficiary thereof.',
                        ],
                    },
                    'You represent and warrant that:',
                    {
                        type: 'sub-list',
                        items: [
                            'You are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a "terrorist supporting" country.',
                            'You are not listed on any U.S. Government list of prohibited or restricted parties.',
                        ],
                    },
                    'If you have any questions, complaints, or claims regarding the App, please contact Migration at:',
                    {
                        type: 'sub-list',
                        items: [
                            'Email: <a href="mailto:support@migration.io">support@migration.io</a>',
                            'Telephone: +1 555 555-1212',
                            'Address: 2624 N Division St SPOKANE, Suite 401, Spokane, Washington, USA, 99207',
                        ],
                    },
                    'By entering into this Agreement you, to the extent legally permitted, hereby waive any applicable law requiring that this Agreement be localized to meet your language and other local requirements. To the extent that the foregoing is not permitted, you agree to be bound by the standard Apple Licensed Application End User License Agreement which is part of the Apple App Store Terms of Service, at <a href="www.apple.com/legal/itunes/us/terms.html#SERVICE">www.apple.com/legal/itunes/us/terms.html#SERVICE</a> (as amended from time to time).',
                ],
            },
        ],
    },
    {
        id: 'miscellaneous',
        title: 'Miscellaneous',
        content: [
            {
                type: 'list',
                items: [
                    '<strong>Entire Agreement</strong>. This Agreement (together with its Schedules) represents the entire agreement between you and Migration with respect to the subject matter hereof, and supersedes and replaces any and all prior and contemporaneous oral and/or written agreements, understandings and statements between you and Migration with respect to such subject matter. You acknowledge and agree that in entering into this Agreement you have not relied on any statement or representation (whether negligently or innocently made) not expressly set out in this Agreement, such as statements and explanations in any FAQs, summaries or explanatory guides regarding this Agreement, or other marketing material on the Services. For U.S. residents, this Agreement does not impact the terms of any travel protection plan with travel insurance underwritten by United States Fire Insurance Company; rather, your plan document will control.',
                    '<strong>Age Representation</strong>. Migration and the Migration Affiliates make no active effort to collect personal information from individuals under the age of eighteen (18). We require that Services users must be of legal age to enter into agreements (typically, at least eighteen (18) years of age or older). For the avoidance of doubt, minors may make use of Insurance Products purchased on their behalf by their parent or legal guardian, in accordance with the terms hereunder and applicable law.',
                    '<strong>Language; Electronic Contract and Communications</strong>. The language of this Agreement is expressly agreed to be the English language. You hereby irrevocably waive, to the maximum extent legally permitted, any Law applicable to you requiring that the Agreement be localized to meet your language (as well as any other localization requirements), or requiring an original (non-electronic) signature or delivery or retention of non-electronic records. We may be able (but are not obligated) to provide you with copies of this Agreement on written request; however, please be sure to print a copy of this Agreement for your own records. When you visit or submit information on the Services or send an email to us, you are communicating with us electronically. You consent to receive communications from us electronically.',
                    '<strong>Email, Telephone and SMS Communication</strong>. By providing your email address, fax number, or phone number on the Services, you authorize us and Insurance Providers to contact you by telephone, fax and email. Such communication shall be in connection with: (a) your insurance needs or quote requests; (b) any issue regarding our Services; (c) in response to quotes you have requested from Insurance Providers; and/or (d) to provide information or offers that may be of interest to you.',
                    "<strong>Feature Specific Terms</strong>. Certain Services features and functionalities may be accompanied by separate or additional terms and conditions (in each case, 'Feature Specific Terms'). Except to the extent expressly stated otherwise within Feature Specific Terms, all Feature Specific Terms apply in addition to (and not instead of) this Agreement, and are hereby incorporated into, and made a part of, this Agreement by reference.",
                    "<strong>Assignment</strong>. Migration may assign this Agreement (or any of its rights and/or obligations hereunder) without your consent, and without notice or obligation to you. This Agreement is personal to you, and, except as permitted by this Agreement, you may not assign (or in any other way transfer) this Agreement (or any of its obligations or rights hereunder) without Migration's express prior written consent. Any prohibited assignment shall be null and void.",
                    '<strong>Severability</strong>. If any provision of this Agreement is held by a court of competent jurisdiction to be illegal, invalid or unenforceable, then: (a) the remaining provisions of this Agreement shall remain in full force and effect; and (b) the Parties hereto agree that the court making such determination shall have the power to limit the provision, to delete specific words or phrases, or to replace the provision with a provision that is legal, valid and enforceable and that most closely approximates the original legal intent and economic impact of such provision.',
                    '<strong>Remedies</strong>. Except as may be expressly stated otherwise in this Agreement, no right or remedy conferred upon or reserved by any party under this Agreement is intended to be, or shall be deemed, exclusive of any other right or remedy under this Agreement, at law or in equity, but shall be cumulative of such other rights and remedies.',
                    '<strong>Privacy</strong>. We collect certain data and information about you in connection with your access and use of the Migration Materials. We will use, store and otherwise process such data and information in accordance with our Privacy Policy, which is hereby incorporated into, and made a part of, this Agreement by reference.',
                    '<strong>Waiver</strong>. No failure or delay on the part of any party in exercising any right or remedy under this Agreement shall operate as a waiver thereof, nor shall any single or partial exercise of any such right or remedy preclude any other or further exercise thereof or the exercise of any other right or remedy. Any waiver granted hereunder must be in writing (for waivers by you, emails will be acceptable; for waivers by Migration, the writing must be duly signed by an authorized representative of Migration), and shall be valid only in the specific instance in which given.',
                    '<strong>Relationship</strong>. The relationship of the parties is solely that of independent contractors. Nothing in this Agreement shall be deemed to create any employment, fiduciary, joint venture, agency or other relationship between the parties.',
                    "<strong>Notices to Migration</strong>. Except as stated otherwise in this Agreement, you agree to send all notices to Migration, to: <a href='mailto:support@migration.io'>support@migration.io</a>.",
                    "<strong>No Third Party Beneficiaries</strong>. Except as may be expressly provided otherwise in this Agreement (such as Migration Affiliates, Migration's licensors and suppliers, and Indemnitees), there shall be no third-party beneficiaries of, or under, this Agreement, and no third party shall be entitled to enforce any of these terms and conditions.",
                    "<strong>Export Compliance</strong>. You represent and warrant that: (a) you are not a resident of (and you will not use the Services in) a country that the U.S. government has embargoed for use of the Services, nor are you named on the U.S. Treasury Department's list of Specially Designated Nationals or any other applicable trade sanctioning regulations of any jurisdiction.",
                    "<strong>Force Majeure</strong>. Neither party shall be responsible for any failure to perform any obligation hereunder because of any (a) act of God, fire, flood, earthquake, explosion, or pandemic or epidemic (or similar regional health crisis); (b) strikes, lockouts, picketing, concerted labor action, or other labor or industrial disturbances; (c) invasion, war (declared or undeclared), terrorism, riot, insurrection, or civil commotion; (d) war (declared or undeclared), terrorism, riot or civil commotion; and/or (d) other similar cause beyond that party's reasonable control.",
                    '<strong>Advice</strong>. Migration shall have no obligation or liability for any technical, financial, legal, or other advice or suggestions provided to you (whether via the Migration Materials or otherwise), including without limitation advice with respect to the purchase of insurance products or the insurance industry in general.',
                    '<strong>Subpoenas</strong>. Nothing in this Agreement prevents Migration from disclosing your information or data to the extent required by Law, subpoenas, or court orders.',
                ],
            },
        ],
    },
];
