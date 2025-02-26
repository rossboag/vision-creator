"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ProjectManagement() {
  const [projects, setProjects] = useState([
    { id: 1, name: "Marketing Campaign", owner: "Alice Johnson", status: "active", created: "2023-05-15" },
    { id: 2, name: "Website Redesign", owner: "Bob Smith", status: "completed", created: "2023-05-10" },
    { id: 3, name: "Product Launch", owner: "Charlie Brown", status: "pending", created: "2023-05-05" },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Management</CardTitle>
        <CardDescription>Manage and monitor user projects</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.owner}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      project.status === "active" ? "default" : project.status === "completed" ? "success" : "warning"
                    }
                  >
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>{project.created}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

