function Topbar({ title, searchValue, onSearchChange, showSearch, onLogout }) {
  return (
    <div className="bg-white border-b px-6 py-3 flex items-center justify-between">
      <h1 className="font-semibold">{title}</h1>
      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Recherche"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="border rounded-full pl-8 pr-3 py-1 text-sm w-48 bg-gray-50"
            />
          </div>
        )}
        <span className="relative text-gray-500">
          🔔
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-[9px] rounded-full w-4 h-4 flex items-center justify-center">1</span>
        </span>
        <div className="relative w-8 h-8">
          <div className="w-8 h-8 rounded-full bg-gray-300"></div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
        </div>
        <span onClick={onLogout} className="text-gray-500 cursor-pointer hover:text-red-500" title="Déconnexion">⏻</span>
      </div>
    </div>
  );
}

export default Topbar;