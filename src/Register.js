import Logo from './Logo';
import { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://red-product-backend-qqo1.onrender.com';

function Register({ onRegister, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/api/register`, { name, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      onRegister(res.data.user);
    } catch (err) {
      setError("Erreur lors de l'inscription. Vérifie tes informations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "linear-gradient(rgba(73,76,79,0.93), rgba(73,76,79,0.93)), url('/pattern-bg.jpg')" }}
    >
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Logo size={28} dark={true} />
          <span className="font-bold text-white tracking-wide text-lg uppercase">Red Product</span>
        </div>

        <div className="bg-white rounded p-8">
          <p className="text-sm text-gray-800 mb-6">Inscrivez-vous en tant que Admin</p>

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border-b border-gray-300 p-2 text-sm focus:outline-none focus:border-gray-500"
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b border-gray-300 p-2 text-sm focus:outline-none focus:border-gray-500"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b border-gray-300 p-2 text-sm focus:outline-none focus:border-gray-500"
            />
            <label className="flex items-center gap-2 text-sm text-gray-700 pt-1">
              <input type="checkbox" required className="w-5 h-5 border-gray-400 rounded-sm" /> Accepter les termes et la politique
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-3 rounded text-sm font-bold"
              style={{ backgroundColor: '#45484B' }}
            >
              {loading ? 'Inscription...' : "S'inscrire"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-4 text-white">
          Vous avez déjà un compte?{' '}
          <button onClick={onSwitchToLogin} className="text-yellow-500 font-bold">
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;