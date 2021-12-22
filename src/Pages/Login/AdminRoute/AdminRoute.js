import { LinearProgress } from '@mui/material';
import React from 'react';
import {
    Navigate,
    useLocation
} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
const AdminRoute = ({ children, ...rest }) => {
    const {user,admin,adminLoading,loading} = useAuth();
    const location = useLocation();
    if(adminLoading || loading){return <LinearProgress/>}
    if(user.email && admin){ return children}
    return (<Navigate to="/" state={{from:location}}/>);
    };

export default AdminRoute;