"use client"

import type React from "react"
import { forwardRef, useImperativeHandle, useRef, useEffect } from "react"

interface HTMLVideoProps extends React.HTMLAttributes<HTMLVideoElement> {
  src?: string
}

export const HTMLVideo = forwardRef<HTMLVideoElement, HTMLVideoProps>(({ src, ...props }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = src || ""
    }
  }, [src])

  return (
    <video
      {...props}
      ref={videoRef}
      src={src}
      style={{ objectFit: "cover", width: "100%", height: "100%" }}
      muted
      loop
      playsInline
    />
  )
})

HTMLVideo.displayName = "HTMLVideo"

