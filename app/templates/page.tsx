"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid, List, SortAsc, SortDesc } from "lucide-react"
import { TemplateCard } from "@/components/template-card"
import { TemplateListItem } from "@/components/template-list-item"
import { FolderTree } from "@/components/folder-tree"

// Mock data for templates
const templates = [
  {
    id: 1,
    name: "Business Presentation",
    category: "Business",
    createdAt: "2023-05-01",
    lastModified: "2023-05-15",
    folder: "Presentations",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Social Media Post",
    category: "Marketing",
    createdAt: "2023-04-20",
    lastModified: "2023-05-10",
    folder: "Social Media",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Event Flyer",
    category: "Events",
    createdAt: "2023-04-15",
    lastModified: "2023-05-05",
    folder: "Flyers",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Product Showcase",
    category: "E-commerce",
    createdAt: "2023-04-10",
    lastModified: "2023-04-30",
    folder: "Products",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Restaurant Menu",
    category: "Food",
    createdAt: "2023-04-05",
    lastModified: "2023-04-25",
    folder: "Menus",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Fitness Tracker",
    category: "Health",
    createdAt: "2023-03-30",
    lastModified: "2023-04-20",
    folder: "Health",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Travel Blog",
    category: "Lifestyle",
    createdAt: "2023-03-25",
    lastModified: "2023-04-15",
    folder: "Blogs",
    imageUrl: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Educational Infographic",
    category: "Education",
    createdAt: "2023-03-20",
    lastModified: "2023-04-10",
    folder: "Infographics",
    imageUrl: "/placeholder.svg",
  },
]

// Mock data for folders
const folders = [
  { id: 1, name: "Presentations", parentId: null },
  { id: 2, name: "Social Media", parentId: null },
  { id: 3, name: "Flyers", parentId: null },
  { id: 4, name: "Products", parentId: null },
  { id: 5, name: "Menus", parentId: null },
  { id: 6, name: "Health", parentId: null },
  { id: 7, name: "Blogs", parentId: null },
  { id: 8, name: "Infographics", parentId: null },
]

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("lastModified")
  const [sortOrder, setSortOrder] = useState("desc")
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterFolder, setFilterFolder] = useState("All")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedFolder, setSelectedFolder] = useState(null)

  const filteredAndSortedTemplates = templates
    .filter(
      (template) =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterCategory === "All" || template.category === filterCategory) &&
        (filterFolder === "All" || template.folder === filterFolder),
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy].localeCompare(b[sortBy])
      } else {
        return b[sortBy].localeCompare(a[sortBy])
      }
    })

  const categories = Array.from(new Set(templates.map((template) => template.category)))
  const templateFolders = Array.from(new Set(templates.map((template) => template.folder)))

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Templates</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search templates..."
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
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
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
            {templateFolders.map((folder) => (
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
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Folders</h2>
          </div>
          <FolderTree folders={folders} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} />
        </div>
        <div className="w-3/4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Templates</TabsTrigger>
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedTemplates.map((template) => (
                    <TemplateCard key={template.id} template={template} />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredAndSortedTemplates.map((template) => (
                    <TemplateListItem key={template.id} template={template} />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="recent">
              <p>Recent templates will be displayed here.</p>
            </TabsContent>
            <TabsContent value="favorites">
              <p>Favorite templates will be displayed here.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

