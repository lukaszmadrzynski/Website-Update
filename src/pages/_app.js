
// pages/_app.js (or _app.tsx)
import { Inter, Roboto_Slab } from 'next/font/google'; // Import both fonts
import '../css/main.css'; // Make sure your global CSS is imported

// Configure Inter font
const inter = Inter({
  subsets: ['latin'], // Adjust subsets if needed
  weight: ['400', '500', '700'], // Weights used from your @import
  display: 'swap',
  variable: '--font-inter', // Define a CSS variable for Inter
});

// Configure Roboto Slab font
const roboto_slab = Roboto_Slab({ // Note: next/font uses underscores for multi-word font names
  subsets: ['latin'], // Adjust subsets if needed
  weight: ['400', '500', '700'], // Weights used from your @import
  display: 'swap',
  variable: '--font-roboto-slab', // Define a CSS variable for Roboto Slab
});

export default function MyApp({ Component, pageProps }) {
  return (
    // Apply both font variables to a top-level element.
    // The Tailwind config will then pick these up.
    <div className={`${inter.variable} ${roboto_slab.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
