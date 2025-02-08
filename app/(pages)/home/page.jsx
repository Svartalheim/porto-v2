import { Wrapper } from '../(components)/wrapper'

export default function Home() {
  return (
    <Wrapper theme="white" className="!design-grid grid-flow-row" lenis={{}}>
      {/* content  */}
      <div className="design-grid col-start-5 col-span-8 ">
        <h1 className="col-span-full h1-alt italic -stracking-10 font-yipes">
          WELCOME
        </h1>
      </div>
      <div className="h-[100vh]">hell o</div>
    </Wrapper>
  )
}
