/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Ensure this points to your source files
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // --- Neo-Brutalist Theme Additions ---
      colors: {
        'primary-bg': '#FFFFFF', // White background
        'primary-text': '#000000', // Black text
        accent: '#FFFF00', // Bright yellow accent (Example)
        'border-color': '#000000', // Default border color: Black
        'dark-primary-bg': '#1a1a1a',
        'dark-primary-text': '#e0e0e0',
        'dark-accent': '#FFFF00', // Keep accent the same or change it
        'dark-border-color': '#e0e0e0',
      },
      borderWidth: {
        DEFAULT: '2px', // Default border width
        3: '3px',
        4: '4px', // Add thicker border options
      },
      boxShadow: {
        solid: '4px 4px 0px #000000', // Example hard shadow
        'dark-solid': '4px 4px 0px #e0e0e0',
      },
      fontFamily: {
        // sans: ['Inter', 'ui-sans-serif', 'system-ui', ...], // Optional: Customize fonts
      },
      // --- End Theme Additions ---
    },
  },
  plugins: [],
};
