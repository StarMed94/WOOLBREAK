import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';
import { themes, Theme } from './themes';
import { useTheme } from './ThemeContext';

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ isOpen, onClose }) => {
  const { theme: activeTheme, setTheme } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Choisir un thème</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Themes Grid */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {themes.map((theme) => (
                  <ThemeCard
                    key={theme.id}
                    theme={theme}
                    isActive={activeTheme.id === theme.id}
                    onSelect={() => setTheme(theme.id)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ThemeCardProps {
  theme: Theme;
  isActive: boolean;
  onSelect: () => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, isActive, onSelect }) => {
  return (
    <motion.div
      onClick={onSelect}
      className={`rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
        isActive ? 'border-blue-600' : 'border-gray-200 hover:border-blue-400'
      }`}
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="p-4 bg-gray-50 border-b border-gray-200 relative">
        <h3 className="font-semibold text-gray-800">{theme.name}</h3>
        {isActive && (
          <CheckCircle className="w-6 h-6 text-blue-600 absolute top-3 right-3" />
        )}
      </div>
      <div
        className="h-32 p-4 flex flex-col justify-between"
        style={{ backgroundColor: theme.preview.background }}
      >
        <div className="flex items-center space-x-2">
          <div
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: theme.preview.primary }}
          />
          <div className="flex-1">
            <div
              className="h-3 rounded w-full"
              style={{ backgroundColor: theme.preview.text, opacity: 0.8 }}
            />
            <div
              className="h-3 rounded w-3/4 mt-2"
              style={{ backgroundColor: theme.preview.text, opacity: 0.6 }}
            />
          </div>
        </div>
        <div
          className="px-4 py-2 rounded text-center text-sm font-semibold"
          style={{
            backgroundColor: theme.preview.primary,
            color: theme.preview.background,
          }}
        >
          Bouton
        </div>
      </div>
    </motion.div>
  );
};

export default ThemeSelector;
