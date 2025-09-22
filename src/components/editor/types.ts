export interface Block {
  id: string
  type: string
  position: { x: number; y: number }
  props: any
  children: Block[]
}

export interface BlockType {
  id: string
  name: string
  icon: React.ReactNode
  category: string
  description: string
}

export interface DragItem {
  type: string
  blockType: string
  id?: string
}
