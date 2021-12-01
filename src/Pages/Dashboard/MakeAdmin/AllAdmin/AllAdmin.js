import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'; import RemoveModeratorOutlinedIcon from '@mui/icons-material/RemoveModeratorOutlined'; import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

// import useAuth from '../../../../hooks/useAuth';
const columns = [
    { id: 'displayName', label: 'Name', minWidth: 150 },
    {
        id: 'email',
        label: 'Email',
        minWidth: 150,
        align: 'center',
    },
    {
        id: 'role',
        label: 'Role',
        minWidth: 100,
        align: 'center',
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 150,
        align: 'right',
    },
];




const AllAdmin = ({ error, success, updateRole }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const url = "http://localhost:5000/users";
        axios.get(url)
            .then(res => setUsers(res.data));
    }, [error, success]);


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    return (

        <div>
            <h2>Total Users: {users.length}</h2>
            <Paper sx={{ width: '80%', mx: "auto", overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 300 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>

                                    <TableCell >{row.displayName}</TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    {
                                        row.role === "admin" ? <>
                                            <TableCell align="center">Admin</TableCell>
                                            <TableCell align="right"><Button onClick={() => updateRole(row.email, "r")} variant="outlined" color='error'><RemoveModeratorOutlinedIcon /></Button></TableCell>
                                        </> : <>
                                            <TableCell align="center">Normal User</TableCell>
                                            <TableCell align="right"><Button onClick={() => updateRole(row.email, "a")} variant="outlined" color="success"><AdminPanelSettingsOutlinedIcon /></Button></TableCell>
                                        </>
                                    }
                                </TableRow>)
                            }


                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
};

export default AllAdmin;