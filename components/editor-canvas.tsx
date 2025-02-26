"use client"

import { useEffect, useRef } from "react"
import { useEditorStore } from "@/store/editor-store"
import { Konva } from "@/lib/konva-wrapper"

const CANVAS_ID = "konva-canvas"
const BACKGROUND_COLOR = "#ffffff"

export default function EditorCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const { elements, canvasSize, scale, position } = useEditorStore()

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return

    const stage = new Konva.Stage({
      container: canvasRef.current,
      width: canvasSize.width,
      height: canvasSize.height,
    })

    const layer = new Konva.Layer()
    stage.add(layer)

    // Add elements to the layer
    elements.forEach((element) => {
      // Create Konva shapes based on element type and add to layer
    })

    // Update stage properties
    stage.scale({ x: scale, y: scale })
    stage.position(position)

    // Clean up
    return () => {
      stage.destroy()
    }
  }, [elements, canvasSize, scale, position])

  return <div ref={canvasRef} />
}

