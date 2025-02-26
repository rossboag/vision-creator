"use client"

import { SlideOutMenu } from "./slide-out-menu"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"

interface AIChatMenuProps {
  onClose: () => void
}

export function AIChatMenu({ onClose }: AIChatMenuProps) {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    // Implement chat functionality here
    console.log("Sending message:", message)
    setMessage("")
  }

  return (
    <SlideOutMenu title="AI Chat" onClose={onClose} side="right">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto mb-4">{/* Chat messages will be displayed here */}</div>
        <div className="flex space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </SlideOutMenu>
  )
}

