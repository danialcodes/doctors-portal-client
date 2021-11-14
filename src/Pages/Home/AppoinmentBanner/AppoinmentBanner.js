import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import doctor from "../../../images/doctor.png";
import appoinmentBg from "../../../images/appointment-bg.png";
import { Button, Typography } from '@mui/material';

const AppoinmentBanner = () => {
    const banner = {
        background: `url(${appoinmentBg})`,
        backgroundColor: "rgba(45,58,74,.8)",
        backgroundBlendMode: "darken, luminosity",
        marginTop: "150px"
    };
    return (
        <Box style={banner} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <img
                        alt="doctor-pic"
                        style={{ height: 400, marginTop: "-125px" }}
                        src={doctor} />
                </Grid>
                <Grid item xs={12} md={6} sx={{
                    display: 'flex',
                    justifyContent: "flex-start",
                    alignItems: "center",
                    textAlign: "start"
                }}>
                    <Box>
                        <Typography variant="h6" sx={{ mb: 5, color: "info.main" }}>
                            Appoinment
                        </Typography>
                        <Typography variant="h4" sx={{ color: "white", fontSize: 40 }}>
                            Make an appoinment Today
                        </Typography>
                        <Typography variant="h6" sx={{ my: 4, color: "white", fontSize: 14, fontWeight: 400 }}>
                            This Hospital provides more quality service than other hospital
                        </Typography>
                        <Button sx={{ backgroundColor: "info.main" }} variant="contained">Learn More</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AppoinmentBanner;