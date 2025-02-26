import type React from "react"
import { SketchPicker } from "react-color"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full h-10 rounded-md border border-input cursor-pointer" style={{ backgroundColor: color }} />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <SketchPicker color={color} onChange={(color) => onChange(color.hex)} />
      </PopoverContent>
    </Popover>
  )
}

