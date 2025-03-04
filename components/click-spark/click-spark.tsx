'use client'

import type React from 'react'
import { useCallback, useEffect, useRef } from 'react'

interface ClickSparkProps {
  sparkColor?: string
  sparkSize?: number
  sparkRadius?: number
  sparkCount?: number
  duration?: number
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'
  extraScale?: number
  children?: React.ReactNode
}

interface Spark {
  color: string
  x: number
  y: number
  angle: number
  startTime: number
}

const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = 'text-[var(--theme-contrast)]', // Tailwind class
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.5,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sparksRef = useRef<Spark[]>([]) // Stores spark data
  const startTimeRef = useRef<number | null>(null) // Tracks initial timestamp for animation

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    let resizeTimeout: ReturnType<typeof setTimeout>

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect()
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
    }

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 100) // Debounce by 100ms
    }

    // Observe size changes
    const ro = new ResizeObserver(handleResize)
    ro.observe(parent)

    // Initial sizing
    resizeCanvas()

    // Cleanup
    return () => {
      ro.disconnect()
      clearTimeout(resizeTimeout)
    }
  }, [])

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case 'linear':
          return t
        case 'ease-in':
          return t * t
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        default:
          return t * (2 - t)
      }
    },
    [easing]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const draw = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp // store initial time
      }
      ctx?.clearRect(0, 0, canvas.width, canvas.height)

      sparksRef.current = sparksRef.current.filter((spark: Spark) => {
        const elapsed = timestamp - spark.startTime
        if (elapsed >= duration) {
          return false // Remove finished sparks
        }

        const progress = elapsed / duration
        const eased = easeFunc(progress)

        const distance = eased * sparkRadius * extraScale
        const lineLength = sparkSize * (1 - eased)

        // Calculate points for the spark line
        const x1 = spark.x + distance * Math.cos(spark.angle)
        const y1 = spark.y + distance * Math.sin(spark.angle)
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle)
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle)

        // Apply the dynamically resolved color
        ctx.strokeStyle = spark.color || 'white' // Default to white if missing
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        return true
      })

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Create a temporary element to resolve Tailwind class color
    const tempElement = document.createElement('span')
    tempElement.className = sparkColor // Use Tailwind class (e.g., 'text-red-500')
    document.body.appendChild(tempElement)

    // Extract computed color from Tailwind class
    const computedColor = getComputedStyle(tempElement).color
    document.body.removeChild(tempElement) // Clean up

    const now = performance.now()
    const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
      color: computedColor, // Store resolved color
    }))

    sparksRef.current.push(...newSparks)
  }

  return (
    <div className="relative w-full h-full" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[999] pointer-events-none"
      />
      {children}
    </div>
  )
}

export default ClickSpark
