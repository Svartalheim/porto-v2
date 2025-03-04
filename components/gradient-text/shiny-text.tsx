import type React from 'react'
import { useEffect, useState } from 'react'
import { cn } from '~/lib/utils'
import styles from './shiny-text.module.css'

interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = '',
}) => {
  const [animationDuration, setAnimationDuration] = useState('5s')

  useEffect(() => {
    setAnimationDuration(`${speed}s`) // Ensure the same duration on both SSR & Client
  }, [speed])

  return (
    <div
      className={cn(
        `text-opacity-60 bg-clip-text inline-block ${className}`,
        styles['shiny-text']
      )}
      style={{
        backgroundImage:
          'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        // WebkitTextFillColor: 'transparent', // ADD THIS

        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
      }}
    >
      {text}
    </div>
  )
}

export default ShinyText
