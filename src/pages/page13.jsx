import React, { useState, useMemo, useContext } from 'react';
import { GoogleMap, MarkerF, MarkerClustererF } from '@react-google-maps/api';
import { MapContext } from './Layout';

const containerStyle = {
  width: '100%',
  height: '600px'
};

const mapCenter = {
  lat: 23.2494,
  lng: -106.4111
};

const generateRandomMarkers = (count, center) => {
  const markers = [];
  for (let i = 0; i < count; i++) {
    markers.push({
      id: `marker-${i}`,
      lat: center.lat + (Math.random() - 0.5) * 0.2,
      lng: center.lng + (Math.random() - 0.5) * 0.2
    });
  }
  return markers;
};

function MapWithClusters() {
  const { isLoaded, loadError } = useContext(MapContext);
  const [activeMarker, setActiveMarker] = useState(null);
  const locations = useMemo(() => generateRandomMarkers(200, mapCenter), []);

  const handleMarkerClick = (markerId) => {
    console.log(`Clicked marker: ${markerId}`);
    setActiveMarker(markerId);
  };

  if (loadError) {
    return <div className="p-4 text-red-600 bg-red-100 border border-red-400 rounded-md">Error al cargar Google Maps: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div className="p-4 text-center text-gray-700">Cargando mapa...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={11}
      >
        <MarkerClustererF>
          {(clusterer) =>
            locations.map((location) => (
              <MarkerF
                key={location.id}
                position={{ lat: location.lat, lng: location.lng }}
                clusterer={clusterer}
                onClick={() => handleMarkerClick(location.id)}
              />
            ))
          }
        </MarkerClustererF>
      </GoogleMap>
    </div>
  );
}

function Pages13() {
  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Actividad 13: Mapa con Agrupación de Marcadores
      </h1>
      <MapWithClusters />
      <div className="mt-6 p-4 max-w-5xl mx-auto bg-white shadow-lg rounded-lg text-gray-700">
        <h2 className="text-xl font-semibold mb-2 text-purple-600">¿Cómo funciona MarkerClustererF?</h2>
        <p className="mb-2">
          <code>MarkerClustererF</code> agrupa marcadores cercanos en clústeres cuando el mapa está alejado, mostrando un número de marcadores contenidos.
        </p>
        <p className="mb-2">
          Al hacer zoom, los clústeres se dividen, mejorando el rendimiento al renderizar menos elementos.
        </p>
      </div>
    </div>
  );
}

export default Pages13;
