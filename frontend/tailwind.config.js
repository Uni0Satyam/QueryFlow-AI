/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        bg:         '#0a0a0a',
        surface:    '#111111',
        'surface-2':'#1a1a1a',
        'surface-3':'#222222',
        accent:     '#6366f1',
        'accent-dim':'rgba(99,102,241,0.12)',
        muted:      '#888888',
        border:     'rgba(255,255,255,0.07)',
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.07)',
      },
      animation: {
        'fade-up':  'fadeUp 0.4s ease both',
        'fade-in':  'fadeIn 0.3s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
