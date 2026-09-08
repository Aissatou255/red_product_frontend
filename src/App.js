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
        setHotels(response.data);
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
    <div className="flex min-h-screen">
      <Sidebar
        currentPage={page}
        onNavigate={setPage}
        user={user}
        onLogout={handleLogout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 min-w-0 bg-gray-100">
        <Topbar
          title={page === 'dashboard' ? 'Dashboard' : 'Liste des hôtels'}
          searchValue={search}
          onSearchChange={setSearch}
          showSearch={page === 'hotels'}
          onLogout={handleLogout}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {page === 'dashboard' && <Dashboard />}

        {page === 'hotels' && (
          <div className="p-4 sm:p-6 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
              <div>
                <p className="text-sm text-gray-500">Hôtels {filteredHotels.length}</p>
              </div>
              <button
                onClick={() => { setShowForm(!showForm); setEditingHotel(null); }}
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 w-full sm:w-auto"
              >
                {showForm ? 'Fermer' : '+ Créer un nouvel hôtel'}
              </button>
            </div>

            {showForm && (
              <div className="mb-6">
                <AddHotel
                  onHotelAdded={() => { fetchHotels(); setShowForm(false); setEditingHotel(null); }}
                  editingHotel={editingHotel}
                />
              </div>
            )}

            {loading ? (
              <p className="text-center">Chargement...</p>
            ) : filteredHotels.length === 0 ? (
              <p className="text-gray-600">Aucun hôtel trouvé.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredHotels.map(hotel => (
                  <div key={hotel.id} className="rounded shadow-sm overflow-hidden bg-white">
                    {hotel.photo_url && (
                      <img src={hotel.photo_url} alt={hotel.name} className="w-full h-40 object-cover" />
                    )}
                    <div className="p-3">
                      <p className="text-sm text-orange-700">{hotel.address}</p>
                      <h3 className="font-bold text-lg">{hotel.name}</h3>
                      <p className="mt-1 text-gray-700">
                        {Number(hotel.price_per_night).toLocaleString('fr-FR')} {hotel.currency} par nuit
                      </p>
                      <div className="flex gap-2 mt-3 pt-3 border-t">
                        <button onClick={() => handleEdit(hotel)} className="flex items-center justify-center gap-1 flex-1 text-xs text-gray-600 py-1.5 rounded hover:bg-gray-100 transition">
                          ✏️ Modifier
                        </button>
                        <button onClick={() => handleDelete(hotel.id)} className="flex items-center justify-center gap-1 flex-1 text-xs text-red-500 py-1.5 rounded hover:bg-red-50 transition">
                          🗑️ Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;