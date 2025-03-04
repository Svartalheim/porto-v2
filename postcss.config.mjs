import { functions } from './styles/scripts/postcss-functions.mjs'

const presetEnvConfig = {
  autoprefixer: {
    flexbox: 'no-2009',
  },
  stage: 3,
  features: {
    'custom-properties': false,
    'custom-media-queries': true,
    'nesting-rules': true,
  },
}

const globalDataConfig = {
  files: ['./styles/css/root.css'],
}

const postcssConfig = {
  plugins: {
    '@tailwindcss/postcss': {}, // Use this for Tailwind v4
    '@csstools/postcss-global-data': globalDataConfig,
    'postcss-extend-rule': {},
    'postcss-functions': { functions },
    'postcss-preset-env': presetEnvConfig,
    cssnano: process.env.NODE_ENV === 'production' ? {} : false,
  },
}

export default postcssConfig
