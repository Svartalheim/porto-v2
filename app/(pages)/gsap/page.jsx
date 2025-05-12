'use client'

import { useGSAP } from '@gsap/react'
// import { IconChevronDown } from '@tabler/icons-react';
import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import ScrambleFadeTextGroup from './(components)/scramble-fade-text-simple'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

export default function GsapButton() {
  const wrapperRef = useRef()
  const contentRef = useRef()
  const buttonRef = useRef()
  const titleRef = useRef()

  useGSAP(() => {
    const title = titleRef.current
    const viewportHeight = window.innerHeight

    ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 1.25,
      effects: true,
    })

    // gsap.fromTo(
    //   title,
    //   { y: 0 },
    //   {
    //     y: -viewportHeight * 0.5,
    //     ease: 'power2.inOut',
    //     scrollTrigger: {
    //       trigger: '.good',
    //       start: 'top top',
    //       scrub: true,
    //       pin: true,
    //       pinSpacing: false,
    //     },
    //   }
    // );
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return (
    <div ref={wrapperRef} className="overflow-hidden">
      {/* <Navigation /> */}
      <div ref={contentRef}>
        {/* <div className='good  '>
          <div ref={titleRef} className='w-screen relative h-screen bg-black'>
            <Threads
              amplitude={0.6}
              distance={0.3}
              color={[255, 255, 255]}
              enableMouseInteraction={true}
              className={'z-50'}
            />

            <HelperBar />
            <ChevronDown
              className='absolute z-[60] top-[85vh] left-1/2 -translate-x-1/2  animate-bounce text-white'
              size={48}
            />
            <div className='absolute h-screen w-[80vw] left-1/2 -translate-x-1/2 top-0'>
              <TextPressure
                text='Welcome to my creative space!'
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
                minFontSize={80}
              />
            </div>
          </div>
        </div> */}
        {/* <div className='h-screen bg-white'> */}
        <div className="w-screen min-h-screen flex spy-80 justify-center items-center">
          <div className="flex flex-col w-full h-full font-semibold sleading-70 my-auto sgap-100 items-center spx-100">
            <h1 className="text-4xl font-bold mb-10">
              Text Animation Showcase
            </h1>
            <p className="text-xl mb-16 max-w-2xl text-center">
              Demonstrating advanced text animations with GSAP. Features include
              scrambling effects, staggered reveals, hover effects, and
              scroll-triggered animations.
            </p>
            <ScrambleFadeTextGroup
              className="stext-60 min-w-[700px] -smt-40 "
              text={'Svartalheim\nFrontend\nEngineer\n©2025'}
              duration={0.8}
              charsPerGroup={1}
              repeatDelay={1}
              scrambleSpeed={0.4}
              fadeDistance={50}
              ease="power3.out"
              direction="top"
              // staggerDirection='random'
              multiline={true}

              // lineDelay={0.2}
            />

            {/* <ScrambleFadeTextGroup
              className='stext-60 sw-340 sh-300 justify-center items-center'
              text='Creative\nDeveloper'
              duration={0.5}
              charsPerGroup={1}
              repeatDelay={5}
              scrambleSpeed={0.6}
              fadeDistance={60}
              ease='back.out(1.7)'
              direction='left'
              staggerDirection='edges'
              multiline={true}
              lineDelay={0.3}
              reverseOnRepeat={true}
              colorTransition={true}
              startColor='#ffffff'
              endColor='#ff3e00'
              hoverEffect={true}
              hoverScale={1.08}
            />

            <ScrambleFadeTextGroup
              className='stext-60 sw-340 sh-300 justify-center items-center'
              text='Scroll\nTriggered\nAnimation'
              duration={1.0}
              charsPerGroup={3}
              scrambleSpeed={0.5}
              fadeDistance={80}
              ease='elastic.out(1, 0.3)'
              direction='right'
              staggerDirection='random'
              multiline={true}
              lineDelay={0.3}
              colorTransition={true}
              startColor='#ffffff'
              endColor='#00ffcc'
              scrollTriggered={true}
            /> */}

            <div className="text-center mt-36 mb-20 w-full max-w-2xl">
              <p className="text-lg mb-6">
                Scroll down to see more animation effects, including
                scroll-triggered animations that activate as you view them.
              </p>
              <p className="text-sm opacity-70">
                All animations utilize GSAP with SplitText and
                ScrambleTextPlugin for optimal performance.
              </p>
            </div>
            {/* <ScrambleFadeTextGroup
              className='stext-60 sw-340 justify-center items-center'
              text={`Creative Developer\nUI Animation Specialist`}
              duration={0.1}
              charsPerGroup={1}
              delay={0.4}
              repeatDelay={3}
            />
            <ScrambleFadeTextGroup
              className='stext-60 sw-340 justify-center items-center'
              text='GSAP • React • Three.js'
              duration={0.12}
              charsPerGroup={1}
              delay={0.8}
              repeatDelay={3}
            /> */}
          </div>
        </div>
        {/* <SlideBarsAnimation /> */}
        {/* </div> */}
        {/* <VideoScrollReveal /> */}
      </div>
    </div>
  )
}
