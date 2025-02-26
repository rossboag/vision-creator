import type React from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SlideOutMenuProps {
  title: string
  onClose: () => void
  children: React.ReactNode
  side?: "left" | "right"
}

export function SlideOutMenu({ title, onClose, children, side = "left" }: SlideOutMenuProps) {
  const positionClass = side === "left" ? "left-16" : "right-16"

  return (
    <div
      className={`fixed ${positionClass} top-12 bottom-[200px] w-64 bg-card border-${side} border-border z-20 flex flex-col text-sm overflow-hidden`}
    >
      <div className="flex justify-between items-center p-2 border-b border-border bg-card">
        <h2 className="text-base font-semibold text-card-foreground">{title}</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-background text-foreground">{children}</div>
    </div>
  )
}

