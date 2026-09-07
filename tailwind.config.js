/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: {
            light: '#EEECE3',
            'light-surface': '#F7F6F1',
            'light-card': '#E5E2D7',
            dark: '#101212',
            'dark-surface': '#171917',
            'dark-card': '#1E211F',
          },
          text: {
            light: '#181A1B',
            'light-muted': '#5D6467',
            'light-subtle': '#8A9194',
            dark: '#F2F0E9',
            'dark-muted': '#B9B8AD',
            'dark-subtle': '#757876',
          },
          border: {
            light: '#D3CFBF',
            'light-subtle': '#E2DEC9',
            dark: '#272B28',
            'dark-subtle': '#1C201D',
          },
          teal: {
            DEFAULT: '#4B7C85',
            light: '#6597A0',
            dark: '#355E66',
          },
          gold: {
            DEFAULT: '#A78B45',
            light: '#C2A359',
            dark: '#856C30',
          },
          amber: {
            DEFAULT: '#6C4A28',
            light: '#855E36',
          },
          forest: {
            DEFAULT: '#4A5D44',
            light: '#5E7357',
            dark: '#354331',
          },
          burgundy: {
            DEFAULT: '#7A4445',
            light: '#965657',
            dark: '#5C3132',
          },
          charcoal: '#1A1C1D',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        display: ['Manrope', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        widestTechnical: '0.18em',
      }
    },
  },
  plugins: [],
}
