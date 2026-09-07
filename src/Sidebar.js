import Logo from './Logo';

function Sidebar({ currentPage, onNavigate, user, onLogout }) {
  return (
    <div className="w-56 bg-neutral-700 text-white flex flex-col min-h-screen">
      <div className="p-4 border-b border-neutral-600">
        <Logo dark={true} />
      </div>

      <div className="px-4 pt-4 pb-1 text-xs text-gray-400 uppercase">Principal</div>

      <nav className="flex-1 px-2 space-y-1">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded text-sm ${currentPage === 'dashboard' ? 'bg-neutral-600' : 'hover:bg-neutral-600'}`}
        >
          <span>▦</span> Dashboard
        </button>
        <button
          onClick={() => onNavigate('hotels')}
          className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded text-sm ${currentPage === 'hotels' ? 'bg-neutral-600' : 'hover:bg-neutral-600'}`}
        >
          <span>🏨</span> Liste des hôtels
        </button>
      </nav>

      <div className="p-4 border-t border-neutral-600 flex items-center gap-2 text-sm">
        <div className="w-8 h-8 rounded-full bg-gray-400"></div>
        <div className="flex-1">
          <div>{user?.name}</div>
          <div className="text-green-400 text-xs flex items-center gap-1">
            <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> en ligne
          </div>
        </div>
        <button onClick={onLogout} className="text-gray-400 hover:text-white text-xs" title="Déconnexion">⏻</button>
      </div>
    </div>
  );
}

export default Sidebar;