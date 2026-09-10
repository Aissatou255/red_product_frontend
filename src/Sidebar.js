import Logo from './Logo';

function Icon({ children, className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {children}
    </svg>
  );
}

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
            className={`w-full flex items-center gap-3 text-left pl-3 pr-3 py-2 text-sm border-l-4 ${
              currentPage === 'dashboard'
                ? 'bg-neutral-600 border-white'
                : 'border-transparent hover:bg-neutral-600'
            }`}
          >
            <Icon>
              <rect x="3" y="3" width="8" height="8" rx="1" />
              <rect x="13" y="3" width="8" height="8" rx="1" />
              <rect x="3" y="13" width="8" height="8" rx="1" />
              <rect x="13" y="13" width="8" height="8" rx="1" />
            </Icon>
            Dashboard
          </button>
          <button
            onClick={() => { onNavigate('hotels'); onClose(); }}
            className={`w-full flex items-center gap-3 text-left pl-3 pr-3 py-2 text-sm border-l-4 ${
              currentPage === 'hotels'
                ? 'bg-neutral-600 border-white'
                : 'border-transparent hover:bg-neutral-600'
            }`}
          >
            <Icon>
              <rect x="3" y="3" width="18" height="11" rx="1" />
              <line x1="7" y1="7" x2="13" y2="7" />
              <rect x="16" y="6" width="2" height="2" />
              <rect x="16" y="9" width="2" height="2" />
              <circle cx="12" cy="15" r="2" />
              <path d="M9 21c0-2.5 1.5-4 3-4s3 1.5 3 4" />
            </Icon>
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
          <button onClick={onLogout} className="text-gray-400 hover:text-white" title="Déconnexion">
            <Icon className="w-4 h-4">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </Icon>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;