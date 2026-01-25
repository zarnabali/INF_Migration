import { useState, useRef, useCallback } from 'react';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

const stripeElementStyle = {
    base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        lineHeight: '24px',
        '::placeholder': {
            color: '#aab7c4',
        },
    },
    invalid: {
        color: '#F8285A',
        iconColor: '#F8285A',
        ':focus': {
            color: '#F8285A',
        },
    },
    complete: {
        color: '#32325d',
    },
};

export function useStripePayment(publishableKey: string) {
    const stripe = useRef<Stripe | null>(null);
    const elements = useRef<StripeElements | null>(null);
    const card = useRef<StripeCardElement | null>(null);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');
    const [isCardComplete, setIsCardComplete] = useState(false);

    const initializeStripe = useCallback(async (onCardTouched?: () => void) => {
        try {
            const stripeInstance = await loadStripe(publishableKey);
            if (!stripeInstance) throw new Error('Failed to load Stripe');

            stripe.current = stripeInstance;
            elements.current = stripeInstance.elements();

            const cardElement = elements.current.create('card', { style: stripeElementStyle });
            card.current = cardElement;

            // We need to wait for the DOM element to be available
            // In React, refs are usually used, but since we are mounting manually:
            const cardMountPoint = document.getElementById('card-element');
            if (cardMountPoint) {
                cardElement.mount('#card-element');
            }

            // Add event listener for change events
            cardElement.on('change', (event) => {
                setIsCardComplete(event.complete);
                setError(event.error ? event.error.message || '' : '');
            });

            // Add event listeners for focus/blur to track user interaction
            if (onCardTouched) {
                cardElement.on('focus', () => {
                    onCardTouched();
                });
                cardElement.on('blur', () => {
                    onCardTouched();
                });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to initialize Stripe');
        }
    }, [publishableKey]);

    const validateCard = useCallback(async (): Promise<boolean> => {
        if (!card.current) {
            setError('Card element not initialized');
            return false;
        }
        return isCardComplete;
    }, [isCardComplete]);

    const processPayment = useCallback(async (
        clientSecret: string,
        billingDetails: any,
        paymentMethod = 'credit',
    ) => {
        if (!stripe.current) {
            throw new Error('Stripe not initialized');
        }

        const stripeInstance = stripe.current;
        setProcessing(true);

        try {
            if (paymentMethod === 'affirm') {
                // Extract policy_id from billing details and remove it
                const { policy_id, ...cleanBillingDetails } = billingDetails;

                // Use window.location.origin for absolute URL
                const returnUrl = `${window.location.origin}/payment-complete?policy_id=${policy_id}`;

                const result = await stripeInstance.confirmAffirmPayment(clientSecret, {
                    payment_method: {
                        billing_details: cleanBillingDetails,
                    },
                    return_url: returnUrl,
                });

                if (result.error) throw result.error;
                return result;
            } else {
                // For credit card payments, remove policy_id from billing details
                const { policy_id, ...cleanBillingDetails } = billingDetails;

                if (!card.current) throw new Error('Card element not found');

                const result = await stripeInstance.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: card.current,
                        billing_details: cleanBillingDetails,
                    },
                    setup_future_usage: 'off_session',
                });

                if (result.error) throw result.error;
                return result;
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Payment failed');
            throw err;
        } finally {
            setProcessing(false);
        }
    }, []);

    return {
        stripe,
        card,
        error,
        processing,
        initializeStripe,
        processPayment,
        isCardComplete,
        validateCard,
    };
}
