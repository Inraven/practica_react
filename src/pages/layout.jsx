
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { useJsApiLoader } from '@react-google-maps/api';

const LIBRARIES = ['places', 'drawing'];

export const MapContext = React.createContext();

const Layout = () => {
  const navigate = useNavigate();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  return (
    <MapContext.Provider value={{ isLoaded, loadError }}>
      <AppBar 
        position="fixed" 
        sx={{ 
          width: "100vw", 
          bgcolor: "grey.900"
        }}
      >
        <Toolbar>
          <Box>
            <Typography 
              variant="h6" 
              sx={{ 
                flexGrow: 1, 
                textDecoration: "none", 
                color: "white", 
                fontWeight: 700 
              }}
            >
            Angel Ruiz
            </Typography>
            <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
            <Button color="inherit" onClick={() => navigate("/page11")}>Actividad 11</Button>
            <Button color="inherit" onClick={() => navigate("/page12")}>Actividad 12</Button>
            <Button color="inherit" onClick={() => navigate("/page13")}>Actividad 13</Button>
            <Button color="inherit" onClick={() => navigate("/page14")}>Actividad 14</Button>
            <Button color="inherit" onClick={() => navigate("/page15")}>Actividad 15</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: "64px", padding: "20px" }}>
        <Outlet />
      </Container>
    </MapContext.Provider>
  );
};

export default Layout;