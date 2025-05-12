'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useRef } from 'react';

// Register required plugins
gsap.registerPlugin(ScrambleTextPlugin, SplitText);

export default function ScrambleFadeText({
  text = 'This text will scramble and fade in',
  duration = 2.5,
  delay = 0.5,
  repeatDelay = 2, // Time in seconds before repeating animation (0 = no repeat)
  scrambleChars = '!@#$%^&*()_+1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  className = '',
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const splitTextRef = useRef<SplitText | null>(null);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
    };
  }, []);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Clean up any existing animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    if (splitTextRef.current) {
      splitTextRef.current.revert();
    }

    // Create content with line breaks
    containerRef.current.innerHTML = text.split('\n').join('<br />');

    // Use SplitText to split text by lines and characters
    splitTextRef.current = new SplitText(containerRef.current, {
      type: 'lines,chars',
      linesClass: 'split-line',
    });

    const { lines, chars } = splitTextRef.current;

    // Set initial state - all hidden
    gsap.set(lines, { overflow: 'hidden', opacity: 0 });
    gsap.set(chars, { opacity: 0, y: 20 });

    // Create a timeline
    const tl = gsap.timeline({
      repeat: repeatDelay > 0 ? -1 : 0,
      repeatDelay: repeatDelay,
      onRepeat: () => {
        // Reset for next iteration
        gsap.set(lines, { opacity: 0 });
        gsap.set(chars, { opacity: 0, y: 20 });
      },
    });

    // Store the timeline
    timelineRef.current = tl;

    // Reveal lines
    tl.to(lines, {
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      delay,
    });

    // Animate chars with scramble effect
    lines.forEach((line, index) => {
      const lineChars = splitTextRef.current!.chars.filter(
        (char) => char.parentElement === line || char.parentNode === line
      );

      // First fade in from bottom
      tl.to(
        lineChars,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.02,
          ease: 'back.out',
        },
        `-=${duration / 4}`
      );

      // Then apply scramble effect
      // biome-ignore lint/complexity/noForEach: <explanation>
      lineChars.forEach((char) => {
        // Get the original text content
        const originalText = char.textContent || '';

        // Only apply scramble to non-space characters
        if (originalText.trim() !== '') {
          tl.to(
            char,
            {
              duration: 5,
              scrambleText: originalText,
              ease: 'none',
            },
            '<0.1'
          );
        }
      });
    });
  }, [text, duration, delay, scrambleChars, repeatDelay]);

  return (
    <div className={`scramble-fade-container ${className}`}>
      <div ref={containerRef} className='scramble-text-wrapper gsap-text' />
    </div>
  );
}
