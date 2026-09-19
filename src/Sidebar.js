import Logo from './Logo';
import axios from 'axios';

const CLOUD_NAME = 'iyp1ap9k';
const UPLOAD_PRESET = 'hotel_photo';

function DashboardIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 23 23" fill="currentColor" fillRule="evenodd" clipRule="evenodd" className={className}>
      <path d="M14.133 0C13.689 0 13.262 0.177 12.948 0.491C12.633 0.806 12.456 1.232 12.456 1.677V5.99C12.456 6.915 13.208 7.667 14.133 7.667H21.321C21.766 7.667 22.192 7.49 22.507 7.175C22.821 6.861 22.998 6.434 22.998 5.99V1.677C22.998 1.232 22.821 0.806 22.507 0.491C22.192 0.177 21.766 0 21.321 0H14.133ZM14.133 9.583C13.689 9.583 13.262 9.76 12.948 10.075C12.633 10.389 12.456 10.816 12.456 11.26V21.323C12.456 22.25 13.208 23 14.133 23H21.321C21.766 23 22.192 22.823 22.507 22.509C22.821 22.194 22.998 21.768 22.998 21.323V11.26C22.998 10.816 22.821 10.389 22.507 10.075C22.192 9.76 21.766 9.583 21.321 9.583H14.133ZM0.002 1.677C0.002 0.751 0.752 0 1.679 0H8.867C9.792 0 10.544 0.751 10.544 1.677V11.74C10.544 12.184 10.367 12.611 10.052 12.925C9.738 13.24 9.311 13.417 8.867 13.417H1.679C1.234 13.417 0.808 13.24 0.493 12.925C0.179 12.611 0.002 12.184 0.002 11.74V1.677ZM1.679 15.333C1.234 15.333 0.808 15.51 0.493 15.825C0.179 16.139 0.002 16.566 0.002 17.01V21.323C0.002 22.249 0.752 23 1.679 23H8.867C9.311 23 9.738 22.823 10.052 22.509C10.367 22.194 10.544 21.768 10.544 21.323V17.01C10.544 16.566 10.367 16.139 10.052 15.825C9.738 15.51 9.311 15.333 8.867 15.333H1.679Z" />
    </svg>
  );
}

function HotelIcon({ className = "w-5 h-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" clipRule="evenodd" className={className}>
      <path d="M2.75 0.25C2.087 0.252 1.452 0.515 0.984 0.984C0.515 1.452 0.251 2.087 0.25 2.75V13.95C0.25 15.326 1.374 16.45 2.75 16.45H9.205C8.722 15.91 8.406 15.243 8.294 14.527C8.183 13.812 8.281 13.08 8.577 12.419C8.872 11.758 9.352 11.197 9.96 10.803C10.567 10.409 11.276 10.2 12 10.2C12.724 10.2 13.432 10.409 14.04 10.803C14.647 11.197 15.127 11.758 15.423 12.419C15.719 13.08 15.816 13.812 15.705 14.527C15.593 15.243 15.277 15.91 14.795 16.45H21.25C22.626 16.45 23.75 15.326 23.75 13.95V2.75C23.75 1.374 22.626 0.25 21.25 0.25H2.75ZM4 3.375C3.834 3.375 3.675 3.441 3.558 3.558C3.441 3.675 3.375 3.834 3.375 4C3.375 4.166 3.441 4.325 3.558 4.442C3.675 4.559 3.834 4.625 4 4.625H12C12.166 4.625 12.325 4.559 12.442 4.442C12.559 4.325 12.625 4.166 12.625 4C12.625 3.834 12.559 3.675 12.442 3.558C12.325 3.441 12.166 3.375 12 3.375H4ZM18.375 4C18.375 3.655 18.655 3.375 19 3.375H20.5C20.666 3.375 20.825 3.441 20.942 3.558C21.059 3.675 21.125 3.834 21.125 4C21.125 4.166 21.059 4.325 20.942 4.442C20.825 4.559 20.666 4.625 20.5 4.625H19C18.834 4.625 18.675 4.559 18.558 4.442C18.441 4.325 18.375 4.166 18.375 4ZM19 6.375C18.834 6.375 18.675 6.441 18.558 6.558C18.441 6.675 18.375 6.834 18.375 7C18.375 7.166 18.441 7.325 18.558 7.442C18.675 7.559 18.834 7.625 19 7.625H20.5C20.666 7.625 20.825 7.559 20.942 7.442C21.059 7.325 21.125 7.166 21.125 7C21.125 6.834 21.059 6.675 20.942 6.558C20.825 6.441 20.666 6.375 20.5 6.375H19ZM9.5 13.95C9.5 13.499 9.622 13.057 9.853 12.67C10.084 12.283 10.415 11.965 10.811 11.751C11.208 11.537 11.655 11.434 12.105 11.453C12.556 11.472 12.992 11.612 13.369 11.859C13.746 12.106 14.05 12.45 14.247 12.856C14.445 13.261 14.529 13.712 14.491 14.161C14.453 14.61 14.294 15.04 14.032 15.407C13.77 15.773 13.413 16.062 13 16.242V19.55H11V16.242C10.554 16.047 10.174 15.727 9.908 15.32C9.642 14.913 9.5 14.437 9.5 13.95ZM7.5 20.8C6.6 20.8 5.9 21.4 5.6 22.2L5.22 23.342C5.195 23.417 5.188 23.497 5.2 23.575C5.212 23.654 5.242 23.728 5.288 23.792C5.335 23.856 5.396 23.909 5.466 23.945C5.537 23.981 5.615 24 5.694 24H18.306C18.385 24 18.463 23.981 18.534 23.945C18.604 23.909 18.665 23.857 18.712 23.793C18.758 23.728 18.789 23.654 18.801 23.576C18.813 23.497 18.806 23.417 18.781 23.342L18.4 22.2C18.2 21.4 17.4 20.8 16.5 20.8H7.5Z" />
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
        className={`fixed top-0 left-0 h-screen w-56 text-white flex flex-col z-40 bg-[#45484B]
        transform transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "linear-gradient(rgba(69,72,75,0.7), rgba(69,72,75,0.7)), url('/pattern-bg.jpg')" }}
        ></div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="p-4 border-b border-neutral-600 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <Logo size={28} dark={true} />
              <span className="font-bold text-white tracking-wide text-sm uppercase">
                Red Product
              </span>
            </div>
            <button onClick={onClose} className="sm:hidden text-white text-xl">✕</button>
          </div>

          <div className="px-4 pt-4 pb-2 text-xs text-gray-400 uppercase tracking-wide flex-shrink-0">Principal</div>

          <nav className="flex-1 py-1 space-y-1 overflow-y-auto">
            <button
              onClick={() => { onNavigate('dashboard'); onClose(); }}
              className={`w-full flex items-center gap-3 text-left pl-6 pr-4 py-2.5 text-sm ${
                currentPage === 'dashboard'
                  ? 'bg-white font-medium'
                  : 'text-white hover:bg-neutral-600'
              }`}
              style={currentPage === 'dashboard' ? { color: '#4D5154' } : undefined}
            >
              <DashboardIcon className="w-5 h-5 flex-shrink-0" />
              Dashboard
            </button>
            <button
              onClick={() => { onNavigate('hotels'); onClose(); }}
              className={`w-full flex items-center gap-3 text-left pl-6 pr-4 py-2.5 text-sm ${
                currentPage === 'hotels'
                  ? 'bg-white font-medium'
                  : 'text-white hover:bg-neutral-600'
              }`}
              style={currentPage === 'hotels' ? { color: '#4D5154' } : undefined}
            >
              <HotelIcon className="w-5 h-5 flex-shrink-0" />
              Liste des hôtels
            </button>
          </nav>

          <div className="p-4 border-t border-neutral-600 flex items-center gap-2 text-sm flex-shrink-0">
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
      </div>
    </>
  );
}

export default Sidebar;