import React from 'react';

const Logo = ({ size = 32, dark }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26.6626 26.6626"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path d="M0 0H26.6626V26.6626L0 0Z" fill="white" />
      <path d="M0 0H19.997L13.3313 13.3313L0 0Z" fill="black" fillOpacity="0.15" />
      <path d="M0 0H13.3313L0 26.6626V0Z" fill="white" />
    </svg>
  );
};

export default Logo;