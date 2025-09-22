import React from 'react'
import { motion } from 'framer-motion'
import { X, Settings } from 'lucide-react'
import { Block } from './types'
import { useTheme } from './ThemeContext'

interface PropertiesPanelProps {
  block: Block
  onUpdateProps: (blockId: string, newProps: any) => void
  onDeleteBlock: (blockId: string) => void
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  block,
  onUpdateProps,
  onDeleteBlock
}) => {
  const { theme } = useTheme();

  const updateProp = (key: string, value: any) => {
    onUpdateProps(block.id, { [key]: value })
  }

  const renderPropertiesForType = () => {
    switch (block.type) {
      case 'text':
      case 'heading':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Contenu
              </label>
              <textarea
                value={block.props.content}
                onChange={(e) => updateProp('content', e.target.value)}
                className="w-full p-2 border border-gray-300/20 rounded-lg resize-none bg-surface"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Taille de police: {block.props.fontSize}px
              </label>
              <input
                type="range"
                min="12"
                max="72"
                value={block.props.fontSize}
                onChange={(e) => updateProp('fontSize', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Style
              </label>
              <select
                value={block.props.fontWeight}
                onChange={(e) => updateProp('fontWeight', e.target.value)}
                className="w-full p-2 border border-gray-300/20 rounded bg-surface"
              >
                <option value="normal">Normal</option>
                <option value="bold">Gras</option>
                <option value="light">Léger</option>
              </select>
            </div>
            {block.type === 'heading' && (
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Niveau de titre
                </label>
                <select
                  value={block.props.level}
                  onChange={(e) => updateProp('level', e.target.value)}
                  className="w-full p-2 border border-gray-300/20 rounded bg-surface"
                >
                  <option value="h1">H1</option>
                  <option value="h2">H2</option>
                  <option value="h3">H3</option>
                  <option value="h4">H4</option>
                  <option value="h5">H5</option>
                  <option value="h6">H6</option>
                </select>
              </div>
            )}
            <div className="text-xs text-text-secondary p-2 bg-white/5 rounded-md">
              Les couleurs et polices sont gérées par le thème actif.
            </div>
          </div>
        )

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                URL de l'image
              </label>
              <input
                type="url"
                value={block.props.src}
                onChange={(e) => updateProp('src', e.target.value)}
                className="w-full p-2 border border-gray-300/20 rounded bg-surface"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Texte alternatif
              </label>
              <input
                type="text"
                value={block.props.alt}
                onChange={(e) => updateProp('alt', e.target.value)}
                className="w-full p-2 border border-gray-300/20 rounded bg-surface"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Largeur
                </label>
                <input
                  type="number"
                  value={block.props.width}
                  onChange={(e) => updateProp('width', parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300/20 rounded bg-surface"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Hauteur
                </label>
                <input
                  type="number"
                  value={block.props.height}
                  onChange={(e) => updateProp('height', parseInt(e.target.value))}
                  className="w-full p-2 border border-gray-300/20 rounded bg-surface"
                />
              </div>
            </div>
          </div>
        )

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Texte du bouton
              </label>
              <input
                type="text"
                value={block.props.text}
                onChange={(e) => updateProp('text', e.target.value)}
                className="w-full p-2 border border-gray-300/20 rounded bg-surface"
              />
            </div>
            <div className="text-xs text-text-secondary p-2 bg-white/5 rounded-md">
              Les couleurs sont gérées par le thème actif.
            </div>
          </div>
        )

      case 'container':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Hauteur minimale: {block.props.minHeight}px
              </label>
              <input
                type="range"
                min="100"
                max="500"
                value={block.props.minHeight}
                onChange={(e) => updateProp('minHeight', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
             <div className="text-xs text-text-secondary p-2 bg-white/5 rounded-md">
              La couleur de fond est gérée par le thème actif.
            </div>
          </div>
        )

      case 'spacer':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Hauteur: {block.props.height}px
              </label>
              <input
                type="range"
                min="10"
                max="200"
                value={block.props.height}
                onChange={(e) => updateProp('height', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )

      default:
        return <div>Aucune propriété disponible</div>
    }
  }

  return (
    <div className="w-80 bg-surface border-l border-gray-200/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200/10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-text-secondary" />
          <h3 className="font-semibold font-heading">Propriétés</h3>
        </div>
        <button
          onClick={() => onDeleteBlock(block.id)}
          className="p-1 hover:bg-red-500/20 text-red-500 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Properties */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4 p-3 bg-white/5 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="font-medium font-heading capitalize">{block.type}</span>
          </div>
          <div className="text-sm text-text-secondary">
            Position: {Math.round(block.position.x)}, {Math.round(block.position.y)}
          </div>
        </div>

        {renderPropertiesForType()}
      </div>
    </div>
  )
}

export default PropertiesPanel
