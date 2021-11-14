import { Grid } from '@mui/material';
import React from 'react';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import AppoinmentModal from '../AppoinmentModal/AppoinmentModal';
const Booking = ({ booking, date, setBookingSuccess }) => {
    const { name, time, space } = booking;
    const [openBooking, setOpenBooking] = React.useState(false);
    const handleOpenBooking = () => setOpenBooking(true);
    const handleCloseBooking = () => setOpenBooking(false);
    return (
        <>
            <Grid item xs={12} sm={6} md={4} >
                <Paper elevation={3} sx={{ py: 5 }}>
                    <Typography sx={{ color: 'info.main', fontWeight: 600 }} variant="h5" gutterBottom component="div">
                        {name}
                    </Typography>
                    <Typography variant="h6" gutterBottom component="div">
                        {time}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        {space} SPACES AVAILABLE
                    </Typography>
                    <Button onClick={handleOpenBooking} variant="contained">Book Appoinment</Button>
                </Paper>
            </Grid>
            <AppoinmentModal setBookingSuccess={setBookingSuccess} date={date} booking={booking} handleCloseBooking={handleCloseBooking} openBooking={openBooking}></AppoinmentModal>
        </>
    );
};

export default Booking;