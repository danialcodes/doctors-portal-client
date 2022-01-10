import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';



const CheckoutForm = ({ appoinment, setError, setSuccess }) => {
    const { price, patientName } = appoinment;
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [clientSecret, setClientSecret] = useState('');
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/create-payment-intent`, { price })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            });
    }, [price]);

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            setSuccess("");
        } else {
            setError('');
            console.log('[PaymentMethod]', paymentMethod);
        }


        const { paymentIntent, error: err } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card,
                    billing_details: {
                        name: patientName,
                        email: user.email
                    },
                },
            },
        );
        if (err) {
            setError(err.message);
            setSuccess("");
        }
        else {
            setSuccess("Success")
            setError('');
            console.log(paymentIntent);
        }

    };


    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe}>
                Pay ${price}
            </button>

        </form>

    );
};

export default CheckoutForm;