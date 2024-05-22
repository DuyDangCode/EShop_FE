/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins: {
  //   preflight: false, //disabling preflight
  // },
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'color-3': '#0156FF',
        'color-1': '#F5F7FF',
        'color-green': '#78A962',
        'color-silver': '#A2A6B0',
        'color-gray-0': '#F9F9F9',
      },

      gridTemplateRows: {
        10: 'repeat(10, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',

        // Complex site-specific row configuration
        layout: '200px minmax(900px, 1fr) 100px',
      },

      gridTemplateColumns: {
        // Simple 16 column grid
        14: 'repeat(14, minmax(0, 1fr))',

        // Complex site-specific column configuration
        footer: '200px minmax(900px, 1fr) 100px',
      },
    },
  },
  plugins: [],
}
