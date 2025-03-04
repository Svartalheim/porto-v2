'use client'
import { useEffect, useRef, useState } from 'react'

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const requestRef = useRef<number | null>(null)
  const mousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (mousePosition.current.x - prev.x) * 0.1, // Smooth transition factor
        y: prev.y + (mousePosition.current.y - prev.y) * 0.1,
      }))
      requestRef.current = requestAnimationFrame(animate)
    }
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  return (
    <div
      className="bg-[rgba(var(--rgb-theme-contrast),1)]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        // backgroundColor: 'blue',
        pointerEvents: 'none',
        transform: `translate(${position.x - 10}px, ${position.y - 10}px)`, // Centering the dot
        zIndex: 9999,
        mixBlendMode: 'difference',
        transition: 'transform 0.1s ease-out', // Smooth transition
      }}
    />
  )
}

export default CursorFollower
