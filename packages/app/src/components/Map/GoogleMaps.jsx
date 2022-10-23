import React, { useEffect, useState } from 'react';
import { Container, Button, Dropdown } from '@nextui-org/react';
import { useForm, Controller } from 'react-hook-form';

import DATA from '@/data/atm.json';
import ISSUES_DATA from '@/data/issues-raw.json';
import divisiones from './diviones.json';
import ciudades from './ciudades.json';

import MyMapComponent from './MyMapComponent';
import { TimeSlider } from '../index';

const ISSUES_DATA_CLEAN = ISSUES_DATA.map((issue) => {
  const date = issue.FECHA_INICIO.split(/[/s :]/);

  return {
    ...issue,
    FECHA_INICIO: new Date(
      `20${date[2]}-${date[1].length < 2 ? 0 : ''}${date[1]}-${date[0]}T${date[3]}:${date[4]}:00`,
    ).getTime(),
  };
});

function GoogleMaps() {
  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      Division: '',
      Ciudad: '',
    },
  });

  const center = { lat: 25, lng: -100 };
  const zoom = 6;
  // const center = { lat: 19.46016035, lng: -99.19324401 };
  // const zoom = 20;

  const [data, setData] = useState(DATA);
  // const [issues, setIssues] = useState(ISSUES_DATA_CLEAN);
  const [time, setTime] = useState(0);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    console.log(filters);
    if (Object.values(filters).length) {
      if (typeof filters.Division) {
        const asd =
          filters.Division !== ''
            ? Object.values(DATA).filter((d) => d.Division === filters.Division)
            : DATA;
        setData(asd);
      }
      if (filters.Ciudad) {
        const asd =
          filters.Ciudad !== ''
            ? Object.values(DATA).filter((d) => d.Ciudad === filters.Ciudad)
            : DATA;
        setData(asd);
      }
    }
  }, [filters]);

  useEffect(() => {
    // if (time > issues[0].FECHA_INICIO) {
    //  Object.values(ISSUES_DATA_CLEAN).filter((issue) => time > issue.FECHA_INICIO);

    ISSUES_DATA_CLEAN.map((issue) => {
      if (time > issue.FECHA_INICIO) {
        const updateATM = data.map((atm) => {
          if (atm.ATM === issue.ATM_ID) {
            return {
              ...atm,
              'Estatus dispositivo': 'FALLA',
            };
          }
          // if (atm['Estatus dispositivo'] === 'FALLA') console.log(atm);
          // if (atm.FECHA_INICIO !== undefined) console.log('first');
          return atm;
        });
        return setData(updateATM);
      }
      // if (time < issue.FECHA_INICIO) {
      // const updateATM = data.map((atm) => {
      //   if (atm.ATM === issue.ATM_ID) {
      //     return {
      //       ...atm,
      //       'Estatus dispositivo': 'ACTIVO',
      //     };
      //   }
      //   return atm;
      // });
      // setData(updateATM);
      // }
      return issue;
    });

    // console.log(updateATM);
    // setData(updateATM);

    // }
  }, [time]);

  const getTime = (d) => {
    setTime(d);
  };

  const submitFilter = async (e) => {
    setFilters(e);
  };

  return (
    <>
      <Container
        css={{
          width: '50%',
          position: 'absolute',
          bottom: '$12',
          left: '$4',
          backgroundColor: '$white',
          zIndex: 1,
          padding: '$8',
        }}
      >
        <TimeSlider time={(d) => getTime(d)} />
      </Container>

      <Container
        css={{
          width: 'auto',
          position: 'absolute',
          bottom: '$36',
          left: '$4',
          backgroundColor: '$white',
          zIndex: 1,
          padding: '$12 0',
        }}
      >
        <Controller
          name="Division"
          control={control}
          render={({ field }) => {
            const [selectedDropdown, setSelectedDropdown] = useState(new Set([]));
            const { onChange } = field;

            return (
              <Dropdown>
                <Dropdown.Button flat css={{ tt: 'capitalize' }}>
                  {Array.from(selectedDropdown)[0] || 'Division'}
                </Dropdown.Button>
                <Dropdown.Menu
                  color="primary"
                  selectionMode="single"
                  selectedKeys={selectedDropdown}
                  onSelectionChange={(e) => {
                    setSelectedDropdown(e);
                    onChange(Array.from(e).join(', ').replaceAll('_', ' '));
                  }}
                >
                  <Dropdown.Section title="Division">
                    {Object.values(divisiones).map(({ division }) => (
                      <Dropdown.Item key={division}>{division}</Dropdown.Item>
                    ))}
                  </Dropdown.Section>
                </Dropdown.Menu>
              </Dropdown>
            );
          }}
        />
        <Controller
          name="Ciudad"
          control={control}
          render={({ field }) => {
            const [selectedDropdown, setSelectedDropdown] = useState(new Set([]));
            const { onChange } = field;

            return (
              <Dropdown>
                <Dropdown.Button flat css={{ tt: 'capitalize' }}>
                  {Array.from(selectedDropdown)[0] || 'Ciudad'}
                </Dropdown.Button>
                <Dropdown.Menu
                  color="primary"
                  selectionMode="single"
                  selectedKeys={selectedDropdown}
                  onSelectionChange={(e) => {
                    setSelectedDropdown(e);
                    onChange(Array.from(e).join(', ').replaceAll('_', ' '));
                  }}
                >
                  <Dropdown.Section title="Ciudad">
                    {Object.values(ciudades).map(({ name }) => (
                      <Dropdown.Item key={name}>{name}</Dropdown.Item>
                    ))}
                  </Dropdown.Section>
                </Dropdown.Menu>
              </Dropdown>
            );
          }}
        />
        <Button type="submit" onPress={handleSubmit(submitFilter)}>
          Filtrar
        </Button>
      </Container>

      <MyMapComponent
        center={center}
        zoom={zoom}
        DATA={data}
        ISSUES={ISSUES_DATA_CLEAN}
        TIME={time}
        FILTERS={filters}
      />

      {/* <Button
        auto
        onPress={onNewDataArrive}
        css={{ position: 'absolute', bottom: '$12', right: '$4' }}
      >
        Actualizar
      </Button> */}
    </>
  );
}

export default GoogleMaps;

// useEffect(() => {
//   // if (time > issues[0].FECHA_INICIO) {
//   const asd = Object.values(issues).filter((issue) => time > issue.FECHA_INICIO);

//   const updateISSUE = issues.map((issue) => {
//     if (time > issue.FECHA_INICIO) {
//       const updateATM = data.map((atm) => {
//         if (atm.ATM === issue.ATM_ID) {
//           return {
//             ...atm,
//             'Estatus dispositivo': 'FALLA',
//           };
//         }

//         // if (atm['Estatus dispositivo'] === 'FALLA') console.log(atm);
//         // if (atm.FECHA_INICIO !== undefined) console.log('first');

//         return atm;
//       });
//       setData(updateATM);
//     }
//     // if (time < issue.FECHA_INICIO) {
//     //   const updateATM = data.map((atm) => {
//     //     if (atm.ATM === issue.ATM_ID) {
//     //       return {
//     //         ...atm,
//     //         'Estatus dispositivo': 'ACTIVO',
//     //       };
//     //     }
//     //     return atm;
//     //   });
//     //   setData(updateATM);
//     // }
//     // return issue;
//   });

//   // console.log(updateATM);
//   // setData(updateATM);

//   // }
// }, [time]);

// const d1 = new Date();
// console.log(d1.getTime());
// '2022-08-26T11:01:00';

// const [number, setNumber] = useState(1131);
// const onNewDataArrive = () => {
//   const updateATM = data.map((atm) => {
//     if (atm.ATM === number) {
//       return {
//         ...atm,
//         'Estatus dispositivo': 'FALLA',
//       };
//     }
//     setNumber(number + 1);
//     return atm;
//   });

//   setData(updateATM);
// };
