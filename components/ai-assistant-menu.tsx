import { SlideOutMenu } from "./slide-out-menu"
import { Button } from "./ui/button"

interface AIAssistantMenuProps {
  onClose: () => void
}

export function AIAssistantMenu({ onClose }: AIAssistantMenuProps) {
  return (
    <SlideOutMenu title="AI Assistant" onClose={onClose} side="right">
      <div className="space-y-4">
        <Button className="w-full">Suggest Improvements</Button>
        <Button className="w-full">Explain Element</Button>
        <Button className="w-full">Generate Ideas</Button>
      </div>
    </SlideOutMenu>
  )
}

