"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"

export function SubscriptionManagement() {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Free Plan (7-Day Trial)",
      price: 0,
      features: [
        "Full access to AI builder and editor",
        "Limited to 5 exports total during the trial",
        "Limited AI suggestions for layout and color",
        "No access to system templates or saved projects",
        "Community support only",
        "Trial expires after 7 days",
      ],
      badge: "Trial",
    },
    {
      id: 2,
      name: "Starter Plan",
      price: 50,
      features: [
        "Full access to AI builder and editor",
        "Limited to 5 exports per month",
        "No AI-powered content creation",
        "No access to system templates or template library",
        "Community support only",
        "Single user license",
      ],
      badge: "Starter",
    },
    {
      id: 3,
      name: "Pro Plan",
      price: 100,
      features: [
        "Full access to editor, AI builder, and basic AI-powered features",
        "Limited to 25 exports per month",
        "AI-generated layout suggestions",
        "AI-powered font & color recommendations",
        "No AI image or animation generation",
        "Access to the full system template library",
        "Standard support (email response within 48 hours)",
        "Single user license",
      ],
      badge: "Pro",
    },
    {
      id: 4,
      name: "Teams Plan",
      price: 200,
      features: [
        "Full access to editor, AI builder, and expanded AI-powered features",
        "Limited to 100 exports per month",
        "AI layout and font recommendations",
        "AI text suggestions (no AI image generation)",
        "AI animation presets",
        "Access to all templates + team-shared template library",
        "Priority email support (24-hour response time)",
        "Up to 5 users",
      ],
      badge: "Teams",
    },
  ])

  const [newPlan, setNewPlan] = useState({ name: "", price: 0, features: [], badge: "" })

  const [subscriptionStats, setSubscriptionStats] = useState([
    { name: "Free Trial", users: 1000, revenue: 0 },
    { name: "Starter", users: 500, revenue: 25000 },
    { name: "Pro", users: 300, revenue: 30000 },
    { name: "Teams", users: 50, revenue: 10000 },
  ])

  const addPlan = () => {
    setPlans([...plans, { ...newPlan, id: plans.length + 1 }])
    setNewPlan({ name: "", price: 0, features: [], badge: "" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Management</CardTitle>
        <CardDescription>Manage pricing plans and features</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="plans">
          <TabsList>
            <TabsTrigger value="plans">Pricing Plans</TabsTrigger>
            <TabsTrigger value="features">Feature Management</TabsTrigger>
            <TabsTrigger value="analytics">Subscription Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="plans">
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Features</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell>
                        {plan.name}
                        <Badge variant="outline" className="ml-2">
                          {plan.badge}
                        </Badge>
                      </TableCell>
                      <TableCell>{plan.price === 0 ? "Free" : `£${plan.price}/month`}</TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="text-sm">
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
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
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Add New Plan</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plan-name">Plan Name</Label>
                    <Input
                      id="plan-name"
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plan-price">Price</Label>
                    <Input
                      id="plan-price"
                      type="number"
                      value={newPlan.price}
                      onChange={(e) => setNewPlan({ ...newPlan, price: Number.parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan-features">Features (one per line)</Label>
                  <Textarea
                    id="plan-features"
                    value={newPlan.features.join("\n")}
                    onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value.split("\n") })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan-badge">Badge</Label>
                  <Input
                    id="plan-badge"
                    value={newPlan.badge}
                    onChange={(e) => setNewPlan({ ...newPlan, badge: e.target.value })}
                  />
                </div>
                <Button onClick={addPlan}>Add Plan</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="features">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Feature Toggles</h3>
              <div className="space-y-2">
                {[
                  "AI builder access",
                  "AI-powered layout suggestions",
                  "AI-powered color recommendations",
                  "AI-powered font recommendations",
                  "AI text suggestions",
                  "AI animation presets",
                  "System template access",
                  "Team-shared template library",
                  "Export functionality",
                  "Priority support",
                ].map((feature) => (
                  <div key={feature} className="flex items-center justify-between">
                    <Label htmlFor={feature}>{feature}</Label>
                    <Switch id={feature} />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="analytics">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Subscription Analytics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subscriptionStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="users" fill="#8884d8" name="Users" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue (£)" />
                </BarChart>
              </ResponsiveContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plan</TableHead>
                    <TableHead>Total Users</TableHead>
                    <TableHead>Monthly Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptionStats.map((stat) => (
                    <TableRow key={stat.name}>
                      <TableCell>{stat.name}</TableCell>
                      <TableCell>{stat.users}</TableCell>
                      <TableCell>£{stat.revenue.toFixed(2)}</TableCell>
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

