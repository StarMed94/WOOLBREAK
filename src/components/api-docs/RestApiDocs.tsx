import React from 'react';
import { motion } from 'framer-motion';
import CodeBlock from './CodeBlock';

const restEndpoints = [
  {
    method: 'GET',
    path: '/api/v1/users',
    description: 'Récupère la liste de tous les utilisateurs.',
    response: JSON.stringify([
      { id: 'usr_1', username: 'alice', role: 'editor' },
      { id: 'usr_2', username: 'bob', role: 'viewer' },
    ], null, 2),
  },
  {
    method: 'GET',
    path: '/api/v1/users/{id}',
    description: 'Récupère les informations d\'un utilisateur spécifique.',
    response: JSON.stringify({ id: 'usr_1', username: 'alice', role: 'editor', created_at: '2025-01-15T10:00:00Z' }, null, 2),
  },
  {
    method: 'POST',
    path: '/api/v1/products',
    description: 'Crée un nouveau produit.',
    response: JSON.stringify({ id: 'prod_xyz', name: 'Nouveau Produit', price: 99.99, status: 'created' }, null, 2),
  },
  {
    method: 'DELETE',
    path: '/api/v1/products/{id}',
    description: 'Supprime un produit.',
    response: JSON.stringify({ status: 'deleted', id: 'prod_xyz' }, null, 2),
  },
];

const RestApiDocs: React.FC = () => {
  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800';
      case 'POST': return 'bg-green-100 text-green-800';
      case 'PUT':
      case 'PATCH': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {restEndpoints.map((endpoint, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md border">
          <div className="flex items-center space-x-4 mb-3">
            <span className={`px-2.5 py-0.5 text-sm font-semibold rounded-full ${getMethodColor(endpoint.method)}`}>
              {endpoint.method}
            </span>
            <code className="text-md font-mono text-gray-800 bg-gray-100 px-2 py-1 rounded">{endpoint.path}</code>
          </div>
          <p className="text-gray-600 mb-4">{endpoint.description}</p>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Exemple de réponse :</h4>
            <CodeBlock code={endpoint.response} language="json" />
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default RestApiDocs;
