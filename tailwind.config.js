/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the path to match your project's structure
    "./public/index.html", // Include your HTML files if they contain Tailwind classes
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F0F4F9', // Softer warm cream
          dark: '#1F2933',  // Smoother charcoal
        },
        card: {
          light: '#FFFFFF', // White for cards in light mode
          dark: '#29323C',  // Deep slate for dark mode cards
        },
        primary: {
          light: '#F86A61', // Vibrant coral for buttons and actions
          dark: '#FF8A85',  // Brighter coral for dark mode
        },
        text: {
          primary: {
            light: '#1E1E1E', // Darker gray for text in light mode
            dark: '#ECECEC',  // Softer white for text in dark mode
          },
          secondary: {
            light: '#707070', // Neutral gray
            dark: '#A0A0A0',  // Medium gray
          },
        },
        border: {
          light: '#E4DED7', // Muted beige
          dark: '#3E4C59',  // Soft dark slate
        },
        accent: {
          incoming: {
            light: '#55D78A', // Vibrant green for incoming calls
            dark: '#4CCB80',  // Muted green for dark mode
          },
          missed: {
            light: '#F7625E', // Bold red for missed calls
            dark: '#FF6565',  // Brighter red for dark mode
          },
        },
        error: {
          light: '#E63946', // Bold red for error/danger buttons
          dark: '#FF4D5E',  // Brighter red for dark mode errors
        },
        button: {
          light: '#F86A61', // Coral button background in light mode
          dark: '#FF8A85',  // Bright coral for dark mode buttons
        },
        hover: {
          light: '#F2756D', // Hover state for light mode buttons
          dark: '#FF7F77',  // Hover state for dark mode buttons
        },
      },
    },
  },
  plugins: [],
}

