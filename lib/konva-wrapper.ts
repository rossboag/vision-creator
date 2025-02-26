let Konva: any

if (typeof window !== "undefined") {
  Konva = require("konva")
}

class KonvaWrapper {
  private stage: any
  private layer: any
  private textEditModeElementId: string | null = null

  initStage(containerId: string, width: number, height: number) {
    this.stage = new Konva.Stage({
      container: containerId,
      width: width,
      height: height,
    })

    this.layer = new Konva.Layer()
    this.stage.add(this.layer)
  }

  setBackground(color: string) {
    const rect = new Konva.Rect({
      x: 0,
      y: 0,
      width: this.stage.width(),
      height: this.stage.height(),
      fill: color,
    })
    this.layer.add(rect)
    rect.moveToBottom()
  }

  drawCanvas(width: number, height: number) {
    this.stage.width(width)
    this.stage.height(height)
    this.layer.batchDraw()
  }

  updateStage(width: number, height: number, scale: number, x: number, y: number) {
    this.stage.width(width)
    this.stage.height(height)
    this.stage.scale({ x: scale, y: scale })
    this.stage.position({ x: x, y: y })
    this.stage.batchDraw()
  }

  addElement(element: any) {
    let shape: any

    switch (element.type) {
      case "rectangle":
        shape = new Konva.Rect({
          x: element.x,
          y: element.y,
          width: element.width,
          height: element.height,
          fill: element.fill,
          id: element.id,
          draggable: true,
          opacity: element.opacity,
          blurRadius: element.blur,
        })
        break
      case "circle":
        shape = new Konva.Circle({
          x: element.x,
          y: element.y,
          width: element.width,
          height: element.height,
          fill: element.fill,
          id: element.id,
          draggable: true,
          opacity: element.opacity,
          blurRadius: element.blur,
        })
        break
      case "line":
        shape = new Konva.Line({
          x: element.x,
          y: element.y,
          points: element.points,
          stroke: element.fill,
          id: element.id,
          draggable: true,
          opacity: element.opacity,
          blurRadius: element.blur,
        })
        break
      case "text":
        shape = new Konva.Text({
          x: element.x,
          y: element.y,
          text: element.text,
          fontSize: element.fontSize,
          fontFamily: element.fontFamily,
          fill: element.fill,
          id: element.id,
          draggable: true,
          width: element.width,
          align: element.align,
          fontStyle: element.fontStyle,
          textDecoration: element.textDecoration,
          wrap: element.wrap,
          overflow: element.overflow,
          opacity: element.opacity,
          blurRadius: element.blur,
        })
        break
      case "image":
        const imageElement = new window.Image()
        imageElement.src = element.imageUrl || ""
        shape = new Konva.Image({
          x: element.x,
          y: element.y,
          width: element.width,
          height: element.height,
          image: imageElement,
          id: element.id,
          draggable: true,
          opacity: element.opacity,
          blurRadius: element.blur,
        })
        break
      case "video":
        const videoElement = document.createElement("video")
        videoElement.src = element.videoUrl || ""
        videoElement.muted = true
        videoElement.loop = true
        videoElement.playsInline = true
        videoElement.width = element.width
        videoElement.height = element.height
        videoElement.play()

        shape = new Konva.Image({
          x: element.x,
          y: element.y,
          width: element.width,
          height: element.height,
          image: videoElement,
          id: element.id,
          draggable: true,
          opacity: element.opacity,
          blurRadius: element.blur,
        })

        break
      case "custom":
        shape = new Konva.Path({
          x: element.x,
          y: element.y,
          data: element.pathData,
          fill: element.fill,
          stroke: element.stroke,
          strokeWidth: element.strokeWidth,
          id: element.id,
          draggable: true,
          opacity: element.opacity,
          blurRadius: element.blur,
        })
        break
      default:
        shape = null
    }

    if (shape) {
      this.layer.add(shape)
    }
  }

  clear() {
    this.layer.destroyChildren()
    this.layer.batchDraw()
  }

  getStage() {
    return this.stage
  }

  getElement(id: string) {
    return this.stage.findOne("#" + id)
  }

  addTextElement(element: any) {
    const textNode = new Konva.Text({
      x: element.x,
      y: element.y,
      text: element.text,
      fontSize: element.fontSize,
      fontFamily: element.fontFamily,
      fill: element.fill,
      id: element.id,
      draggable: true,
      width: element.width,
      align: element.align,
      fontStyle: element.fontStyle,
      textDecoration: element.textDecoration,
      wrap: element.wrap,
      overflow: element.overflow,
    })
    this.layer.add(textNode)
  }

  updateTextElement(id: string, changes: any) {
    const textNode = this.getElement(id)
    if (textNode) {
      textNode.setAttrs(changes)
      this.layer.batchDraw()
    }
  }

  createEmptyTextElement(x: number, y: number): string {
    const id = "text_" + new Date().getTime()
    const textNode = new Konva.Text({
      x: x,
      y: y,
      text: "Text",
      fontSize: 20,
      fontFamily: "Arial",
      fill: "black",
      id: id,
      draggable: true,
    })
    this.layer.add(textNode)
    this.layer.batchDraw()
    return id
  }

  enterTextEditMode(id: string, textNode: any) {
    if (this.textEditModeElementId) {
      this.exitTextEditMode()
    }

    this.textEditModeElementId = id

    const textPosition = textNode.absolutePosition()
    const stageBox = this.stage.container().getBoundingClientRect()

    const areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    }

    const textarea = document.createElement("textarea")
    document.body.appendChild(textarea)

    textarea.value = textNode.text()
    textarea.style.position = "absolute"
    textarea.style.top = areaPosition.y + "px"
    textarea.style.left = areaPosition.x + "px"
    textarea.style.width = textNode.width() + "px"
    textarea.style.height = textNode.height() + "px"
    textarea.style.fontSize = textNode.fontSize() + "px"
    textarea.style.fontFamily = textNode.fontFamily()
    textarea.style.textAlign = textNode.align()
    textarea.style.border = "none"
    textarea.style.padding = "0px"
    textarea.style.margin = "0px"
    textarea.style.overflow = "hidden"
    textarea.style.background = "transparent"
    textarea.style.outline = "none"
    textarea.style.resize = "none"
    textarea.style.lineHeight = textNode.lineHeight().toString()
    textarea.style.letterSpacing = textNode.letterSpacing().toString()

    textarea.focus()

    const setTextareaSize = () => {
      textarea.style.width = textNode.width() + "px"
      textarea.style.height = textNode.height() + "px"
    }

    textNode.hide()
    setTextareaSize()
    this.layer.batchDraw()

    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        textNode.text(textarea.value)
        this.exitTextEditMode()
      }
      if (e.key === "Escape") {
        this.exitTextEditMode()
      }
    })

    textarea.addEventListener("blur", () => {
      textNode.text(textarea.value)
      this.exitTextEditMode()
    })
  }

  exitTextEditMode() {
    if (!this.textEditModeElementId) return

    const textNode = this.getElement(this.textEditModeElementId)
    if (textNode) {
      textNode.show()
      this.layer.batchDraw()
    }

    const textarea = document.querySelector("textarea")
    if (textarea) {
      textarea.remove()
    }

    this.textEditModeElementId = null
  }

  onTextDoubleClick(handler: (id: string) => void) {
    this.stage.on("dblclick", (e: any) => {
      if (e.target.nodeType === "Text") {
        handler(e.target.id())
      }
    })
  }

  offTextDoubleClick(handler: (id: string) => void) {
    this.stage.off("dblclick")
  }

  enableTextTransformer(id: string) {
    const textNode = this.getElement(id)
    if (!textNode) return

    const tr = new Konva.Transformer()
    this.layer.add(tr)
    tr.nodes([textNode])
    this.layer.batchDraw()
  }

  addCustomShape(pathData: string, options: any) {
    const shape = new Konva.Path({
      x: options.x,
      y: options.y,
      data: pathData,
      fill: options.fill,
      stroke: options.stroke,
      strokeWidth: options.strokeWidth,
    })
    this.layer.add(shape)
    this.layer.batchDraw()
  }

  updateCustomShape(id: string, pathData: string, options: any) {
    const shape = this.getElement(id)
    if (shape) {
      shape.setAttrs({
        data: pathData,
        fill: options.fill,
        stroke: options.stroke,
        strokeWidth: options.strokeWidth,
      })
      this.layer.batchDraw()
    }
  }

  applyTextOnPath(id: string, pathData: string) {
    const textNode = this.getElement(id)
    if (textNode) {
      textNode.setAttrs({
        textPath: pathData,
      })
      this.layer.batchDraw()
    }
  }

  removeTextFromPath(id: string) {
    const textNode = this.getElement(id)
    if (textNode) {
      textNode.setAttrs({
        textPath: null,
      })
      this.layer.batchDraw()
    }
  }

  applyTextGradient(id: string, startColor: string, endColor: string, angle: number) {
    const textNode = this.getElement(id)
    if (textNode) {
      const gradient = {
        start: { x: 0, y: 0 },
        end: { x: Math.cos((angle * Math.PI) / 180), y: Math.sin((angle * Math.PI) / 180) },
        colorStops: [0, startColor, 1, endColor],
      }
      textNode.setAttrs({
        fillLinearGradientStartPoint: gradient.start,
        fillLinearGradientEndPoint: gradient.end,
        fillLinearGradientColorStops: gradient.colorStops,
      })
      this.layer.batchDraw()
    }
  }

  removeTextGradient(id: string) {
    const textNode = this.getElement(id)
    if (textNode) {
      textNode.setAttrs({
        fillLinearGradientStartPoint: null,
        fillLinearGradientEndPoint: null,
        fillLinearGradientColorStops: null,
      })
      this.layer.batchDraw()
    }
  }

  applyTextTransformation(id: string, transformationType: string, options: any) {
    const textNode = this.getElement(id)
    if (textNode) {
      // Implement transformation logic here
      this.layer.batchDraw()
    }
  }

  removeTextTransformation(id: string) {
    const textNode = this.getElement(id)
    if (textNode) {
      // Implement remove transformation logic here
      this.layer.batchDraw()
    }
  }

  applyTextMask(id: string, maskType: string, maskData: string) {
    const textNode = this.getElement(id)
    if (textNode) {
      // Implement mask logic here
      this.layer.batchDraw()
    }
  }

  removeTextMask(id: string) {
    const textNode = this.getElement(id)
    if (textNode) {
      // Implement remove mask logic here
      this.layer.batchDraw()
    }
  }

  applyTextEffect(id: string, effectType: string, effectOptions: any) {
    const textNode = this.getElement(id)
    if (textNode) {
      // Implement effect logic here
      this.layer.batchDraw()
    }
  }

  removeTextEffect(id: string, effectType: string) {
    const textNode = this.getElement(id)
    if (textNode) {
      // Implement remove effect logic here
      this.layer.batchDraw()
    }
  }

  enableCaching(id: string) {
    const element = this.getElement(id)
    if (element) {
      element.cache()
      this.layer.batchDraw()
    }
  }
}

export const konvaWrapper = new KonvaWrapper()

