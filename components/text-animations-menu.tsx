"use client"

import { Button } from "@/components/ui/button"
import { useEditorStore } from "@/store/editor-store"
import { X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TextAnimationsMenuProps {
  onClose: () => void
}

export function TextAnimationsMenu({ onClose }: TextAnimationsMenuProps) {
  const { selectedIds, elements, updateElement } = useEditorStore()

  const handleTextAnimationChange = (animationType: string) => {
    if (selectedIds.length === 1) {
      updateElement(selectedIds[0], { textAnimation: animationType })
    }
  }

  return (
    <div className="fixed left-16 top-12 bottom-[200px] w-64 bg-background border-r border-gray-700 z-20 flex flex-col text-sm overflow-hidden">
      <div className="flex justify-between items-center p-2 border-b border-gray-700">
        <h2 className="text-base font-semibold">Text Animations</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <Select onValueChange={handleTextAnimationChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select text animation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="typewriter">Typewriter</SelectItem>
            <SelectItem value="wave">Wave</SelectItem>
            <SelectItem value="bounce">Bounce</SelectItem>
            <SelectItem value="flicker">Flicker</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

