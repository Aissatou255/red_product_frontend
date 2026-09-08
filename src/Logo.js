function Logo({ dark = true }) {
  return (
    <div className={`flex items-center gap-2 font-bold ${dark ? 'text-white' : 'text-gray-800'}`}>
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <path
          d="M6 3v26M6 3h18l-5 6 5 6H6"
          stroke={dark ? 'white' : '#1f2937'}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          fill={dark ? 'white' : '#1f2937'}
        />
      </svg>
      RED PRODUCT
    </div>
  );
}

export default Logo;