// import https from 'https';
import axios from 'axios';
// import fetch from 'node-fetch';
import { httpError } from '../helpers';
import { jsonAtms } from './atms';

const getLatLog = async (req, res) => {
  // console.log(req.body.queryResult.outputContexts);
  // console.log(`${req.body.queryResult.outputContexts[0].parameters.location['street-address']} ${req.body.queryResult.outputContexts[0].parameters.location.city}`);
  // console.log(req.body.queryResult.outputContexts[0].parameters);

  console.log(req.body.queryResult.outputContexts[0].parameters.location);
  if (req.body.queryResult.outputContexts[0].parameters.location === '') {
    return res.end(
      JSON.stringify({
        fulfillmentText: `usuario envio una ubicacion incorrecta gracias por comunicarse con BBVA`,
      }),
    );
  }

  // ? Primero getLocation
  const locationPeople = `${req.body.queryResult.outputContexts[0].parameters.location['street-address']} ${req.body.queryResult.outputContexts[0].parameters.location?.city}`;
  // console.log(locationPeople);
  // console.log(req.body.queryResult.outputContexts[0].parameters.location.city);
  // ? Segundo Location a Coor(Lat,Long)
  // street - address;
  const buscarUbicacion = async (location) => {
    const key = 'AIzaSyDmfIs0rVoARGE4R-ClY5-yxgQOdjGxpdQ';

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`;

    const dataLatLongMaps = await axios
      .get(`${url}`)
      .then((response) => response.data.results[0].geometry.location);
    return dataLatLongMaps;
  };

  const getLocationPeople = await buscarUbicacion(locationPeople);

  // ? Comparar Latitudes
  const getKilometros = function (lat1, lon1, lat2, lon2) {
    const rad = function (x) {
      return (x * Math.PI) / 180;
    };
    const R = 6378.137; // Radio de la tierra en km
    const dLat = rad(lat2 - lat1);
    const dLong = rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d.toFixed(3); // Retorna tres decimales
  };

  const dataCajeros = jsonAtms.map(
    ({ Sitio, Calle, Estado, Ciudad, Colonia, Latitud, Longitud }) => {
      const { lat, lng } = getLocationPeople;
      const getKmTwoPoints = getKilometros(Latitud, Longitud, lat, lng);
      return {
        Sitio,
        Calle,
        Estado,
        Ciudad,
        Colonia,
        Latitud,
        Longitud,
        Kilometros: getKmTwoPoints,
      };
    },
  );

  const groupData1 = await dataCajeros;
  // console.log(groupData1);
  const aprobadoDataSend = await groupData1.map((item) => {
    if (item.Kilometros > 1.0) {
      return 0;
    }
    return item;
  });

  const data1 = await aprobadoDataSend.filter((item) => item !== 0);

  const menssageSend = await data1.map(
    ({
      Sitio,
      Calle,
      Estado,
      Ciudad,
      Colonia,
      // Latitud,
      // Longitud,
      Kilometros,
    }) => `\n_________________________________
   \n ubicado en ${Sitio},
   \n calle:${Calle},
   \n Estado: ${Estado},
   \n Ciudad: ${Ciudad},
   \n Colonia: ${Colonia}
   \n Kilometros: ${Kilometros}
   \n_________________________________
   `,
  );

  const groupData = await `${
    menssageSend.length > 0 ? menssageSend : 'No hay cajeros cercanos :,3'
  }`;

  // console.log(groupData);

  // 835km

  try {
    // const locationPrueba = `${req.body.queryResult.outputContexts[0].parameters.location}`;

    // const locationPrueba =
    // 'Calz. de la Viga 672, Barrio de Zapotla, Iztacalco, 08610 Ciudad de México, CDMX';

    // const locationPrueba =
    //   'Av. División del Nte., San Pablo Tepetlapa, Coyoacán, 04620 Ciudad de México, CDMX';

    // console.log(latlong);

    return res.end(
      JSON.stringify({
        fulfillmentText: `${groupData}`,
      }),
    );
  } catch (err) {
    return httpError(res, err);
  }
};

const createExample = async ({ body }, res) => {
  try {
    const { example } = body;
    console.log(example);

    return res.status(201).end();
  } catch (err) {
    return httpError(res, err);
  }
};

export { getLatLog, createExample };
