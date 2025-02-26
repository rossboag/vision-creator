"use client"

import { useRef, useEffect } from "react"
import { Konva } from "@/lib/konva-wrapper"
import { Rect, Circle, Line, Text, Image, Transformer } from "react-konva"
import type { Element } from "@/store/editor-store"
import { HTMLVideo } from "./html-video"

interface CanvasElementProps {
  element: Element
  isSelected: boolean
  onSelect: () => void
  onChange: (changes: Partial<Element>) => void
}

export function CanvasElement({ element, isSelected, onSelect, onChange }: CanvasElementProps) {
  const shapeRef = useRef<any>(null)
  const trRef = useRef<any>(null)

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer()?.batchDraw()
    }
  }, [isSelected])

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    onChange({
      x: e.target.x(),
      y: e.target.y(),
    })
  }

  const handleTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
    const node = shapeRef.current
    if (!node) return

    const scaleX = node.scaleX()
    const scaleY = node.scaleY()

    node.scaleX(1)
    node.scaleY(1)
    onChange({
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(5, node.height() * scaleY),
    })
  }

  const shapeProps = {
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height,
    fill: element.fill,
    draggable: true,
    onClick: onSelect,
    onTap: onSelect,
    onDragEnd: handleDragEnd,
    onTransformEnd: handleTransformEnd,
    opacity: element.opacity,
    filters: element.blur ? [Konva.Filters.Blur] : undefined,
    blurRadius: element.blur,
  }

  let shape

  switch (element.type) {
    case "rectangle":
      shape = <Rect {...shapeProps} ref={shapeRef} />
      break
    case "circle":
      shape = <Circle {...shapeProps} ref={shapeRef} />
      break
    case "line":
      shape = <Line {...shapeProps} ref={shapeRef} points={element.points} />
      break
    case "text":
      shape = (
        <Text
          {...shapeProps}
          ref={shapeRef}
          text={element.text}
          fontSize={element.fontSize}
          fontFamily={element.fontFamily}
        />
      )
      break
    case "image":
      const imageElement = new window.Image()
      imageElement.src = element.imageUrl || ""
      shape = <Image {...shapeProps} ref={shapeRef} image={imageElement} />
      break
    case "video":
      shape = <HTMLVideo {...shapeProps} ref={shapeRef} src={element.videoUrl} />
      break
    default:
      shape = null
  }

  // Apply animations
  if (element.animation) {
    // Add animation logic here
  }

  // Apply text animations
  if (element.type === "text" && element.textAnimation) {
    // Add text animation logic here
  }

  return (
    <>
      {shape}
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}

