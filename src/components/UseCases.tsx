import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Building, Users, Briefcase, BookOpen, Heart } from 'lucide-react'

const UseCases: React.FC = () => {
  const useCases = [
    {
      icon: <ShoppingCart className="w-12 h-12" />,
      title: "E-commerce",
      description: "Créez votre boutique en ligne avec gestion des stocks, paiements et livraisons intégrés",
      features: ["Catalogue produits", "Panier d'achat", "Passerelles de paiement", "Gestion des commandes"],
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Building className="w-12 h-12" />,
      title: "Sites Corporate",
      description: "Développez la présence digitale de votre entreprise avec des sites professionnels",
      features: ["Pages institutionnelles", "Blog intégré", "Formulaires de contact", "SEO optimisé"],
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Communautés",
      description: "Construisez des plateformes sociales et communautaires interactives",
      features: ["Profils utilisateurs", "Chat en temps réel", "Forums", "Événements"],
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "Applications SaaS",
      description: "Lancez vos applications métier avec tableaux de bord et analytics",
      features: ["Dashboard analytics", "API REST", "Multi-tenant", "Facturation"],
      color: "from-orange-500 to-red-600"
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Plateformes d'apprentissage",
      description: "Créez des cours en ligne et programmes de formation interactifs",
      features: ["Gestion des cours", "Quiz interactifs", "Suivi des progrès", "Certificats"],
      color: "from-indigo-500 to-purple-600"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Applications personnelles",
      description: "Développez vos projets personnels et portfolios créatifs",
      features: ["Portfolios", "Blogs personnels", "Galeries", "CV en ligne"],
      color: "from-pink-500 to-rose-600"
    }
  ]

  return (
    <section id="solutions" className="py-20 bg-gray-50">
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
            Solutions pour{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              tous vos projets
            </span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            De la simple vitrine au SaaS complexe, Woolbrick s'adapte à tous vos besoins 
            avec des templates optimisés et des fonctionnalités avancées.
          </motion.p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Icon */}
              <div className={`w-20 h-20 rounded-xl bg-gradient-to-r ${useCase.color} flex items-center justify-center text-white mb-6`}>
                {useCase.icon}
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {useCase.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {useCase.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {useCase.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${useCase.color}`}></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.button 
                className={`mt-6 w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${useCase.color} hover:shadow-lg transition-all duration-200`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Commencer ce projet
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div 
          className="mt-20 bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">&lt; 1h</div>
              <div className="text-gray-600">Temps de création moyen</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
              <div className="text-gray-600">Disponibilité garantie</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Support technique</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">∞</div>
              <div className="text-gray-600">Possibilités créatives</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default UseCases
