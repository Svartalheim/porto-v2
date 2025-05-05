'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { BottomBar } from '~/components/bottom-bar/bottom-bar';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function VideoScrollReveal() {
  const containerRef = useRef();
  const videoRef = useRef();
  const overlayRef = useRef();

  useGSAP(() => {
    const trigger = containerRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const viewportHeight = window.innerHeight;

    // Animate video upward
    gsap.fromTo(
      video,
      { y: 0 },
      {
        y: -viewportHeight * 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top top',
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      }
    );

    // Animate dark overlay
    gsap.fromTo(
      overlay,
      { opacity: 0.1 },
      {
        opacity: 0.7,
        ease: 'none',
        scrollTrigger: {
          trigger: '#smooth-content', // NOT the pinned section
          start: 'top top',
          //   end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div id='smooth-wrapper'>
      <div id='smooth-content'>
        <section ref={containerRef} className='video-container'>
          <video
            ref={videoRef}
            className='bg-video'
            src='/video/frieren.mp4'
            autoPlay
            muted
            loop
            playsInline
          />
          <div className='video-overlay' ref={overlayRef} />
        </section>

        <section className='content-section'>
          <div className='inner-content'>
            <h1>Scroll Into View 🤟🤟🤟</h1>
            <p>This content scrolls over the pinned video background.</p>
          </div>
        </section>
      </div>
      <BottomBar />
      <style jsx>{`
        #smooth-wrapper {
          height: 100%;
          overflow: hidden;
        }

        #smooth-content {
          will-change: transform;
        }

        .video-container {
          height: 100vh;
          position: relative;
          overflow: hidden;
        }

        .bg-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
          z-index: 2;
          pointer-events: none;
        }

        .content-section {
          position: relative;
          z-index: 3;
          background: white;
          min-height: 100vh;
        }

        .inner-content {
          max-width: 800px;
          margin: auto;
          padding: 5rem 2rem;
        }
      `}</style>
    </div>
  );
}
