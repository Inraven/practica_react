import React, { useState, useContext } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { MapContext } from './Layout';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 23.249426,
  lng: -106.410063
};

const markerPosition = {
  lat: 23.249426,
  lng: -106.410063
};

const markerInfo = {
  title: '¡Hola desde Mazatlán!',
  content: 'Este es un hermoso puerto en el Pacífico Mexicano.'
};

function MapComponent() {
  const { isLoaded, loadError } = useContext(MapContext);
  const [activeMarker, setActiveMarker] = useState(null);

  const handleMarkerClick = (marker) => {
    if (marker === activeMarker) {
      setActiveMarker(null);
    } else {
      setActiveMarker(marker);
    }
  };

  if (loadError) {
    return <div className="p-4 text-red-600 bg-red-100 border border-red-400 rounded-md">Error al cargar Google Maps: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div className="p-4 text-center text-gray-700">Cargando mapa...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        <Marker
          position={markerPosition}
          title={markerInfo.title}
          onClick={() => handleMarkerClick(markerPosition)}
        />
        {activeMarker && activeMarker.lat === markerPosition.lat && activeMarker.lng === markerPosition.lng && (
          <InfoWindow
            position={markerPosition}
            onCloseClick={() => setActiveMarker(null)}
          >
            <div className="p-2" style={{ backgroundColor: 'white' }}>
              <h2 className="text-lg font-semibold" style={{ color: '#2D3748' }}>
                {markerInfo.title}
              </h2>
              <p className="text-sm" style={{ color: '#4A5568' }}>
                {markerInfo.content}
              </p>
              <a
                href="https://es.wikipedia.org/wiki/Mazatl%C3%A1n"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 hover:underline text-xs"
                style={{ color: '#3B82F6' }}
              >
                Más sobre Mazatlán...
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

function Pages11() {
  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Actividad 11: Mi Primer Mapa con React
      </h1>
      <MapComponent />
      <p className="text-center text-gray-500 mt-8 text-sm">
        Proyecto personal para aprender Google Maps API con React.
      </p>
    </div>
  );
}

export default Pages11;
