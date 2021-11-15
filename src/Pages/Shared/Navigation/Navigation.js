import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

export const linkStyle = {
  textDecoration: "none",
  color: "white"
}

const Navigation = () => {
  const { user, signOutUser } = useAuth();

  return (
    <Box sx={{ flexGrow: 1,mb:3 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Doctors Portal
          </Typography>
          <Link style={linkStyle} to="/">
            <Button color="inherit">Home</Button>
          </Link>
          <Link style={linkStyle} to="/appoinment">
            <Button color="inherit">Appoinment</Button>
          </Link>
          {
            user?.email ?
              <>
                <Link style={linkStyle} to="/dashboard">
                  <Button color="inherit">Dashboard</Button>
                </Link>
                <Button onClick={signOutUser} color="inherit">Logout</Button>
              </> :
              <NavLink style={linkStyle} to="/login">
                <Button color="inherit">Login</Button>
              </NavLink>
          }

        </Toolbar>
      </AppBar >
    </Box >
  );
};

export default Navigation;