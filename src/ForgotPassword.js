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
      style={{ backgroundImage: "linear-gradient(rgba(55,60,66,0.88), rgba(55,60,66,0.88)), url('/pattern-bg.jpg')" }}
    >
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center mb-6">
          <Logo dark={true} />
        </div>

        <div className="bg-white rounded shadow-lg p-8">
          {sent ? (
            <p className="text-sm text-gray-600 text-center">
              Si un compte existe avec cet e-mail, des instructions ont été envoyées.
            </p>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-1 font-medium">Mot de passe oublié ?</p>
              <p className="text-xs text-gray-500 mb-4">
                Entrez votre adresse e-mail ci-dessous et nous vous enverrons des instructions sur la façon de modifier votre mot de passe.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Votre e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-b p-2 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 text-sm"
                >
                  Envoyer
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-sm mt-4">
          Revenir à la{' '}
          <button onClick={onBackToLogin} className="text-yellow-600 font-medium">
            connexion
          </button>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;