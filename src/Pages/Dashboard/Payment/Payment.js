import { LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51K1yQAFDDkrJ7nh05DjfmIdAQsCq2SCyCveJLNpzuB2PKzAryl8Sl3ZezDxrmZ5CZF02BzR8Jyz4bUZ6xqakXN8W00UQSI3tmP");


const Payment = () => {
    const { appoinmentId } = useParams();
    const [appoinment, setAppoinment] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/appoinments/${appoinmentId}`).
            then(res => setAppoinment(res.data));
    }, [appoinmentId]);

    return (
        <div>
            {
                appoinment.patientName ? <>
                    <h2>Please Pay for {appoinment.patientName}</h2>
                    <h4>Pay: ${appoinment.price}</h4>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm appoinment={appoinment} setError={setError} setSuccess={setSuccess} />
                    </Elements>
                </> :
                    <LinearProgress />
            }

            {error && <h4 style={{ color: "red" }}>{error}</h4>}
            {success && <h4 style={{ color: "green" }}>{success}</h4>}
        </div>
    );
};

export default Payment;