import Logo from './Logo';
import { useState } from 'react';

function ForgotPassword({ onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
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
          {sent ? (
            <p className="text-sm text-gray-600 text-center">
              Si un compte existe avec cet e-mail, des instructions ont été envoyées.
            </p>
          ) : (
            <>
              <p className="text-sm text-gray-800 mb-2">Mot de passe oublié?</p>
              <p className="text-xs text-gray-500 mb-6">
                Entrez votre adresse e-mail ci-dessous et nous vous envoyons des instructions sur la façon de modifier votre mot de passe.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  type="email"
                  placeholder="Votre e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-b border-gray-300 p-2 text-sm focus:outline-none focus:border-gray-500"
                />
                <button
                  type="submit"
                  className="w-full text-white py-3 rounded text-sm font-bold"
                  style={{ backgroundColor: '#45484B' }}
                >
                  Envoyer
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm mt-4 text-white">
          Revenir à la{' '}
          <button onClick={onBackToLogin} className="text-yellow-500 font-bold">
            connexion
          </button>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;