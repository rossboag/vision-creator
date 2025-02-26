import { SlideOutMenu } from "./slide-out-menu"
import { Button } from "./ui/button"

interface AIAnalyzeMenuProps {
  onClose: () => void
}

export function AIAnalyzeMenu({ onClose }: AIAnalyzeMenuProps) {
  return (
    <SlideOutMenu title="AI Analyze" onClose={onClose} side="right">
      <div className="space-y-4">
        <Button className="w-full">Analyze Composition</Button>
        <Button className="w-full">Detect Objects</Button>
        <Button className="w-full">Sentiment Analysis</Button>
      </div>
    </SlideOutMenu>
  )
}

