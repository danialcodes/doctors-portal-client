import { Container, Grid, TextField, Typography, Button, Alert, AlertTitle } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import login from "../../../images/login.png";
import CircularProgress from '@mui/material/CircularProgress';
import { NavLink, useHistory } from 'react-router-dom';


const Registration = () => {
    const { user, registerUser, loading, authError } = useAuth();
    const [loginData, setLoginData] = useState({});

    const history = useHistory();

    const handleRegisterSubmit = e => {
        e.preventDefault();
        const { name, email, password, password2 } = loginData;
        if (name && email && password && password2) {
            if (password !== password2) {
                alert("Password Not Matched")
            }
            else {
                registerUser(name, email, password, history);
            }

        }
        

    }

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData }
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }
    return (
        <Container>


            <Grid container spacing={2}>
                <Grid item sx={{ mt: 7 }} xs={12} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Register
                    </Typography>
                    {loading ? <CircularProgress /> :
                        <form onSubmit={handleRegisterSubmit}>
                            <TextField
                                onBlur={handleOnBlur}
                                sx={{ width: "75%", m: 1 }}
                                id="standard-basic"
                                label="Your Name"
                                variant="standard"
                                name="name" />
                            <TextField
                                onBlur={handleOnBlur}
                                sx={{ width: "75%", m: 1 }}
                                id="standard-basic"
                                label="Your Email"
                                variant="standard"
                                name="email" />

                            <TextField
                                onBlur={handleOnBlur}
                                sx={{ width: "75%", m: 1 }}
                                id="standard-basic"
                                label="Password"
                                variant="standard"
                                type="password"
                                name="password"
                            />
                            <TextField
                                onBlur={handleOnBlur}
                                sx={{ width: "75%", m: 1 }}
                                id="standard-basic"
                                label="Confirm Password"
                                variant="standard"
                                type="password"
                                name="password2"
                            />
                            <Button sx={{ width: "50%", m: 1 }}
                                type="submit" variant="contained">Register</Button>
                            <NavLink
                                style={{ textDecoration: "none" }}
                                to="/login">
                                <Button sx={{ width: "50%", m: 1 }} variant="text" color="inherit">Already Registered? Please Login</Button>
                            </NavLink>
                        </form>
                    }
                    {
                        user?.email && <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            User created <strong>successfully</strong>
                        </Alert>
                    }
                    {
                        authError && <Alert severity="error">
                            <AlertTitle>{authError}</AlertTitle>
                        </Alert>
                    }
                </Grid>
                <Grid item xs={12} md={6}>
                    <img
                        style={{ width: "100%" }}
                        alt=""
                        src={login}
                    />

                </Grid>
            </Grid>


        </Container>
    );
};

export default Registration;