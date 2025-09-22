import React, { useState, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { motion } from 'framer-motion'
import { Save, Eye, Undo, Redo, Download, Palette } from 'lucide-react'
import Toolbar from './Toolbar'
import Canvas from './Canvas'
import PropertiesPanel from './PropertiesPanel'
import ThemeSelector from './ThemeSelector'
import { ThemeProvider } from './ThemeContext'
import { Block } from './types'
import { v4 as uuidv4 } from 'uuid'

const VisualEditor: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [history, setHistory] = useState<Block[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false)

  const addBlock = useCallback((blockType: string, position?: { x: number; y: number }) => {
    const newBlock: Block = {
      id: uuidv4(),
      type: blockType,
      position: position || { x: 50, y: blocks.length * 100 + 50 },
      props: getDefaultPropsForType(blockType),
      children: []
    }

    const newBlocks = [...blocks, newBlock]
    setBlocks(newBlocks)
    
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...newBlocks])
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [blocks, history, historyIndex])

  const getDefaultPropsForType = (type: string) => {
    switch (type) {
      case 'text':
        return { content: 'Texte d\'exemple', fontSize: 16, fontWeight: 'normal' }
      case 'heading':
        return { content: 'Titre principal', fontSize: 32, fontWeight: 'bold', level: 'h1' }
      case 'image':
        return { src: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300', alt: 'Image', width: 400, height: 300 }
      case 'button':
        return { text: 'Bouton', padding: '12px 24px', borderRadius: '8px' }
      case 'container':
        return { padding: '20px', borderRadius: '8px', minHeight: 200 }
      case 'spacer':
        return { height: 50 }
      default:
        return {}
    }
  }

  const updateBlockProps = useCallback((blockId: string, newProps: any) => {
    const newBlocks = blocks.map(block => 
      block.id === blockId ? { ...block, props: { ...block.props, ...newProps } } : block
    )
    setBlocks(newBlocks)
  }, [blocks])

  const deleteBlock = useCallback((blockId: string) => {
    const newBlocks = blocks.filter(block => block.id !== blockId)
    setBlocks(newBlocks)
    setSelectedBlockId(null)
  }, [blocks])

  const moveBlock = useCallback((blockId: string, position: { x: number; y: number }) => {
    const newBlocks = blocks.map(block => 
      block.id === blockId ? { ...block, position } : block
    )
    setBlocks(newBlocks)
  }, [blocks])

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setBlocks(history[historyIndex - 1])
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setBlocks(history[historyIndex + 1])
    }
  }

  const saveProject = () => {
    const projectData = {
      blocks,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }
    localStorage.setItem('woolbrick-project', JSON.stringify(projectData))
  }

  return (
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="h-screen bg-background text-text flex flex-col font-body">
          {/* Header */}
          <div className="bg-surface border-b border-gray-200/10 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold font-heading">Éditeur Woolbrick</h1>
              <div className="flex items-center space-x-2">
                <motion.button 
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Undo className="w-5 h-5" />
                </motion.button>
                <motion.button 
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Redo className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <motion.button 
                onClick={() => setIsThemeSelectorOpen(true)}
                className="bg-white/10 text-text px-4 py-2 rounded-lg flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Palette className="w-4 h-4" />
                <span>Thèmes</span>
              </motion.button>

              <motion.button 
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                  isPreviewMode ? 'bg-primary text-white' : 'bg-white/10 text-text'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="w-4 h-4" />
                <span>{isPreviewMode ? 'Édition' : 'Aperçu'}</span>
              </motion.button>
              
              <motion.button 
                onClick={saveProject}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save className="w-4 h-4" />
                <span>Sauvegarder</span>
              </motion.button>

              <motion.button 
                className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </motion.button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex">
            {!isPreviewMode && <Toolbar onAddBlock={addBlock} />}
            <div className="flex-1 relative">
              <Canvas 
                blocks={blocks}
                selectedBlockId={selectedBlockId}
                onSelectBlock={setSelectedBlockId}
                onMoveBlock={moveBlock}
                onDeleteBlock={deleteBlock}
                isPreviewMode={isPreviewMode}
              />
            </div>
            {!isPreviewMode && selectedBlockId && (
              <PropertiesPanel 
                block={blocks.find(b => b.id === selectedBlockId)!}
                onUpdateProps={updateBlockProps}
                onDeleteBlock={deleteBlock}
              />
            )}
          </div>
        </div>
        <ThemeSelector isOpen={isThemeSelectorOpen} onClose={() => setIsThemeSelectorOpen(false)} />
      </DndProvider>
    </ThemeProvider>
  )
}

export default VisualEditor
