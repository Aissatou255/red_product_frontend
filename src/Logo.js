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
      {/* Juste la forme en biais, sans carré ni montagne */}
      <path d="M20 4 L26 4 L12 28 L6 28 Z" fill="#E5E5E5" />
    </svg>
  );
};

export default Logo;