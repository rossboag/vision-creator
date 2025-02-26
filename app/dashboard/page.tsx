"use client"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Palette, Brain, FolderOpen, Image, User, HelpCircle, Settings, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  { name: "Editor", icon: Palette, href: "/editor", description: "Open the full design editor" },
  { name: "AI Create New", icon: Brain, href: "/ai-create", description: "AI-assisted design workflow" },
  { name: "Templates", icon: FolderOpen, href: "/templates", description: "Browse pre-made templates" },
  { name: "Library", icon: FolderOpen, href: "/library", description: "Manage your projects and assets" },
  { name: "Content", icon: Image, href: "/content", description: "Organize your media assets" },
  { name: "User Profile & Branding", icon: User, href: "/profile", description: "Customize your brand identity" },
  { name: "Help & Tutorials", icon: HelpCircle, href: "/help", description: "Get assistance and learn" },
  { name: "Settings", icon: Settings, href: "/settings", description: "Adjust preferences and account settings" },
]

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card key={feature.name} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Link href={feature.href} className="flex flex-col items-center text-center">
                <feature.icon className="h-12 w-12 mb-4 text-primary" />
                <h2 className="text-xl font-semibold mb-2">{feature.name}</h2>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/admin">
          <Button variant="outline" size="lg" className="w-full md:w-auto">
            <ShieldAlert className="mr-2 h-4 w-4" />
            Admin Panel
          </Button>
        </Link>
      </div>
    </div>
  )
}

