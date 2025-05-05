import { Wrapper } from '../(components)/wrapper'

export default function TestPage() {
  return (
    <Wrapper
      theme="dark"
      className="!design-grid grid-flow-row font-mono !bg-amber-400 "
      lenis={{ lerp: 0.1, smoothWheel: true }}
    >
      {/* content  */}
      asdasdas
      <div className="h-[300vh] ">s</div>
    </Wrapper>
  )
}
