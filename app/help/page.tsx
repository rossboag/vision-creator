"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, BookOpen, Workflow, Keyboard } from "lucide-react"

const guides = [
  {
    title: "Getting Started",
    content: "Learn the basics of using our design tool and create your first project.",
  },
  {
    title: "Working with Layers",
    content: "Understand how to use layers effectively in your designs.",
  },
  {
    title: "Using the Shape Tools",
    content: "Master the various shape tools available in the editor.",
  },
  {
    title: "Text and Typography",
    content: "Learn how to add and style text in your designs.",
  },
  {
    title: "Working with Images",
    content: "Import, edit, and manipulate images in your projects.",
  },
  {
    title: "Animations and Effects",
    content: "Add life to your designs with animations and effects.",
  },
  {
    title: "Exporting Your Work",
    content: "Learn about the various export options available for your projects.",
  },
]

const workflows = [
  {
    title: "Creating a Social Media Post",
    steps: [
      "Choose a template or start from scratch",
      "Add your brand elements (logo, colors)",
      "Insert and arrange images and text",
      "Apply filters or effects",
      "Review and adjust for different social platforms",
      "Export and schedule your post",
    ],
  },
  {
    title: "Designing a Business Card",
    steps: [
      "Select a business card template or create a custom size",
      "Add your logo and contact information",
      "Choose appropriate fonts and colors",
      "Incorporate design elements (shapes, lines, etc.)",
      "Review front and back designs",
      "Prepare for printing",
    ],
  },
  {
    title: "Creating an Animated Banner",
    steps: [
      "Set up your banner size and background",
      "Add text and graphical elements",
      "Apply animations to individual elements",
      "Adjust timing and duration of animations",
      "Preview and refine your animation",
      "Export as a GIF or video file",
    ],
  },
]

const shortcuts = [
  { keys: "Ctrl + N", description: "New project" },
  { keys: "Ctrl + O", description: "Open project" },
  { keys: "Ctrl + S", description: "Save project" },
  { keys: "Ctrl + Z", description: "Undo" },
  { keys: "Ctrl + Y", description: "Redo" },
  { keys: "Ctrl + C", description: "Copy" },
  { keys: "Ctrl + V", description: "Paste" },
  { keys: "Ctrl + X", description: "Cut" },
  { keys: "Ctrl + A", description: "Select all" },
  { keys: "Ctrl + G", description: "Group selected elements" },
  { keys: "Ctrl + Shift + G", description: "Ungroup elements" },
  { keys: "Ctrl + [", description: "Send backward" },
  { keys: "Ctrl + ]", description: "Bring forward" },
  { keys: "Ctrl + Shift + [", description: "Send to back" },
  { keys: "Ctrl + Shift + ]", description: "Bring to front" },
  { keys: "Ctrl + +", description: "Zoom in" },
  { keys: "Ctrl + -", description: "Zoom out" },
  { keys: "Ctrl + 0", description: "Fit to screen" },
  { keys: "Spacebar (hold) + Drag", description: "Pan canvas" },
]

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredGuides = guides.filter((guide) => guide.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const filteredWorkflows = workflows.filter((workflow) =>
    workflow.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredShortcuts = shortcuts.filter(
    (shortcut) =>
      shortcut.keys.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shortcut.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Help & Tutorials</h1>
      <div className="mb-6">
        <Input
          placeholder="Search for help topics..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>
      <Tabs defaultValue="guides">
        <TabsList>
          <TabsTrigger value="guides">
            <BookOpen className="w-4 h-4 mr-2" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="workflows">
            <Workflow className="w-4 h-4 mr-2" />
            Workflows
          </TabsTrigger>
          <TabsTrigger value="shortcuts">
            <Keyboard className="w-4 h-4 mr-2" />
            Shortcuts
          </TabsTrigger>
          <TabsTrigger value="ai-assistant">
            <Bot className="w-4 h-4 mr-2" />
            AI Assistant
          </TabsTrigger>
        </TabsList>
        <TabsContent value="guides">
          <Card>
            <CardHeader>
              <CardTitle>Guides</CardTitle>
              <CardDescription>Learn how to use our design tool effectively.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <Accordion type="single" collapsible>
                  {filteredGuides.map((guide, index) => (
                    <AccordionItem value={`guide-${index}`} key={index}>
                      <AccordionTrigger>{guide.title}</AccordionTrigger>
                      <AccordionContent>{guide.content}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="workflows">
          <Card>
            <CardHeader>
              <CardTitle>Workflows</CardTitle>
              <CardDescription>Step-by-step guides for common design tasks.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <Accordion type="single" collapsible>
                  {filteredWorkflows.map((workflow, index) => (
                    <AccordionItem value={`workflow-${index}`} key={index}>
                      <AccordionTrigger>{workflow.title}</AccordionTrigger>
                      <AccordionContent>
                        <ol className="list-decimal list-inside">
                          {workflow.steps.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shortcuts">
          <Card>
            <CardHeader>
              <CardTitle>Keyboard Shortcuts</CardTitle>
              <CardDescription>Quick keyboard commands to speed up your workflow.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-medium p-2">Shortcut</th>
                      <th className="text-left font-medium p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredShortcuts.map((shortcut, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-2">
                          <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                            {shortcut.keys}
                          </kbd>
                        </td>
                        <td className="p-2">{shortcut.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ai-assistant">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Get intelligent help and suggestions for your designs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Bot className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">AI Assistant Coming Soon!</h3>
                <p className="text-gray-500 mb-4">
                  Our intelligent AI assistant is currently in development. Stay tuned for personalized design
                  suggestions, automated workflows, and more!
                </p>
                <Button variant="outline">Get Notified When It's Ready</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

