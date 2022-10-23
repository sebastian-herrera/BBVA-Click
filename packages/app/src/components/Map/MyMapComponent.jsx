import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { ScatterplotLayer } from '@deck.gl/layers';
// import { DataFilterExtension } from '@deck.gl/extensions';
// import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import PropTypes from 'prop-types';

const { VITE_GOOGLE_MAPS_API_KEY, VITE_GOOGLE_MAP_ID } = import.meta.env;

const COLORS = {
  ACTIVO: [23, 201, 100], // verde
  MANTENIMIENTO: [245, 165, 36], // amarillo
  FALLA: [243, 18, 96], // rojo
};

// eslint-disable-next-line no-unused-vars
function MyMapComponent({ center, zoom, DATA, ISSUES, TIME }) {
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
          id: 'atms',
          data: DATA,
          pickable: true,
          autoHighlight: true,
          stroked: true,
          lineWidthMinPixels: 1,
          getLineColor: [0, 0, 0],
          radiusScale: 10,
          radiusMinPixels: 6,
          radiusMaxPixels: 100,
          getPosition: (d, { index }) => [
            d.Longitud,
            d.Latitud,
            d['Estatus dispositivo'] === 'FALLA' && index * 0.02,
          ],
          // getFillColor: (d) => COLORS[d['Estatus dispositivo']],
          getFillColor: (d) =>
            // console.log(TIME);
            // console.log(TIME > ISSUES[0].FECHA_INICIO);
            // console.log(TIME);
            // console.log(ISSUES[0].FECHA_INICIO);
            // if (TIME < ISSUES[0].FECHA_INICIO) {
            //   console.log("first")
            //   return COLORS.FALLA;
            // }
            // return COLORS.ACTIVO;
            // console.log(d.ATM);COLORS.FALLA
            // const myIssues = Object.values(ISSUES).filter((issue) => issue.ATM_ID === d.ATM);
            // Object.values(myIssues).forEach((issue) => {
            //   if (true) {
            //     console.log('first');
            //     return COLORS.FALLA;
            //   }
            // });
            // if (d['Estatus dispositivo'] === 'FALLA') console.log(d);
            COLORS[d['Estatus dispositivo']],
          onClick: (info) => console.log(info.object),
        }),
      ],

      getTooltip: ({ object: obj }) =>
        obj && {
          // <h3 style="color: rgb(23, 201, 100)">${obj['Estatus dispositivo']}</h3>
          html: `
                <div>
                  <h2>ID: ${obj.ATM}</h2>
                  <h3>${obj['Estatus dispositivo']}</h3>
                  <hr />
                  <h3>Lat: ${obj.Latitud}, Lng: ${obj.Longitud}</h3>
                </div>
          `,
          style: {
            // maxWidth: '200px',
            padding: '0 10px',
          },
        },
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
      ATM: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ).isRequired,
  ISSUES: PropTypes.arrayOf(
    PropTypes.shape({
      ATM_ID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ).isRequired,
  TIME: PropTypes.number.isRequired,
};

export default MyMapComponent;
