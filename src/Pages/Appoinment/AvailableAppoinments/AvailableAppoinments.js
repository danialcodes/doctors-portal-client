import { Alert, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Booking from '../Booking/Booking';


const AvailableAppoinments = ({ date }) => {
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingError, setBookingError] = useState(false);
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const url = "http://localhost:5000/availableslots";
        axios.get(url)
            .then(res => setBookings(res.data));
    }, [bookingSuccess])

    if (bookingSuccess || bookingError) {
        setTimeout(() => {
            setBookingSuccess(false);
            setBookingError(false);
        }, 1500);
    }
    return (
        <Container>
            <Typography variant="h4" sx={{ my: 4, color: 'info.main', fontWeight: 300 }} >Available Appoinments on {date.toDateString()}</Typography>
            {
                bookingSuccess && <Alert severity="success">Booking Successful</Alert>
            }
            {
                bookingError && <Alert severity="error">Booking Failed</Alert>
            }
            <Grid container spacing={2}>
                {
                    bookings.map(booking => <Booking date={date} key={booking.id} booking={booking} setBookingSuccess={setBookingSuccess} setBookingError={setBookingError}></Booking>)
                }
            </Grid>
        </Container>
    );
};

export default AvailableAppoinments;