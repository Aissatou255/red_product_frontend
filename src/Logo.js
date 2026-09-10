function Logo({ dark = true }) {
  const color = dark ? 'white' : '#1f2937';
  return (
    <div className={`flex items-center gap-2 font-bold ${dark ? 'text-white' : 'text-gray-800'}`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="2" stroke={color} strokeWidth="2" />
        <path d="M4.5 19.5 L12 6 L19.5 19.5 Z" fill={color} />
      </svg>
      RED PRODUCT
    </div>
  );
}

export default Logo;