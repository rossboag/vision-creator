"use client"

import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

export interface Element {
  id: string
  type: string
  x: number
  y: number
  width: number
  height: number
  fill: string
  layerId: string
  [key: string]: any
}

export interface Layer {
  id: string
  name: string
  visible: boolean
  locked: boolean
}

export interface TextElement extends Element {
  text?: string
  fontSize?: number
  fontFamily?: string
  color?: string
  textAlign?: "left" | "center" | "right"
  letterSpacing?: number
  lineHeight?: number
  wrap?: "soft" | "hard" | "none"
  ellipsis?: boolean
  underline?: boolean
  strike?: boolean
  textEffects?: {
    shadow?: { color: string; blur: number; offsetX: number; offsetY: number }
    stroke?: { color: string; width: number }
    glow?: { color: string; blur: number }
  }
  textAnimation?: {
    type: string
    duration: number
    delay: number
    repeat: number
  }
  textPath?: {
    data: string
    startOffset: number
  }
  mask?: {
    type: "image" | "shape"
    data: string
  }
  orientation?: string
}

interface EditorState {
  elements: Element[]
  layers: Layer[]
  selectedIds: string[]
  canvasSize: { width: number; height: number }
  scale: number
  position: { x: number; y: number }
  isFitToScreen: boolean
  activeTool: string
  currentTime: number
  duration: number
  isPlaying: boolean
  addElement: (element: Omit<Element, "id">) => Element | undefined
  updateElement: (id: string, changes: Partial<Element>) => void
  removeElement: (id: string) => void
  setSelectedIds: (ids: string[]) => void
  toggleSelectedId: (id: string) => void
  setCanvasSize: (size: { width: number; height: number }) => void
  setScale: (scale: number) => void
  setPosition: (position: { x: number; y: number }) => void
  setIsFitToScreen: (isFitToScreen: boolean) => void
  resetView: () => void
  setActiveTool: (tool: string) => void
  updateSelectedElements: (changes: Partial<Element>) => void
  addLayer: (layer: Omit<Layer, "id">) => void
  updateLayer: (id: string, changes: Partial<Layer>) => void
  removeLayer: (id: string) => void
  setCurrentTime: (time: number) => void
  togglePlayback: () => void
  undo: () => void
  redo: () => void
  setActiveAITool: (tool: string | null) => void
  activeAITool: string | null
}

export const useEditorStore = create<EditorState>((set, get) => ({
  elements: [],
  layers: [{ id: "default", name: "Default Layer", visible: true, locked: false }],
  selectedIds: [],
  canvasSize: { width: 1920, height: 1080 },
  scale: 1,
  position: { x: 0, y: 0 },
  isFitToScreen: true,
  activeTool: "select",
  currentTime: 0,
  duration: 5, // 5 seconds default duration
  isPlaying: false,
  activeAITool: null,

  addElement: (element) => {
    console.log("EditorStore: Adding element", element)
    const newElement = { ...element, id: uuidv4() }
    console.log("EditorStore: New element created", newElement)
    set((state) => ({
      elements: [...state.elements, newElement],
    }))
    return newElement
  },

  updateElement: (id, changes) => {
    console.log("EditorStore: Updating element", id, changes)
    set((state) => ({
      elements: state.elements.map((el) => (el.id === id ? { ...el, ...changes } : el)),
    }))
  },

  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedIds: state.selectedIds.filter((selectedId) => selectedId !== id),
    })),

  setSelectedIds: (ids) => set({ selectedIds: ids }),

  toggleSelectedId: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((selectedId) => selectedId !== id)
        : [...state.selectedIds, id],
    })),

  setCanvasSize: (size) => set({ canvasSize: size }),

  setScale: (scale) => set({ scale }),

  setPosition: (position) => set({ position }),

  setIsFitToScreen: (isFitToScreen) => set({ isFitToScreen }),

  resetView: () => set({ scale: 1, position: { x: 0, y: 0 }, isFitToScreen: true }),

  setActiveTool: (tool) => {
    console.log("EditorStore: Setting active tool", tool)
    set({ activeTool: tool })
  },

  updateSelectedElements: (changes) =>
    set((state) => ({
      elements: state.elements.map((el) => (state.selectedIds.includes(el.id) ? { ...el, ...changes } : el)),
    })),

  addLayer: (layer) =>
    set((state) => ({
      layers: [...state.layers, { ...layer, id: uuidv4() }],
    })),

  updateLayer: (id, changes) =>
    set((state) => ({
      layers: state.layers.map((layer) => (layer.id === id ? { ...layer, ...changes } : layer)),
    })),

  removeLayer: (id) =>
    set((state) => ({
      layers: state.layers.filter((layer) => layer.id !== id),
    })),

  setCurrentTime: (time) => set({ currentTime: time }),

  togglePlayback: () => set((state) => ({ isPlaying: !state.isPlaying })),

  undo: () => {
    // Implement undo logic
  },

  redo: () => {
    // Implement redo logic
  },
  setActiveAITool: (tool) => set({ activeAITool: tool }),
}))

