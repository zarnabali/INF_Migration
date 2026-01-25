'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import SendIcon from '@mui/icons-material/Send';

declare global {
    interface Window {
        grecaptcha: any;
    }
}

// Helper to check if all fields are filled
const isFormValid = (formData: any, recaptchaVerified: boolean) => {
    return (
        formData.firstName.trim() !== '' &&
        formData.lastName.trim() !== '' &&
        formData.phone.trim() !== '' &&
        formData.email.trim() !== '' &&
        formData.message.trim() !== '' &&
        recaptchaVerified
    );
};

export const ContactFormComponent = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        enquiryType: 'General Enquiry',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState('');

    // ReCAPTCHA state
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const recaptchaWidgetId = useRef<number | null>(null);
    const recaptchaContainerRef = useRef<HTMLDivElement>(null);

    const siteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Public key from Vue project

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Load ReCAPTCHA script
    useEffect(() => {
        const loadScript = () => {
            if (window.grecaptcha) {
                renderRecaptcha();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
            script.async = true;
            script.defer = true;
            script.onload = renderRecaptcha;
            document.head.appendChild(script);
        };

        const renderRecaptcha = () => {
            // Check if already rendered in this container
            const container = recaptchaContainerRef.current;
            if (!container || container.hasChildNodes()) return;

            if (!window.grecaptcha) return;

            window.grecaptcha.ready(() => {
                // Double check inside ready callback
                if (!container || container.hasChildNodes()) return;

                try {
                    const widgetId = window.grecaptcha.render(container, {
                        sitekey: siteKey,
                        callback: (token: string) => {
                            setRecaptchaToken(token);
                            setRecaptchaVerified(true);
                        },
                        'expired-callback': () => {
                            setRecaptchaToken('');
                            setRecaptchaVerified(false);
                        },
                        theme: 'light',
                    });
                    recaptchaWidgetId.current = widgetId;
                } catch (e) {
                    console.error('ReCAPTCHA render error:', e);
                }
            });
        };

        loadScript();

        // Cleanup function isn't straightforward with global grecaptcha, 
        // but we can ensure we don't try to re-render needlessly
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isFormValid(formData, recaptchaVerified)) {
            setError('Please fill in all fields and verify you are not a robot.');
            return;
        }

        setLoading(true);
        setError('');
        setSubmitSuccess(false);

        try {
            const { error: supabaseError } = await supabase
                .from('contact_submissions' as any)
                .insert([{ ...formData, recaptcha_token: recaptchaToken }]);

            if (supabaseError) throw supabaseError;

            setSubmitSuccess(true);
            setFormData({
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                enquiryType: 'General Enquiry',
                message: '',
            });
            setRecaptchaVerified(false);
            setRecaptchaToken('');
            if (window.grecaptcha && recaptchaWidgetId.current !== null) {
                window.grecaptcha.reset(recaptchaWidgetId.current);
            }

        } catch (err) {
            setError('Failed to submit form. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const canSubmit = isFormValid(formData, recaptchaVerified);

    return (
        <div className="pt-3 pb-14">
            <div className="max-w-[1218px] mx-auto px-4 md:px-6">
                <div className="flex flex-wrap -mx-4">
                    {/* Left sidebar */}
                    <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
                        <div className="div-bg rounded-lg p-7 text-white shadow-lg reach-out-card">
                            <h4 className="text-[20px] font-bold mb-4 text-white">Reach Out Today</h4>
                            <div className="my-4 h-px bg-white opacity-20"></div>
                            <p className="text-[16px] font-normal mb-3">
                                Have questions or need assistance?
                            </p>
                            <p className="text-[16px] font-normal mb-3">Want to become an affiliate partner?</p>
                            <div className="my-4 h-px opacity-0"></div>
                            <p className="text-[16px] font-normal">Let us know! We're just a message away.</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="w-full lg:w-2/3 px-4">
                        <div className="bg-white rounded-lg shadow-xl p-6">
                            {submitSuccess && (
                                <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                                    Thank you! Your message has been sent successfully.
                                </div>
                            )}
                            {error && (
                                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-wrap -mx-2">
                                    <div className="w-full md:w-1/2 px-2 mb-4">
                                        <label className="block mb-2 font-medium">First Name *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Name"
                                        />
                                    </div>

                                    <div className="w-full md:w-1/2 px-2 mb-4">
                                        <label className="block mb-2 font-medium">Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Last Name"
                                        />
                                    </div>

                                    <div className="w-full md:w-1/2 px-2 mb-4">
                                        <label className="block mb-2 font-medium">Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="xxx xxx xxxx"
                                        />
                                    </div>

                                    <div className="w-full md:w-1/2 px-2 mb-4">
                                        <label className="block mb-2 font-medium">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Email address"
                                        />
                                    </div>

                                    <div className="w-full px-2 mb-4">
                                        <label className="block mb-2 font-medium">I am interested in *</label>
                                        <select
                                            name="enquiryType"
                                            value={formData.enquiryType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                        >
                                            <option>General Enquiry</option>
                                            <option>Becoming an Affiliate Partner</option>
                                            <option>Questions about our Programs</option>
                                        </select>
                                    </div>

                                    <div className="w-full px-2 mb-4">
                                        <label className="block mb-2 font-medium">Message *</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                                            placeholder="Write your message here..."
                                        />
                                    </div>

                                    <div className="w-full px-2 mt-3">
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                            {/* ReCAPTCHA Container */}
                                            <div ref={recaptchaContainerRef} className="recaptcha-wrapper"></div>

                                            <button
                                                type="submit"
                                                disabled={!canSubmit || loading}
                                                className={`px-8 py-3 send-btn font-semibold transition-all flex items-center gap-2 ${(!canSubmit || loading) ? 'opacity-50 cursor-not-allowed grayscale' : ''
                                                    }`}
                                            >
                                                <SendIcon fontSize="small" />
                                                {loading ? 'Sending...' : 'Send'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .div-bg {
                    background-color: #005047;
                }

                .reach-out-card {
                    transition: all 0.3s ease;
                    cursor: default;
                }

                .reach-out-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                }

                .send-btn {
                    background-color: #fae2d4;
                    color: #333;
                    border-radius: 30px;
                }

                .send-btn:hover:not(:disabled) {
                    background-color: #f5d4c0;
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
                }

                .send-btn:active:not(:disabled) {
                    transform: translateY(-1px) scale(1.01);
                }
                
                .recaptcha-wrapper {
                    border-radius: 4px;
                    overflow: hidden;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                }
            `}</style>
        </div>
    );
};
