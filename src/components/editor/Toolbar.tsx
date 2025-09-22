import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDrag } from 'react-dnd'
import { 
  Type, 
  Image, 
  Square, 
  MousePointer, 
  Minus,
  Heading1,
  Search
} from 'lucide-react'
import { BlockType } from './types'

interface ToolbarProps {
  onAddBlock: (blockType: string) => void
}

const Toolbar: React.FC<ToolbarProps> = ({ onAddBlock }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const blockTypes: BlockType[] = [
    { id: 'text', name: 'Texte', icon: <Type className="w-5 h-5" />, category: 'content', description: 'Paragraphe de texte' },
    { id: 'heading', name: 'Titre', icon: <Heading1 className="w-5 h-5" />, category: 'content', description: 'Titre de section' },
    { id: 'image', name: 'Image', icon: <Image className="w-5 h-5" />, category: 'media', description: 'Image ou photo' },
    { id: 'button', name: 'Bouton', icon: <MousePointer className="w-5 h-5" />, category: 'interactive', description: 'Bouton cliquable' },
    { id: 'container', name: 'Conteneur', icon: <Square className="w-5 h-5" />, category: 'layout', description: 'Zone de contenu' },
    { id: 'spacer', name: 'Espacement', icon: <Minus className="w-5 h-5" />, category: 'layout', description: 'Espace vertical' }
  ]

  const categories = [
    { id: 'all', name: 'Tous' },
    { id: 'content', name: 'Contenu' },
    { id: 'media', name: 'Média' },
    { id: 'interactive', name: 'Interactif' },
    { id: 'layout', name: 'Mise en page' }
  ]

  const filteredBlocks = blockTypes.filter(block => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || block.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="w-80 bg-surface border-r border-gray-200/10 flex flex-col">
      <div className="p-4 border-b border-gray-200/10">
        <h2 className="text-lg font-semibold font-heading mb-4">Composants</h2>
        <div className="relative mb-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300/20 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-white/10 text-text-secondary hover:bg-white/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredBlocks.map(block => (
            <DraggableBlock 
              key={block.id} 
              block={block} 
              onAddBlock={onAddBlock}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface DraggableBlockProps {
  block: BlockType
  onAddBlock: (blockType: string) => void
}

const DraggableBlock: React.FC<DraggableBlockProps> = ({ block, onAddBlock }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item: { type: 'block', blockType: block.id },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }))

  return (
    <motion.div
      ref={drag}
      className={`p-4 bg-white/5 rounded-lg border border-gray-200/10 cursor-move hover:bg-white/10 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
      onClick={() => onAddBlock(block.id)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start space-x-3">
        <div className="text-primary mt-1">
          {block.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium font-heading">{block.name}</h3>
          <p className="text-sm text-text-secondary mt-1">{block.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Toolbar
