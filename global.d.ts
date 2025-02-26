declare var Konva: any

declare module "konva/lib/Core" {
  export = Konva
}

declare module "konva/lib/shapes/Rect" {
  export = Konva.Rect
}

// Add more declarations as needed

