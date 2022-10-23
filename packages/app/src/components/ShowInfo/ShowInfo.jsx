import React, { useState, useEffect } from 'react';
import { Card, Text, Button } from '@nextui-org/react';

function ShowInfo() {
  const [data, setData] = useState({
    atmsTotal: 13.0,
    fallasTotal: 18,
    sucursales: 150,
  });
  const [card, setCard] = useState({
    title: 'Mostrar Menos',
    status: false,
  });

  // const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData({
        atmsTotal: 3333,
        fallasTotal: 888,
        sucursales: 555,
      });
    }, 5000);
  }, []);

  const showInfo = () => {
    // eslint-disable-next-line no-unused-expressions
    card.status
      ? setCard({
          title: 'Mostrar Mas',
          status: false,
        })
      : setCard({
          title: 'Mostrar menos',
          status: true,
        });
  };

  return (
    <Card
      css={{
        position: 'fixed',
        top: 0,
        left: 10,
        w: `${card.status ? '30%' : '20%'}`,
        h: `${card.status ? '400px' : '200px'}`,
        my: 20,
        p: 16,
        backgroundColor: '$colors$primary',
        color: '#fff',
      }}
    >
      <Text css={{ color: '#fff' }} h2>
        Informacion Global
      </Text>
      <Text css={{ color: '#fff' }} h3>
        Atms: {data.atmsTotal}
      </Text>
      <Text css={{ color: '#fff' }} h3>
        Fallas: {data.fallasTotal}
      </Text>
      <Text css={{ color: '#fff' }} h3>
        Sucursales: {data.sucursales}
      </Text>

      <Button onClick={showInfo} auto color="secondary" css={{ position: 'fixed', bottom: 0 }}>
        {card.title}
      </Button>
    </Card>
  );
}

export default ShowInfo;
