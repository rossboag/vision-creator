import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TemplateCardProps {
  template: {
    id: number
    name: string
    category: string
    lastModified: string
    folder: string
    imageUrl: string
  }
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <img
          src={template.imageUrl || "/placeholder.svg"}
          alt={template.name}
          className="w-full h-40 object-cover mb-4 rounded"
        />
        <div>
          <h3 className="font-semibold mb-1">{template.name}</h3>
          <p className="text-sm text-muted-foreground">Category: {template.category}</p>
          <p className="text-sm text-muted-foreground">Last modified: {template.lastModified}</p>
          <p className="text-sm text-muted-foreground mb-4">Folder: {template.folder}</p>
          <div className="flex justify-between">
            <Button asChild>
              <Link href={`/editor?template=${template.id}`}>Use Template</Link>
            </Button>
            <Button variant="outline">Preview</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

