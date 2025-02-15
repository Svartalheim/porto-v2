import { Wrapper } from '../(components)/wrapper'
import HeroPage from './(components)/hero'

export default function Home() {
  return (
    <Wrapper
      theme="dark"
      className="!design-grid grid-flow-row font-mono"
      lenis={{}}
    >
      {/* content  */}
      <HeroPage />
    </Wrapper>
  )
}
