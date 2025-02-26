import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Download, Trash, Pencil } from "lucide-react"

interface AssetCardProps {
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

export function AssetCard({ asset }: AssetCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="aspect-square mb-4 bg-muted flex items-center justify-center rounded overflow-hidden">
          {asset.type === "image" ? (
            <img src={asset.url || "/placeholder.svg"} alt={asset.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-4xl">{asset.type.charAt(0).toUpperCase()}</div>
          )}
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold mb-1">{asset.name}</h3>
            <p className="text-sm text-muted-foreground">Type: {asset.type}</p>
            <p className="text-sm text-muted-foreground">Size: {asset.size}</p>
            <p className="text-sm text-muted-foreground">Last modified: {asset.lastModified}</p>
            <p className="text-sm text-muted-foreground">Folder: {asset.folder}</p>
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
      </CardContent>
    </Card>
  )
}

