import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import doctor from "../../../images/doctor.png";
const AppionmentBanner = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <img
                        style={{ height: 400 }}
                        src={doctor} />
                </Grid>
                <Grid item xs={8}>
                    hay
                </Grid>
            </Grid>
        </Box>
    );
};

export default AppionmentBanner;