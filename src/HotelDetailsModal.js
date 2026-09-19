function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-b-0">
      <div className="text-gray-400 mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm text-gray-800 break-words">{value || 'Non renseigné'}</p>
      </div>
    </div>
  );
}

function HotelDetailsModal({ hotel, onClose }) {
  if (!hotel) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {hotel.photo_url && (
            <img src={hotel.photo_url} alt={hotel.name} className="w-full h-48 object-cover" />
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg leading-none"
          >
            ✕
          </button>
        </div>

        <div className="p-5">
          <h2 className="font-bold text-lg text-gray-800 mb-1">{hotel.name}</h2>
          <p className="text-sm text-gray-500 mb-3">
            {Number(hotel.price_per_night).toLocaleString('fr-FR')} {hotel.currency} / nuit
          </p>

          <InfoRow
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
            label="Adresse"
            value={hotel.address}
          />
          <InfoRow
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            }
            label="Téléphone"
            value={hotel.phone}
          />
          <InfoRow
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            }
            label="E-mail"
            value={hotel.email}
          />
        </div>
      </div>
    </div>
  );
}

export default HotelDetailsModal;