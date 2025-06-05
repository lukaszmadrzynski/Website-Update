// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme'); // Import defaultTheme

module.exports = {
  // ... other configurations ...
  theme: {
    extend: { // It's good practice to put custom fonts in extend
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans], // Use CSS variable for Inter
        serif: ['var(--font-roboto-slab)', ...defaultTheme.fontFamily.serif] // Use CSS variable for Roboto Slab
      },
    },
  },
  // ... other configurations ...
};
