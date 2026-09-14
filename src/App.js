import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import AddHotel from './AddHotel';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Topbar from './Topbar';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';

const API_URL = 'https://red-product-backend-qqo1.onrender.com';

function App() {
  const [authPage, setAuthPage] = useState('login');
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [page, setPage] = useState('hotels');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchHotels = useCallback(() => {
    setLoading(true);
    axios.get(`${API_URL}/api/hotels`)
      .then(response => {
        const sorted = [...response.data].sort((a, b) => b.id - a.id);
        setHotels(sorted);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur API :", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user) fetchHotels();
  }, [fetchHotels, user]);

  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet hôtel ?")) return;
    try {
      await axios.delete(`${API_URL}/api/hotels/${id}`);
      fetchHotels();
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setAuthPage('login');
  };

  const handleUserPhotoChange = (photo_url) => {
    const updatedUser = { ...user, photo_url };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const closeModal = () => {
    setShowForm(false);
    setEditingHotel(null);
  };

  const filteredHotels = hotels.filter(h =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.address.toLowerCase().includes(search.toLowerCase())
  );

  if (!user) {
    if (authPage === 'register') {
      return <Register onRegister={setUser} onSwitchToLogin={() => setAuthPage('login')} />;
    }
    if (authPage === 'forgot') {
      return <ForgotPassword onBackToLogin={() => setAuthPage('login')} />;
    }
    return (
      <Login
        onLogin={setUser}
        onSwitchToRegister={() => setAuthPage('register')}
        onSwitchToForgot={() => setAuthPage('forgot')}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        currentPage={page}
        onNavigate={setPage}
        user={user}
        onLogout={handleLogout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onUserPhotoChange={handleUserPhotoChange}
      />

      <div className="flex-1 min-w-0 flex flex-col h-screen">
        <div className="flex-shrink-0">
          <Topbar
            title={page === 'dashboard' ? 'Dashboard' : 'Liste des hôtels'}
            searchValue={search}
            onSearchChange={setSearch}
            showSearch={page === 'hotels'}
            onLogout={handleLogout}
            onMenuClick={() => setSidebarOpen(true)}
            user={user}
            onUserPhotoChange={handleUserPhotoChange}
          />
        </div>

        <div className="flex-1 overflow-hidden bg-gray-100">
          {page === 'dashboard' && (
            <div className="h-full overflow-y-auto">
              <Dashboard />
            </div>
          )}

          {page === 'hotels' && (
            <div className="h-full flex flex-col">
              <div className="flex-shrink-0 bg-white border-b">
                <div className="p-4 sm:p-6 max-w-6xl mx-auto w-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div>
                      <p className="text-sm text-gray-500">Hôtels {filteredHotels.length}</p>
                    </div>
                    <button
                      onClick={() => { setShowForm(true); setEditingHotel(null); }}
                      className="bg-white border border-gray-300 text-black px-4 py-2 rounded hover:bg-gray-50 w-full sm:w-auto"
                    >
                      + Créer un nouvel hôtel
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-4 sm:p-6 max-w-6xl mx-auto">
                  {loading ? (
                    <p className="text-center">Chargement...</p>
                  ) : filteredHotels.length === 0 ? (
                    <p className="text-gray-600">Aucun hôtel trouvé.</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredHotels.map(hotel => (
                        <div key={hotel.id} className="group rounded shadow-sm overflow-hidden bg-white">
                          <div className="relative overflow-hidden">
                            {hotel.photo_url && (
                              <img src={hotel.photo_url} alt={hotel.name} className="w-full h-40 object-cover" />
                            )}

                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 flex items-center justify-center gap-4 py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                              <button
                                onClick={() => handleEdit(hotel)}
                                className="text-white hover:text-gray-200 transition"
                                title="Modifier"
                              >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDelete(hotel.id)}
                                className="text-white hover:text-red-300 transition"
                                title="Supprimer"
                              >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                  <polyline points="3 6 5 6 21 6" />
                                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                  <path d="M10 11v6" />
                                  <path d="M14 11v6" />
                                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className="p-3">
                            <p className="text-sm text-orange-700">{hotel.address}</p>
                            <h3 className="font-bold text-lg">{hotel.name}</h3>
                            <p className="mt-1 text-gray-700">
                              {Number(hotel.price_per_night).toLocaleString('fr-FR')} {hotel.currency} par nuit
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-3xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <AddHotel
              onHotelAdded={() => { fetchHotels(); closeModal(); }}
              editingHotel={editingHotel}
              onClose={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;