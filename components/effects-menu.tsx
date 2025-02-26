"use client"

import { Button } from "@/components/ui/button"
import { useEditorStore } from "@/store/editor-store"
import { X } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"

interface EffectsMenuProps {
  onClose: () => void
}

export function EffectsMenu({ onClose }: EffectsMenuProps) {
  const { selectedIds, elements, updateElement } = useEditorStore()
  const [blur, setBlur] = useState(0)
  const [opacity, setOpacity] = useState(100)

  useEffect(() => {
    if (selectedIds.length === 1) {
      const selectedElement = elements.find((el) => el.id === selectedIds[0])
      if (selectedElement) {
        setBlur(selectedElement.blur || 0)
        setOpacity(selectedElement.opacity !== undefined ? selectedElement.opacity * 100 : 100)
      }
    }
  }, [selectedIds, elements])

  const handleBlurChange = (value: number[]) => {
    setBlur(value[0])
    if (selectedIds.length === 1) {
      updateElement(selectedIds[0], { blur: value[0] })
    }
  }

  const handleOpacityChange = (value: number[]) => {
    setOpacity(value[0])
    if (selectedIds.length === 1) {
      updateElement(selectedIds[0], { opacity: value[0] / 100 })
    }
  }

  return (
    <div className="fixed left-16 top-12 bottom-[200px] w-64 bg-background border-r border-gray-700 z-20 flex flex-col text-sm overflow-hidden">
      <div className="flex justify-between items-center p-2 border-b border-gray-700">
        <h2 className="text-base font-semibold">Effects</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="blur">Blur</Label>
            <Slider
              id="blur"
              min={0}
              max={20}
              step={0.1}
              value={[blur]}
              onValueChange={handleBlurChange}
              className="w-full"
            />
            <div className="text-right text-xs">{blur.toFixed(1)}px</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="opacity">Opacity</Label>
            <Slider
              id="opacity"
              min={0}
              max={100}
              step={1}
              value={[opacity]}
              onValueChange={handleOpacityChange}
              className="w-full"
            />
            <div className="text-right text-xs">{opacity}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

