import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TemplateListItemProps {
  template: {
    id: number
    name: string
    category: string
    lastModified: string
    folder: string
    imageUrl: string
  }
}

export function TemplateListItem({ template }: TemplateListItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-4">
        <img
          src={template.imageUrl || "/placeholder.svg"}
          alt={template.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold">{template.name}</h3>
          <p className="text-sm text-muted-foreground">Category: {template.category}</p>
          <p className="text-sm text-muted-foreground">Last modified: {template.lastModified}</p>
          <p className="text-sm text-muted-foreground">Folder: {template.folder}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button asChild>
          <Link href={`/editor?template=${template.id}`}>Use Template</Link>
        </Button>
        <Button variant="outline">Preview</Button>
      </div>
    </div>
  )
}

