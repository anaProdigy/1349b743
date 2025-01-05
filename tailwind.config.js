/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./public/index.html", 
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F0F4F9', // Gray
          dark: '#1F2933',  // Smoother charcoal
        },
        card: {
          light: '#FFFFFF', // White 
          dark: '#29323C',  // Deep slate 
        },
        primary: {
          light: '#6998AB', // Change here
          dark: '#84DFFF',  // Brighter coral 
        },
        text: {
          primary: {
            light: '#1E1E1E', // Darker gray 
            dark: '#ECECEC',  // Softer white 
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
            light: '#55D78A', // Vibrant green 
            dark: '#4CCB80',  // Muted green 
          },
          missed: {
            light: '#F7625E', // Bold red 
            dark: '#FF6565',  // Brighter 
          },
        },
        error: {
          light: '#E63946', // Bold red 
          dark: '#FF4D5E',  // Brighter red 
        },
        button: {
          light: '#6998AB', 
          dark: '#84DFFF',  
        },
        hover: {
          light: '#507F97', 
          dark: '#66C5FF',  
        },
      },
    },
  },
  plugins: [],
}

