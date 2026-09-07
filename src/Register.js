import Logo from './Logo';
import { useState } from 'react';
import axios from 'axios';

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
      const res = await axios.post('http://127.0.0.1:8000/api/register', { name, email, password });
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
      style={{ backgroundImage: "linear-gradient(rgba(55,60,66,0.88), rgba(55,60,66,0.88)), url('/pattern-bg.jpg')" }}
    >
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center mb-6">
          <Logo dark={true} />
        </div>

        <div className="bg-white rounded shadow-lg p-8">
          <p className="text-sm text-gray-600 mb-4">Inscrivez-vous en tant qu'Admin</p>

          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border-b p-2 text-sm focus:outline-none"
            />
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border-b p-2 text-sm focus:outline-none"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-b p-2 text-sm focus:outline-none"
            />
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" required /> Accepter les termes et la politique
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 text-sm"
            >
              {loading ? 'Inscription...' : "S'inscrire"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-4">
          Vous avez déjà un compte ?{' '}
          <button onClick={onSwitchToLogin} className="text-yellow-600 font-medium">
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;