import React, { useState } from 'react';
import { Button, Input, TextField } from '@mui/material';
import axios from 'axios';

const AddDoctor = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        if (!image) {
            return
        }
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("image", image);

        axios.post(`${process.env.REACT_APP_API_URL}/doctors`, formData)
            .then(res => {
                if (res.data.insertedId) {
                    setSuccess("Doctor Added Successfully");
                }
                else {
                    setError("Unsuccessfull doctor add");

                }
            }).catch(err => console.log(err));

    }
    return (
        <>
            <h2>Add a doctor</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ width: "50%" }}
                    required
                    label="Name"
                    onChange={e => setName(e.target.value)}
                    variant="standard" />
                <br />
                <TextField
                    sx={{ width: "50%" }}
                    required
                    label="Email"
                    onChange={e => setEmail(e.target.value)}

                    variant="standard" />
                <br />
                <Input
                    accept="image/*"
                    type="file"
                    onChange={e => setImage(e.target.files[0])}
                />
                <br />
                <Button variant="contained" type="submit">
                    Add Doctor
                </Button>
            </form>
            {
                success && <p style={{ color: 'green' }}>{success}</p>
            }
            {
                error && <p style={{ color: 'red' }}>{error}</p>
            }
        </>
    );
};

export default AddDoctor;