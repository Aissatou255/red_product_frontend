function Logo({ dark = true }) {
  const color = dark ? 'white' : '#1f2937';
  return (
    <div className={`flex items-center gap-2 font-bold ${dark ? 'text-white' : 'text-gray-800'}`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 21V5a2 2 0 0 1 2-2h13l-6 6 6 6H7"
          fill={color}
        />
      </svg>
      RED PRODUCT
    </div>
  );
}

export default Logo;