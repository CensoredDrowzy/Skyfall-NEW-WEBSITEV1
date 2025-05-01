"use client"

import { useEffect, useRef } from "react"

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Star class
    class Star {
      x: number
      y: number
      size: number
      opacity: number
      speed: number
      twinkleSpeed: number
      twinkleDirection: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.5
        this.opacity = Math.random() * 0.8 + 0.2
        this.speed = Math.random() * 0.05 + 0.01
        this.twinkleSpeed = Math.random() * 0.01 + 0.005
        this.twinkleDirection = Math.random() > 0.5 ? 1 : -1
      }

      update() {
        // Twinkle effect
        this.opacity += this.twinkleSpeed * this.twinkleDirection
        if (this.opacity >= 1 || this.opacity <= 0.2) {
          this.twinkleDirection *= -1
        }

        // Subtle movement
        this.y -= this.speed
        if (this.y < 0) {
          this.y = canvas.height
          this.x = Math.random() * canvas.width
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create stars
    const starCount = 150
    const stars: Star[] = []

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star())
    }

    // Animation loop
    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw stars
      for (const star of stars) {
        star.update()
        star.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "linear-gradient(to bottom, #0a0a1a, #000000)" }}
    />
  )
}
