"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export function IntegrationSettings() {
  const [integrations, setIntegrations] = useState({
    googleAnalytics: { enabled: false, apiKey: "" },
    slack: { enabled: false, webhookUrl: "" },
    mailchimp: { enabled: false, apiKey: "" },
    stripe: { enabled: false, publicKey: "", secretKey: "" },
  })

  const handleToggle = (integration: string) => {
    setIntegrations((prev) => ({
      ...prev,
      [integration]: { ...prev[integration], enabled: !prev[integration].enabled },
    }))
  }

  const handleInputChange = (integration: string, field: string, value: string) => {
    setIntegrations((prev) => ({
      ...prev,
      [integration]: { ...prev[integration], [field]: value },
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Settings</CardTitle>
        <CardDescription>Manage third-party integrations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Google Analytics</h3>
              <p className="text-sm text-muted-foreground">Track website traffic and user behavior</p>
            </div>
            <Switch
              checked={integrations.googleAnalytics.enabled}
              onCheckedChange={() => handleToggle("googleAnalytics")}
            />
          </div>
          {integrations.googleAnalytics.enabled && (
            <div className="space-y-2">
              <Label htmlFor="gaApiKey">API Key</Label>
              <Input
                id="gaApiKey"
                value={integrations.googleAnalytics.apiKey}
                onChange={(e) => handleInputChange("googleAnalytics", "apiKey", e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Slack</h3>
              <p className="text-sm text-muted-foreground">Receive notifications in your Slack workspace</p>
            </div>
            <Switch checked={integrations.slack.enabled} onCheckedChange={() => handleToggle("slack")} />
          </div>
          {integrations.slack.enabled && (
            <div className="space-y-2">
              <Label htmlFor="slackWebhook">Webhook URL</Label>
              <Input
                id="slackWebhook"
                value={integrations.slack.webhookUrl}
                onChange={(e) => handleInputChange("slack", "webhookUrl", e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Mailchimp</h3>
              <p className="text-sm text-muted-foreground">Sync user data with your Mailchimp account</p>
            </div>
            <Switch checked={integrations.mailchimp.enabled} onCheckedChange={() => handleToggle("mailchimp")} />
          </div>
          {integrations.mailchimp.enabled && (
            <div className="space-y-2">
              <Label htmlFor="mailchimpApiKey">API Key</Label>
              <Input
                id="mailchimpApiKey"
                value={integrations.mailchimp.apiKey}
                onChange={(e) => handleInputChange("mailchimp", "apiKey", e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Stripe</h3>
              <p className="text-sm text-muted-foreground">Process payments and manage subscriptions</p>
            </div>
            <Switch checked={integrations.stripe.enabled} onCheckedChange={() => handleToggle("stripe")} />
          </div>
          {integrations.stripe.enabled && (
            <div className="space-y-2">
              <Label htmlFor="stripePublicKey">Public Key</Label>
              <Input
                id="stripePublicKey"
                value={integrations.stripe.publicKey}
                onChange={(e) => handleInputChange("stripe", "publicKey", e.target.value)}
              />
              <Label htmlFor="stripeSecretKey">Secret Key</Label>
              <Input
                id="stripeSecretKey"
                type="password"
                value={integrations.stripe.secretKey}
                onChange={(e) => handleInputChange("stripe", "secretKey", e.target.value)}
              />
            </div>
          )}
        </div>

        <Button>Save Integration Settings</Button>
      </CardContent>
    </Card>
  )
}

