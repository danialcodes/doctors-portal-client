import { Button, TextField, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState(false);
    const { token } = useAuth();
    const handleOnBlur = (e) => {
        setEmail(e.target.value);
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.put("https://danialcodes-doctors-portal.herokuapp.com/users/admin", { email }, config)
            .then(res => {
                if (res.data.modifiedCount) {
                    setSuccess(res.data.message);
                    setError(false);
                    console.log(res.data);
                }
                else {
                    setSuccess(false);
                    setError(res.data.message);
                    console.log(res.data);

                }
            });
    }
    return (
        <>
            <h2>Make me admin</h2>
            <form onSubmit={handleOnSubmit}>
                <TextField sx={{ width: "50%" }} label="Email" type="email" variant="standard" onBlur={handleOnBlur} />

                <Button type="submit" variant="contained">Make Admin</Button>
            </form>
            {
                success && <Alert severity="success">
                    <AlertTitle>{success}</AlertTitle>
                </Alert>
            }
            {
                error && <Alert severity="warning">
                    <AlertTitle>{error}</AlertTitle>
                </Alert>
            }
        </>
    );
};

export default MakeAdmin;