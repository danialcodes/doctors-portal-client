import { Container, Grid, TextField, Typography, Button, CircularProgress, Alert, AlertTitle } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import login from "../../../images/login.png";
const Login = () => {
    const { user, loginUser, loading, authError,loginUserUsingGoogle } = useAuth();
    const [loginData, setLoginData] = useState({});

    const location = useLocation();
    const history = useHistory();

    const handleLoginSubmit = e => {
        e.preventDefault();
        const { email, password } = loginData;
        loginUser(email, password, location, history);
    }
    const handleGoogleLogin =() => {
        loginUserUsingGoogle(location, history);
    }
    const handleOnchange = e => {
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
                        LOGIN
                    </Typography>
                    {loading && <CircularProgress />}
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            onBlur={handleOnchange}
                            sx={{ width: "75%", m: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            variant="standard"
                            name="email" />

                        <TextField
                            onBlur={handleOnchange}
                            sx={{ width: "75%", m: 1 }}
                            id="standard-basic"
                            label="Password"
                            variant="standard"
                            type="password"
                            name="password"
                        />
                        <Button sx={{ width: "50%", m: 1 }}
                            type="submit" variant="contained">Login</Button>
                        <NavLink
                            style={{ textDecoration: "none" }}
                            to="/register">
                            <Button sx={{ width: "50%", m: 1 }} variant="text" color="inherit">New User? Please Register</Button>
                        </NavLink>
                    </form>
                    {
                        user?.email && <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            Login <strong>successfully</strong>
                        </Alert>
                    }
                    {
                        authError && <Alert severity="error">
                            <AlertTitle>{authError}</AlertTitle>
                        </Alert>
                    }
                    <Button onClick={handleGoogleLogin} sx={{ width: "50%", m: 1 }} variant="contained">Google Sign In</Button>
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

export default Login;