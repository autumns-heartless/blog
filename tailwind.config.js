import tailwindConfig from '@femm/tailwind-config'

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindConfig],
  content: ['./docs/.vitepress/**/*.{js,ts,vue}', './**/*.{md,html}'],
  options: {
    safelist: ['html', 'body'],
  },
}
