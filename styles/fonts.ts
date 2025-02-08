import localFont from 'next/font/local'

const yipes = localFont({
  src: [
    {
      path: '../public/fonts/Yipes/Yipes.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-yipes',
  preload: true,
})
const mono = localFont({
  src: [
    {
      path: '../public/fonts/ServerMono/ServerMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-mono',
  preload: true,
})

const fonts = [yipes, mono] // Reverse the order to give mono higher precedence
const fontsClassName = fonts.map((font) => font.className).join(' ')

export { fontsClassName }
