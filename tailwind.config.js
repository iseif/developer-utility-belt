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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#000000',
            code: {
              backgroundColor: '#f1f1f1',
              borderRadius: '0.25rem',
              padding: '0.25rem',
              color: '#d63644', // Red color for inline code
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#f1f1f1',
              borderRadius: '0',
              borderWidth: '2px',
              borderColor: '#000000',
              padding: '1rem',
              color: '#000000', // Ensure text in code blocks is black
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: '#000000', // Ensure code in pre blocks is black
              padding: '0',
              fontWeight: '400',
            },
          },
        },
        dark: {
          css: {
            color: '#e0e0e0',
            a: {
              color: '#3b82f6',
            },
            h1: {
              color: '#e0e0e0',
            },
            h2: {
              color: '#e0e0e0',
            },
            h3: {
              color: '#e0e0e0',
            },
            h4: {
              color: '#e0e0e0',
            },
            code: {
              backgroundColor: '#2d2d2d',
              color: '#ff6b81', // Pink color for inline code in dark mode
            },
            pre: {
              backgroundColor: '#2d2d2d',
              borderColor: '#e0e0e0',
              color: '#e0e0e0', // Light color for code blocks in dark mode
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: '#e0e0e0', // Light color for code in pre blocks in dark mode
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
