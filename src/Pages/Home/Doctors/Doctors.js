import { Container, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Doctor from './Doctor';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        axios.get("https://danialcodes-doctors-portal.herokuapp.com/doctors")
            .then(res => {
                setDoctors(res.data);
            })
    }, []);
    return (
        <div>
            <h2>Our Doctors : {doctors.length}</h2>
            <Container>
                <Grid container spacing={2}>
                    {doctors.map(doctor => <Doctor
                    key={doctor._id} doctor={doctor}></Doctor>)}

                </Grid>
            </Container>

        </div>
    );
};

export default Doctors;