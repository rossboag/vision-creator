import { SlideOutMenu } from "./slide-out-menu"
import { Button } from "./ui/button"

interface AIGenerateMenuProps {
  onClose: () => void
}

export function AIGenerateMenu({ onClose }: AIGenerateMenuProps) {
  return (
    <SlideOutMenu title="AI Generate" onClose={onClose} side="right">
      <div className="space-y-4">
        <Button className="w-full">Generate Image</Button>
        <Button className="w-full">Generate Text</Button>
        <Button className="w-full">Generate Shape</Button>
      </div>
    </SlideOutMenu>
  )
}

