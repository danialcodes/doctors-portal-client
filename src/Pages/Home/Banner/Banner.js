import React from 'react';
import chair from "../../../images/chair.png";
import chairbg from "../../../images/bg.png";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Container, Typography } from '@mui/material';
const bg = {
    background: `url(${chairbg})`

}
const verticalCenter = {
    display: "flex",
    alignItems: "center",
    height: 500
}
const Banner = () => {
    return (
        <Container style={bg} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ textAlign: "start" }} style={verticalCenter}>
                    <Box>
                        <Typography variant="h3">
                            Your New Smile <br />
                            Starts Here
                        </Typography>
                        <Typography variant="h6" sx={{my:5, fontSize: 20, color: "gray", fontWeight: 300 }}>
                            khdkhvksdvl  ohdoshvljk h ohdsjkvsd lojsnjsd h hsjklvhb sdvjkshv  j bspijsjhfopwe hiub oihfwsd
                        </Typography>
                        <Button sx={{ backgroundColor: "info.main" }} variant="contained">Get Appoinment</Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} style={verticalCenter}>
                    <img
                        alt=""
                        width="350px"
                        src={chair}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Banner;