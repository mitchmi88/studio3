import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:              '#1D1D1D',
        surface:         '#252525',
        'surface-hover': '#2E2E2E',
        text:            '#F0EDE6',
        muted:           '#888888',
        accent:          '#C9A074',
        'accent-hover':  '#D4B08A',
        border:          '#2E2E2E',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body:    ['var(--font-body)',    'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
        wider:  '0.2em',
        wide:   '0.1em',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        bounce_y: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(8px)' },
        },
      },
      animation: {
        'fade-up':  'fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':  'fade-in 0.5s ease-out forwards',
        'bounce-y': 'bounce_y 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
