import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ZoomIn, ZoomOut } from "lucide-react"
import { useEditorStore } from "@/store/editor-store"

export function CanvasControls() {
  const { canvasSize, setCanvasSize, scale, setScale } = useEditorStore()

  const handleSizeChange = (dimension: "width" | "height", value: string) => {
    const numValue = Number.parseInt(value, 10)
    if (!isNaN(numValue)) {
      setCanvasSize({ ...canvasSize, [dimension]: numValue })
    }
  }

  const handleZoom = (delta: number) => {
    setScale(Math.max(0.1, Math.min(5, scale + delta)))
  }

  return (
    <div className="flex items-center space-x-4 p-2 bg-card rounded-md">
      <div className="flex items-center space-x-2">
        <Label htmlFor="canvas-width">W:</Label>
        <Input
          id="canvas-width"
          type="number"
          value={canvasSize.width}
          onChange={(e) => handleSizeChange("width", e.target.value)}
          className="w-20"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Label htmlFor="canvas-height">H:</Label>
        <Input
          id="canvas-height"
          type="number"
          value={canvasSize.height}
          onChange={(e) => handleSizeChange("height", e.target.value)}
          className="w-20"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={() => handleZoom(-0.1)}>
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-sm">{Math.round(scale * 100)}%</span>
        <Button variant="outline" size="icon" onClick={() => handleZoom(0.1)}>
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

