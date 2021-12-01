import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useHistory } from 'react-router';

const Appoinment = ({ date }) => {
    const { user } = useAuth();
    const [appoinment, setAppoinment] = useState([]);
    const history = useHistory();
    const payNow = (appoinmentId) => {
        history.push(`/dashboard/payment/${appoinmentId}`);
    }
    useEffect(() => {
        const url = `http://localhost:5000/appoinments?email=${user.email}&date=${date.toLocaleDateString()}`;
        axios.get(url)
            .then(res => setAppoinment(res.data));
    }, [date, user.email]);

    return (
        <div>
            <h2>Appoinments: {appoinment.length}</h2>
            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="Appoinments table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Patient Name</TableCell>
                            <TableCell align="center" >Time</TableCell>
                            <TableCell align="center" >CheckUp</TableCell>
                            <TableCell align="center" >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appoinment.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.patientName}
                                </TableCell>
                                <TableCell align="center">{row.slot}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">
                                    {
                                        row.isPaid ? "Paid" :
                                            <Button onClick={() => payNow(row._id)} variant="outlined" color="success">Pay</Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Appoinment;