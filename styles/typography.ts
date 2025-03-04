const fonts = {
  mono: '--font-mono',
  yipes: '--font-yipes',
} as const

const typography = {
  'test-mono': {
    'font-family': `var(${fonts.mono})`,
    'font-style': 'normal',
    'font-weight': 400,
    'line-height': '90%',
    'letter-spacing': 0,
    'font-size': 20,
  },
  'h1-alt': {
    'font-family': `var(${fonts.yipes})`,
    'font-style': 'normal',
    'font-weight': 500,
    'line-height': '90%',
    'letter-spacing': 0,
    'font-size': 80,
  },
  h1: {
    'font-family': `var(${fonts.mono})`,
    'font-style': 'normal',
    'font-weight': 500,
    'line-height': '90%',
    'letter-spacing': 0,
    'font-size': 60,
  },
  h2: {
    'font-family': `var(${fonts.mono})`,
    'font-style': 'normal',
    'font-weight': 500,
    'line-height': '90%',
    'letter-spacing': 0,
    'font-size': 45,
  },
} as const

export { fonts, typography }
