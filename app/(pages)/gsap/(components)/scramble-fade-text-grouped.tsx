'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useRef } from 'react';

// Register required plugins
gsap.registerPlugin(ScrambleTextPlugin, SplitText);

export default function ScrambleFadeTextGroup({
  text = 'This text will scramble and fade in',
  duration = 0.1, // Controls the fade-in speed
  delay = 0.2, // Initial delay before animation starts
  repeatDelay = 2, // Time in seconds before repeating animation (0 = no repeat)
  scrambleChars = '!@#$%^&*()_+1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  className = '',
  charsPerGroup = 1, // Set to 1 for single character animation (recommended for cascade effect)
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

    // First split by words to prevent breaking words
    const wordSplit = new SplitText(containerRef.current, {
      type: 'words',
      wordsClass: 'word-split',
    });

    // Create the main timeline
    const tl = gsap.timeline({
      repeat: repeatDelay > 0 ? -1 : 0,
      repeatDelay: repeatDelay,
      onRepeat: () => {
        gsap.set(containerRef.current, { opacity: 0 });
        setTimeout(() => {
          gsap.set(containerRef.current, { opacity: 1 });
        }, 100);
      },
    });

    // Store the timeline
    timelineRef.current = tl;

    // Create char groups from words
    const words = wordSplit.words;
    const charGroups: HTMLSpanElement[] = [];

    // biome-ignore lint/complexity/noForEach: <explanation>
    words.forEach((word) => {
      // Create a temporary span to hold this word for further splitting
      const tempSpan = document.createElement('span');
      tempSpan.style.display = 'inline-block'; // Ensure it behaves like inline-block
      tempSpan.innerHTML = word.textContent || '';

      // Replace the original word with our container
      word.innerHTML = '';
      word.appendChild(tempSpan);

      // Split this word into characters
      const charSplit = new SplitText(tempSpan, {
        type: 'chars',
        charsClass: 'char-split',
      });

      const chars = charSplit.chars;

      // Group chars in specified chunks
      for (let i = 0; i < chars.length; i += charsPerGroup) {
        // Create a group container
        const groupSpan = document.createElement('span');
        groupSpan.style.display = 'inline-block';
        groupSpan.className = 'char-group';

        // Get text content for this group
        const groupText = chars
          .slice(i, i + charsPerGroup)
          .map((c) => c.textContent)
          .join('');

        groupSpan.textContent = groupText;

        // Replace the original characters with our group
        for (let j = i; j < i + charsPerGroup && j < chars.length; j++) {
          (chars[j] as HTMLElement).style.display = 'none';
        }

        tempSpan.appendChild(groupSpan);
        charGroups.push(groupSpan);
      }
    });

    // Set initial state for all groups
    gsap.set(charGroups, {
      opacity: 0,
      y: 20,
    });

    // Delay before starting
    tl.set({}, {}, delay);

    // Animate with a cascading scramble effect
    const fadeInDuration = duration;
    const scrambleDuration = duration * 10; // Long enough for multiple characters to be scrambling simultaneously
    const staggerDelay = 0.03; // Controls the cascade timing

    // Process each character group in sequence, creating a cascade effect
    charGroups.forEach((group, index) => {
      const groupText = group.textContent || '';
      if (!groupText.trim()) return; // Skip empty groups

      // Position for this group - staggered entry
      const startPosition = index === 0 ? 0 : `>-=${staggerDelay * 2}`;

      // Start by fading in this group
      tl.to(
        group,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        }
        // startPosition
      );

      //   // Immediately start scrambling this group (as it's fading in)
      tl.to(
        group,
        {
          duration: 0.01,
          scrambleText: {
            text: groupText,
            chars: scrambleChars,
            speed: 1, // Slower speed means longer scrambling effect
            // revealDelay: fadeInDuration * 2, // Wait a bit before revealing the final text
          },
          ease: 'none',
        },
        `<0`
        // Start scrambling at same time as fade-in
        //   startPosition
      );
    });
  }, [text, duration, delay, scrambleChars, repeatDelay, charsPerGroup]);

  return (
    <div className={`scramble-fade-container ${className}`}>
      <div ref={containerRef} className='scramble-text-wrapper gsap-text' />
    </div>
  );
}
