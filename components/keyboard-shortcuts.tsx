"use client"

import { useEffect } from "react"
import { useEditorStore } from "@/store/editor-store"

export function KeyboardShortcuts() {
  const { undo, redo } = useEditorStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case "z":
            if (e.shiftKey) {
              redo()
            } else {
              undo()
            }
            e.preventDefault()
            break
          case "y":
            redo()
            e.preventDefault()
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [undo, redo])

  return null
}

