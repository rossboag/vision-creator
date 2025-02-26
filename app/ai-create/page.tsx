"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import {
  Menu,
  ShoppingBag,
  Info,
  FileSlidersIcon as Slideshow,
  Share2,
  Calendar,
  MonitorSmartphone,
  Zap,
  Flame,
  Snowflake,
  Lightbulb,
  Cloud,
  Sparkles,
  Waves,
  CloudLightningIcon as Lightning,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"

const designTypes = [
  { name: "Menu Board", icon: Menu },
  { name: "Product Promotion", icon: ShoppingBag },
  { name: "Information Display", icon: Info },
  { name: "Slideshow", icon: Slideshow },
  { name: "Social Media Post", icon: Share2 },
  { name: "Event Promotion", icon: Calendar },
  { name: "Welcome Screen", icon: MonitorSmartphone },
  { name: "Logo Animation", icon: Zap },
]

const industries = ["Fast Food", "Restaurant", "Retail", "Property", "Healthcare", "Sports", "Entertainment", "Hotel"]

const designStyles = ["Dark", "Light", "Colorful", "Minimal", "Classic", "Retro", "Elegant", "Futuristic"]

const animationPreferences = [
  "Fade In/Out",
  "Slide",
  "Zoom",
  "Bounce",
  "Rotate",
  "Typewriter",
  "Flip",
  "Parallax Scroll",
]

const specialEffects = [
  { name: "Fire", icon: Flame },
  { name: "Ice", icon: Snowflake },
  { name: "Neon", icon: Lightbulb },
  { name: "Glow", icon: Lightbulb },
  { name: "Smoke", icon: Cloud },
  { name: "Sparkle", icon: Sparkles },
  { name: "Water Ripple", icon: Waves },
  { name: "Lightning/Electricity", icon: Lightning },
]

const canvasSizes = [
  { name: "HD Landscape", width: 1920, height: 1080 },
  { name: "HD Portrait", width: 1080, height: 1920 },
  { name: "4K Landscape", width: 3840, height: 2160 },
  { name: "4K Portrait", width: 2160, height: 3840 },
]

export default function AICreatePage() {
  const [step, setStep] = useState(1)
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [designType, setDesignType] = useState("")
  const [industry, setIndustry] = useState("")
  const [customIndustry, setCustomIndustry] = useState("")
  const [designStyle, setDesignStyle] = useState("")
  const [animationPreference, setAnimationPreference] = useState("")
  const [specialEffect, setSpecialEffect] = useState("")
  const [canvasSize, setCanvasSize] = useState("")
  const [customWidth, setCustomWidth] = useState(1920)
  const [customHeight, setCustomHeight] = useState(1080)
  const [frameRate, setFrameRate] = useState(30)
  const [useAI, setUseAI] = useState(true)

  const router = useRouter()

  const totalSteps = 8
  const progress = (step / totalSteps) * 100

  const handleNext = () => {
    if (step < 8) {
      setStep(step + 1)
    } else {
      // Here you would typically send the collected data to your backend
      // and then redirect to the editor with the generated design
      console.log("Project setup complete", {
        projectName,
        projectDescription,
        designType,
        industry: industry === "Custom" ? customIndustry : industry,
        designStyle,
        animationPreference,
        specialEffect,
        canvasSize,
        customWidth,
        customHeight,
        frameRate,
        useAI,
      })
      router.push("/editor")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Step 1: Name Your Project</h2>
            <Input placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
            <Textarea
              placeholder="Project Description (optional)"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Step 2: Select Type of Design</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {designTypes.map((type) => (
                <Button
                  key={type.name}
                  variant={designType === type.name ? "default" : "outline"}
                  className="h-24 flex flex-col items-center justify-center"
                  onClick={() => setDesignType(type.name)}
                >
                  <type.icon className="h-8 w-8 mb-2" />
                  <span className="text-sm">{type.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Step 3: Select Industry</h2>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger>
                <SelectValue placeholder="Select an industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((ind) => (
                  <SelectItem key={ind} value={ind}>
                    {ind}
                  </SelectItem>
                ))}
                <SelectItem value="Custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            {industry === "Custom" && (
              <Input
                placeholder="Enter your industry"
                value={customIndustry}
                onChange={(e) => setCustomIndustry(e.target.value)}
              />
            )}
          </div>
        )
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Step 4: Select Your Design Style</h2>
            <RadioGroup value={designStyle} onValueChange={setDesignStyle}>
              {designStyles.map((style) => (
                <div key={style} className="flex items-center space-x-2">
                  <RadioGroupItem value={style} id={style} />
                  <Label htmlFor={style}>{style}</Label>
                </div>
              ))}
            </RadioGroup>
            {designStyle === "Custom" && (
              <div className="space-y-2">
                <Label>Custom Color</Label>
                <Input type="color" />
                <Label>Custom Font</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>{/* Add font options here */}</SelectContent>
                </Select>
              </div>
            )}
          </div>
        )
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Step 5: Animation Preferences</h2>
            <Select value={animationPreference} onValueChange={setAnimationPreference}>
              <SelectTrigger>
                <SelectValue placeholder="Select an animation style" />
              </SelectTrigger>
              <SelectContent>
                {animationPreferences.map((anim) => (
                  <SelectItem key={anim} value={anim}>
                    {anim}
                  </SelectItem>
                ))}
                <SelectItem value="Custom">Custom Animation (GSAP-based)</SelectItem>
              </SelectContent>
            </Select>
            {animationPreference === "Custom" && (
              <div className="space-y-2">
                <Label>Custom GSAP Animation Settings</Label>
                {/* Add custom GSAP settings here */}
              </div>
            )}
          </div>
        )
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Step 6: Special Effects (Optional)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {specialEffects.map((effect) => (
                <Button
                  key={effect.name}
                  variant={specialEffect === effect.name ? "default" : "outline"}
                  className="h-24 flex flex-col items-center justify-center"
                  onClick={() => setSpecialEffect(effect.name)}
                >
                  <effect.icon className="h-8 w-8 mb-2" />
                  <span className="text-sm">{effect.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )
      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Step 7: Select Canvas Size & Resolution</h2>
            <Select value={canvasSize} onValueChange={setCanvasSize}>
              <SelectTrigger>
                <SelectValue placeholder="Select canvas size" />
              </SelectTrigger>
              <SelectContent>
                {canvasSizes.map((size) => (
                  <SelectItem key={size.name} value={size.name}>
                    {size.name} ({size.width}x{size.height})
                  </SelectItem>
                ))}
                <SelectItem value="Custom">Custom Size</SelectItem>
              </SelectContent>
            </Select>
            {canvasSize === "Custom" && (
              <div className="space-y-2">
                <Label>Custom Width (px)</Label>
                <Input type="number" value={customWidth} onChange={(e) => setCustomWidth(Number(e.target.value))} />
                <Label>Custom Height (px)</Label>
                <Input type="number" value={customHeight} onChange={(e) => setCustomHeight(Number(e.target.value))} />
              </div>
            )}
            <div className="space-y-2">
              <Label>Frame Rate (fps)</Label>
              <Select value={frameRate.toString()} onValueChange={(value) => setFrameRate(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frame rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24">24 fps</SelectItem>
                  <SelectItem value="30">30 fps</SelectItem>
                  <SelectItem value="60">60 fps</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 8:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Step 8: AI-Powered Auto-Generate (Optional)</h2>
            <div className="flex items-center space-x-2">
              <Switch id="use-ai" checked={useAI} onCheckedChange={setUseAI} />
              <Label htmlFor="use-ai">Use AI to auto-generate a starting layout</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              AI will suggest fonts, colors, animations, and positioning based on your selections.
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">AI Create New</h1>
      <Progress value={progress} className="mb-6" />
      {renderStep()}
      <div className="flex justify-between mt-8">
        <Button onClick={handleBack} disabled={step === 1}>
          Back
        </Button>
        <Button onClick={handleNext}>{step === 8 ? "Finish" : "Next"}</Button>
      </div>
    </div>
  )
}

