"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, FileText, Zap, Database } from "lucide-react"
import Link from "next/link"
import { UserManagement } from "@/components/admin/user-management"
import { ProjectManagement } from "@/components/admin/project-management"
import { SystemSettings } from "@/components/admin/system-settings"
import { Analytics } from "@/components/admin/analytics"
import { SecuritySettings } from "@/components/admin/security-settings"
import { PerformanceMonitoring } from "@/components/admin/performance-monitoring"
import { ContentManagement } from "@/components/admin/content-management"
import { NotificationCenter } from "@/components/admin/notification-center"
import { IntegrationSettings } from "@/components/admin/integration-settings"
import { AuditLogs } from "@/components/admin/audit-logs"
import { SubscriptionManagement } from "@/components/admin/subscription-management"

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(1000)
  const [projectCount, setProjectCount] = useState(5000)
  const [storageUsed, setStorageUsed] = useState(500) // in GB
  const [activeUsers, setActiveUsers] = useState(250)

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link href="/dashboard">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storageUsed.toLocaleString()} GB</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeUsers}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 mb-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectManagement />
        </TabsContent>
        <TabsContent value="analytics">
          <Analytics />
        </TabsContent>
        <TabsContent value="settings">
          <SystemSettings />
        </TabsContent>
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
        <TabsContent value="performance">
          <PerformanceMonitoring />
        </TabsContent>
        <TabsContent value="content">
          <ContentManagement />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationCenter />
        </TabsContent>
        <TabsContent value="integrations">
          <IntegrationSettings />
        </TabsContent>
        <TabsContent value="audit">
          <AuditLogs />
        </TabsContent>
        <TabsContent value="subscriptions">
          <SubscriptionManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}

