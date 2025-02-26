"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Grid, List, SortAsc, SortDesc, Upload } from "lucide-react"
import { AssetCard } from "@/components/asset-card"
import { AssetListItem } from "@/components/asset-list-item"
import { FolderTree } from "@/components/folder-tree"

// Mock data for assets
const assets = [
  {
    id: 1,
    name: "Logo.png",
    type: "image",
    size: "256 KB",
    lastModified: "2023-05-15",
    folder: "Logos",
    url: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Promo Video.mp4",
    type: "video",
    size: "10 MB",
    lastModified: "2023-05-10",
    folder: "Videos",
    url: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Background Music.mp3",
    type: "audio",
    size: "5 MB",
    lastModified: "2023-05-05",
    folder: "Audio",
    url: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Product Image.jpg",
    type: "image",
    size: "1.2 MB",
    lastModified: "2023-04-30",
    folder: "Products",
    url: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Company Presentation.pdf",
    type: "document",
    size: "2.5 MB",
    lastModified: "2023-04-25",
    folder: "Documents",
    url: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Icon Set.svg",
    type: "image",
    size: "500 KB",
    lastModified: "2023-04-20",
    folder: "Icons",
    url: "/placeholder.svg",
  },
]

// Mock data for folders
const folders = [
  { id: 1, name: "Logos", parentId: null },
  { id: 2, name: "Videos", parentId: null },
  { id: 3, name: "Audio", parentId: null },
  { id: 4, name: "Products", parentId: null },
  { id: 5, name: "Documents", parentId: null },
  { id: 6, name: "Icons", parentId: null },
]

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("lastModified")
  const [sortOrder, setSortOrder] = useState("desc")
  const [filterType, setFilterType] = useState("All")
  const [filterFolder, setFilterFolder] = useState("All")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  const filteredAndSortedAssets = assets
    .filter(
      (asset) =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType === "All" || asset.type === filterType) &&
        (filterFolder === "All" || asset.folder === filterFolder),
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy].localeCompare(b[sortBy])
      } else {
        return b[sortBy].localeCompare(a[sortBy])
      }
    })

  const assetTypes = Array.from(new Set(assets.map((asset) => asset.type)))
  const assetFolders = Array.from(new Set(assets.map((asset) => asset.folder)))

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Implement file upload logic here
    console.log("Uploading file:", e.target.files?.[0])
    setIsUploadDialogOpen(false)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Content Library</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:max-w-sm"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="lastModified">Last Modified</SelectItem>
            <SelectItem value="size">Size</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          {sortOrder === "asc" ? <SortAsc className="mr-2 h-4 w-4" /> : <SortDesc className="mr-2 h-4 w-4" />}
          {sortOrder === "asc" ? "Ascending" : "Descending"}
        </Button>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            {assetTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterFolder} onValueChange={setFilterFolder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by folder" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Folders</SelectItem>
            {assetFolders.map((folder) => (
              <SelectItem key={folder} value={folder}>
                {folder}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button variant={viewMode === "grid" ? "default" : "outline"} onClick={() => setViewMode("grid")}>
            <Grid className="mr-2 h-4 w-4" />
            Grid
          </Button>
          <Button variant={viewMode === "list" ? "default" : "outline"} onClick={() => setViewMode("list")}>
            <List className="mr-2 h-4 w-4" />
            List
          </Button>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="w-1/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Folders</h2>
            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Asset</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="asset" className="text-right">
                      File
                    </Label>
                    <Input id="asset" type="file" className="col-span-3" onChange={handleUpload} />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <FolderTree folders={folders} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />
        </div>
        <div className="w-3/4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Assets</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedAssets.map((asset) => (
                    <AssetCard key={asset.id} asset={asset} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredAndSortedAssets.map((asset) => (
                    <AssetListItem key={asset.id} asset={asset} />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="recent">
              <p>Recent assets will be displayed here.</p>
            </TabsContent>
            <TabsContent value="favorites">
              <p>Favorite assets will be displayed here.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

