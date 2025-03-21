/** @type {import('postcss').Config} */
export default {
  plugins: {
    '@tailwindcss/postcss': {
      // Tailwind CSS v4 configuration
      config: {
        content: [
          './src/**/*.{js,ts,jsx,tsx}',
          // Add other template paths here
        ],
        plugins: [
          require('daisyui') // Add DaisyUI here
        ]
      }
    },
    autoprefixer: {},
  }
}