import axios from 'axios';

const CLOUD_NAME = 'iyp1ap9k';
const UPLOAD_PRESET = 'hotel_photo';

function Topbar({ title, searchValue, onSearchChange, showSearch, onLogout, onMenuClick, user, onUserPhotoChange }) {
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
    <div className="bg-white border-b">
      <div className="px-3 sm:px-6 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button onClick={onMenuClick} className="sm:hidden text-gray-600 text-xl">☰</button>
          <h1 className="font-semibold truncate">{title}</h1>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          {showSearch && (
            <div className="relative hidden sm:block">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Recherche"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="border rounded-full pl-9 pr-3 py-1 text-sm w-48 bg-gray-50"
              />
            </div>
          )}

          <span className="relative text-gray-500">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-[9px] rounded-full w-4 h-4 flex items-center justify-center">1</span>
          </span>

          <label className="relative w-8 h-8 flex-shrink-0 cursor-pointer group">
            {user?.photo_url ? (
              <img src={user.photo_url} alt="Profil" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-300"></div>
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <input type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
          </label>

          <span onClick={onLogout} className="text-gray-500 cursor-pointer hover:text-red-500" title="Déconnexion">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>
        </div>
      </div>

      {showSearch && (
        <div className="sm:hidden px-3 pb-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Recherche"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="border rounded-full pl-9 pr-3 py-1.5 text-sm w-full bg-gray-50"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Topbar;