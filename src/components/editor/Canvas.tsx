import React from 'react'
import { useDrop } from 'react-dnd'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import BlockRenderer from './BlockRenderer'
import { Block, DragItem } from './types'

interface CanvasProps {
  blocks: Block[]
  selectedBlockId: string | null
  onSelectBlock: (blockId: string | null) => void
  onMoveBlock: (blockId: string, position: { x: number; y: number }) => void
  onDeleteBlock: (blockId:string) => void
  isPreviewMode: boolean
}

const Canvas: React.FC<CanvasProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onMoveBlock,
  onDeleteBlock,
  isPreviewMode
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'block',
    drop: (item: DragItem, monitor) => {
      const offset = monitor.getClientOffset()
      const canvasRect = document.getElementById('canvas')?.getBoundingClientRect()
      
      if (offset && canvasRect) {
        const position = {
          x: offset.x - canvasRect.left,
          y: offset.y - canvasRect.top
        }
        
        if (item.id) {
          onMoveBlock(item.id, position)
        }
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  return (
    <div 
      id="canvas"
      ref={drop}
      className={`relative w-full h-full overflow-auto bg-background ${
        isOver ? 'bg-primary/10' : ''
      } ${isPreviewMode ? '' : 'p-8'}`}
      onClick={() => !isPreviewMode && onSelectBlock(null)}
    >
      {blocks.length === 0 && !isPreviewMode && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center text-text-secondary">
            <Plus className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2 font-heading">Commencez votre création</h3>
            <p>
              Glissez-déposez des composants depuis la barre d'outils
            </p>
          </div>
        </motion.div>
      )}

      {isOver && (
        <motion.div 
          className="absolute inset-0 border-2 border-dashed border-primary bg-primary/20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {blocks.map(block => (
        <BlockRenderer
          key={block.id}
          block={block}
          isSelected={selectedBlockId === block.id}
          onSelect={onSelectBlock}
          onMove={onMoveBlock}
          onDelete={onDeleteBlock}
          isPreviewMode={isPreviewMode}
        />
      ))}
    </div>
  )
}

export default Canvas
