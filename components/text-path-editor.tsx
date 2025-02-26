"use client"

import { useState } from "react"
import { useEditorStore } from "@/store/editor-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TextPathEditor() {
  const { updateSelectedElements } = useEditorStore()
  const [pathData, setPathData] = useState("")

  const handleApplyPath = () => {
    updateSelectedElements({ path: pathData })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="path-data">SVG Path Data</Label>
        <Input
          id="path-data"
          value={pathData}
          onChange={(e) => setPathData(e.target.value)}
          placeholder="M0,0 C100,0 200,100 300,100"
        />
      </div>
      <Button onClick={handleApplyPath}>Apply Path</Button>
    </div>
  )
}

