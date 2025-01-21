/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'conic-gradient': 'conic-gradient(at left, var(--tw-gradient-stops))',
      },
      colors: {
        'from-color': '#f5eee6',
        'via-color': '#fff8e3',
        'to-color': '#f3d7ca',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}