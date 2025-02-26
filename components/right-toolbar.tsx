"use client"

import { Button } from "@/components/ui/button"
import { useEditorStore } from "@/store/editor-store"
import { Wand2, Sparkles, Brain, BotIcon as Robot, MessageSquare } from "lucide-react"
import { useState } from "react"
import { AIGenerateMenu } from "./ai-generate-menu"
import { AIEnhanceMenu } from "./ai-enhance-menu"
import { AIAnalyzeMenu } from "./ai-analyze-menu"
import { AIAssistantMenu } from "./ai-assistant-menu"
import { AIChatMenu } from "./ai-chat-menu"

export function RightToolbar() {
  const { setActiveAITool } = useEditorStore()
  const [isGenerateMenuOpen, setIsGenerateMenuOpen] = useState(false)
  const [isEnhanceMenuOpen, setIsEnhanceMenuOpen] = useState(false)
  const [isAnalyzeMenuOpen, setIsAnalyzeMenuOpen] = useState(false)
  const [isAssistantMenuOpen, setIsAssistantMenuOpen] = useState(false)
  const [isChatMenuOpen, setIsChatMenuOpen] = useState(false)

  const handleToolClick = (tool: "generate" | "enhance" | "analyze" | "assistant" | "chat") => {
    setIsGenerateMenuOpen(false)
    setIsEnhanceMenuOpen(false)
    setIsAnalyzeMenuOpen(false)
    setIsAssistantMenuOpen(false)
    setIsChatMenuOpen(false)

    switch (tool) {
      case "generate":
        setIsGenerateMenuOpen(!isGenerateMenuOpen)
        break
      case "enhance":
        setIsEnhanceMenuOpen(!isEnhanceMenuOpen)
        break
      case "analyze":
        setIsAnalyzeMenuOpen(!isAnalyzeMenuOpen)
        break
      case "assistant":
        setIsAssistantMenuOpen(!isAssistantMenuOpen)
        break
      case "chat":
        setIsChatMenuOpen(!isChatMenuOpen)
        break
    }

    setActiveAITool(tool)
  }

  return (
    <>
      <div className="fixed right-0 top-12 bottom-[200px] w-16 bg-card border-l border-border flex flex-col items-center py-2 space-y-2 z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToolClick("generate")}
          className={`hover:bg-accent hover:text-accent-foreground ${isGenerateMenuOpen ? "bg-accent text-accent-foreground" : ""}`}
          title="AI Generate"
        >
          <Wand2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToolClick("enhance")}
          className={`hover:bg-accent hover:text-accent-foreground ${isEnhanceMenuOpen ? "bg-accent text-accent-foreground" : ""}`}
          title="AI Enhance"
        >
          <Sparkles className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToolClick("analyze")}
          className={`hover:bg-accent hover:text-accent-foreground ${isAnalyzeMenuOpen ? "bg-accent text-accent-foreground" : ""}`}
          title="AI Analyze"
        >
          <Brain className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToolClick("assistant")}
          className={`hover:bg-accent hover:text-accent-foreground ${isAssistantMenuOpen ? "bg-accent text-accent-foreground" : ""}`}
          title="AI Assistant"
        >
          <Robot className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleToolClick("chat")}
          className={`hover:bg-accent hover:text-accent-foreground ${isChatMenuOpen ? "bg-accent text-accent-foreground" : ""}`}
          title="AI Chat"
        >
          <MessageSquare className="h-4 w-4" />
        </Button>
      </div>
      {isGenerateMenuOpen && <AIGenerateMenu onClose={() => setIsGenerateMenuOpen(false)} />}
      {isEnhanceMenuOpen && <AIEnhanceMenu onClose={() => setIsEnhanceMenuOpen(false)} />}
      {isAnalyzeMenuOpen && <AIAnalyzeMenu onClose={() => setIsAnalyzeMenuOpen(false)} />}
      {isAssistantMenuOpen && <AIAssistantMenu onClose={() => setIsAssistantMenuOpen(false)} />}
      {isChatMenuOpen && <AIChatMenu onClose={() => setIsChatMenuOpen(false)} />}
    </>
  )
}

