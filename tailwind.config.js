/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        circlehd: {
          blue: '#416cd7',      // Primary Blue from
          dark: '#1e293b',      // Slate 800 - dark text
          gray: '#64748b',      // Slate 500 - secondary text/icons
          light: '#f8fafc',     // Slate 50 - background
          border: '#e2e8f0',    // Slate 200 - border
          error: '#ef4444',     // Red 500 - error
          success: '#22c55e',   // Green 500 - success
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
        hover: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
