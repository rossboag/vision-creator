import { useState } from "react"
import { ChevronRight, ChevronDown, Folder } from "lucide-react"

interface FolderTreeProps {
  folders: {
    id: number
    name: string
    parentId: number | null
  }[]
  selectedFolder: number | null
  setSelectedFolder: (id: number | null) => void
}

export function FolderTree({ folders, selectedFolder, setSelectedFolder }: FolderTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<number[]>([])

  const toggleFolder = (folderId: number) => {
    setExpandedFolders((prev) => (prev.includes(folderId) ? prev.filter((id) => id !== folderId) : [...prev, folderId]))
  }

  const renderFolder = (folder: FolderTreeProps["folders"][0]) => {
    const hasChildren = folders.some((f) => f.parentId === folder.id)
    const isExpanded = expandedFolders.includes(folder.id)

    return (
      <div key={folder.id} className="mb-2">
        <div
          className={`flex items-center cursor-pointer ${
            selectedFolder === folder.id ? "bg-accent text-accent-foreground" : ""
          }`}
          onClick={() => setSelectedFolder(folder.id)}
        >
          {hasChildren && (
            <span
              onClick={(e) => {
                e.stopPropagation()
                toggleFolder(folder.id)
              }}
            >
              {isExpanded ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
            </span>
          )}
          <Folder className="h-4 w-4 mr-2" />
          <span>{folder.name}</span>
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {folders.filter((f) => f.parentId === folder.id).map((childFolder) => renderFolder(childFolder))}
          </div>
        )}
      </div>
    )
  }

  return <div>{folders.filter((folder) => folder.parentId === null).map((rootFolder) => renderFolder(rootFolder))}</div>
}

