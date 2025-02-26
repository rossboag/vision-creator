"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ColorPicker } from "@/components/color-picker"
import { Plus, Minus } from "lucide-react"

export default function ProfilePage() {
  const [businessName, setBusinessName] = useState("")
  const [tagline, setTagline] = useState("")
  const [description, setDescription] = useState("")
  const [industry, setIndustry] = useState("")
  const [foundedYear, setFoundedYear] = useState("")
  const [website, setWebsite] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [primaryColor, setPrimaryColor] = useState("#000000")
  const [secondaryColor, setSecondaryColor] = useState("#ffffff")
  const [accentColor, setAccentColor] = useState("#cccccc")
  const [fontPrimary, setFontPrimary] = useState("")
  const [fontSecondary, setFontSecondary] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [toneOfVoice, setToneOfVoice] = useState("")
  const [socialMedia, setSocialMedia] = useState([{ platform: "", url: "" }])
  const [keywords, setKeywords] = useState("")
  const [uniqueSellingPoints, setUniqueSellingPoints] = useState([""])
  const [competitors, setCompetitors] = useState([""])
  const [brandValues, setBrandValues] = useState([""])
  const [missionStatement, setMissionStatement] = useState("")
  const [visionStatement, setVisionStatement] = useState("")
  const [brandPersonality, setBrandPersonality] = useState({
    professional: 50,
    friendly: 50,
    innovative: 50,
    traditional: 50,
    luxury: 50,
  })
  const [seasonality, setSeasonality] = useState({
    spring: false,
    summer: false,
    autumn: false,
    winter: false,
  })

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0])
    }
  }

  const handleSocialMediaChange = (index: number, field: "platform" | "url", value: string) => {
    const updatedSocialMedia = [...socialMedia]
    updatedSocialMedia[index][field] = value
    setSocialMedia(updatedSocialMedia)
  }

  const addSocialMedia = () => {
    setSocialMedia([...socialMedia, { platform: "", url: "" }])
  }

  const removeSocialMedia = (index: number) => {
    const updatedSocialMedia = socialMedia.filter((_, i) => i !== index)
    setSocialMedia(updatedSocialMedia)
  }

  const handleArrayChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter((prev) => {
      const updated = [...prev]
      updated[index] = value
      return updated
    })
  }

  const addArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""])
  }

  const removeArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile & Branding</h1>
      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="visual-identity">Visual Identity</TabsTrigger>
          <TabsTrigger value="brand-voice">Brand Voice</TabsTrigger>
          <TabsTrigger value="market-position">Market Position</TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the fundamental details about your business.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input
                    id="business-name"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="Enter your business name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Enter your business tagline"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Enter your industry"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founded-year">Founded Year</Label>
                  <Input
                    id="founded-year"
                    value={foundedYear}
                    onChange={(e) => setFoundedYear(e.target.value)}
                    placeholder="Enter the year your business was founded"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a brief description of your business"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Enter your website URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your business email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your business phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your business address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="visual-identity">
          <Card>
            <CardHeader>
              <CardTitle>Visual Identity</CardTitle>
              <CardDescription>Define the visual elements of your brand.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="flex items-center space-x-2">
                  <Input id="logo" type="file" onChange={handleLogoUpload} accept="image/*" />
                  {logo && <p className="text-sm text-muted-foreground">{logo.name}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <ColorPicker color={primaryColor} onChange={setPrimaryColor} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <ColorPicker color={secondaryColor} onChange={setSecondaryColor} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <ColorPicker color={accentColor} onChange={setAccentColor} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="font-primary">Primary Font</Label>
                  <Select value={fontPrimary} onValueChange={setFontPrimary}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arial">Arial</SelectItem>
                      <SelectItem value="helvetica">Helvetica</SelectItem>
                      <SelectItem value="georgia">Georgia</SelectItem>
                      <SelectItem value="times-new-roman">Times New Roman</SelectItem>
                      <SelectItem value="courier-new">Courier New</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="font-secondary">Secondary Font</Label>
                  <Select value={fontSecondary} onValueChange={setFontSecondary}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select secondary font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="arial">Arial</SelectItem>
                      <SelectItem value="helvetica">Helvetica</SelectItem>
                      <SelectItem value="georgia">Georgia</SelectItem>
                      <SelectItem value="times-new-roman">Times New Roman</SelectItem>
                      <SelectItem value="courier-new">Courier New</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="brand-voice">
          <Card>
            <CardHeader>
              <CardTitle>Brand Voice</CardTitle>
              <CardDescription>Define how your brand communicates with its audience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-audience">Target Audience</Label>
                <Textarea
                  id="target-audience"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="Describe your target audience"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone-of-voice">Tone of Voice</Label>
                <Textarea
                  id="tone-of-voice"
                  value={toneOfVoice}
                  onChange={(e) => setToneOfVoice(e.target.value)}
                  placeholder="Describe your brand's tone of voice"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Brand Personality</Label>
                <div className="space-y-4">
                  {Object.entries(brandPersonality).map(([trait, value]) => (
                    <div key={trait} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="capitalize">{trait}</span>
                        <span>{value}%</span>
                      </div>
                      <Slider
                        value={[value]}
                        onValueChange={(newValue) => setBrandPersonality((prev) => ({ ...prev, [trait]: newValue[0] }))}
                        max={100}
                        step={1}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Social Media Profiles</Label>
                {socialMedia.map((profile, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Select
                      value={profile.platform}
                      onValueChange={(value) => handleSocialMediaChange(index, "platform", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="youtube">YouTube</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={profile.url}
                      onChange={(e) => handleSocialMediaChange(index, "url", e.target.value)}
                      placeholder="Profile URL"
                    />
                    <Button variant="outline" size="icon" onClick={() => removeSocialMedia(index)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addSocialMedia}>
                  <Plus className="h-4 w-4 mr-2" /> Add Social Media Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="market-position">
          <Card>
            <CardHeader>
              <CardTitle>Market Position</CardTitle>
              <CardDescription>Define your brand's position in the market.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Textarea
                  id="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="Enter keywords related to your brand (comma-separated)"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Unique Selling Points</Label>
                {uniqueSellingPoints.map((point, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={point}
                      onChange={(e) => handleArrayChange(setUniqueSellingPoints, index, e.target.value)}
                      placeholder={`Unique Selling Point ${index + 1}`}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeArrayItem(setUniqueSellingPoints, index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={() => addArrayItem(setUniqueSellingPoints)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Unique Selling Point
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Competitors</Label>
                {competitors.map((competitor, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={competitor}
                      onChange={(e) => handleArrayChange(setCompetitors, index, e.target.value)}
                      placeholder={`Competitor ${index + 1}`}
                    />
                    <Button variant="outline" size="icon" onClick={() => removeArrayItem(setCompetitors, index)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={() => addArrayItem(setCompetitors)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Competitor
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Brand Values</Label>
                {brandValues.map((value, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={value}
                      onChange={(e) => handleArrayChange(setBrandValues, index, e.target.value)}
                      placeholder={`Brand Value ${index + 1}`}
                    />
                    <Button variant="outline" size="icon" onClick={() => removeArrayItem(setBrandValues, index)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={() => addArrayItem(setBrandValues)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Brand Value
                </Button>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission-statement">Mission Statement</Label>
                <Textarea
                  id="mission-statement"
                  value={missionStatement}
                  onChange={(e) => setMissionStatement(e.target.value)}
                  placeholder="Enter your company's mission statement"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision-statement">Vision Statement</Label>
                <Textarea
                  id="vision-statement"
                  value={visionStatement}
                  onChange={(e) => setVisionStatement(e.target.value)}
                  placeholder="Enter your company's vision statement"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Seasonality</Label>
                <div className="flex flex-wrap gap-4">
                  {Object.entries(seasonality).map(([season, value]) => (
                    <div key={season} className="flex items-center space-x-2">
                      <Switch
                        id={`season-${season}`}
                        checked={value}
                        onCheckedChange={(checked) => setSeasonality((prev) => ({ ...prev, [season]: checked }))}
                      />
                      <Label htmlFor={`season-${season}`} className="capitalize">
                        {season}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-6 flex justify-end">
        <Button>Save Profile</Button>
      </div>
    </div>
  )
}

