/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // require('@headlessui/tailwindcss')

    // Or with a custom prefix:
    require('@headlessui/tailwindcss')({ prefix: 'ui' })],
}