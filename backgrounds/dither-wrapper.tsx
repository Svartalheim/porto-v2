'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
const Dither = dynamic(() => import('~/backgrounds/dither'), { ssr: false })

export default function DitherWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true) // Ensures client-side rendering
  }, [])
  return (
    isMounted && (
      <Dither
        waveColor={[0.5, 0.5, 0.5]}
        disableAnimation={false}
        enableMouseInteraction={true}
        mouseRadius={0.3}
        colorNum={4}
        waveAmplitude={0.3}
        waveFrequency={3}
        waveSpeed={0.05}
      />
    )
  )
}
