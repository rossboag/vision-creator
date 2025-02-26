"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export function SecuritySettings() {
  const [settings, setSettings] = useState({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: true,
    twoFactorAuth: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    ipWhitelist: "",
  })

  const handleChange = (key: string, value: string | number | boolean) => {
    setSettings({ ...settings, [key]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Configure security settings for the application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
          <Input
            id="passwordMinLength"
            type="number"
            value={settings.passwordMinLength}
            onChange={(e) => handleChange("passwordMinLength", Number.parseInt(e.target.value))}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="passwordRequireUppercase"
            checked={settings.passwordRequireUppercase}
            onCheckedChange={(checked) => handleChange("passwordRequireUppercase", checked)}
          />
          <Label htmlFor="passwordRequireUppercase">Require Uppercase Letters</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="passwordRequireNumbers"
            checked={settings.passwordRequireNumbers}
            onCheckedChange={(checked) => handleChange("passwordRequireNumbers", checked)}
          />
          <Label htmlFor="passwordRequireNumbers">Require Numbers</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="passwordRequireSpecialChars"
            checked={settings.passwordRequireSpecialChars}
            onCheckedChange={(checked) => handleChange("passwordRequireSpecialChars", checked)}
          />
          <Label htmlFor="passwordRequireSpecialChars">Require Special Characters</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="twoFactorAuth"
            checked={settings.twoFactorAuth}
            onCheckedChange={(checked) => handleChange("twoFactorAuth", checked)}
          />
          <Label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
          <Input
            id="sessionTimeout"
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => handleChange("sessionTimeout", Number.parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
          <Input
            id="maxLoginAttempts"
            type="number"
            value={settings.maxLoginAttempts}
            onChange={(e) => handleChange("maxLoginAttempts", Number.parseInt(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ipWhitelist">IP Whitelist (comma-separated)</Label>
          <Input
            id="ipWhitelist"
            value={settings.ipWhitelist}
            onChange={(e) => handleChange("ipWhitelist", e.target.value)}
            placeholder="e.g., 192.168.1.1, 10.0.0.1"
          />
        </div>
        <Button>Save Security Settings</Button>
      </CardContent>
    </Card>
  )
}

