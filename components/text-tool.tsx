"use client"

import type React from "react"

import { useCallback, useEffect } from "react"
import { useEditorStore } from "@/store/editor-store"
import { konvaWrapper } from "@/lib/konva-wrapper"
import Konva from "konva"

export const TextTool: React.FC = () => {
  const { activeTool, selectedIds, setSelectedIds } = useEditorStore()

  const handleStageClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      if (activeTool !== "text") return

      const stage = e.target.getStage()
      if (!stage) return

      const pointerPosition = stage.getPointerPosition()
      if (!pointerPosition) return

      const stageScale = stage.scaleX()
      const stagePosition = stage.position()

      const x = (pointerPosition.x - stagePosition.x) / stageScale
      const y = (pointerPosition.y - stagePosition.y) / stageScale

      const id = konvaWrapper.createEmptyTextElement(x, y)
      konvaWrapper.enterTextEditMode(id, konvaWrapper.getElement(id) as Konva.Text)
      setSelectedIds([id])
    },
    [activeTool, setSelectedIds],
  )

  useEffect(() => {
    const stage = konvaWrapper.getStage()
    if (stage) {
      stage.on("click", handleStageClick)
    }

    return () => {
      if (stage) {
        stage.off("click", handleStageClick)
      }
    }
  }, [handleStageClick])

  useEffect(() => {
    const handleTextDblClick = (id: string) => {
      const textNode = konvaWrapper.getElement(id)
      if (textNode instanceof Konva.Text) {
        konvaWrapper.enterTextEditMode(id, textNode)
      }
    }

    konvaWrapper.onTextDoubleClick(handleTextDblClick)

    return () => {
      konvaWrapper.offTextDoubleClick(handleTextDblClick)
    }
  }, [])

  useEffect(() => {
    if (selectedIds.length === 1) {
      const selectedElement = konvaWrapper.getElement(selectedIds[0])
      if (selectedElement instanceof Konva.Text) {
        konvaWrapper.enableTextTransformer(selectedIds[0])
      }
    }
  }, [selectedIds])

  return null
}

