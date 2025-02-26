"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useEditorStore } from "@/store/editor-store"
import { ZoomIn, ZoomOut, Maximize, Minimize, Move, Home } from "lucide-react"
import { konvaWrapper } from "@/lib/konva-wrapper"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"

const CANVAS_PRESETS = {
  Landscape: { width: 1920, height: 1080 },
  Portrait: { width: 1080, height: 1920 },
  Square: { width: 1080, height: 1080 },
  "4K": { width: 3840, height: 2160 },
  "4K Portrait": { width: 2160, height: 3840 },
}

export function TopToolbar() {
  const {
    canvasSize,
    setCanvasSize,
    scale,
    setScale,
    position,
    setPosition,
    isFitToScreen,
    setIsFitToScreen,
    resetView,
    activeTool,
    setActiveTool,
  } = useEditorStore()
  const [displayWidth, setDisplayWidth] = useState(canvasSize.width.toString().padStart(4, "0"))
  const [displayHeight, setDisplayHeight] = useState(canvasSize.height.toString().padStart(4, "0"))

  useEffect(() => {
    setDisplayWidth(canvasSize.width.toString().padStart(4, "0"))
    setDisplayHeight(canvasSize.height.toString().padStart(4, "0"))
  }, [canvasSize])

  const handlePresetChange = (preset: keyof typeof CANVAS_PRESETS) => {
    const newSize = CANVAS_PRESETS[preset]
    setCanvasSize(newSize)
    konvaWrapper.drawCanvas(newSize.width, newSize.height)
  }

  const handleCanvasSizeChange = (dimension: "width" | "height", value: string) => {
    const numValue = Number.parseInt(value, 10)
    if (!isNaN(numValue)) {
      const newSize = { ...canvasSize, [dimension]: numValue }
      setCanvasSize(newSize)
      konvaWrapper.drawCanvas(newSize.width, newSize.height)
    }
    if (dimension === "width") {
      setDisplayWidth(value)
    } else {
      setDisplayHeight(value)
    }
  }

  const handleInputBlur = (dimension: "width" | "height") => {
    if (dimension === "width") {
      setDisplayWidth(canvasSize.width.toString().padStart(4, "0"))
    } else {
      setDisplayHeight(canvasSize.height.toString().padStart(4, "0"))
    }
  }

  const handleZoom = useCallback(
    (zoomIn: boolean) => {
      const stage = konvaWrapper.getStage()
      if (!stage) return

      const oldScale = scale
      const scaleBy = 1.2
      const newScale = zoomIn ? oldScale * scaleBy : oldScale / scaleBy

      const stageSize = stage.size()
      const centerX = stageSize.width / 2
      const centerY = stageSize.height / 2

      const oldCenterX = (centerX - position.x) / oldScale
      const oldCenterY = (centerY - position.y) / oldScale

      const newPosition = {
        x: centerX - oldCenterX * newScale,
        y: centerY - oldCenterY * newScale,
      }

      setScale(newScale)
      setPosition(newPosition)
      konvaWrapper.updateStage(stageSize.width, stageSize.height, newScale, newPosition.x, newPosition.y)
      setIsFitToScreen(false)
    },
    [scale, position, setScale, setPosition, setIsFitToScreen],
  )

  const toggleFitToScreen = () => {
    setIsFitToScreen(!isFitToScreen)
    resetView()
  }

  const togglePanTool = () => {
    if (activeTool === "pan") {
      setActiveTool("select")
    } else {
      setActiveTool("pan")
    }
  }

  return (
    <div className="h-full flex items-center justify-between p-2 bg-card text-card-foreground">
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <Button
            variant="outline"
            size="icon"
            className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Home className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Canvas Size:</span>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={displayWidth}
            onChange={(e) => handleCanvasSizeChange("width", e.target.value)}
            onBlur={() => handleInputBlur("width")}
            className="w-16 bg-background text-foreground text-sm"
          />
          <span className="text-sm">x</span>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={displayHeight}
            onChange={(e) => handleCanvasSizeChange("height", e.target.value)}
            onBlur={() => handleInputBlur("height")}
            className="w-16 bg-background text-foreground text-sm"
          />
          <Select onValueChange={handlePresetChange}>
            <SelectTrigger className="w-32 bg-background text-foreground text-sm">
              <SelectValue placeholder="Canvas Presets" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(CANVAS_PRESETS).map((preset) => (
                <SelectItem key={preset} value={preset}>
                  {preset}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleZoom(false)}
          className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-sm">{Math.round(scale * 100)}%</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleZoom(true)}
          className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant={activeTool === "pan" ? "secondary" : "outline"}
          size="sm"
          onClick={togglePanTool}
          className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Move className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFitToScreen}
          className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          {isFitToScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={resetView}
          className="bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          Reset View
        </Button>
      </div>
    </div>
  )
}

