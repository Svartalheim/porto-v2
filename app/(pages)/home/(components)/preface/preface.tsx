import { cn } from '~/lib/utils'
import styles from './preface.module.css'

const text = [
  `Hi, I'm [Your Name], a passionate frontend engineer with a love for crafting beautiful, user-friendly web experiences. My journey into the world of coding began [briefly describe your origin story, e.g., 'when I built my first website in high school' or 'after transitioning from a different field']. Since then, I've been hooked on turning ideas into interactive, pixel-perfect realities.`,
  `I believe that great design and seamless functionality go hand in hand. My approach to frontend development revolves around creating intuitive interfaces, writing clean and maintainable code, and ensuring optimal performance across devices. I specialize in [list key technologies, e.g., React, JavaScript, CSS, etc.], and I'm always eager to learn and adapt to new challenges.`,
  `Take a look around to see some of my favorite projects, and feel free to reach out if you'd like to collaborate or just chat about all things web development!`,
]

const text2 = [
  `Hello, I'm Svartalheim. A web developer mostly develop on front-end side.`,
  `Presently engaged as a front-end web developer operating on a fulltime basis for Indonesian company.`,
]

export default function Preface() {
  return (
    <div
      className={cn(
        'design-grid col-start-1 dt:col-start-5 col-span-full spx-40 dt:spx-0',
        styles.designGrid
      )}
    >
      <h3 className="col-span-full dt:col-span-3">PREFACE</h3>
      <div className="col-span-7 flex gap-[var(--gap)] flex-col flex-wrap">
        {text2.map((item) => {
          return <p key={item}>{item}</p>
        })}
      </div>
    </div>
  )
}
