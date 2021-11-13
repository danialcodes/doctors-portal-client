import { Grid } from '@mui/material';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
const Service = ({ service }) => {
    const { name, description, img } = service;
    return (
        <Grid item xs={4} sm={4} md={4} key={service.name}>
            <Card sx={{ minWidth: 275, boxShadow: 0, border: 0 }}>
                <CardMedia
                    component="img"
                    style={{ width: "auto", margin: "0 auto", height: "80px" }}
                    image={img}
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Service;