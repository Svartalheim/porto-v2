'use client';

import { useGSAP } from '@gsap/react';
// import { IconChevronDown } from '@tabler/icons-react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Threads from '~/backgrounds/threads/bg-threads';
import TextPressure from '~/components/text-pressure/text-pressure';
import HelperBar from './(components)/helper-bar';
import VideoScrollReveal from './(components)/scroll-trigger';

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export default function GsapButton() {
  const wrapperRef = useRef();
  const contentRef = useRef();
  const buttonRef = useRef();
  const titleRef = useRef();

  useGSAP(() => {
    const title = titleRef.current;
    const viewportHeight = window.innerHeight;

    ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.25,
      effects: true,
    });

    gsap.fromTo(
      title,
      { y: 0 },
      {
        y: -viewportHeight * 0.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.good',
          start: 'top top',
          scrub: true,
          pin: true,
          pinSpacing: false,
        },
      }
    );
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <div ref={wrapperRef} className='overflow-hidden'>
      <div ref={contentRef}>
        <div className='good  '>
          <div ref={titleRef} className='w-screen relative h-screen bg-black'>
            <Threads
              amplitude={0.7}
              distance={0.2}
              color={[255, 255, 255]}
              enableMouseInteraction={true}
              className={'z-50'}
            />
            {/* {rendered ? (
              <Dither
                waveColor={[0.5, 0.5, 0.5]}
                disableAnimation={false}
                enableMouseInteraction={true}
                mouseRadius={0.3}
                colorNum={4}
                waveAmplitude={0.3}
                waveFrequency={3}
                waveSpeed={0.05}
                className={'z-50 -pt-20'}
              />
            ) : (
              <></>
            )} */}
            <HelperBar />
            <ChevronDown
              className='absolute z-[60] top-[85vh] left-1/2 -translate-x-1/2  animate-bounce text-white'
              size={48}
            />
            <div className='absolute h-screen w-[80vw] left-1/2 -translate-x-1/2 top-0'>
              <TextPressure
                text='SVARTALHEIM.dev'
                flex={true}
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={true}
                className='absolute top-0 w-full h-full flex items-center'
                // className='z-50 flex grow items-center h-full flex-1 min-w-screen !text-black justify-center'
                fontUrl='/fonts/ServerMono/ServerMono-Regular.woff2'
                textColor='#ffffff'
                strokeColor='#ff0000'
                minFontSize={60}
              />
            </div>
          </div>
        </div>
        <VideoScrollReveal />
      </div>
    </div>
  );
}
