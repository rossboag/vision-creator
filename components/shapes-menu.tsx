"use client"

import { Button } from "@/components/ui/button"
import { useEditorStore } from "@/store/editor-store"
import { Square, Triangle, Hexagon, Circle, X } from "lucide-react"
import { SketchPicker } from "react-color"
import { useState } from "react"

interface ShapesMenuProps {
  onClose: () => void
}

export function ShapesMenu({ onClose }: ShapesMenuProps) {
  const { addElement } = useEditorStore()
  const [color, setColor] = useState("#ff0000")

  const handleShapeClick = (shapeType: "rectangle" | "triangle" | "hexagon" | "circle") => {
    addElement({
      type: shapeType,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      fill: color,
    })
    onClose()
  }

  return (
    <div className="fixed left-16 top-12 bottom-[200px] w-64 bg-background border-r border-gray-700 z-20 flex flex-col text-sm overflow-hidden">
      <div className="flex justify-between items-center p-2 border-b border-gray-700">
        <h2 className="text-base font-semibold">Shapes</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={() => handleShapeClick("rectangle")}>
            <Square className="h-4 w-4 mr-1" />
            Rectangle
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleShapeClick("circle")}>
            <Circle className="h-4 w-4 mr-1" />
            Circle
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleShapeClick("triangle")}>
            <Triangle className="h-4 w-4 mr-1" />
            Triangle
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleShapeClick("hexagon")}>
            <Hexagon className="h-4 w-4 mr-1" />
            Hexagon
          </Button>
        </div>
        <h3 className="text-sm font-semibold mb-2">Color</h3>
        <SketchPicker color={color} onChange={(newColor) => setColor(newColor.hex)} disableAlpha={true} />
      </div>
    </div>
  )
}

