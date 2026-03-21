import { Inter, Roboto_Slab } from 'next/font/google';
import Script from 'next/script';
import '../css/main.css';
import { TinaProvider, TinaCMS } from 'tinacms';

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-inter',
});

// Configure Roboto Slab font
const roboto_slab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto-slab',
});

// TinaCMS configuration
const cms = new TinaCMS({
  enabled: true,
});

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-JG1RTRLGQJ';

export default function App({ Component, pageProps }) {
  return (
    <TinaProvider cms={cms}>
      <>
        {/* Google Analytics Scripts */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />

        {/* Main Content */}
        <div className={`${inter.variable} ${roboto_slab.variable}`}>
          <Component {...pageProps} />
        </div>

      </>

    </TinaProvider>

  );
}
