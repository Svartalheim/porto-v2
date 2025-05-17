'use client'

/**
 * ScrambleFadeText Component
 *
 * A highly customizable text animation component that combines:
 * - Character-by-character fade-in animations
 * - Text scrambling effects
 * - Directional animations (top, bottom, left, right)
 * - Staggered animations with multiple patterns
 * - Color transitions
 * - Hover effects
 * - Scroll-triggered animations
 * - Multiline text support
 *
 * This component uses GSAP's SplitText and ScrambleTextPlugin to create
 * dynamic text reveal animations that can be configured in many ways.
 */

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useCallback, useEffect, useRef, useState } from 'react'

// Register the plugins
gsap.registerPlugin(ScrambleTextPlugin, SplitText, ScrollTrigger)

/**
 * Props for the ScrambleFadeTextGroup component
 *
 * @param {string} text - Text content to animate
 * @param {number} duration - Base duration of the animation in seconds
 * @param {number} delay - Initial delay before animation starts
 * @param {number} repeatDelay - Time to wait before repeating the animation
 * @param {string} scrambleChars - Characters to use for the scramble effect
 * @param {string} className - Additional CSS class names
 * @param {number} charsPerGroup - Number of characters to animate as a group
 * @param {number} scrambleSpeed - Speed of the scramble effect (0.1 - 1.0)
 * @param {number} fadeDistance - Distance in pixels for the fade animation
 * @param {string} ease - GSAP easing function to use
 * @param {boolean} reverseOnRepeat - Whether to reverse the animation when repeating
 * @param {string} direction - Direction of the animation ("bottom", "top", "left", "right")
 * @param {string} staggerDirection - Direction of stagger effect ("forward", "reverse", "center", "edges", "random")
 * @param {boolean} multiline - Whether to treat text as multiline
 * @param {number} lineDelay - Delay between lines for multiline animations
 * @param {boolean} hoverEffect - Whether to enable hover interactions
 * @param {number} hoverScale - Scale factor for hover effect
 * @param {boolean} colorTransition - Whether to animate text color
 * @param {string} startColor - Starting color for text (hex format)
 * @param {string} endColor - Ending color for text (hex format)
 * @param {boolean} scrollTriggered - Whether to trigger animation on scroll
 * @param {number} debounceResize - Milliseconds to debounce window resize events (0 to disable)
 * @param {Function} onAnimationComplete - Callback function when animation completes
 */
export default function ScrambleFadeTextGroup({
  text = 'This text will scramble and fade in',
  duration = 1,
  delay = 0.5,
  repeatDelay = 1,
  scrambleChars = '!@#$%^&*()_+1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  className = '',
  charsPerGroup = 1,
  scrambleSpeed = 0.3,
  fadeDistance = 40,
  ease = 'power2.out',
  reverseOnRepeat = false,
  direction = 'top',
  staggerDirection = 'forward',
  multiline = false,
  lineDelay = 0.2,
  hoverEffect = false,
  hoverScale = 1.05,
  colorTransition = false,
  startColor = '#ffffff',
  endColor = '#ff3e00',
  scrollTriggered = false,
  debounceResize = 150,
  onAnimationComplete = () => {},
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const splitTextRef = useRef<SplitText | null>(null)

  // References for animations
  const hoverTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const mainTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [, forceUpdate] = useState({})

  // Debounced resize handler
  const handleResize = useCallback(() => {
    if (debounceResize <= 0) return

    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current)
    }

    resizeTimeoutRef.current = setTimeout(() => {
      // Force re-render to rebuild animation
      forceUpdate({})
    }, debounceResize)
  }, [debounceResize])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      splitTextRef.current?.revert()
      hoverTimelineRef.current?.kill()
      mainTimelineRef.current?.kill()

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [])

  // Handle window resize
  useEffect(() => {
    if (debounceResize <= 0) return

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [debounceResize, handleResize])

  useGSAP(() => {
    if (!containerRef.current) return

    // Revert old split text
    splitTextRef.current?.revert()

    // split elements with the class "split" into words and characters
    // If multiline, we need to handle each line separately
    const selector = multiline ? '.split-text-line' : '.split-text'
    const split = SplitText.create(selector, {
      type: 'words, chars',
      wordsClass: 'word-wrap !block',
      charsClass: 'char-wrap',
    })

    // Group characters and words for cascade effect
    const chars = split.chars
    const words = split.words
    const lines = split.lines
    // Set direction properties
    const directionProps = {
      x: 0,
      y: 0,
    }

    if (direction === 'bottom') {
      directionProps.y = fadeDistance
    } else if (direction === 'top') {
      directionProps.y = -fadeDistance
    } else if (direction === 'left') {
      directionProps.x = -fadeDistance
    } else if (direction === 'right') {
      directionProps.x = fadeDistance
    }

    // Create timeline options
    const timelineOptions: gsap.TimelineVars = {
      repeat: scrollTriggered ? 0 : -1, // No repeat for scroll triggered animations
      repeatDelay: repeatDelay,
      yoyo: reverseOnRepeat,
      onRepeat: () => {
        // Only reset if not using yoyo/reverse
        if (!reverseOnRepeat) {
          gsap.set([chars, words], { clearProps: 'all' })
        }
      },
    }

    // Add scroll trigger if enabled
    if (scrollTriggered) {
      timelineOptions.scrollTrigger = {
        trigger: containerRef.current,
        start: 'top bottom-=100',
        end: 'bottom top+=100',
        toggleActions: 'play none none reverse',
      }
    }

    // Create a timeline for better control
    const tl = gsap.timeline({
      ...timelineOptions,
      onComplete: onAnimationComplete,
    })

    // Store timeline for cleanup and external control
    mainTimelineRef.current = tl

    // tl.from(
    //   containerRef.current,
    //   {
    //     x: directionProps.x * 0.5,
    //     y: directionProps.y * 0.5,
    //     opacity: 0,
    //     duration: duration * 0.4, // Slightly faster than the text animation
    //     ease: ease,
    //   },
    //   '<'
    // );

    const staggerAmount = 0.03 * charsPerGroup

    // Set up stagger value based on direction
    const staggerFrom =
      staggerDirection === 'reverse'
        ? 'end'
        : staggerDirection === 'center'
          ? 'center'
          : staggerDirection === 'edges'
            ? 'edges'
            : staggerDirection === 'random'
              ? 'random'
              : 'start'

    // For TypeScript compatibility with GSAP's stagger types
    const staggerConfig = {
      amount: staggerAmount,
      from: staggerFrom as
        | 'start'
        | 'end'
        | 'center'
        | 'edges'
        | 'random'
        | number
        | [number, number],
    }

    // // First add word-by-word fade-in animation for domino effect
    // tl.from(
    //   words,
    //   {
    //     duration: duration * 0.1,
    //     opacity: 0,
    //     stagger: staggerAmount * 2,
    //     ease: ease,
    //   },
    //   '<'
    // );

    // // Then add character-level fade animation with slight overlap
    // tl.from(
    //   chars,
    //   {
    //     duration: duration * 0.2, // faster than scramble
    //     x: directionProps.x,
    //     y: directionProps.y,
    //     opacity: 0,
    //     stagger: staggerConfig,
    //     ease: 'power1.inOut',
    //   },
    //   '<0.05' // starts slightly after word fade
    // );

    // Finally add the scramble effect with a slight overlap
    tl.to(
      '.split-text',
      {
        duration: duration * 0.1,
        scrambleText: {
          text: '{original}',
          chars: scrambleChars,
          speed: scrambleSpeed,
          revealDelay: 2,
        },
        stagger: staggerConfig,
      },
      '<0.1'
    )
    // // Add color transition if enabled
    // if (colorTransition) {
    //   tl.to(
    //     chars,
    //     {
    //       color: endColor,
    //       duration: duration * 1.2,
    //       stagger: staggerConfig,
    //       ease: 'power1.inOut',
    //     },
    //     '<0.2'
    //   );
    // }
  }, [
    text,
    duration,
    delay,
    repeatDelay,
    scrambleChars,
    charsPerGroup,
    scrambleSpeed,
    fadeDistance,
    ease,
    reverseOnRepeat,
    direction,
    staggerDirection,
    multiline,
    lineDelay,
    colorTransition,
    endColor,
    scrollTriggered,
    onAnimationComplete,
  ])

  // Process text for multiline display if needed
  const processedText = multiline
    ? text.split('\n').map((line, i) => (
        <div
          key={`line-${i}-${line.substring(0, 5)}`}
          className="split-text-line inline-block"
        >
          {line}
        </div>
      ))
    : text

  // Setup hover effects
  useEffect(() => {
    if (!hoverEffect || !containerRef.current) return

    // Create a timeline for hover effect
    const hoverTl = gsap.timeline({ paused: true })
    hoverTl.to(containerRef.current, {
      scale: hoverScale,
      duration: 0.3,
      ease: 'power2.out',
    })

    // Store timeline for cleanup
    hoverTimelineRef.current = hoverTl

    // Add event listeners
    const element = containerRef.current
    const onMouseEnter = () => hoverTl.play()
    const onMouseLeave = () => hoverTl.reverse()

    element.addEventListener('mouseenter', onMouseEnter)
    element.addEventListener('mouseleave', onMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter)
      element.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [hoverEffect, hoverScale])

  return (
    <div
      className={`scramble-fade-container ${className}`}
      style={{ cursor: hoverEffect ? 'pointer' : 'default' }}
    >
      <div
        ref={containerRef}
        className="split-text"
        style={colorTransition ? { color: startColor } : undefined}
      >
        {processedText}
      </div>
    </div>
  )
}
