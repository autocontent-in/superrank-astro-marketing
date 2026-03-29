/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          blue: '#2563eb',
          'blue-light': '#bfdbfe',
          purple: '#8b5cf6',
        },
      },
    },
  },
  plugins: [],
};
