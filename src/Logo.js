function Logo({ dark = true }) {
  const color = dark ? 'white' : '#1f2937';
  return (
    <div className={`flex items-center gap-2 font-bold ${dark ? 'text-white' : 'text-gray-800'}`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" stroke={color} strokeWidth="1.5" />
        <path d="M6 19 L10 9 L18 19 Z" fill={color} />
      </svg>
      RED PRODUCT
    </div>
  );
}

export default Logo;