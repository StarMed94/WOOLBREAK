import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';

const FloatingHomeButton: React.FC = () => {
  const location = useLocation();
  const showButton = location.pathname !== '/';

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed top-4 left-4 z-[100]"
        >
          <Link
            to="/"
            title="Retour à l'accueil"
            className="flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200"
          >
            <Home className="w-6 h-6" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingHomeButton;
