"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function ContentManagement() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Basic Presentation",
      category: "Presentation",
      status: "Published",
      previewUrl: "/placeholder.svg",
    },
    { id: 2, name: "Social Media Post", category: "Social Media", status: "Draft", previewUrl: "/placeholder.svg" },
    { id: 3, name: "Marketing Flyer", category: "Print", status: "Published", previewUrl: "/placeholder.svg" },
  ])

  const [assets, setAssets] = useState([
    { id: 1, name: "Logo.png", type: "Image", size: "256 KB", uploadDate: "2023-05-15" },
    { id: 2, name: "Background.mp4", type: "Video", size: "10 MB", uploadDate: "2023-05-10" },
    { id: 3, name: "Jingle.mp3", type: "Audio", size: "2 MB", uploadDate: "2023-05-05" },
  ])

  const [previewTemplate, setPreviewTemplate] = useState(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Management</CardTitle>
        <CardDescription>Manage templates and assets</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="templates">
          <TabsList>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
          </TabsList>
          <TabsContent value="templates">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Input className="max-w-sm" placeholder="Search templates..." />
                <Button>Add New Template</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>{template.name}</TableCell>
                      <TableCell>{template.category}</TableCell>
                      <TableCell>{template.status}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mr-2"
                              onClick={() => setPreviewTemplate(template)}
                            >
                              Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>{template.name} Preview</DialogTitle>
                              <DialogDescription>
                                Category: {template.category}, Status: {template.status}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                              <img
                                src={template.previewUrl || "/placeholder.svg"}
                                alt={template.name}
                                className="w-full h-auto"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm" className="mr-2">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="assets">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Input className="max-w-sm" placeholder="Search assets..." />
                <Button>Upload Asset</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id}>
                      <TableCell>{asset.name}</TableCell>
                      <TableCell>{asset.type}</TableCell>
                      <TableCell>{asset.size}</TableCell>
                      <TableCell>{asset.uploadDate}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

