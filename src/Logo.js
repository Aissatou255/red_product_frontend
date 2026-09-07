function Logo({ dark = true }) {
  return (
    <div className={`flex items-center gap-2 font-bold ${dark ? 'text-white' : 'text-gray-800'}`}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill={dark ? 'white' : '#1f2937'}>
        <path d="M4 2v20h2v-7l4-1.5L6 12V4h11l-3 4 3 4H8v2l8-3-4-4 4-4H4z" />
      </svg>
      RED PRODUCT
    </div>
  );
}

export default Logo;