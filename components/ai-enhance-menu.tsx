import { SlideOutMenu } from "./slide-out-menu"
import { Button } from "./ui/button"

interface AIEnhanceMenuProps {
  onClose: () => void
}

export function AIEnhanceMenu({ onClose }: AIEnhanceMenuProps) {
  return (
    <SlideOutMenu title="AI Enhance" onClose={onClose} side="right">
      <div className="space-y-4">
        <Button className="w-full">Enhance Image</Button>
        <Button className="w-full">Improve Text</Button>
        <Button className="w-full">Optimize Layout</Button>
      </div>
    </SlideOutMenu>
  )
}

