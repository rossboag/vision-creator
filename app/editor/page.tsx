"use client"

import { useEffect, useState } from "react"
import { TopToolbar } from "@/components/top-toolbar"
import { EditorToolbar } from "@/components/editor-toolbar"
import { RightToolbar } from "@/components/right-toolbar"
import { TimelinePanel } from "@/components/timeline-panel"
import EditorCanvas from "@/components/editor-canvas"
import ErrorBoundary from "@/components/error-boundary"
import { useEditorStore } from "@/store/editor-store"

export default function EditorPage() {
  const [isClient, setIsClient] = useState(false)
  const { canvasSize, scale } = useEditorStore()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden">
      <div className="h-12 w-full bg-card border-b border-border">
        <TopToolbar />
      </div>
      <div className="flex flex-1 relative">
        <ErrorBoundary>
          <div className="w-16 h-[calc(100vh-48px)] fixed left-0 top-12 z-10">
            <EditorToolbar />
          </div>
          <div className="flex-1 overflow-auto bg-gray-800 ml-16 mr-16" style={{ height: "calc(100vh - 248px)" }}>
            <div
              className="relative"
              style={{
                width: `${canvasSize.width * scale}px`,
                height: `${canvasSize.height * scale}px`,
                margin: "auto",
              }}
            >
              <EditorCanvas />
            </div>
          </div>
          <div className="w-16 h-[calc(100vh-48px)] fixed right-0 top-12 z-10">
            <RightToolbar />
          </div>
        </ErrorBoundary>
      </div>
      <div className="h-[200px] w-full bg-card border-t border-border fixed bottom-0 left-0 right-0">
        <TimelinePanel />
      </div>
    </div>
  )
}

