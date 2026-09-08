import Logo from './Logo';

function Icon({ path, className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={path} />
    </svg>
  );
}

const icons = {
  dashboard: "M3 3h8v8H3V3zm10 0h8v5h-8V3zM3 13h8v8H3v-8zm10 3h8v5h-8v-5z",
  hotel: "M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z",
};

function Sidebar({ currentPage, onNavigate, user, onLogout, open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed sm:static top-0 left-0 h-full sm:h-auto sm:min-h-screen w-56 bg-neutral-700 text-white flex flex-col z-40
        transform transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
      >
        <div className="p-4 border-b border-neutral-600 flex items-center justify-between">
          <Logo dark={true} />
          <button onClick={onClose} className="sm:hidden text-white text-xl">✕</button>
        </div>

        <div className="px-4 pt-4 pb-2 text-xs text-gray-400 uppercase tracking-wide">Principal</div>

        <nav className="flex-1 px-2 space-y-1">
          <button
            onClick={() => { onNavigate('dashboard'); onClose(); }}
            className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded text-sm ${currentPage === 'dashboard' ? 'bg-neutral-600' : 'hover:bg-neutral-600'}`}
          >
            <Icon path={icons.dashboard} />
            Dashboard
          </button>
          <button
            onClick={() => { onNavigate('hotels'); onClose(); }}
            className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded text-sm ${currentPage === 'hotels' ? 'bg-neutral-600' : 'hover:bg-neutral-600'}`}
          >
            <Icon path={icons.hotel} />
            Liste des hôtels
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
    </>
  );
}

export default Sidebar;