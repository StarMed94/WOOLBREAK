import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Database, FileText, UploadCloud, Plus, AlertTriangle, X, Loader2 } from 'lucide-react';
import Papa from 'papaparse';

// Mock data source types
const dataSourceTypes = [
  {
    name: 'PostgreSQL',
    icon: <Database className="w-8 h-8 text-blue-500" />,
    description: 'Connectez votre base de données PostgreSQL.',
    type: 'postgres',
  },
  {
    name: 'MongoDB',
    icon: <Database className="w-8 h-8 text-green-500" />,
    description: 'Connectez votre base de données MongoDB.',
    type: 'mongodb',
  },
  {
    name: 'Fichier CSV',
    icon: <FileText className="w-8 h-8 text-orange-500" />,
    description: 'Importez des données depuis un fichier CSV.',
    type: 'csv',
  },
  {
    name: 'DataFrame (pandas)',
    icon: <FileText className="w-8 h-8 text-purple-500" />,
    description: 'Importez un DataFrame via un fichier CSV.',
    type: 'pandas',
  },
];

const DataSourcesPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<any[] | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Vous devez être connecté pour accéder à cette page.");
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    setIsUploading(true);
    setParsedData(null);
    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setParsedData(results.data);
        setIsUploading(false);
        toast.success(`Fichier "${selectedFile.name}" analysé avec succès !`);
      },
      error: (error: any) => {
        toast.error(`Erreur lors de l'analyse du fichier : ${error.message}`);
        setIsUploading(false);
      },
    });
  }

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  if (authLoading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Gérer vos Sources de Données</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connectez vos bases de données ou importez des fichiers pour les utiliser dans vos projets Woolbrick.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {dataSourceTypes.map((source) => (
            <motion.div
              key={source.type}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={() => setModalOpen(source.type)}
            >
              <div className="flex justify-center mb-4">{source.icon}</div>
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">{source.name}</h3>
              <p className="text-sm text-gray-600 text-center">{source.description}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {modalOpen && (
            <ConnectorModal type={modalOpen} onClose={() => setModalOpen(null)} />
          )}
        </AnimatePresence>
        
        {/* File Uploader Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Importer un fichier (CSV, DataFrame)</h2>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <label
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="flex justify-center w-full h-48 px-4 transition bg-gray-50 border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                    <span className="flex items-center space-x-2">
                        <UploadCloud className="w-8 h-8 text-gray-600"/>
                        <span className="font-medium text-gray-600">
                            Glissez-déposez un fichier ou
                            <span className="text-blue-600 underline ml-1">parcourir</span>
                        </span>
                    </span>
                    <input type="file" name="file_upload" className="hidden" accept=".csv" onChange={handleFileChange}/>
                </label>
                {isUploading && <div className="mt-4 flex items-center justify-center text-gray-600"><Loader2 className="animate-spin mr-2"/>Analyse en cours...</div>}
                {parsedData && (
                    <div className="mt-6">
                        <h3 className="font-semibold text-lg mb-2">Aperçu des données ({file?.name})</h3>
                        <div className="overflow-x-auto max-h-64 border rounded-lg">
                            <table className="min-w-full text-sm divide-y divide-gray-200">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        {Object.keys(parsedData[0]).map(key => (
                                            <th key={key} className="px-4 py-2 text-left font-semibold text-gray-600">{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {parsedData.slice(0, 5).map((row, i) => (
                                        <tr key={i}>
                                            {Object.values(row).map((value: any, j: number) => (
                                                <td key={j} className="px-4 py-2 whitespace-nowrap text-gray-700">{value}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

const ConnectorModal: React.FC<{ type: string; onClose: () => void }> = ({ type, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const source = dataSourceTypes.find(s => s.type === type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    toast.loading('Simulation de la connexion...');

    setTimeout(() => {
      setIsLoading(false);
      toast.dismiss();
      toast.success(`Connexion à ${source?.name} simulée avec succès !`);
      onClose();
    }, 2000);
  };

  if (!source || (source.type !== 'postgres' && source.type !== 'mongodb')) {
    // This modal is only for DB connectors. File uploads are handled on the main page.
    // Silently close if the type is not a DB. This is to handle clicks on CSV/Pandas cards.
    useEffect(() => {
        onClose();
    }, [onClose]);
    return null;
  }

  return (
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
          <div className="flex items-center space-x-3">
            {source.icon}
            <h2 className="text-xl font-bold text-gray-800">Configurer {source.name}</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100"><X /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm p-3 rounded-lg flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold">Ceci est une simulation.</span> Pour des raisons de sécurité, n'entrez jamais de vrais identifiants dans une interface frontend. La gestion des connexions doit se faire côté serveur.
              </div>
            </div>
            {['Hôte', 'Port', 'Nom de la base', 'Utilisateur', 'Mot de passe'].map(field => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                <input
                  type={field === 'Mot de passe' ? 'password' : 'text'}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder={field === 'Port' ? (source.type === 'postgres' ? '5432' : '27017') : ''}
                />
              </div>
            ))}
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 flex items-center"
            >
              {isLoading && <Loader2 className="animate-spin mr-2" />}
              {isLoading ? 'Connexion...' : 'Tester la connexion'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default DataSourcesPage;
