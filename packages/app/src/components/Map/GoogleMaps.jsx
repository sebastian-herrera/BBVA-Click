import React, { useState } from 'react';
import { Button } from '@nextui-org/react';

import DATA from '@/data/atm.json';
import MyMapComponent from './MyMapComponent';

function GoogleMaps() {
  // const center = { lat: 25, lng: -100 };
  // const zoom = 6;
  const center = { lat: 19.46, lng: -99.194 };
  const zoom = 19;

  const [data, setData] = useState(DATA);
  const [number, setNumber] = useState(1131);

  const onNewDataArrive = () => {
    const updateATM = data.map((atm) => {
      if (atm.ATM === number) {
        return {
          ...atm,
          'Estatus dispositivo': 'INACTIVO',
        };
      }
      setNumber(number + 1);
      if (number > 100);
      return atm;
    });

    setData(updateATM);
  };

  return (
    <>
      <MyMapComponent center={center} zoom={zoom} DATA={data} />

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
