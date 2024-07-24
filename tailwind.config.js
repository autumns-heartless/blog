import tailwindConfig from '@femm/tailwind-config'

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindConfig],
  content: ['./docs/**/*.{html,vue,js,ts,jsx,tsx,md}'],
  options: {
    safelist: ['html', 'body'],
  },
}
