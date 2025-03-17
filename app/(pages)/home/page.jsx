import { Wrapper } from '../(components)/wrapper'
import Bio from './(components)/bio/bio'
import HeroPage from './(components)/hero/hero'
import Preface from './(components)/preface/preface'

export default function Home() {
  return (
    <Wrapper
      theme="dark"
      className="!design-grid grid-flow-row font-mono"
      lenis={{ lerp: 0.1, smoothWheel: true }}
    >
      {/* content  */}
      <HeroPage />
      <Preface />
      <Bio />
    </Wrapper>
  )
}
