import React, { useState, useEffect } from 'react';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { subDays, format } from 'date-fns';
import { scaleTime } from 'd3-scale';
import { Text, Button } from '@nextui-org/react';

import { Data } from '@react-google-maps/api';
import { Icons } from '@/components/Icons';
import { SliderRail, Handle, Track, Tick } from './components'; // example render components - source below

const sliderStyle = {
  position: 'relative',
  width: '100%',
};

const formatTick = (ms) => format(new Date(ms), 'MMM dd');

const halfHour = 1000 * 60 * 30;

// eslint-disable-next-line react/prop-types
function TimeSlider({ time }) {
  const today = new Date(2022, 7, 27).getTime();
  // const today = date;
  // const fourDaysAgo = subDays(today, 4);
  const oneWeekAgo = subDays(today, 1);
  const min = oneWeekAgo;
  const max = today;

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    time(selected);
  }, [selected]);

  // const [updated, setUpdated] = useState(fourDaysAgo);
  const [isPause, setIsPause] = useState(true);

  const onChange = ([ms]) => setSelected(new Data(ms).props);
  // const onUpdate = ([ms]) => setUpdated(new Data(ms).props);

  const dateTicks = scaleTime()
    .domain([min, max])
    .ticks(8)
    .map((d) => +d);

  useEffect(() => {
    const timer = setInterval(() => {
      setSelected((prev) => Number(prev) + halfHour);
    }, 1000);

    if (isPause) clearInterval(timer);

    return () => clearInterval(timer);
  }, [isPause]);

  return (
    <>
      <Text span>{format(selected, 'MMM dd h:mm a')}</Text>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          auto
          onPress={() => setIsPause((prev) => !prev)}
          icon={isPause ? Icons.play : Icons.pause}
          css={{ bg: 'none' }}
        />

        <Slider
          mode={1}
          step={halfHour}
          domain={[+min, +max]}
          rootStyle={sliderStyle}
          onChange={onChange}
          // onUpdate={onUpdate}
          values={[+selected]}
          // values={[+updated]}
        >
          <Rail>{({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}</Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div>
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={[+min, +max]}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks right={false}>
            {({ tracks, getTrackProps }) => (
              <div>
                {tracks.map(({ id, source, target }) => (
                  <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks values={dateTicks}>
            {({ ticks }) => (
              <div>
                {ticks.map((tick) => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} format={formatTick} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    </>
  );
}

export default TimeSlider;
