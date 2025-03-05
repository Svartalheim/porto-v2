import Scene from '~/playground/dithereffect/test-dither'
import { Wrapper } from './(pages)/(components)/wrapper'

export default function MainPage() {
  return (
    <Wrapper
      theme="dark"
      className=" font-mono flex items-center justify-center"
      lenis={{ lerp: 0.1 }}
    >
      {/* <div style={{ position: 'relative', height: '300px' }}> */}
      {/* <TextPressure
        text="SVARTALHEIM.dev!"
        flex={true}
        alpha={false}
        stroke={false}
        width={true}
        weight={true}
        italic={true}
        //   fontUrl="/fonts/ServerMono/ServerMono-Regular.woff2"
        textColor="#ffffff"
        strokeColor="#ff0000"
        minFontSize={120}
      /> */}
      <div style={{ width: '500px', height: '600px', position: 'relative' }}>
        {/* <DitherWrapper /> */}
        <Scene />
      </div>
      {/* </div> */}
    </Wrapper>
  )
}
