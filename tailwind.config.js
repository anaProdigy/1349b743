/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        light: {
          background: '#FDFDFD',
          surface: '#FFFFFF',
          textPrimary: '#2C2C2C',
          textSecondary: '#757575',
          accent: '#007AFF',
          success: '#28C76F',
          error: '#EA5455',
          warning: '#FF9F43',
          info: '#00CFE8',
          border: '#E3E3E3',
          hover: '#E8F4FD',
        },
        dark: {
          background: '#1C1C1E',
          surface: '#2C2C2E',
          textPrimary: '#EDEDED',
          textSecondary: '#A8A8A8',
          accent: '#0A84FF',
          success: '#34C759',
          error: '#FF453A',
          warning: '#FFD60A',
          info: '#5AC8FA',
          border: '#3A3A3C',
          hover: '#444444',
        },
      },
    },
  },
  plugins: [],
}

