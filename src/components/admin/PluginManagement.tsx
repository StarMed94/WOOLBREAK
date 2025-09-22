import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faker } from '@faker-js/faker';
import toast from 'react-hot-toast';
import { Plugin } from '../../types';
import { Puzzle, UploadCloud, X, Plus, Search, Settings, GitBranch, BarChart2 } from 'lucide-react';

// Mock initial plugins
const initialPlugins: Plugin[] = [
  {
    id: 'seo-optimizer',
    name: 'Optimiseur SEO',
    version: '1.2.0',
    author: 'Woolbrick Labs',
    description: 'Améliore le référencement de vos pages avec des outils d\'analyse et de suggestion.',
    active: true,
    icon: <Search className="w-8 h-8 text-green-500" />,
  },
  {
    id: 'analytics-pro',
    name: 'Analytics Pro',
    version: '2.0.1',
    author: 'Data Corp',
    description: 'Tableaux de bord analytiques avancés pour suivre le trafic et l\'engagement.',
    active: true,
    icon: <BarChart2 className="w-8 h-8 text-blue-500" />,
  },
  {
    id: 'git-sync',
    name: 'Synchronisation Git',
    version: '0.9.5',
    author: 'DevTools Inc.',
    description: 'Synchronisez vos projets Woolbrick avec un dépôt Git pour le versioning.',
    active: false,
    icon: <GitBranch className="w-8 h-8 text-purple-500" />,
  },
];

const PluginManagement: React.FC = () => {
  const [plugins, setPlugins] = useState<Plugin[]>(initialPlugins);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const togglePlugin = (id: string) => {
    setPlugins(
      plugins.map((p) => {
        if (p.id === id) {
          const updatedPlugin = { ...p, active: !p.active };
          toast.success(`Plugin "${updatedPlugin.name}" ${updatedPlugin.active ? 'activé' : 'désactivé'}.`);
          return updatedPlugin;
        }
        return p;
      })
    );
  };

  const addPlugin = (file: File) => {
    const newPlugin: Plugin = {
      id: faker.lorem.slug(),
      name: file.name.replace(/\.[^/.]+$/, ""),
      version: '1.0.0',
      author: 'Auteur Inconnu',
      description: faker.lorem.sentence(),
      active: false,
      icon: <Settings className="w-8 h-8 text-gray-500" />,
    };
    setPlugins([...plugins, newPlugin]);
    toast.success(`Plugin "${newPlugin.name}" installé avec succès !`);
  };

  const filteredPlugins = plugins.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Plugins</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Installer un plugin</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un plugin..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlugins.map((plugin) => (
            <PluginCard key={plugin.id} plugin={plugin} onToggle={togglePlugin} />
          ))}
        </div>
      </div>

      <InstallPluginModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onInstall={addPlugin}
      />
    </motion.div>
  );
};

// --- PluginCard Component ---
interface PluginCardProps {
  plugin: Plugin;
  onToggle: (id: string) => void;
}

const PluginCard: React.FC<PluginCardProps> = ({ plugin, onToggle }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 flex flex-col">
      <div className="flex items-start space-x-4 mb-4">
        {plugin.icon}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800">{plugin.name}</h3>
          <p className="text-xs text-gray-500">v{plugin.version} par {plugin.author}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 flex-grow mb-5">{plugin.description}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className={`text-sm font-medium ${plugin.active ? 'text-green-600' : 'text-gray-500'}`}>
          {plugin.active ? 'Activé' : 'Désactivé'}
        </span>
        <ToggleSwitch checked={plugin.active} onChange={() => onToggle(plugin.id)} />
      </div>
    </div>
  );
};

// --- ToggleSwitch Component ---
interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <div
      onClick={onChange}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
        checked ? 'bg-blue-600' : 'bg-gray-300'
      }`}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        className="w-4 h-4 bg-white rounded-full shadow-md"
      />
    </div>
  );
};

// --- InstallPluginModal Component ---
interface InstallPluginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: (file: File) => void;
}

const InstallPluginModal: React.FC<InstallPluginModalProps> = ({ isOpen, onClose, onInstall }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    
    const handleInstall = () => {
        if(file) {
            onInstall(file);
            setFile(null);
            onClose();
        } else {
            toast.error("Veuillez sélectionner un fichier de plugin.");
        }
    }

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
            className="bg-white rounded-lg shadow-xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Installer un nouveau plugin</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X /></button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                Téléversez un fichier de plugin (généralement .zip) pour l'ajouter à votre bibliothèque.
              </p>
              <label className="flex justify-center w-full h-32 px-4 transition bg-gray-50 border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400">
                <span className="flex items-center space-x-2">
                  <UploadCloud className="w-8 h-8 text-gray-600" />
                  <span className="font-medium text-gray-600">
                    {file ? file.name : 'Glissez-déposez ou cliquez pour choisir un fichier'}
                  </span>
                </span>
                <input type="file" name="file_upload" className="hidden" onChange={handleFileChange} accept=".zip,.js" />
              </label>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
              <button
                onClick={handleInstall}
                disabled={!file}
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Installer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PluginManagement;
