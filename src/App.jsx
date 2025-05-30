import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Stack,
  styled,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MapIcon from '@mui/icons-material/Map';
import RouteIcon from '@mui/icons-material/Route';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';

const activities = [
  {
    id: '11',
    title: 'Actividad 11: Mapa Básico',
    icon: <MapIcon />,
    color: '#64b5f6', 
    description: 'Introducción a Google Maps en React, mostrando un mapa centrado con un marcador y una ventana de información interactiva.',
    purpose: 'Aprender a integrar un mapa de Google en una aplicación React, centrarlo en una ubicación específica, añadir un marcador y mostrar información al hacer clic en él.',
    tools: ['React', '@react-google-maps/api (GoogleMap, Marker, InfoWindow)', 'MUI'],
    learned: 'Configuración inicial de la API de Google Maps en React, manejo de estado para InfoWindow, uso de componentes básicos de mapas.',
    challenges: 'Configuración de API Key y restricciones, estilos en InfoWindow.'
  },
  {
    id: '12',
    title: 'Actividad 12: Ruta entre Dos Puntos',
    icon: <RouteIcon />,
    color: '#81c784', 
    description: 'Implementación del cálculo y visualización de una ruta entre dos ubicaciones fijas utilizando los servicios de direcciones de Google Maps.',
    purpose: 'Implementar el cálculo y visualización de una ruta entre dos puntos fijos utilizando DirectionsService y DirectionsRenderer.',
    tools: ['React', '@react-google-maps/api (DirectionsService, DirectionsRenderer)', 'MUI'],
    learned: 'Uso de DirectionsService, manejo de callbacks y estado de respuesta, uso de DirectionsRenderer para dibujar rutas.',
    challenges: 'Habilitación correcta de Directions API en Google Cloud, depuración de errores de carga de librería.'
  },
  {
    id: '13',
    title: 'Actividad 13: Agrupación de Marcadores',
    icon: <GroupWorkIcon />,
    color: '#ffb74d', 
    description: 'Visualización de múltiples marcadores en un mapa, agrupándolos automáticamente para mejorar el rendimiento y la claridad visual.',
    purpose: 'Mostrar múltiples ubicaciones y agrupar marcadores mediante MarkerClustererF, mejorando la visualización y eficiencia.',
    tools: ['React', '@react-google-maps/api (MarkerClustererF, MarkerF)', 'MUI'],
    learned: 'Implementación de MarkerClustererF, generación de múltiples marcadores, comprensión del impacto del clustering.',
    challenges: 'Sintaxis de "función como hijo" para MarkerClustererF.'
  },
  {
    id: '14',
    title: 'Actividad 14: Herramientas de Dibujo',
    icon: <EditLocationAltIcon />,
    color: '#ba68c8', 
    description: 'Integración de herramientas que permiten al usuario dibujar formas (polígonos, círculos, etc.) directamente en el mapa y ver sus coordenadas.',
    purpose: 'Permitir al usuario dibujar formas en el mapa, mostrar sus coordenadas en un panel lateral y permitir su eliminación.',
    tools: ['React', '@react-google-maps/api (DrawingManager)', 'MUI (Drawer, List)'],
    learned: 'Uso de DrawingManager, manejo de evento onOverlayComplete, extracción de coordenadas, gestión de estado de formas.',
    challenges: 'Layout responsivo del mapa y panel lateral, manejo de referencias a overlays.'
  },
  {
    id: '15',
    title: 'Actividad 15: Rutas Dinámicas y Autocompletado',
    icon: <MultipleStopIcon />,
    color: '#e57373', 
    description: 'Creación de un planificador de rutas con campos de origen y destino autocompletables y selección de modo de viaje.',
    purpose: 'Implementar una visualización de ruta donde el usuario ingresa origen/destino con autocompletado (Places API) y selecciona modo de viaje.',
    tools: ['React', '@react-google-maps/api (Autocomplete, DirectionsService, DirectionsRenderer)', 'MUI'],
    learned: 'Integración de Autocomplete, manejo de estado para campos dinámicos, recálculo de rutas, uso de useEffect para sincronización.',
    challenges: 'Sincronización de estado y llamadas API para evitar recálculos innecesarios (bug del doble clic).'
  }
];

const StyledPaper = styled(Paper)(({ theme, cardcolor }) => ({
  padding: theme.spacing(3),
  textAlign: 'left',
  color: '#ffffff', 
  backgroundColor: '#1e1e1e',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  borderLeft: `5px solid ${cardcolor}`,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 10px 20px -5px ${cardcolor}40`, 
  },
  display: 'flex',
  flexDirection: 'column',
  height: '100%', 
}));

const AccordionStyled = styled(Accordion)(({ theme }) => ({
  backgroundColor: '#303030', 
  color: '#e0e0e0', 
  '&:before': {
    display: 'none',
  },
  marginTop: theme.spacing(2),
  '& .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root': {
    color: '#b0bec5',
  },
}));

function App() {
  const navigate = useNavigate();
  const theme = useTheme(); 
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: 5, minHeight: '100vh', bgcolor: '#121212' }}> {}
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          align="center"
          sx={{ 
            fontWeight: 'bold', 
            color: theme.palette.primary.main,
            mb: 6,
            textShadow: `0px 0px 10px ${theme.palette.primary.main}50`
          }}
        >
          Portafolio de Actividades: Google Maps API con React
        </Typography>
        <Grid container spacing={4}>
          {activities.map((activity, index) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id}>
              <StyledPaper elevation={6} cardcolor={activity.color}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ mr: 1.5, color: activity.color, display: 'flex' }}>{activity.icon}</Box>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 'medium', color: '#ffffff' }}> {}
                    {activity.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="#b0bec5" sx={{ mb: 2, flexGrow: 1 }}> {}
                  {activity.description}
                </Typography>
                
                <AccordionStyled 
                  expanded={expanded === `panel${index}`} 
                  onChange={handleChange(`panel${index}`)}
                  elevation={2}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />} 
                    aria-controls={`panel${index}bh-content`}
                    id={`panel${index}bh-header`}
                  >
                    <Typography sx={{ width: '80%', flexShrink: 0, color: '#b0bec5', fontSize: '0.9rem' }}> {}
                      Más Detalles y Aprendizajes
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{display: 'flex', flexDirection: 'column', gap: 1.5}}>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom sx={{fontWeight: 'bold', color: activity.color}}>Propósito:</Typography>
                      <Typography variant="caption" color="#b0bec5">{activity.purpose}</Typography> {}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom sx={{fontWeight: 'bold', color: activity.color}}>Herramientas/Librerías:</Typography>
                      <Stack direction="row" spacing={0.5} useFlexGap flexWrap="wrap">
                        {activity.tools.map(tool => <Chip key={tool} label={tool} size="small" variant="outlined" sx={{borderColor: '#616161', color: '#e0e0e0'}} />)} {}
                      </Stack>
                    </Box>
                     <Box>
                      <Typography variant="subtitle2" gutterBottom sx={{fontWeight: 'bold', color: activity.color}}>Aprendizaje Clave:</Typography>
                      <Typography variant="caption" color="#b0bec5">{activity.learned}</Typography> {}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" gutterBottom sx={{fontWeight: 'bold', color: activity.color}}>Desafíos:</Typography>
                      <Typography variant="caption" color="#b0bec5">{activity.challenges}</Typography> {}
                    </Box>
                  </AccordionDetails>
                </AccordionStyled>

                <Button
                  variant="contained"
                  onClick={() => navigate(`/page${activity.id}`)}
                  fullWidth
                  sx={{ 
                    mt: 2, 
                    backgroundColor: activity.color, 
                    color: theme.palette.getContrastText(activity.color),
                    '&:hover': {
                      backgroundColor: theme.palette.augmentColor({ color: { main: activity.color } }).dark,
                    }
                  }}
                >
                  Ver Actividad {activity.id}
                </Button>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
