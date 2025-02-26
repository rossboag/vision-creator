"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useEditorStore } from "@/store/editor-store"
import { X, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"

interface VideoMenuProps {
  onClose: () => void
}

export function VideoMenu({ onClose }: VideoMenuProps) {
  const { addElement } = useEditorStore()

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const videoUrl = URL.createObjectURL(file)
      addElement({
        type: "video",
        x: 100,
        y: 100,
        width: 320,
        height: 240,
        fill: "transparent",
        videoUrl: videoUrl,
      })
    }
  }

  return (
    <div className="fixed left-16 top-12 bottom-[200px] w-64 bg-background border-r border-gray-700 z-20 flex flex-col text-sm overflow-hidden">
      <div className="flex justify-between items-center p-2 border-b border-gray-700">
        <h2 className="text-base font-semibold">Video Tool</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <label htmlFor="video-upload" className="cursor-pointer">
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Click to upload a video</p>
          </div>
          <Input id="video-upload" type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
        </label>
      </div>
    </div>
  )
}

