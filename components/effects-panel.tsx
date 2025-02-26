"use client"

import { useState } from "react"
import { useEditorStore } from "@/store/editor-store"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export function EffectsPanel() {
  const { selectedId, elements, applyEffect } = useEditorStore()
  const selectedElement = elements.find((el) => el.id === selectedId)

  const [blur, setBlur] = useState(selectedElement?.effects.blur || 0)
  const [opacity, setOpacity] = useState(selectedElement?.effects.opacity || 1)

  const handleBlurChange = (value: number[]) => {
    setBlur(value[0])
    if (selectedId) {
      applyEffect(selectedId, { blur: value[0] })
    }
  }

  const handleOpacityChange = (value: number[]) => {
    setOpacity(value[0])
    if (selectedId) {
      applyEffect(selectedId, { opacity: value[0] })
    }
  }

  if (!selectedElement) {
    return <div className="p-4">Select an element to apply effects</div>
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Effects</h3>
      <div className="space-y-2">
        <Label htmlFor="blur">Blur</Label>
        <Slider id="blur" min={0} max={20} step={0.1} value={[blur]} onValueChange={handleBlurChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="opacity">Opacity</Label>
        <Slider id="opacity" min={0} max={1} step={0.01} value={[opacity]} onValueChange={handleOpacityChange} />
      </div>
    </div>
  )
}

