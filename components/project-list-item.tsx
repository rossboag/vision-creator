import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MoreVertical, Pencil, Trash, Copy } from "lucide-react"

interface ProjectListItemProps {
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

export function ProjectListItem({ project, onDelete, onDuplicate }: ProjectListItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-4">
        <img
          src={project.thumbnailUrl || "/placeholder.svg"}
          alt={project.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold">{project.name}</h3>
          <p className="text-sm text-muted-foreground">Last modified: {project.lastModified}</p>
          <p className="text-sm text-muted-foreground">Type: {project.type}</p>
          <p className="text-sm text-muted-foreground">Folder: {project.folder}</p>
        </div>
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
  )
}

