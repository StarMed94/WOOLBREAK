import React from 'react'
import { motion } from 'framer-motion'
import { 
  Code, 
  Globe, 
  Layers, 
  Database, 
  Palette, 
  Zap, 
  Shield, 
  Puzzle,
  MousePointer,
  Server,
  Package,
  Workflow
} from 'lucide-react'

const Features: React.FC = () => {
  const features = [
    {
      icon: <MousePointer className="w-8 h-8" />,
      title: "Éditeur Drag & Drop",
      description: "Interface visuelle intuitive pour créer vos applications sans une ligne de code",
      color: "text-blue-600"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Support Multilingue",
      description: "Plus de 200 langues supportées pour toucher une audience mondiale",
      color: "text-green-600"
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: "Bibliothèques Intégrées",
      description: "Accès à toutes les bibliothèques Python, JavaScript, Ruby, Java et plus",
      color: "text-purple-600"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Intégrations Avancées",
      description: "Connectez vos bases de données, APIs et services cloud existants",
      color: "text-orange-600"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Design Personnalisable",
      description: "Thèmes et composants adaptatifs pour tous vos besoins visuels",
      color: "text-pink-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Déploiement Instantané",
      description: "Mettez en ligne vos créations en un clic avec notre infrastructure cloud",
      color: "text-yellow-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Sécurité Enterprise",
      description: "Chiffrement de bout en bout et conformité aux standards de sécurité",
      color: "text-red-600"
    },
    {
      icon: <Workflow className="w-8 h-8" />,
      title: "CI/CD Intégré",
      description: "Workflow de développement automatisé pour vos équipes",
      color: "text-indigo-600"
    }
  ]

  return (
    <section id="fonctionnalites" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Fonctionnalités{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              révolutionnaires
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Découvrez comment Woolbrick transforme la création d'applications web 
            avec ses outils innovants et son écosystème complet.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className={`${feature.color} mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explorer toutes les fonctionnalités
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Features
