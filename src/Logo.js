import React from 'react';

const Logo = ({ size = 32, dark }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path d="M20 4 L26 4 L14 28 L8 28 Z" fill="#E8E8E8" />
      <path d="M13 12 L22 28 L4 28 Z" fill="#9298A0" />
    </svg>
  );
};

export default Logo;