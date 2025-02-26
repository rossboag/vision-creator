import { useEditorStore } from "@/store/editor-store"
import { Button } from "@/components/ui/button"
import { Eye, Unlock } from "lucide-react"

export function LayersPanel() {
  const { elements, selectedId, setSelectedId } = useEditorStore()

  return (
    <div className="w-64 bg-card border-r border-border">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Layers</h2>
        <div className="space-y-2">
          {elements.map((element) => (
            <div
              key={element.id}
              className={`flex items-center justify-between p-2 rounded ${
                selectedId === element.id ? "bg-accent" : ""
              }`}
              onClick={() => setSelectedId(element.id)}
            >
              <span>{element.type}</span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Unlock className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

