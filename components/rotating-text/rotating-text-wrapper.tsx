'use client'
import { motion } from 'framer-motion'
import { forwardRef, useEffect, useRef, useState } from 'react'
import RotatingText, {
  type RotatingTextProps,
  type RotatingTextRef,
} from './rotating-text'

const RotatingTextWrapper = forwardRef<RotatingTextRef, RotatingTextProps>(
  ({ texts, ...props }, ref) => {
    const textRef = useRef<HTMLDivElement | null>(null)
    const [width, setWidth] = useState<number | 'auto'>('auto')
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    // Measure width when text changes
    useEffect(() => {
      if (textRef.current) {
        setWidth(textRef.current.offsetWidth) // Get width of new text
      }
    }, [currentIndex]) // Depend on index instead of texts array

    return (
      <motion.div
        className="relative inline-block"
        animate={{ width }} // Animate width smoothly
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {/* Hidden div to measure text width dynamically */}
        <div
          ref={textRef}
          className="absolute top-0 left-0 p-2 opacity-0 whitespace-nowrap pointer-events-none"
        >
          {texts[currentIndex]} {/* Get the currently displayed text */}
        </div>

        {/* RotatingText Component */}
        <RotatingText
          ref={ref}
          texts={texts}
          {...props}
          onNext={(index) => setCurrentIndex(index)} // Track current text index
        />
      </motion.div>
    )
  }
)

RotatingTextWrapper.displayName = 'RotatingTextWrapper'
export default RotatingTextWrapper
