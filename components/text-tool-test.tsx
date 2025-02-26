"use client"

import { useState } from "react"
import { useEditorStore } from "@/store/editor-store"
import { Button } from "@/components/ui/button"
import { TextMenu } from "./text-menu"

export function TextToolTest() {
  const { addElement, selectedIds, setSelectedIds } = useEditorStore()
  const [showTextMenu, setShowTextMenu] = useState(false)

  const handleAddText = () => {
    const newElement = addElement({
      type: "text",
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      text: "Sample Text",
      fontSize: 24,
      fontFamily: "Arial",
      fill: "#000000",
    })
    if (newElement) {
      setSelectedIds([newElement.id])
      setShowTextMenu(true)
    }
  }

  return (
    <>
      <Button onClick={handleAddText} className="absolute top-4 left-4 z-10">
        Add Test Text
      </Button>
      {showTextMenu && <TextMenu onClose={() => setShowTextMenu(false)} />}
    </>
  )
}

