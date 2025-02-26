"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { FolderPlus, Grid, List, SortAsc, SortDesc } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { ProjectListItem } from "@/components/project-list-item"
import { FolderTree } from "@/components/folder-tree"

// Mock data for projects
const projects = [
  {
    id: 1,
    name: "Marketing Campaign",
    lastModified: "2023-05-15",
    createdAt: "2023-05-01",
    type: "Social Media",
    folder: "Marketing",
    thumbnailUrl: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Product Launch",
    lastModified: "2023-05-10",
    createdAt: "2023-04-20",
    type: "Presentation",
    folder: "Products",
    thumbnailUrl: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Company Presentation",
    lastModified: "2023-05-05",
    createdAt: "2023-04-15",
    type: "Presentation",
    folder: "Company",
    thumbnailUrl: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Social Media Assets",
    lastModified: "2023-04-30",
    createdAt: "2023-04-10",
    type: "Social Media",
    folder: "Marketing",
    thumbnailUrl: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Event Invitation",
    lastModified: "2023-04-25",
    createdAt: "2023-04-05",
    type: "Invitation",
    folder: "Events",
    thumbnailUrl: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Website Redesign",
    lastModified: "2023-04-20",
    createdAt: "2023-03-30",
    type: "Web Design",
    folder: "Website",
    thumbnailUrl: "/placeholder.svg",
  },
]

// Mock data for folders
const folders = [
  { id: 1, name: "Marketing", parentId: null },
  { id: 2, name: "Products", parentId: null },
  { id: 3, name: "Company", parentId: null },
  { id: 4, name: "Events", parentId: null },
  { id: 5, name: "Website", parentId: null },
  { id: 6, name: "Social Media", parentId: 1 },
]

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("lastModified")
  const [sortOrder, setSortOrder] = useState("desc")
  const [filterType, setFilterType] = useState("All")
  const [filterFolder, setFilterFolder] = useState("All")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [newFolderName, setNewFolderName] = useState("")
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)

  const filteredAndSortedProjects = projects
    .filter(
      (project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterType === "All" || project.type === filterType) &&
        (filterFolder === "All" || project.folder === filterFolder),
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy].localeCompare(b[sortBy])
      } else {
        return b[sortBy].localeCompare(a[sortBy])
      }
    })

  const handleDelete = (id: number) => {
    // Implement delete functionality
    console.log(`Delete project with id: ${id}`)
  }

  const handleDuplicate = (id: number) => {
    // Implement duplicate functionality
    console.log(`Duplicate project with id: ${id}`)
  }

  const handleCreateNewFolder = () => {
    // Implement create new folder functionality
    console.log(`Create new folder: ${newFolderName}`)
    setIsNewFolderDialogOpen(false)
    setNewFolderName("")
  }

  const projectTypes = Array.from(new Set(projects.map((project) => project.type)))
  const projectFolders = Array.from(new Set(projects.map((project) => project.folder)))

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search projects..."
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
            <SelectItem value="createdAt">Created At</SelectItem>
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
            {projectTypes.map((type) => (
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
            {projectFolders.map((folder) => (
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
            <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <FolderPlus className="mr-2 h-4 w-4" />
                  New Folder
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Folder</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={handleCreateNewFolder}>Create Folder</Button>
              </DialogContent>
            </Dialog>
          </div>
          <FolderTree folders={folders} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />
        </div>
        <div className="w-3/4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="shared">Shared with me</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onDelete={handleDelete}
                      onDuplicate={handleDuplicate}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredAndSortedProjects.map((project) => (
                    <ProjectListItem
                      key={project.id}
                      project={project}
                      onDelete={handleDelete}
                      onDuplicate={handleDuplicate}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="recent">
              <p>Recent projects will be displayed here.</p>
            </TabsContent>
            <TabsContent value="shared">
              <p>Projects shared with you will be displayed here.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

