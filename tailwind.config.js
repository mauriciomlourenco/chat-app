/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          light: 'rgba(0, 108, 121, 0.3)',
          medium: 'rgba(0, 108, 121, 0.5)',
          strong: 'rgba(0, 108, 121, 1)',
        }
      }
    },
  },
  plugins: [],
}

