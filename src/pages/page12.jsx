import React, { useState, useContext } from 'react';
import { GoogleMap, DirectionsService, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { MapContext } from './Layout';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const uasMazatlan = { lat: 23.2440, lng: -106.4270 };
const plazuelaMachado = { lat: 23.1975, lng: -106.4255 };

function MapWithDirections() {
  const { isLoaded, loadError } = useContext(MapContext);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [mapCenter, setMapCenter] = useState(uasMazatlan);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirectionsResponse(response);
      } else {
        console.error('Directions request failed due to ' + response.status);
        alert('Error al calcular la ruta: ' + response.status);
      }
    }
  };

  if (loadError) {
    return <div className="p-4 text-red-600 bg-red-100 border border-red-400 rounded-md">Error al cargar Google Maps: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div className="p-4 text-center text-gray-700">Cargando mapa y servicios...</div>;
  }

  return (
    <>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={13}
        >
          <DirectionsService
            options={{
              destination: plazuelaMachado,
              origin: uasMazatlan,
              travelMode: 'DRIVING'
            }}
            callback={directionsCallback}
          />
          {directionsResponse && (
            <DirectionsRenderer options={{ directions: directionsResponse }} />
          )}
          {!directionsResponse && (
            <>
              <Marker position={uasMazatlan} label="UAS" />
              <Marker position={plazuelaMachado} label="Machado" />
            </>
          )}
        </GoogleMap>
      </div>
      {directionsResponse && directionsResponse.routes[0]?.legs[0] && (
        <div className="mt-4 p-4 max-w-5xl mx-auto bg-white shadow-lg rounded-lg text-center">
          <p className="text-lg font-semibold text-gray-700">
            Distancia: {directionsResponse.routes[0].legs[0].distance.text}
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Duración Estimada: {directionsResponse.routes[0].legs[0].duration.text}
          </p>
        </div>
      )}
    </>
  );
}

function Pages12() {
  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        Actividad 12: Ruta de UAS a Plazuela Machado
      </h1>
      <MapWithDirections />
      <p className="text-center text-gray-500 mt-8 text-sm">
        Ruta calculada usando Google Maps Directions API.
      </p>
    </div>
  );
}

export default Pages12;
