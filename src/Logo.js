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
      {/* Bande diagonale claire (arrière-plan) */}
      <path d="M20 4 L26 4 L14 28 L8 28 Z" fill="#D9D9D9" />

      {/* Montagne foncée (premier plan) */}
      <path d="M13 12 L22 28 L4 28 Z" fill="#4A4E54" />
    </svg>
  );
};

export default Logo;