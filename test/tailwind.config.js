/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'sans': ['Nunito', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      colors: {
        // Custom AMnote Color Palette using CSS variables
        'amnote': {
          'red': 'var(--amnote-red)',
          'brown': 'var(--amnote-brown)',
          'blue': 'var(--amnote-blue)', 
          'gray': 'var(--amnote-gray)',
        },
        // Alternative naming scheme
        'brand': {
          'primary': '#667280',    // Blue
          'secondary': '#B71D21',  // Red
          'accent': '#F9FAFB',     // Yellow
          'neutral': {
            '50': '#FFFFFF',       // White
            '100': '#EEEEEE',      // Light blue
            '200': '#D8D8E4',      // Light/Medium gray
            '300': '#FFE4E4',      // Brown
            '900': '#000000',      // Black
            '950': '#161616',      // Dark gray
          }
        }
      },
      // Custom animations for the horizontal loader
      animation: {
        'slide-gradient': 'slideGradient 2s linear infinite',
      },
      // Custom keyframes for the gradient sliding animation
      keyframes: {
        slideGradient: {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '10%': {
            opacity: '1'
          },
          '90%': {
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(100%)',
            opacity: '0'
          },
        },
      },
      // Custom drop shadow for glow effect
      dropShadow: {
        'glow': [
          '0 0 2px rgba(239, 68, 68, 0.5)',
          '0 0 8px rgba(239, 68, 68, 0.3)',
          '0 0 16px rgba(239, 68, 68, 0.1)'
        ],
      },
    },
  },
  plugins: [],
}
