import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { ScatterplotLayer } from '@deck.gl/layers';
import PropTypes from 'prop-types';

const { VITE_GOOGLE_MAPS_API_KEY, VITE_GOOGLE_MAP_ID } = import.meta.env;

function MyMapComponent({ center, zoom, DATA }) {
  const { isLoaded } = useJsApiLoader({
    id: 'map',
    googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY,
  });
  const [markersLoaded, setMarkersLoaded] = useState(false);
  const deckOverlay = useRef(new GoogleMapsOverlay({ layers: [] }));
  const fecthMarkers = useCallback(async () => {
    deckOverlay.current.setProps({
      layers: [
        new ScatterplotLayer({
          id: 'atm',
          data: DATA,
          pickable: true,
          autoHighlight: true,
          stroked: true,
          lineWidthMinPixels: 1,
          getLineColor: [0, 0, 0],
          radiusScale: 20,
          radiusMinPixels: 6,
          // radiusMaxPixels: 100,
          getPosition: (d) => [d.Longitud, d.Latitud],
          // getFillColor: [23, 201, 100], // verde
          // getFillColor: [243, 18, 96], // rojo
          getFillColor: (d) =>
            d['Estatus dispositivo'].includes('INACTIVO') ? [243, 18, 96] : [23, 201, 100],
          // getFillColor: [151, 80, 221], // purpura
          // getFillColor: [245, 165, 36], // amarillo
          onClick: (info) => console.log(info.object),
        }),
      ],
    });
    setMarkersLoaded(true);
  }, [DATA]);

  useEffect(() => {
    fecthMarkers();
  }, [DATA]);

  const onLoad = React.useCallback((map) => {
    deckOverlay.current.setMap(map);
    map.setCenter(center);
    map.setZoom(zoom);
  }, []);

  const onUnmount = React.useCallback(() => {
    deckOverlay.current?.finalize();
  }, []);

  return markersLoaded && isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100vw', height: '100vh' }}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{ mapId: VITE_GOOGLE_MAP_ID }}
    />
  ) : null;
}

MyMapComponent.propTypes = {
  center: PropTypes.shape({ lat: PropTypes.number.isRequired, lng: PropTypes.number.isRequired })
    .isRequired,
  zoom: PropTypes.number.isRequired,
  DATA: PropTypes.arrayOf(
    PropTypes.shape({
      ATM: PropTypes.number,
    }),
  ).isRequired,
};

export default MyMapComponent;
