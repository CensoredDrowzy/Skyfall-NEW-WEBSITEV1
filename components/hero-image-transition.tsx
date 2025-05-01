"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function HeroImageTransition() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    "/hero-image-1.png",
    "https://www.pngplay.com/wp-content/uploads/12/Fornite-Dark-Bomber-Transparent-PNG.png",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === 0 ? 1 : 0))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full">
      {images.map((src, index) => (
        <div key={src} className="absolute inset-0">
          {/* Enhanced cloud effect overlay */}
          <div
            className={`absolute inset-0 z-20 transition-opacity duration-1000 ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#6074f4]/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-[#6074f4]/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-[#6074f4]/10 rounded-full filter blur-3xl animate-pulse"></div>

            {/* Additional cloud effects */}
            <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-[#8a94f8]/15 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-[#6074f4]/10 rounded-full filter blur-3xl animate-pulse"></div>
          </div>

          <Image
            src={src || "/placeholder.svg"}
            alt={`Hero character ${index + 1}`}
            fill
            className={`object-contain object-right-bottom transition-opacity duration-1000 ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  )
}
