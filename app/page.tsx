import Squares from '~/backgrounds/squares/square-background'
import TextPressure from '~/components/text-pressure/text-pressure'
import { Wrapper } from './(pages)/(components)/wrapper'

export default function MainPage() {
  return (
    <Wrapper
      theme="dark"
      className=" !font-mono design-grid items-center justify-center relative"
      lenis={{ lerp: 0.1 }}
    >
      {/* <div style={{ position: 'relative', height: '300px' }}> */}
      <TextPressure
        text="SVARTALHEIM.dev!"
        flex={true}
        alpha={false}
        stroke={false}
        width={true}
        weight={true}
        italic={true}
        className="z-50"
        //   fontUrl="/fonts/ServerMono/ServerMono-Regular.woff2"
        textColor="#ffffff"
        strokeColor="#ff0000"
        minFontSize={120}
      />
      <div className="absolute top-0 left-0 w-screen h-screen">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal" // up, down, left, right, diagonal
          borderColor="#666"
          // hoverFillColor="#222"
        />
      </div>
      {/* <div style={{ width: '500px', height: '600px', position: 'relative' }}>
        <DitherWrapper />
        <Scene />
      </div> */}
      {/* </div> */}
    </Wrapper>
  )
}
