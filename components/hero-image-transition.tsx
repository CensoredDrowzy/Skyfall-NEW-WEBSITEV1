"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function HeroImageTransition() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = ["/hero-image-1.png", "/hero-image-2.png"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src || "/placeholder.svg"}
          alt={`Hero character ${index + 1}`}
          fill
          className={`object-contain object-right-bottom transition-opacity duration-1000 ${
            currentImage === index ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0}
        />
      ))}
    </div>
  )
}
