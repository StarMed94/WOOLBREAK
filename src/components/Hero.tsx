import React from 'react'
import { motion } from 'framer-motion'
import { Play, ArrowRight, Star, Users, Zap, Globe } from 'lucide-react'

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Main Heading */}
          <motion.h1 
            className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Créez des{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              applications web
            </span>{' '}
            sans écrire de code
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Woolbrick est la plateforme no-code qui révolutionne la création web. 
            Lancez votre site, boutique ou application en moins d'une heure avec notre éditeur visuel intelligent.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Commencer gratuitement</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button 
              className="text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              <span>Voir la démo</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-blue-600 mr-2" />
                <span className="text-3xl font-bold text-gray-900">50K+</span>
              </div>
              <p className="text-gray-600">Utilisateurs actifs</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Globe className="w-8 h-8 text-purple-600 mr-2" />
                <span className="text-3xl font-bold text-gray-900">200+</span>
              </div>
              <p className="text-gray-600">Langues supportées</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-yellow-500 mr-2" />
                <span className="text-3xl font-bold text-gray-900">4.9/5</span>
              </div>
              <p className="text-gray-600">Satisfaction client</p>
            </div>
          </motion.div>
        </div>

        {/* Hero Image/Video Placeholder */}
        <motion.div 
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-2">
            <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-xl aspect-video flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-20 h-20 mx-auto mb-4 opacity-80" />
                <p className="text-xl font-semibold">Interface de Woolbrick</p>
                <p className="text-blue-200 mt-2">Éditeur visuel en action</p>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <motion.div 
            className="absolute -top-6 -left-6 bg-white rounded-lg shadow-lg p-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-700">En ligne</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Déploiement rapide</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
