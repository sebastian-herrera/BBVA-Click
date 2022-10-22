/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ScatterplotLayer } from '@deck.gl/layers';
// import { DataFilterExtension } from '@deck.gl/extensions';
import { GoogleMapsOverlay as DeckOverlay } from '@deck.gl/google-maps';
import PropTypes from 'prop-types';

// const { VITE_GOOGLE_MAP_ID } = import.meta.env;

function MyMapComponent({ center, zoom, DATA }) {
  const ref = useRef();
  const [map, setMap] = useState(null);

  const overlay = useMemo(
    () =>
      new DeckOverlay({
        layers: [
          new ScatterplotLayer({
            id: 'atm',
            data: DATA,
            pickable: true,
            opacity: 1,
            shadowEnabled: false,
            stroked: true,
            filled: true,
            radiusScale: 10,
            radiusMinPixels: 20,
            // radiusMaxPixels: 100,
            lineWidthMinPixels: 1,
            getPosition: (d) => [d.Longitud, d.Latitud],
            // getFillColor: [23, 201, 100], // verde
            getFillColor: (d) =>
              d['Estatus dispositivo'].includes('INACTIVO') ? [23, 201, 100] : [243, 18, 96], // verde
            // getFillColor: [243, 18, 96], // rojo
            // getFillColor: [151, 80, 221], // purpura
            // getFillColor: [245, 165, 36], // amarillo
            getLineColor: [0, 0, 0],
            onClick: (info) => console.log(info.object),
          }),
        ],
      }),
    [],
  );

  useEffect(() => {
    if (map) {
      map.setCenter(center);
      map.setZoom(zoom);
      overlay.setMap(map);
    }
  }, [map, center, zoom, overlay]);

  useEffect(() => {
    const windowMap = new window.google.maps.Map(ref.current, {
      // https://developers.google.com/maps/documentation/javascript/deckgl-overlay-view
      // (de aqui saque el mapId, no he dado con la opcion para hacer los edificios transparentes)
      mapId: 'fae05836df2dc8bb',
    });
    setMap(windowMap, DATA);
  }, []);

  return <div ref={ref} id="map" style={{ height: '100vh', width: '100wh' }} />;
}

MyMapComponent.propTypes = {
  center: PropTypes.shape({ lat: PropTypes.number.isRequired, lng: PropTypes.number.isRequired })
    .isRequired,
  zoom: PropTypes.number.isRequired,
};

export default MyMapComponent;
