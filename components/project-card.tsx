import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MoreVertical, Pencil, Trash, Copy } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: number
    name: string
    lastModified: string
    thumbnailUrl: string
    type: string
    folder: string
  }
  onDelete: (id: number) => void
  onDuplicate: (id: number) => void
}

export function ProjectCard({ project, onDelete, onDuplicate }: ProjectCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <img
          src={project.thumbnailUrl || "/placeholder.svg"}
          alt={project.name}
          className="w-full h-40 object-cover mb-4 rounded"
        />
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold mb-1">{project.name}</h3>
            <p className="text-sm text-muted-foreground">Last modified: {project.lastModified}</p>
            <p className="text-sm text-muted-foreground">Type: {project.type}</p>
            <p className="text-sm text-muted-foreground">Folder: {project.folder}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/editor?project=${project.id}`}>
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(project.id)}>
                <Copy className="mr-2 h-4 w-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(project.id)}>
                <Trash className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

