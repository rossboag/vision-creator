"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SlideOutMenu } from "./slide-out-menu"
import { useEditorStore } from "@/store/editor-store"
import { konvaWrapper } from "@/lib/konva-wrapper"

interface CustomShapeMenuProps {
  onClose: () => void
}

export function CustomShapeMenu({ onClose }: CustomShapeMenuProps) {
  const { addElement, updateElement, selectedIds } = useEditorStore()
  const [pathData, setPathData] = useState("")
  const [fillColor, setFillColor] = useState("#000000")
  const [strokeColor, setStrokeColor] = useState("#000000")
  const [strokeWidth, setStrokeWidth] = useState(1)

  const handleAddCustomShape = () => {
    const newElement = addElement({
      type: "custom",
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      pathData: pathData,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      layerId: "default",
    })
    if (newElement) {
      konvaWrapper.addCustomShape(pathData, {
        x: 100,
        y: 100,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      })
    }
    onClose()
  }

  const handleUpdateCustomShape = () => {
    if (selectedIds.length === 1) {
      const id = selectedIds[0]
      updateElement(id, {
        pathData: pathData,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      })
      konvaWrapper.updateCustomShape(id, pathData, {
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
      })
    }
  }

  return (
    <SlideOutMenu title="Custom Shape" onClose={onClose}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="path-data">SVG Path Data</Label>
          <Input
            id="path-data"
            value={pathData}
            onChange={(e) => setPathData(e.target.value)}
            placeholder="M 0,0 L 100,0 L 100,100 L 0,100 Z"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fill-color">Fill Color</Label>
          <Input id="fill-color" type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stroke-color">Stroke Color</Label>
          <Input id="stroke-color" type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="stroke-width">Stroke Width</Label>
          <Input
            id="stroke-width"
            type="number"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            min={0}
            step={1}
          />
        </div>
        {selectedIds.length === 1 ? (
          <Button onClick={handleUpdateCustomShape} className="w-full">
            Update Custom Shape
          </Button>
        ) : (
          <Button onClick={handleAddCustomShape} className="w-full">
            Add Custom Shape
          </Button>
        )}
      </div>
    </SlideOutMenu>
  )
}

