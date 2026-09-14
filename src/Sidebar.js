import Logo from './Logo';
import axios from 'axios';

const CLOUD_NAME = 'iyp1ap9k';
const UPLOAD_PRESET = 'hotel_photo';

function Icon({ children, className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {children}
    </svg>
  );
}

function Sidebar({ currentPage, onNavigate, user, onLogout, open, onClose, onUserPhotoChange }) {
  const handlePhotoSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', UPLOAD_PRESET);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        data
      );

      if (onUserPhotoChange) onUserPhotoChange(res.data.secure_url);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi de la photo.");
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 sm:hidden"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed sm:static top-0 left-0 h-full sm:h-auto sm:min-h-screen w-56 text-white flex flex-col z-40
        transform transition-transform duration-200 bg-cover bg-center relative
        ${open ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        style={{ backgroundImage: "linear-gradient(rgba(55,60,66,0.9), rgba(55,60,66,0.9)), url('/sidebar-bg.jpg')" }}
      >
        <div className="p-4 border-b border-neutral-600 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={32} dark={true} />
            <span className="font-bold text-white tracking-wide text-sm uppercase">
              Red Product
            </span>
          </div>
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
          <label className="relative w-8 h-8 flex-shrink-0 cursor-pointer group">
            {user?.photo_url ? (
              <img src={user.photo_url} alt="Profil" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-400"></div>
            )}
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <input type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
          </label>
          <div className="flex-1">
            <div>{user?.name}</div>
            <div className="text-green-400 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> en ligne
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;