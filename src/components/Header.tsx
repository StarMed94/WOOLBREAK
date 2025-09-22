import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Code, ShoppingCart, User, LogOut, Database, Shield, BookOpen } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { user, profile, signOut, loading } = useAuth()
  const navigate = useNavigate()

  const isAdmin = profile?.role === 'owner' || profile?.role === 'editor';

  const UserMenu: React.FC = () => (
    <div className="relative">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg">
        <User className="w-6 h-6 text-gray-700" />
        <span className="hidden md:block font-medium text-gray-800">{profile?.username || user?.email}</span>
      </button>
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
        >
          <div className="px-4 py-2 border-b">
            <p className="font-semibold text-sm truncate">{profile?.username || 'Utilisateur'}</p>
            <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
          </div>
          {isAdmin && (
             <button onClick={() => { navigate('/admin'); setIsMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Admin</span>
            </button>
          )}
          <button 
            onClick={async () => {
              await signOut();
              setIsMenuOpen(false);
            }} 
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </motion.div>
      )}
    </div>
  )

  const AuthButtons: React.FC = () => (
    <>
      <button onClick={() => navigate('/auth')} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
        Connexion
      </button>
      <motion.button 
        onClick={() => navigate('/auth')}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-200 font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Essai gratuit
      </motion.button>
    </>
  )
  
  const MobileAuthButtons: React.FC = () => (
    <div className="space-y-4">
      <button onClick={() => { navigate('/auth'); setIsMenuOpen(false); }} className="w-full text-left p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
        Connexion
      </button>
      <button onClick={() => { navigate('/auth'); setIsMenuOpen(false); }} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold">
        Essai gratuit
      </button>
    </div>
  )

  const MobileUserMenu: React.FC = () => (
    <div className="space-y-4">
      <div className="px-4 py-3 border rounded-lg border-gray-200">
        <p className="font-semibold text-sm truncate">{profile?.username || 'Utilisateur'}</p>
        <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
      </div>
       <a href="/data-sources" className="block p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
        Sources de données
      </a>
      {isAdmin && (
        <a href="/admin" className="block p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            Administration
        </a>
      )}
      <button 
        onClick={async () => {
          await signOut();
          setIsMenuOpen(false);
        }} 
        className="w-full text-left p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
      >
        <LogOut className="w-4 h-4" />
        <span>Déconnexion</span>
      </button>
    </div>
  )

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <a href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Woolbrick
            </a>
          </motion.div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#fonctionnalites" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Fonctionnalités
            </a>
            <a href="/api-docs" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
              <BookOpen className="w-4 h-4" />
              <span>API Docs</span>
            </a>
            {user && (
              <a href="/data-sources" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                <Database className="w-4 h-4" />
                <span>Données</span>
              </a>
            )}
            <a href="/shop" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Boutique
            </a>
            <a href="/#tarifs" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Tarifs
            </a>
            <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Accueil
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {onCartClick && (
              <button onClick={onCartClick} className="relative p-2 hover:bg-gray-100 rounded-full">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-xs">
                    {totalItems}
                  </span>
                )}
              </button>
            )}
            {!loading && (user ? <UserMenu /> : <AuthButtons />)}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden py-4 border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col space-y-2">
              <a href="/#fonctionnalites" className="block p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                Fonctionnalités
              </a>
              <a href="/api-docs" className="block p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                API Docs
              </a>
              <a href="/shop" className="block p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                Boutique
              </a>
              <a href="/#tarifs" className="block p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                Tarifs
              </a>
              <a href="/" className="block p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                Accueil
              </a>
              <div className="pt-4 border-t border-gray-200 space-y-4">
                {onCartClick && (
                  <button onClick={() => { onCartClick(); setIsMenuOpen(false); }} className="w-full text-left flex justify-between items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                    <span>Panier</span>
                    {totalItems > 0 && (
                      <span className="h-6 w-6 flex items-center justify-center rounded-full bg-primary text-white text-xs">
                        {totalItems}
                      </span>
                    )}
                  </button>
                )}
                {!loading && (user ? <MobileUserMenu /> : <MobileAuthButtons />)}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header
