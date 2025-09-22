import React from 'react'
import { useDrag } from 'react-dnd'
import { motion } from 'framer-motion'
import { Trash2, Move } from 'lucide-react'
import { Block } from './types'

interface BlockRendererProps {
  block: Block
  isSelected: boolean
  onSelect: (blockId: string | null) => void
  onMove: (blockId: string, position: { x: number; y: number }) => void
  onDelete: (blockId: string) => void
  isPreviewMode: boolean
}

const BlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  isSelected,
  onSelect,
  onMove,
  onDelete,
  isPreviewMode
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'block',
    item: { type: 'block', id: block.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isPreviewMode) {
      onSelect(block.id)
    }
  }

  const renderBlockContent = () => {
    switch (block.type) {
      case 'text':
        return (
          <p 
            className="text-text m-0"
            style={{ 
              fontSize: block.props.fontSize + 'px',
              fontWeight: block.props.fontWeight
            }}
          >
            {block.props.content}
          </p>
        )
      
      case 'heading':
        const HeadingTag = block.props.level as keyof JSX.IntrinsicElements
        return React.createElement(
          HeadingTag,
          {
            className: 'font-heading text-text m-0',
            style: {
              fontSize: block.props.fontSize + 'px',
              fontWeight: block.props.fontWeight,
            }
          },
          block.props.content
        )
      
      case 'image':
        return (
          <img 
            src={block.props.src}
            alt={block.props.alt}
            style={{
              width: block.props.width + 'px',
              height: block.props.height + 'px',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
        )
      
      case 'button':
        return (
          <button
            className="bg-primary text-white font-semibold"
            style={{
              padding: block.props.padding,
              borderRadius: block.props.borderRadius,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {block.props.text}
          </button>
        )
      
      case 'container':
        return (
          <div
            className="bg-surface"
            style={{
              padding: block.props.padding,
              borderRadius: block.props.borderRadius,
              minHeight: block.props.minHeight + 'px',
              border: '2px dashed var(--color-text-secondary)'
            }}
          >
            <div className="text-text-secondary text-center">
              Conteneur - Glissez des éléments ici
            </div>
          </div>
        )
      
      case 'spacer':
        return (
          <div 
            style={{ height: block.props.height + 'px' }}
            className="w-full border border-dashed border-text-secondary/30 flex items-center justify-center text-text-secondary text-sm"
          >
            Espacement ({block.props.height}px)
          </div>
        )
      
      default:
        return <div>Bloc non reconnu</div>
    }
  }

  return (
    <motion.div
      ref={!isPreviewMode ? drag : undefined}
      className={`absolute ${!isPreviewMode ? 'cursor-move' : ''} ${
        isSelected && !isPreviewMode ? 'ring-2 ring-primary' : ''
      } ${isDragging ? 'opacity-50' : ''}`}
      style={{
        left: block.position.x,
        top: block.position.y,
        zIndex: isSelected ? 10 : 1
      }}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={!isPreviewMode ? { scale: 1.02 } : {}}
    >
      <div className="relative">
        {renderBlockContent()}
        
        {isSelected && !isPreviewMode && (
          <motion.div 
            className="absolute -top-10 left-0 bg-primary text-white px-2 py-1 rounded-md flex items-center space-x-2 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Move className="w-3 h-3" />
            <span className="capitalize">{block.type}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(block.id)
              }}
              className="hover:bg-red-600 p-1 rounded"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default BlockRenderer
