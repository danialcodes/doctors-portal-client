import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
const AppoinmentModal = ({ setBookingError, setBookingSuccess, date, openBooking, handleCloseBooking, booking }) => {
    const { name, time, price } = booking;
    const { user } = useAuth();
    const initialAppoinment = {
        name,
        patientName: user.displayName,
        email: user.email,
        phone: '',
        slot: time,
        price
    };
    const [appoinment, setAppoinment] = useState(initialAppoinment);

    const handleBookingDetails = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newAppoinment = { ...appoinment }
        newAppoinment[field] = value;
        setAppoinment(newAppoinment);
    }

    const handleBooking = (e) => {
        e.preventDefault();

        const submit = window.confirm("Confirm Appoinment?");

        if (submit) {
            axios.post("https://danialcodes-doctors-portal.herokuapp.com/appoinments", { ...appoinment, date: date.toLocaleDateString() })
                .then(res => {
                    res = res.data;
                    if (res.insertedId) {
                        setBookingSuccess(true)
                        handleCloseBooking();
                    }
                    else {
                        setBookingError(true);
                        handleCloseBooking();
                    }
                });

        }
    }
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openBooking}
            onClose={handleCloseBooking}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openBooking}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {name}
                    </Typography>
                    <form onSubmit={handleBooking}>
                        <TextField
                            disabled
                            sx={{ width: "90%" }}
                            id="outlined-size-small"
                            defaultValue={time}
                            size="small"
                            name="slot"
                        />
                        <TextField
                            onChange={handleBookingDetails}
                            sx={{ width: "90%" }}
                            id="outlined-size-small"
                            defaultValue={user.displayName}
                            size="small"
                            name="patientName"
                        />
                        <TextField
                            disabled
                            sx={{ width: "90%" }}
                            id="outlined-size-small"
                            defaultValue={"Price is $" + price}
                            size="small"
                            name="price"
                        />
                        <TextField
                            onChange={handleBookingDetails}
                            sx={{ width: "90%" }}
                            id="outlined-size-small"
                            defaultValue={user.email}
                            size="small"
                            name="email"
                        />
                        <TextField
                            onChange={handleBookingDetails}
                            sx={{ width: "90%" }}
                            id="outlined-size-small"
                            defaultValue={user.phone || "Your Phone Number"}
                            size="small"
                            name="phone"
                        />
                        <TextField
                            disabled
                            sx={{ width: "90%" }}
                            id="outlined-size-small"
                            defaultValue={date.toDateString()}
                            size="small"
                            name="date"
                        />
                        <Button type="submit" variant="contained">Submit</Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default AppoinmentModal;