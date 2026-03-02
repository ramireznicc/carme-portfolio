/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base whites
        'p-bg':      '#ffffff',
        'p-surface': '#fafafa',
        // Palette (component accents)
        'p-lime':    '#e7fe71',
        'p-cream':   '#f4fec2',
        'p-purple':  '#c02dd7',
        'p-pink':    '#f962b2',
        'p-red':     '#ff3562',
        // Text
        'p-text':       '#1a1a1a',
        'p-text-muted': '#4a4a4a',
        'p-text-dim':   '#888888',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        'card-sm': '10px',
      },
    },
  },
  plugins: [],
}
