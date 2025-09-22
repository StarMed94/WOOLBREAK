import React from 'react'
import { motion } from 'framer-motion'
import { Code, Terminal, ArrowRight, Book } from 'lucide-react'

const ApiSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Terminal className="w-8 h-8 text-blue-400" />
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                API & Extensions
              </h2>
            </div>
            
            {/* API Description - 2 lines as requested */}
            <div className="max-w-4xl mx-auto text-lg text-gray-300 leading-relaxed space-y-2">
              <p>
                <span className="text-blue-400 font-semibold">API REST complète</span> pour intégrer Woolbrick dans vos workflows existants avec authentification JWT, webhooks temps réel et SDK multi-langages (Python, JavaScript, Ruby, Java, PHP).
              </p>
              <p>
                <span className="text-purple-400 font-semibold">Système d'extensions modulaire</span> permettant d'importer et utiliser n'importe quelle bibliothèque from PyPI, npm, RubyGems, Maven directement dans l'éditeur visuel sans configuration.
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code className="w-5 h-5" />
              <span>Explorer l'API</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            
            <motion.button 
              className="bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Book className="w-5 h-5" />
              <span>Documentation</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ApiSection
