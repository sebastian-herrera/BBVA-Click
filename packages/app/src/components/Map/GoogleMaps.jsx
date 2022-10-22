import React, { useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Button } from '@nextui-org/react';

import DATA from '@/data/atm.json';
import MyMapComponent from './MyMapComponent';

const { VITE_GOOGLE_MAPS_API_KEY } = import.meta.env;

const renderMap = (status) => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  return null;
};

function GoogleMaps() {
  const center = { lat: 25, lng: -100 };
  const zoom = 6;

  const [data, setData] = useState(DATA);

  const onNewDataArrive = () => {
    const updateATM = data.map((atm) => {
      if (atm.ATM === 1131) {
        return {
          ...atm,
          'Estatus dispositivo': 'INACTIVO',
        };
      }
      return atm;
    });

    setData(updateATM);
  };

  return (
    <>
      <Wrapper apiKey={VITE_GOOGLE_MAPS_API_KEY} render={renderMap}>
        <MyMapComponent center={center} zoom={zoom} DATA={data} />
      </Wrapper>

      <Button
        auto
        onPress={onNewDataArrive}
        css={{ position: 'absolute', bottom: '$12', left: '$4' }}
      >
        Actualizar
      </Button>
    </>
  );
}

export default GoogleMaps;
