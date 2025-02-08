const fonts = {
  mono: '--font-mono',
  yipes: '--font-yipes',
} as const;

const typography = {
  'test-mono': {
    'font-family': fonts.mono,
    'font-style': 'normal',
    'font-weight': 400,
    'line-height': '90%',
    'letter-spacing': 0,
    'font-size': 20,
  },
  'h1-alt': {
    'font-family': fonts.yipes,
    'font-style': 'normal',
    'font-weight': 500,
    'line-height': '90%',
    'letter-spacing': 0,
    'font-size': 48,
  },
} as const;

export { fonts, typography };
