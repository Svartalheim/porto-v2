import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
const barCount = [1, 2, 3, 4, 5, 6, 7, 8];

export default function SlideBarsAnimation() {
  const barsRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const isDarkRef = useRef(true); // track current mode
  const [isDark, setIsDark] = useState(true); // for initial render only

  useGSAP(() => {
    const bars = barsRef?.current?.children;
    if (!bars) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
      onRepeat: () => {
        // Toggle synchronously using ref
        isDarkRef.current = !isDarkRef.current;

        // Apply new styles immediately
        gsap.set('.bar-container', {
          backgroundColor: isDarkRef.current ? 'black' : 'white',
        });

        gsap.set('.bar', {
          backgroundColor: isDarkRef.current ? 'white' : 'black',
        });

        // Optional: update state if needed elsewhere in component
        setIsDark(isDarkRef.current);
      },
    });

    tlRef.current = tl;

    tl.to(bars, {
      width: '0%',
      stagger: 0.1,
      duration: 1,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);
  // Update colors when isDark changes
  useEffect(() => {
    if (!barsRef.current) return;

    // Update container background
    gsap.set('.bar-container', { backgroundColor: isDark ? 'black' : 'white' });

    // Update bars background
    gsap.set('.bar', {
      backgroundColor: isDark ? 'white' : 'black',
    });
  }, [isDark]);

  return (
    <div
      ref={barsRef}
      className='bar-container w-full h-screen relative overflow-hidden'
      style={{ backgroundColor: isDark ? 'black' : 'white' }}
    >
      {barCount.map((item) => (
        <div
          key={item}
          className='bar absolute'
          style={{
            backgroundColor: isDark ? 'white' : 'black',
            height: `calc(100vh + 2px / ${barCount.length})`,
            top: `calc(${(item - 1) * (100 / barCount.length)}%)`,
            width: '100%',
          }}
        />
      ))}
    </div>
  );
}
