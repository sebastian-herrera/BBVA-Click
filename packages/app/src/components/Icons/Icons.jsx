/* eslint-disable react/prop-types */
import React from 'react';

function PlayIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.7 8.98087L4.14 17.7109C4.05 17.3809 4 17.0309 4 16.6709V7.33087C4 4.25087 7.33 2.33087 10 3.87087L14.04 6.20087L18.09 8.54087C18.31 8.67087 18.52 8.81087 18.7 8.98087Z"
        fill={fill}
      />
      <path
        d="M18.0888 15.4608L14.0387 17.8008L9.99875 20.1308C8.08875 21.2308 5.83875 20.5708 4.71875 18.9608L5.13875 18.7108L19.5788 10.0508C20.5788 11.8508 20.0888 14.3108 18.0888 15.4608Z"
        fill={fill}
        opacity={0.4}
      />
    </svg>
  );
}

function PauseIcon({ fill, size, width = 24, height = 24, ...props }) {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.65 19.11V4.89C10.65 3.54 10.08 3 8.64 3H5.01C3.57 3 3 3.54 3 4.89V19.11C3 20.46 3.57 21 5.01 21H8.64C10.08 21 10.65 20.46 10.65 19.11Z"
        fill={fill}
      />
      <path
        d="M21.0016 19.11V4.89C21.0016 3.54 20.4316 3 18.9916 3H15.3616C13.9316 3 13.3516 3.54 13.3516 4.89V19.11C13.3516 20.46 13.9216 21 15.3616 21H18.9916C20.4316 21 21.0016 20.46 21.0016 19.11Z"
        fill={fill}
        opacity={0.4}
      />
    </svg>
  );
}

const icons = {
  play: <PlayIcon fill="var(--nextui-colors-text)" size={25} />,
  pause: <PauseIcon fill="var(--nextui-colors-text)" size={25} />,
};

export default icons;
