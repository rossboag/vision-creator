"use client"

import type React from "react"

import { useEditorStore } from "@/store/editor-store"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, ChevronRight, ChevronDown, Eye, Unlock, Lock, EyeOff } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

const TIMELINE_HEIGHT = 200
const LAYER_HEIGHT = 24 // Reduced from 30 to 24
const TIME_SCALE = 50 // pixels per second
const SECOND_INDICATOR_HEIGHT = 4 // Height of the small boxes for seconds
const TIMELINE_HEADER_HEIGHT = 24 // Height of the timeline header

export function TimelinePanel() {
  const {
    elements,
    layers,
    currentTime,
    setCurrentTime,
    duration,
    isPlaying,
    togglePlayback,
    updateElement,
    updateLayer,
    selectedIds,
    setSelectedIds,
  } = useEditorStore()

  const [expandedLayers, setExpandedLayers] = useState<string[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)
  const [draggingElement, setDraggingElement] = useState<string | null>(null)
  const [draggingEdge, setDraggingEdge] = useState<"start" | "end" | null>(null)

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1 / 60 // Assuming 60 FPS
          return newTime >= duration ? 0 : newTime
        })
        requestAnimationFrame(animate)
      }
      const animationId = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationId)
    }
  }, [isPlaying, duration, setCurrentTime])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const frames = Math.floor((time % 1) * 30)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${frames
      .toString()
      .padStart(2, "0")}`
  }

  const toggleLayerExpansion = (id: string) => {
    setExpandedLayers((prev) => (prev.includes(id) ? prev.filter((layerId) => layerId !== id) : [...prev, id]))
  }

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const newTime = clickX / TIME_SCALE
      setCurrentTime(Math.max(0, Math.min(newTime, duration)))
    }
  }

  const handleLayerDragStart = (id: string, edge: "start" | "end" | null) => {
    setDraggingElement(id)
    setDraggingEdge(edge)
  }

  const handleLayerDrag = (e: React.MouseEvent, id: string) => {
    if (draggingElement === id && timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect()
      const dragX = e.clientX - rect.left
      const newTime = Math.max(0, Math.min(dragX / TIME_SCALE, duration))

      const element = elements.find((el) => el.id === id)
      if (element) {
        if (draggingEdge === "start") {
          updateElement(id, { startTime: Math.min(newTime, element.endTime) })
        } else if (draggingEdge === "end") {
          updateElement(id, { endTime: Math.max(newTime, element.startTime) })
        } else {
          const duration = element.endTime - element.startTime
          updateElement(id, {
            startTime: Math.max(0, newTime),
            endTime: Math.min(duration, newTime + duration),
          })
        }
      }
    }
  }

  const handleLayerDragEnd = () => {
    setDraggingElement(null)
    setDraggingEdge(null)
  }

  const toggleLayerVisibility = (id: string) => {
    const layer = layers.find((l) => l.id === id)
    if (layer) {
      updateLayer(id, { visible: !layer.visible })
    }
  }

  const toggleLayerLock = (id: string) => {
    const layer = layers.find((l) => l.id === id)
    if (layer) {
      updateLayer(id, { locked: !layer.locked })
    }
  }

  return (
    <div className="h-full bg-card text-card-foreground">
      <div className="flex items-center justify-between p-2 border-b border-border">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => setCurrentTime(0)}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={togglePlayback}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
        <div className="text-sm font-mono">{formatTime(currentTime)}</div>
      </div>
      <div className="flex h-[calc(100%-40px)]">
        <div className="w-48 border-r border-border overflow-y-auto">
          <div
            className="flex items-center justify-center font-semibold border-b border-border text-xs"
            style={{ height: `${TIMELINE_HEADER_HEIGHT}px` }}
          >
            Layers
          </div>
          {layers.map((layer) => (
            <div
              key={layer.id}
              className={`flex items-center h-[${LAYER_HEIGHT}px] px-1 ${
                selectedIds.includes(layer.id) ? "bg-accent text-accent-foreground" : ""
              }`}
              onClick={() => setSelectedIds([layer.id])}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleLayerExpansion(layer.id)
                }}
              >
                {expandedLayers.includes(layer.id) ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </Button>
              <span className="ml-1 truncate text-xs">{layer.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-auto"
                onClick={() => toggleLayerVisibility(layer.id)}
              >
                {layer.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => toggleLayerLock(layer.id)}>
                {layer.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
              </Button>
            </div>
          ))}
        </div>
        <div className="flex-1 overflow-x-auto overflow-y-hidden" ref={timelineRef} onClick={handleTimelineClick}>
          <div className="relative" style={{ width: `${duration * TIME_SCALE}px`, height: "100%" }}>
            <div
              className="absolute top-0 left-0 w-full border-b border-border"
              style={{ height: `${TIMELINE_HEADER_HEIGHT}px` }}
            >
              {Array.from({ length: Math.ceil(duration) }).map((_, i) => (
                <div key={i} className="absolute" style={{ left: `${i * TIME_SCALE}px`, height: "100%" }}>
                  <div className="border-l border-border h-full"></div>
                  <div className="absolute bottom-0 left-0 text-xs">{i}s</div>
                  {/* Second indicators */}
                  {Array.from({ length: 10 }).map((_, j) => (
                    <div
                      key={j}
                      className="absolute bg-border"
                      style={{
                        left: `${(j + 1) * (TIME_SCALE / 10)}px`,
                        bottom: "0",
                        width: "1px",
                        height: `${SECOND_INDICATOR_HEIGHT}px`,
                      }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
            {layers.map((layer, layerIndex) => (
              <div
                key={layer.id}
                className="absolute left-0 w-full"
                style={{
                  top: `${layerIndex * LAYER_HEIGHT + TIMELINE_HEADER_HEIGHT}px`,
                  height: `${LAYER_HEIGHT}px`,
                }}
              >
                {elements
                  .filter((element) => element.layerId === layer.id)
                  .map((element) => (
                    <motion.div
                      key={element.id}
                      className="absolute bg-primary rounded-sm cursor-move"
                      style={{
                        left: `${element.startTime * TIME_SCALE}px`,
                        top: "2px",
                        width: `${(element.endTime - element.startTime) * TIME_SCALE}px`,
                        height: `${LAYER_HEIGHT - 4}px`,
                      }}
                      drag="x"
                      dragMomentum={false}
                      dragConstraints={timelineRef}
                      onDragStart={() => handleLayerDragStart(element.id, null)}
                      onDrag={(e) => handleLayerDrag(e as React.MouseEvent, element.id)}
                      onDragEnd={handleLayerDragEnd}
                    >
                      <div
                        className="absolute left-0 top-0 w-2 h-full bg-accent cursor-ew-resize"
                        onMouseDown={() => handleLayerDragStart(element.id, "start")}
                      ></div>
                      <div
                        className="absolute right-0 top-0 w-2 h-full bg-accent cursor-ew-resize"
                        onMouseDown={() => handleLayerDragStart(element.id, "end")}
                      ></div>
                      <div className="px-2 truncate text-xs">{element.text || element.type}</div>
                    </motion.div>
                  ))}
              </div>
            ))}
            <motion.div
              className="absolute top-0 w-px h-full bg-red-500"
              style={{ left: `${currentTime * TIME_SCALE}px` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

