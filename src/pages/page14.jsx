import React, { useState, useCallback, useRef, useContext } from 'react';
import { GoogleMap, DrawingManager } from '@react-google-maps/api';
import { MapContext } from './Layout';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Button, 
  Divider, 
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Drawer
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e', 
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    }
  },
});

const drawerWidth = 380; 

const mapContainerOuterStyle = {
  position: 'relative',
  width: '100%',
  height: 'calc(100vh - 128px)', 
};

const mapContainerInnerStyle = {
  width: '100%',
  height: '100%' 
};

const mapCenter = {
  lat: 23.2494,
  lng: -106.4111
};

const drawingManagerOptions = {
  drawingControl: true,
  drawingControlOptions: {
    position: typeof window !== 'undefined' && window.google ? window.google.maps.ControlPosition.TOP_CENTER : 1,
    drawingModes: typeof window !== 'undefined' && window.google ? [
      window.google.maps.drawing.OverlayType.POLYGON,
      window.google.maps.drawing.OverlayType.RECTANGLE,
      window.google.maps.drawing.OverlayType.POLYLINE,
      window.google.maps.drawing.OverlayType.CIRCLE,
      window.google.maps.drawing.OverlayType.MARKER,
    ] : ['polygon', 'rectangle', 'polyline', 'circle', 'marker'],
  },
  markerOptions: { draggable: true, icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" } },
  polylineOptions: { editable: true, strokeColor: '#90caf9' },
  rectangleOptions: { editable: true, fillColor: '#90caf9', strokeColor: '#90caf9', fillOpacity: 0.3 },
  circleOptions: { editable: true, fillColor: '#f48fb1', strokeColor: '#f48fb1', fillOpacity: 0.3 },
  polygonOptions: { editable: true, fillColor: '#90caf9', strokeColor: '#90caf9', fillOpacity: 0.3 },
};

const mapDarkStyle = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
  { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
  { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
  { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
];

function MapComponent({ onOverlayComplete, onDrawingManagerLoad }) {
  const { isLoaded, loadError } = useContext(MapContext);

  if (loadError) {
    return <Typography color="error" p={2}>Error al cargar Google Maps: {loadError.message}</Typography>;
  }

  if (!isLoaded) {
    return <Typography p={2} textAlign="center">Cargando mapa...</Typography>;
  }

  return (
    <GoogleMap 
      mapContainerStyle={mapContainerInnerStyle} 
      center={mapCenter} 
      zoom={13}
      options={{ styles: mapDarkStyle, fullscreenControl: false, streetViewControl: false, mapTypeControl: false, zoomControl: true }}
    >
      <DrawingManager onLoad={onDrawingManagerLoad} onOverlayComplete={onOverlayComplete} options={drawingManagerOptions} />
    </GoogleMap>
  );
}

function Pages14() {
  const [drawnShapes, setDrawnShapes] = useState([]);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const drawingManagerRef = useRef(null);
  const [drawerOpen, setDrawerOpen] = useState(false); 

  const getPathCoordinates = (path) => path.getArray().map(coord => ({ lat: coord.lat(), lng: coord.lng() }));
  const getRectangleCoordinates = (bounds) => {
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    return [ { lat: ne.lat(), lng: sw.lng() }, { lat: ne.lat(), lng: ne.lng() }, { lat: sw.lat(), lng: ne.lng() }, { lat: sw.lat(), lng: sw.lng() } ];
  };
  const getCircleCoordinates = (center, radius) => ({ center: { lat: center.lat(), lng: center.lng() }, radius });
  const getMarkerCoordinates = (marker) => ({ lat: marker.getPosition().lat(), lng: marker.getPosition().lng() });

  const onOverlayComplete = useCallback((event) => {
    const newShape = event.overlay;
    newShape.googleMapsType = event.type; 
    const shapeId = Date.now();
    const shapeInfo = { id: shapeId, type: event.type, overlay: newShape };

    if (event.type === window.google.maps.drawing.OverlayType.POLYGON || event.type === window.google.maps.drawing.OverlayType.POLYLINE) {
      shapeInfo.coordinates = getPathCoordinates(newShape.getPath());
    } else if (event.type === window.google.maps.drawing.OverlayType.RECTANGLE) {
      shapeInfo.coordinates = getRectangleCoordinates(newShape.getBounds());
    } else if (event.type === window.google.maps.drawing.OverlayType.CIRCLE) {
      shapeInfo.coordinates = getCircleCoordinates(newShape.getCenter(), newShape.getRadius());
    } else if (event.type === window.google.maps.drawing.OverlayType.MARKER) {
      shapeInfo.coordinates = getMarkerCoordinates(newShape);
    }
    setDrawnShapes(prevShapes => [...prevShapes, shapeInfo]);
    if (drawingManagerRef.current && drawingManagerRef.current.instance) {
        drawingManagerRef.current.instance.setDrawingMode(null);
    }
    newShape.addListener('click', () => {
      setSelectedShapeId(shapeId);
      setDrawerOpen(true); 
    });
  }, []);

  const onDrawingManagerLoad = useCallback((dm) => {
    drawingManagerRef.current = dm;
  }, []);

  const handleDeleteSelectedShape = useCallback(() => {
    if (selectedShapeId) {
      const shapeToDelete = drawnShapes.find(shape => shape.id === selectedShapeId);
      if (shapeToDelete && shapeToDelete.overlay) shapeToDelete.overlay.setMap(null); 
      setDrawnShapes(prevShapes => prevShapes.filter(shape => shape.id !== selectedShapeId));
      setSelectedShapeId(null);
    }
  }, [selectedShapeId, drawnShapes]);

  const handleDeleteAllShapes = useCallback(() => {
    drawnShapes.forEach(shape => { if (shape.overlay) shape.overlay.setMap(null); });
    setDrawnShapes([]);
    setSelectedShapeId(null);
  }, [drawnShapes]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };
  
  const drawerContent = (
    <Box
      sx={{ width: drawerWidth, p: 2.5, height: '100%', display: 'flex', flexDirection: 'column' }}
      role="presentation"
    >
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb:1}}>
        <Typography variant="h5" sx={{color: 'primary.main'}}>
          Formas Dibujadas
        </Typography>
        <IconButton onClick={toggleDrawer(false)} sx={{color: 'text.secondary'}}>
            <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider sx={{mb: 2, borderColor: 'rgba(255, 255, 255, 0.12)'}} />
      {drawnShapes.length === 0 && <Typography variant="body2" color="textSecondary" sx={{textAlign: 'center', mt:2}}>No hay formas dibujadas aún.</Typography>}
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        <List dense>
          {drawnShapes.map((shape, index) => (
            <ListItem 
              key={shape.id}
              disablePadding
              secondaryAction={
                selectedShapeId === shape.id ? (
                  <IconButton edge="end" aria-label="delete selected" onClick={handleDeleteSelectedShape} size="small">
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                ) : null
              }
              sx={{ 
                mb: 1.5, 
                border: '1px solid rgba(255, 255, 255, 0.12)', 
                borderRadius: '8px',
                backgroundColor: selectedShapeId === shape.id ? 'rgba(144, 202, 249, 0.16)' : 'transparent',
                '&:hover': { backgroundColor: 'rgba(144, 202, 249, 0.08)' }
              }}
              onClick={() => {
                setSelectedShapeId(shape.id);
                if (shape.overlay && shape.overlay.getMap()) { 
                  const map = shape.overlay.getMap();
                  if (shape.type === window.google.maps.drawing.OverlayType.MARKER) {
                    map.panTo(shape.overlay.getPosition());
                  } else if (shape.overlay.getBounds) { 
                    map.fitBounds(shape.overlay.getBounds());
                  }
                }
              }}
            >
              <ListItemText
                primary={`Forma ${index + 1}: ${shape.type.toString().replace('google.maps.drawing.OverlayType.', '').toLowerCase()}`}
                primaryTypographyProps={{ variant: 'subtitle1', color: 'text.primary', sx: {textTransform: 'capitalize', fontWeight: 'medium'} }}
                secondary={
                  <Box component="div" sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.5, wordBreak: 'break-all' }}>
                    {shape.type === window.google.maps.drawing.OverlayType.MARKER && shape.coordinates && 
                      `Lat: ${shape.coordinates.lat.toFixed(4)}, Lng: ${shape.coordinates.lng.toFixed(4)}`}
                    {shape.type === window.google.maps.drawing.OverlayType.CIRCLE && shape.coordinates &&
                      `Centro: Lat: ${shape.coordinates.center.lat.toFixed(4)}, Lng: ${shape.coordinates.center.lng.toFixed(4)} | Radio: ${shape.coordinates.radius.toFixed(1)}m`}
                    {(shape.type === window.google.maps.drawing.OverlayType.POLYGON || 
                      shape.type === window.google.maps.drawing.OverlayType.POLYLINE || 
                      shape.type === window.google.maps.drawing.OverlayType.RECTANGLE) && 
                      shape.coordinates && Array.isArray(shape.coordinates) && (
                        shape.coordinates.map((coord, i) => (
                          <div key={i}>{`Vértice ${i+1}: Lat: ${coord.lat.toFixed(4)}, Lng: ${coord.lng.toFixed(4)}`}</div>
                        ))
                      )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      {drawnShapes.length > 0 && (
        <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.12)', flexShrink: 0 }}>
          {selectedShapeId && (
            <Button 
              variant="contained" 
              color="error" 
              onClick={handleDeleteSelectedShape} 
              fullWidth 
              startIcon={<DeleteIcon />}
              sx={{ mb: 1 }}
            >
              Eliminar Seleccionada
            </Button>
          )}
          <Button 
            variant="outlined" 
            color="inherit" 
            onClick={handleDeleteAllShapes} 
            fullWidth 
            startIcon={<ClearAllIcon />}
          >
            Eliminar Todas
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)'}}> {}
        <Typography variant="h4" component="h1" align="center" color="primary.main" gutterBottom 
          sx={{fontWeight: 'bold', py:2, flexShrink: 0}}>
          Herramientas de Dibujo
        </Typography>
        
        <Box sx={{ flexGrow: 1, position: 'relative' }}> {}
          <Box sx={{ ...mapContainerOuterStyle }}> {}
            <MapComponent 
              onOverlayComplete={onOverlayComplete}
              onDrawingManagerLoad={onDrawingManagerLoad}
            />
          </Box>
          <IconButton 
            onClick={toggleDrawer(true)}
            sx={{
              position: 'absolute',
              top: '10px', 
              right: '10px',
              zIndex: 1250, 
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'rgba(144, 202, 249, 0.08)'
              },
              display: drawerOpen ? 'none' : 'flex' 
            }}
            aria-label="Abrir panel de formas"
          >
            <MenuIcon color="primary"/>
          </IconButton>
          <Drawer
            variant="persistent" 
            anchor="right"
            open={drawerOpen}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                height: 'calc(100vh - 64px - 72px)',
                top: `calc(64px + 72px)`, 
                borderLeft: '1px solid rgba(255,255,255,0.12)',
                bgcolor: 'background.paper'
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </Box>
         <Typography variant="caption" display="block" align="center" color="textSecondary" 
            sx={{ py:1, flexShrink: 0 }}>
          Dibuja polígonos, rectángulos, polilíneas, círculos o marcadores en el mapa.
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default Pages14;
