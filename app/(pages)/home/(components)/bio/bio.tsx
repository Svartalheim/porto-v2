import RotatingTextWrapper from '~/components/rotating-text/rotating-text-wrapper'
import ScrollReveal from '~/components/scroll-reveal/scroll-reveal'
import { cn } from '~/lib/utils'
import styles from './bio.module.css'

export default function Bio() {
  return (
    <div
      className={cn(
        'design-grid col-start-1 smy-40 dt:col-start-5 col-span-full dt:spx-0',
        styles.designGrid
      )}
    >
      <div className="col-span-full ">
        <h1 className="text-contrast ">MY BIOGRAPHY </h1>
        <ScrollReveal
          baseOpacity={0.2}
          enableBlur={true}
          baseRotation={0}
          blurStrength={10}
          textClassName="h2 stext-32 dt:stext-20 sleading-16 dt:sleading-48 uppercase"
        >
          I'm a self-taught frontend engineer with 2+ years of experience
          building responsive and accessible web applications plus a backend
          junior. I specialize in React and have a keen eye for designing
          pixel-perfect website. When I'm not coding, I enjoy researching and
          exploring new technologies. Over the past two years, I've ventured
          into the world of web development. My journey in web development has
          been fueled by a relentless curiosity and a drive for continuous
          learning.
        </ScrollReveal>
        <div className="flex sgap-10 smy-40  justify-center dt:justify-start items-center transition-transform duration-500">
          <p className="stext-16 dt:stext-40 -stracking-2 dt:-stracking-4">
            LET'S CREATE SOMETHING
          </p>
          <RotatingTextWrapper
            texts={['Sigma', 'Stunning', 'Goated', 'Outstanding']}
            className="overflow-hidden stext-10 dt:stext-40 srounded-10 py-2 px-4 flex items-center justify-center bg-[rgba(var(--rgb-theme-contrast),1)]"
            mainClassName="p-4"
            staggerFrom={'last'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%', opacity: 0 }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden sm:pb-1 md:pb-1"
            rotationInterval={2000}
          />
        </div>
      </div>
    </div>
  )
}
