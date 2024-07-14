/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f13a01',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hidden': {
          scrollbarWidth: 'none' /* Para Firefox */,
          '-ms-overflow-style': 'none' /* Para Internet Explorer e Edge */,
          '&::-webkit-scrollbar': {
            display: 'none' /* Para Chrome, Safari e Opera */,
          },
        },
      })
    },
  ],
}
