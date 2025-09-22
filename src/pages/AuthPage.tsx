import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import { AtSign, Lock, User as UserIcon, LogIn, UserPlus } from 'lucide-react';

type AuthMode = 'login' | 'signup';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<UserRole>('viewer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          role,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else if (data.user && data.user.identities && data.user.identities.length === 0) {
      setMessage("Un utilisateur avec cet email existe déjà.");
    } else {
      setMessage('Inscription réussie ! Veuillez vérifier vos e-mails pour confirmer votre compte.');
      setMode('login'); // Switch to login after successful signup message
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Woolbrick</h1>
          <p className="text-gray-300">
            {mode === 'login' ? 'Connectez-vous à votre compte' : 'Créez un nouveau compte'}
          </p>
        </div>

        <div className="flex bg-gray-900/50 rounded-lg p-1 mb-6">
          <button
            onClick={() => setMode('login')}
            className={`w-1/2 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'login' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`w-1/2 py-2 rounded-md text-sm font-medium transition-colors ${
              mode === 'signup' ? 'bg-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            Inscription
          </button>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        {message && <div className="bg-green-500/20 border border-green-500 text-green-300 p-3 rounded-lg mb-4 text-sm">{message}</div>}

        <form onSubmit={mode === 'login' ? handleLogin : handleSignup} className="space-y-4">
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {mode === 'signup' && (
            <>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Je suis un...</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full p-2 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="viewer">Visiteur</option>
                  <option value="seller">Vendeur</option>
                  <option value="editor">Éditeur</option>
                  <option value="owner">Propriétaire</option>
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
              loading ? 'bg-gray-600' : (mode === 'login' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700')
            }`}
          >
            {loading ? (
              <span>Chargement...</span>
            ) : (
              <>
                {mode === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                <span>{mode === 'login' ? 'Se connecter' : 'S\'inscrire'}</span>
              </>
            )}
          </button>
        </form>
        <div className="text-center mt-4">
            <button onClick={() => navigate('/')} className="text-sm text-gray-400 hover:text-white">Retour à l'accueil</button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
