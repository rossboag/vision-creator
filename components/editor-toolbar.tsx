"use client"

import { Button } from "@/components/ui/button"
import { useEditorStore } from "@/store/editor-store"
import { ArrowLeftIcon as ArrowPointer, Shapes, Wand2, Play, ImageIcon, Film, Type, Hexagon } from "lucide-react"
import { useState } from "react"
import { ShapesMenu } from "./shapes-menu"
import { EffectsMenu } from "./effects-menu"
import { AnimationsMenu } from "./animations-menu"
import { ImageMenu } from "./image-menu"
import { VideoMenu } from "./video-menu"
import TextMenu from "./text-menu"
import { CustomShapeMenu } from "./custom-shape-menu"

export function EditorToolbar() {
  const { setActiveTool, activeTool } = useEditorStore()
  const [isShapesMenuOpen, setIsShapesMenuOpen] = useState(false)
  const [isEffectsMenuOpen, setIsEffectsMenuOpen] = useState(false)
  const [isAnimationsMenuOpen, setIsAnimationsMenuOpen] = useState(false)
  const [isImageMenuOpen, setIsImageMenuOpen] = useState(false)
  const [isVideoMenuOpen, setIsVideoMenuOpen] = useState(false)
  const [isTextMenuOpen, setIsTextMenuOpen] = useState(false) // Add this state
  const [isCustomShapeMenuOpen, setIsCustomShapeMenuOpen] = useState(false)

  const handleToolClick = (tool: string) => {
    console.log("EditorToolbar: Tool clicked", tool)
    setActiveTool(tool)

    setIsShapesMenuOpen(false)
    setIsEffectsMenuOpen(false)
    setIsAnimationsMenuOpen(false)
    setIsImageMenuOpen(false)
    setIsVideoMenuOpen(false)
    setIsTextMenuOpen(false) // Close text menu
    setIsCustomShapeMenuOpen(false)

    switch (tool) {
      case "shapes":
        setIsShapesMenuOpen(true)
        break
      case "effects":
        setIsEffectsMenuOpen(true)
        break
      case "animations":
        setIsAnimationsMenuOpen(true)
        break
      case "image":
        setIsImageMenuOpen(true)
        break
      case "video":
        setIsVideoMenuOpen(true)
        break
      case "text":
        setIsTextMenuOpen(true) // Open text menu
        break
      case "customShape":
        setIsCustomShapeMenuOpen(true)
        break
    }
  }

  return (
    <>
      <div className="fixed left-0 top-12 bottom-[200px] w-16 bg-card border-r border-border flex flex-col items-center py-2 space-y-2 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToolClick("select")}
          className={`hover:bg-accent hover:text-accent-foreground ${
            activeTool === "select" ? "bg-accent text-accent-foreground" : ""
          }`}
          title="Select"
        >
          <ArrowPointer className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToolClick("shapes")}
          className={`hover:bg-accent hover:text-accent-foreground ${isShapesMenuOpen ? "bg-accent text-accent-foreground" : ""}`}
          title="Shapes"
        >
          <Shapes className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToolClick("text")}
          className={`hover:bg-accent hover:text-accent-foreground ${isTextMenuOpen ? "bg-accent text-accent-foreground" : ""}`}
          title="Text"
        >
          <Type className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToolClick("effects")}
          className={`hover:bg-accent hover:text-accent-foreground ${isEffectsMenuOpen ? "bg-accent text-accent-foreground" : ""}`}
          title="Effects"
        >
          <Wand2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToolClick("animations")}
          className={`hover:bg-accent hover:text-accent-foreground ${isAnimationsMenuOpen ? "bg-accent text-accent-foreground" : ""}`}
          title="Animations"
        >
          <Play className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToolClick("image")}
          className={`hover:bg-accent hover:text-accent-foreground ${isImageMenuOpen ? "bg-accent text-accent-foreground" : ""}`}
          title="Image"
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToolClick("video")}
          className={`hover:bg-accent hover:text-accent-foreground ${isVideoMenuOpen ? "bg-accent text-accent-foreground" : ""}`}
          title="Video"
        >
          <Film className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToolClick("customShape")}
          className={`hover:bg-accent hover:text-accent-foreground ${isCustomShapeMenuOpen ? "bg-accent text-accent-foreground" : ""}`}
          title="Custom Shape"
        >
          <Hexagon className="h-4 w-4" />
        </Button>
      </div>
      {isShapesMenuOpen && <ShapesMenu onClose={() => setIsShapesMenuOpen(false)} />}
      {isEffectsMenuOpen && <EffectsMenu onClose={() => setIsEffectsMenuOpen(false)} />}
      {isAnimationsMenuOpen && <AnimationsMenu onClose={() => setIsAnimationsMenuOpen(false)} />}
      {isImageMenuOpen && <ImageMenu onClose={() => setIsImageMenuOpen(false)} />}
      {isVideoMenuOpen && <VideoMenu onClose={() => setIsVideoMenuOpen(false)} />}
      {isTextMenuOpen && <TextMenu onClose={() => setIsTextMenuOpen(false)} />}
      {isCustomShapeMenuOpen && <CustomShapeMenu onClose={() => setIsCustomShapeMenuOpen(false)} />}
    </>
  )
}

