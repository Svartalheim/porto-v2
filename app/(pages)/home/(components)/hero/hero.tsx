import { cn } from '~/lib/utils'
import styles from './hero.module.css'
export default function HeroPage() {
  return (
    <>
      <div
        className={cn(
          'design-grid h-fit col-start-1 dt:col-start-5 col-span-full smy-60 dt:smy-100 text-[var(--theme-contrast)]',
          styles.designGrid
        )}
      >
        <h1 className="col-span-full text-right ">
          <span className="font-apple">/</span>INFO
        </h1>
        <h1 className="sml-36 dt:text-center !font-normal col-span-full italic font-yipes">
          Welcome
        </h1>
        <h1 className="col-span-full">TO SVARTAL</h1>
        <div className="sml-36 flex dt:flex-row flex-col justify-between col-span-full col-start-2 dt:col-start-5 ">
          <h1 className="col-span-full">HEIM.DEV</h1>
          <h1 className={cn(styles.arrow, 'sml-40 dt:sml-0')}>↓</h1>
        </div>
      </div>
    </>
  )
}
