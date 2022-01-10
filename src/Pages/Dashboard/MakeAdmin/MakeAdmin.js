import { Button, TextField, Alert, AlertTitle } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import AllAdmin from './AllAdmin/AllAdmin';


const MakeAdmin = () => {
    const [email, setEmail] = useState();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { token } = useAuth();

    const handleOnBlur = (e) => {
        setEmail(e.target.value);
    }
    if (success || error) {
        setTimeout(() => {
            setError(false);
            setSuccess(false);
        }, 1500);
    }

    const updateRole = (email, role) => {

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.put(`${process.env.REACT_APP_API_URL}/users/admin`, { email, role }, config)
            .then(res => {
                if (res.data.modifiedCount) {
                    setSuccess(res.data.message);
                    setError(false);
                    // console.log(res.data);
                }
                else {
                    setSuccess(false);
                    setError(res.data.message);
                    // console.log(res.data);

                }

            });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        updateRole(email, "a");
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
            <AllAdmin error={error} success={success} updateRole={updateRole}></AllAdmin>
        </>
    );
};

export default MakeAdmin;