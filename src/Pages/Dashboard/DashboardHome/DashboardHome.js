import { Grid } from '@mui/material';
import React from 'react';
import Calender from '../../Shared/Calender/Calender';
import Appoinment from '../Appoinments/Appoinments';

const DashboardHome = () => {
    const [date,setDate] = React.useState(new Date());

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Calender date={date} setDate={setDate}></Calender>
            </Grid>
            <Grid item xs={12} md={8}>
                <Appoinment date={date}></Appoinment>
            </Grid>
        </Grid>
    );
};

export default DashboardHome;