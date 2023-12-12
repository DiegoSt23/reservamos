import React, { SVGProps } from 'react';

export const RightArrow: React.FC<SVGProps<SVGSVGElement>> = ({
  width = 64,
  height = 64,
  stroke = '#000000',
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <g id='SVGRepo_bgCarrier' strokeWidth='0' />

    <g
      id='SVGRepo_tracerCarrier'
      strokeLinecap='round'
      strokeLinejoin='round'
    />

    <g id='SVGRepo_iconCarrier'>
      <path
        d='M10 7L15 12L10 17'
        stroke={stroke}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  </svg>
);
