'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { SplitText } from 'gsap/SplitText'
import { useEffect, useRef } from 'react'

// Register required plugins
gsap.registerPlugin(ScrambleTextPlugin, SplitText)

export default function ScrambleFadeText({
  text = 'This text will scramble and fade in',
  duration = 0.1, // Reduced from 0.1
  delay = 0.2, // Reduced from 0.5
  repeatDelay = 2, // Time in seconds before repeating animation (0 = no repeat)
  scrambleChars = '!@#$%^&*()_+1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  className = '',
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const splitTextRef = useRef<SplitText | null>(null)

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }

      if (splitTextRef.current) {
        splitTextRef.current.revert()
      }
    }
  }, [])

  useGSAP(() => {
    if (!containerRef.current) return

    // Clean up any existing animations
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    if (splitTextRef.current) {
      splitTextRef.current.revert()
    }

    // Create content with line breaks
    containerRef.current.innerHTML = text.split('\n').join('<br />')

    // Use SplitText to split text by lines and characters
    splitTextRef.current = new SplitText(containerRef.current, {
      type: 'lines,chars',
      linesClass: 'split-line',
    })

    const { lines, chars } = splitTextRef.current

    // Set initial state - all hidden
    gsap.set(lines, { overflow: 'hidden', opacity: 0 })
    gsap.set(chars, { opacity: 0, y: 20 })

    // Create a timeline
    const tl = gsap.timeline({
      repeat: repeatDelay > 0 ? -1 : 0,
      repeatDelay: repeatDelay,
      onRepeat: () => {
        // Reset for next iteration
        gsap.set(lines, { opacity: 0 })
        gsap.set(chars, { opacity: 0, y: 20 })
      },
    })

    // Store the timeline
    timelineRef.current = tl

    // Reveal lines
    tl.to(lines, {
      opacity: 1,
      duration: 0.3, // Faster line reveal
      stagger: 0.05, // Quicker staggering between lines
      ease: 'power2.out',
      delay,
    })

    // Animate chars with scramble effect
    lines.forEach((line, index) => {
      const lineChars = splitTextRef.current!.chars.filter(
        (char) => char.parentElement === line || char.parentNode === line
      )

      // First fade in from bottom with staggered timing and simultaneous scramble
      const fadeInDuration = duration // Reduced from 0.5
      const staggerDelay = 0 // Reduced from 0.02

      // Process each character separately to coordinate animations
      lineChars.forEach((char, charIndex) => {
        const originalText = char.textContent || ''

        // Skip empty characters
        if (originalText.trim() === '') {
          // Just fade in spaces
          tl.to(
            char,
            {
              opacity: 1,
              y: 0,
              duration: fadeInDuration,
              ease: 'back.out',
            },
            `-=${duration / 8}`
          )
          return
        }

        // Create a position for this character's animation that creates a staggered effect
        const charPosition = `-=${duration / 8}+=${charIndex * staggerDelay}`

        // Simultaneous animations but with different durations
        // Fading from bottom animation - make this faster
        tl.to(
          char,
          {
            opacity: 1,
            y: 0,
            duration: fadeInDuration, // 30% faster than the scramble
            ease: 'power2.out', // Changed from back.out for smoother fade
          },
          charPosition
        )

        // Start scramble at the same time, but make it last longer than the fade
        tl.to(
          char,
          {
            duration: 10, // Keep original duration for scramble
            scrambleText: {
              text: originalText,
              chars: scrambleChars,
              tweenLength: true,

              speed: 0.1, // Slowed down to make scramble more visible
            },
            ease: 'none',
            // delay: 0.1, // Delay to start scramble after fade-in
          },
          charPosition // Same position to run in parallel
        )
      })
    })
  }, [text, duration, delay, scrambleChars, repeatDelay])

  return (
    <div className={`scramble-fade-container ${className}`}>
      <div ref={containerRef} className="scramble-text-wrapper gsap-text" />
    </div>
  )
}
