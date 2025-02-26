"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export function SystemSettings() {
  const [settings, setSettings] = useState({
    siteName: "Vision Konva",
    maxUploadSize: 10,
    userRegistration: true,
    maintenanceMode: false,
  })

  const handleChange = (key: string, value: string | boolean) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Configure global application settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="siteName">Site Name</Label>
          <Input id="siteName" value={settings.siteName} onChange={(e) => handleChange("siteName", e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxUploadSize">Max Upload Size (MB)</Label>
          <Input
            id="maxUploadSize"
            type="number"
            value={settings.maxUploadSize}
            onChange={(e) => handleChange("maxUploadSize", e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="userRegistration"
            checked={settings.userRegistration}
            onCheckedChange={(checked) => handleChange("userRegistration", checked)}
          />
          <Label htmlFor="userRegistration">Allow User Registration</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="maintenanceMode"
            checked={settings.maintenanceMode}
            onCheckedChange={(checked) => handleChange("maintenanceMode", checked)}
          />
          <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
        </div>
        <Button>Save Settings</Button>
      </CardContent>
    </Card>
  )
}

