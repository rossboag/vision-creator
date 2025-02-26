"use client"

import { Button } from "@/components/ui/button"
import { useEditorStore } from "@/store/editor-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { SlideOutMenu } from "./slide-out-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, ChevronLeft, ChevronRight } from "lucide-react"
import { konvaWrapper } from "@/lib/konva-wrapper"
import { Textarea } from "@/components/ui/textarea"

interface TextMenuProps {
  onClose: () => void
}

const subMenus = [
  { id: "basic", title: "Basic" },
  { id: "layout", title: "Layout" },
  { id: "path", title: "Path" },
  { id: "gradient", title: "Gradient" },
  { id: "transform", title: "Transform" },
  { id: "mask", title: "Mask" },
  { id: "effects", title: "Effects" },
]

export { TextMenu }

export default function TextMenu({ onClose }: TextMenuProps) {
  const { addElement, selectedIds, updateElement } = useEditorStore()
  const [text, setText] = useState("New Text")
  const [fontSize, setFontSize] = useState(24)
  const [fontFamily, setFontFamily] = useState("Arial")
  const [textColor, setTextColor] = useState("#000000")
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left")
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [currentSubMenu, setCurrentSubMenu] = useState(0)

  const [textWidth, setTextWidth] = useState(200)
  const [textWrap, setTextWrap] = useState<"word" | "char" | "none">("word")
  const [textOverflow, setTextOverflow] = useState<"clip" | "ellipsis">("clip")
  const [pathData, setPathData] = useState("")
  const [gradientStartColor, setGradientStartColor] = useState("#000000")
  const [gradientEndColor, setGradientEndColor] = useState("#ffffff")
  const [gradientAngle, setGradientAngle] = useState(0)
  const [transformationType, setTransformationType] = useState<"circular" | "wavy">("circular")
  const [transformationOptions, setTransformationOptions] = useState({
    circular: { radius: 100, startAngle: 0 },
    wavy: { amplitude: 20, frequency: 0.1 },
  })
  const [maskType, setMaskType] = useState<"image" | "shape">("image")
  const [maskData, setMaskData] = useState("")
  const [effectType, setEffectType] = useState<
    "shadow" | "outline" | "glow" | "blur" | "brightness" | "contrast" | "saturation" | "noise"
  >("shadow")
  const [effectOptions, setEffectOptions] = useState({
    shadow: { color: "#000000", blur: 5, offset: { x: 5, y: 5 }, opacity: 0.5 },
    outline: { color: "#000000", width: 2 },
    glow: { color: "#ffff00", blur: 10 },
    blur: { blurRadius: 5 },
    brightness: { brightness: 0 },
    contrast: { contrast: 0 },
    saturation: { saturation: 0 },
    noise: { noise: 0.5 },
  })

  const handlePrevSubMenu = () => {
    setCurrentSubMenu((prev) => (prev > 0 ? prev - 1 : subMenus.length - 1))
  }

  const handleNextSubMenu = () => {
    setCurrentSubMenu((prev) => (prev < subMenus.length - 1 ? prev + 1 : 0))
  }

  const handleAddText = () => {
    const newElement = addElement({
      type: "text",
      x: 100,
      y: 100,
      text: text,
      fontSize: fontSize,
      fontFamily: fontFamily,
      fill: textColor,
      width: textWidth,
      height: "auto",
      layerId: "default",
      wrap: textWrap,
      align: textAlign,
      fontStyle: `${isItalic ? "italic" : "normal"} ${isBold ? "bold" : "normal"}`,
      textDecoration: isUnderline ? "underline" : "",
      overflow: textOverflow,
    })
    if (newElement) {
      konvaWrapper.addTextElement(newElement)
    }
    onClose()
  }

  const handleUpdateText = () => {
    if (selectedIds.length === 1) {
      const id = selectedIds[0]
      updateElement(id, {
        text: text,
        fontSize: fontSize,
        fontFamily: fontFamily,
        fill: textColor,
        align: textAlign,
        fontStyle: `${isItalic ? "italic" : "normal"} ${isBold ? "bold" : "normal"}`,
        textDecoration: isUnderline ? "underline" : "",
        width: textWidth,
        wrap: textWrap,
        overflow: textOverflow,
      })
      konvaWrapper.updateTextElement(id, {
        text: text,
        fontSize: fontSize,
        fontFamily: fontFamily,
        fill: textColor,
        align: textAlign,
        fontStyle: `${isItalic ? "italic" : "normal"} ${isBold ? "bold" : "normal"}`,
        textDecoration: isUnderline ? "underline" : "",
        width: textWidth,
        wrap: textWrap,
        overflow: textOverflow,
      })
    }
  }

  const renderEffectsSubMenu = () => {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Effect Type</Label>
          <Select value={effectType} onValueChange={(value: typeof effectType) => setEffectType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select effect type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shadow">Shadow</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
              <SelectItem value="glow">Glow</SelectItem>
              <SelectItem value="blur">Blur</SelectItem>
              <SelectItem value="brightness">Brightness</SelectItem>
              <SelectItem value="contrast">Contrast</SelectItem>
              <SelectItem value="saturation">Saturation</SelectItem>
              <SelectItem value="noise">Noise</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {effectType === "shadow" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="shadow-color">Shadow Color</Label>
              <Input
                id="shadow-color"
                type="color"
                value={effectOptions.shadow.color}
                onChange={(e) =>
                  setEffectOptions((prev) => ({
                    ...prev,
                    shadow: { ...prev.shadow, color: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shadow-blur">Shadow Blur</Label>
              <Slider
                id="shadow-blur"
                min={0}
                max={20}
                step={1}
                value={[effectOptions.shadow.blur]}
                onValueChange={(value) =>
                  setEffectOptions((prev) => ({
                    ...prev,
                    shadow: { ...prev.shadow, blur: value[0] },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shadow-offset-x">Shadow Offset X</Label>
              <Slider
                id="shadow-offset-x"
                min={-20}
                max={20}
                step={1}
                value={[effectOptions.shadow.offset.x]}
                onValueChange={(value) =>
                  setEffectOptions((prev) => ({
                    ...prev,
                    shadow: { ...prev.shadow, offset: { ...prev.shadow.offset, x: value[0] } },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shadow-offset-y">Shadow Offset Y</Label>
              <Slider
                id="shadow-offset-y"
                min={-20}
                max={20}
                step={1}
                value={[effectOptions.shadow.offset.y]}
                onValueChange={(value) =>
                  setEffectOptions((prev) => ({
                    ...prev,
                    shadow: { ...prev.shadow, offset: { ...prev.shadow.offset, y: value[0] } },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="shadow-opacity">Shadow Opacity</Label>
              <Slider
                id="shadow-opacity"
                min={0}
                max={1}
                step={0.1}
                value={[effectOptions.shadow.opacity]}
                onValueChange={(value) =>
                  setEffectOptions((prev) => ({
                    ...prev,
                    shadow: { ...prev.shadow, opacity: value[0] },
                  }))
                }
              />
            </div>
          </>
        )}
        {effectType === "outline" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="outline-color">Outline Color</Label>
              <Input
                id="outline-color"
                type="color"
                value={effectOptions.outline.color}
                onChange={(e) =>
                  setEffectOptions((prev) => ({
                    ...prev,
                    outline: { ...prev.outline, color: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="outline-width">Outline Width</Label>
              <Slider
                id="outline-width"
                min={1}
                max={10}
                step={1}
                value={[effectOptions.outline.width]}
                onValueChange={(value) =>
                  setEffectOptions((prev) => ({
                    ...prev,
                    outline: { ...prev.outline, width: value[0] },
                  }))
                }
              />
            </div>
          </>
        )}
        {effectType === "glow" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="glow-color">Glow Color</Label>
              <Input
                id="glow-color"
                type="color"
                value={effectOptions.glow.color}
                onChange={(e) =>
                  setEffectOptions((prev) => ({
                    ...prev,
                    glow: { ...prev.glow, color: e.target.value },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="glow-blur">Glow Blur</Label>
              <Slider
                id="glow-blur"
                min={0}
                max={20}
                step={1}
                value={[effectOptions.glow.blur]}
                onValueChange={(value) =>
                  setEffectOptions((prev) => ({
                    ...prev,
                    glow: { ...prev.glow, blur: value[0] },
                  }))
                }
              />
            </div>
          </>
        )}
        {effectType === "blur" && (
          <div className="space-y-2">
            <Label htmlFor="blur-radius">Blur Radius</Label>
            <Slider
              id="blur-radius"
              min={0}
              max={20}
              step={1}
              value={[effectOptions.blur.blurRadius]}
              onValueChange={(value) =>
                setEffectOptions((prev) => ({
                  ...prev,
                  blur: { blurRadius: value[0] },
                }))
              }
            />
          </div>
        )}
        {effectType === "brightness" && (
          <div className="space-y-2">
            <Label htmlFor="brightness">Brightness</Label>
            <Slider
              id="brightness"
              min={-1}
              max={1}
              step={0.1}
              value={[effectOptions.brightness.brightness]}
              onValueChange={(value) =>
                setEffectOptions((prev) => ({
                  ...prev,
                  brightness: { brightness: value[0] },
                }))
              }
            />
          </div>
        )}
        {effectType === "contrast" && (
          <div className="space-y-2">
            <Label htmlFor="contrast">Contrast</Label>
            <Slider
              id="contrast"
              min={-100}
              max={100}
              step={1}
              value={[effectOptions.contrast.contrast]}
              onValueChange={(value) =>
                setEffectOptions((prev) => ({
                  ...prev,
                  contrast: { contrast: value[0] },
                }))
              }
            />
          </div>
        )}
        {effectType === "saturation" && (
          <div className="space-y-2">
            <Label htmlFor="saturation">Saturation</Label>
            <Slider
              id="saturation"
              min={-2}
              max={2}
              step={0.1}
              value={[effectOptions.saturation.saturation]}
              onValueChange={(value) =>
                setEffectOptions((prev) => ({
                  ...prev,
                  saturation: { saturation: value[0] },
                }))
              }
            />
          </div>
        )}
        {effectType === "noise" && (
          <div className="space-y-2">
            <Label htmlFor="noise">Noise</Label>
            <Slider
              id="noise"
              min={0}
              max={1}
              step={0.1}
              value={[effectOptions.noise.noise]}
              onValueChange={(value) =>
                setEffectOptions((prev) => ({
                  ...prev,
                  noise: { noise: value[0] },
                }))
              }
            />
          </div>
        )}
        <Button onClick={() => konvaWrapper.applyTextEffect(selectedIds[0], effectType, effectOptions[effectType])}>
          Apply Effect
        </Button>
        <Button onClick={() => konvaWrapper.removeTextEffect(selectedIds[0], effectType)}>Remove Effect</Button>
      </div>
    )
  }

  const renderSubMenu = () => {
    switch (subMenus[currentSubMenu].id) {
      case "basic":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-input">Text Content</Label>
              <Input id="text-input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="font-size">Font Size</Label>
              <Slider
                id="font-size"
                min={8}
                max={72}
                step={1}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
              />
              <div className="text-right text-sm">{fontSize}px</div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="font-family">Font Family</Label>
              <Select value={fontFamily} onValueChange={setFontFamily}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Helvetica">Helvetica</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  <SelectItem value="Courier New">Courier New</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="text-color">Text Color</Label>
              <Input id="text-color" type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Text Alignment</Label>
              <ToggleGroup type="single" value={textAlign} onValueChange={(value: any) => setTextAlign(value)}>
                <ToggleGroupItem value="left" aria-label="Align left">
                  <AlignLeft className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="center" aria-label="Align center">
                  <AlignCenter className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="right" aria-label="Align right">
                  <AlignRight className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <Label>Text Style</Label>
              <ToggleGroup type="multiple">
                <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => setIsBold(!isBold)}>
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={() => setIsItalic(!isItalic)}>
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="underline"
                  aria-label="Toggle underline"
                  onClick={() => setIsUnderline(!isUnderline)}
                >
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        )
      case "layout":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-width">Text Width</Label>
              <Slider
                id="text-width"
                min={50}
                max={500}
                step={1}
                value={[textWidth]}
                onValueChange={(value) => setTextWidth(value[0])}
              />
              <div className="text-right text-sm">{textWidth}px</div>
            </div>
            <div className="space-y-2">
              <Label>Text Wrap</Label>
              <Select value={textWrap} onValueChange={(value: "word" | "char" | "none") => setTextWrap(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select wrap type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="word">Word</SelectItem>
                  <SelectItem value="char">Character</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Text Overflow</Label>
              <Select value={textOverflow} onValueChange={(value: "clip" | "ellipsis") => setTextOverflow(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select overflow type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clip">Clip</SelectItem>
                  <SelectItem value="ellipsis">Ellipsis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case "path":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="path-data">SVG Path Data</Label>
              <Textarea
                id="path-data"
                value={pathData}
                onChange={(e) => setPathData(e.target.value)}
                placeholder="M0,0 C100,0 0,100 100,100"
              />
            </div>
            <Button onClick={() => konvaWrapper.applyTextOnPath(selectedIds[0], pathData)}>Apply Text Path</Button>
            <Button onClick={() => konvaWrapper.removeTextFromPath(selectedIds[0])}>Remove Text Path</Button>
          </div>
        )
      case "gradient":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Gradient Colors</Label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  value={gradientStartColor}
                  onChange={(e) => setGradientStartColor(e.target.value)}
                />
                <Input type="color" value={gradientEndColor} onChange={(e) => setGradientEndColor(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gradient-angle">Gradient Angle</Label>
              <Slider
                id="gradient-angle"
                min={0}
                max={360}
                step={1}
                value={[gradientAngle]}
                onValueChange={(value) => setGradientAngle(value[0])}
              />
              <div className="text-right text-sm">{gradientAngle}°</div>
            </div>
            <Button
              onClick={() =>
                konvaWrapper.applyTextGradient(selectedIds[0], gradientStartColor, gradientEndColor, gradientAngle)
              }
            >
              Apply Gradient
            </Button>
            <Button onClick={() => konvaWrapper.removeTextGradient(selectedIds[0])}>Remove Gradient</Button>
          </div>
        )
      case "transform":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Transformation Type</Label>
              <Select
                value={transformationType}
                onValueChange={(value: "circular" | "wavy") => setTransformationType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select transformation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="circular">Circular</SelectItem>
                  <SelectItem value="wavy">Wavy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {transformationType === "circular" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="circular-radius">Radius</Label>
                  <Slider
                    id="circular-radius"
                    min={50}
                    max={200}
                    step={1}
                    value={[transformationOptions.circular.radius]}
                    onValueChange={(value) =>
                      setTransformationOptions((prev) => ({
                        ...prev,
                        circular: { ...prev.circular, radius: value[0] },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="circular-start-angle">Start Angle</Label>
                  <Slider
                    id="circular-start-angle"
                    min={0}
                    max={360}
                    step={1}
                    value={[transformationOptions.circular.startAngle]}
                    onValueChange={(value) =>
                      setTransformationOptions((prev) => ({
                        ...prev,
                        circular: { ...prev.circular, startAngle: value[0] },
                      }))
                    }
                  />
                </div>
              </>
            )}
            {transformationType === "wavy" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="wavy-amplitude">Amplitude</Label>
                  <Slider
                    id="wavy-amplitude"
                    min={1}
                    max={50}
                    step={1}
                    value={[transformationOptions.wavy.amplitude]}
                    onValueChange={(value) =>
                      setTransformationOptions((prev) => ({
                        ...prev,
                        wavy: { ...prev.wavy, amplitude: value[0] },
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wavy-frequency">Frequency</Label>
                  <Slider
                    id="wavy-frequency"
                    min={0.01}
                    max={0.5}
                    step={0.01}
                    value={[transformationOptions.wavy.frequency]}
                    onValueChange={(value) =>
                      setTransformationOptions((prev) => ({
                        ...prev,
                        wavy: { ...prev.wavy, frequency: value[0] },
                      }))
                    }
                  />
                </div>
              </>
            )}
            <Button
              onClick={() =>
                konvaWrapper.applyTextTransformation(
                  selectedIds[0],
                  transformationType,
                  transformationOptions[transformationType],
                )
              }
            >
              Apply Transformation
            </Button>
            <Button onClick={() => konvaWrapper.removeTextTransformation(selectedIds[0])}>Remove Transformation</Button>
          </div>
        )
      case "mask":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Mask Type</Label>
              <Select value={maskType} onValueChange={(value: "image" | "shape") => setMaskType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mask type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="shape">Shape</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {maskType === "image" && (
              <div className="space-y-2">
                <Label htmlFor="mask-image">Mask Image URL</Label>
                <Input
                  id="mask-image"
                  value={maskData}
                  onChange={(e) => setMaskData(e.target.value)}
                  placeholder="https://example.com/mask.png"
                />
              </div>
            )}
            {maskType === "shape" && (
              <div className="space-y-2">
                <Label htmlFor="mask-shape">Mask Shape (SVG Path)</Label>
                <Textarea
                  id="mask-shape"
                  value={maskData}
                  onChange={(e) => setMaskData(e.target.value)}
                  placeholder="M0,0 L100,0 L100,100 L0,100 Z"
                />
              </div>
            )}
            <Button onClick={() => konvaWrapper.applyTextMask(selectedIds[0], maskType, maskData)}>Apply Mask</Button>
            <Button onClick={() => konvaWrapper.removeTextMask(selectedIds[0])}>Remove Mask</Button>
          </div>
        )
      case "effects":
        return renderEffectsSubMenu()
      default:
        return <div>Sub-menu content not implemented</div>
    }
  }

  return (
    <SlideOutMenu title="Text Tool" onClose={onClose}>
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="icon" onClick={handlePrevSubMenu}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-medium">{subMenus[currentSubMenu].title}</span>
        <Button variant="outline" size="icon" onClick={handleNextSubMenu}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      {renderSubMenu()}
      {selectedIds.length === 1 ? (
        <Button onClick={handleUpdateText} className="w-full mt-4">
          Update Text
        </Button>
      ) : (
        <Button onClick={handleAddText} className="w-full mt-4">
          Add Text
        </Button>
      )}
    </SlideOutMenu>
  )
}

