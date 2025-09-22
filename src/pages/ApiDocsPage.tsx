import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RestApiDocs from '../components/api-docs/RestApiDocs';
import GraphQlDocs from '../components/api-docs/GraphQlDocs';

type ApiTab = 'rest' | 'graphql';

const ApiDocsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ApiTab>('rest');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Documentation API</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Intégrez Woolbrick à vos applications grâce à nos API REST et GraphQL.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Tab Selector */}
          <div className="flex justify-center mb-8 bg-gray-200 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('rest')}
              className={`w-1/2 py-2.5 rounded-md text-sm font-medium transition-colors relative ${
                activeTab === 'rest' ? 'text-white' : 'text-gray-600 hover:bg-gray-300/50'
              }`}
            >
              {activeTab === 'rest' && (
                <motion.div
                  layoutId="active-api-tab"
                  className="absolute inset-0 bg-blue-600 rounded-md z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">API REST</span>
            </button>
            <button
              onClick={() => setActiveTab('graphql')}
              className={`w-1/2 py-2.5 rounded-md text-sm font-medium transition-colors relative ${
                activeTab === 'graphql' ? 'text-white' : 'text-gray-600 hover:bg-gray-300/50'
              }`}
            >
              {activeTab === 'graphql' && (
                <motion.div
                  layoutId="active-api-tab"
                  className="absolute inset-0 bg-purple-600 rounded-md z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">GraphQL</span>
            </button>
          </div>

          {/* Content */}
          <div>
            {activeTab === 'rest' ? <RestApiDocs /> : <GraphQlDocs />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiDocsPage;
