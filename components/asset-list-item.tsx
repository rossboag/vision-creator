import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Download, Trash, Pencil } from "lucide-react"

interface AssetListItemProps {
  asset: {
    id: number
    name: string
    type: string
    size: string
    lastModified: string
    folder: string
    url: string
  }
}

export function AssetListItem({ asset }: AssetListItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-muted flex items-center justify-center rounded overflow-hidden">
          {asset.type === "image" ? (
            <img src={asset.url || "/placeholder.svg"} alt={asset.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-2xl">{asset.type.charAt(0).toUpperCase()}</div>
          )}
        </div>
        <div>
          <h3 className="font-semibold">{asset.name}</h3>
          <p className="text-sm text-muted-foreground">Type: {asset.type}</p>
          <p className="text-sm text-muted-foreground">Size: {asset.size}</p>
          <p className="text-sm text-muted-foreground">Last modified: {asset.lastModified}</p>
          <p className="text-sm text-muted-foreground">Folder: {asset.folder}</p>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Download className="mr-2 h-4 w-4" /> Download
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pencil className="mr-2 h-4 w-4" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

