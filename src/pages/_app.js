// content-ops-starter/src/pages/_app.js

import Head from 'next/head';
import Script from 'next/script'; // <<<<<< ADD THIS IMPORT
import '../css/main.css'; // Assuming this path is correct for your global CSS

export default function MyApp({ Component, pageProps }) {
  const GA_MEASUREMENT_ID = 'G-JG1RTRLGQJ'; // Your Google Analytics Measurement ID

  return (
    <>
      <Head>
        {/* --- START: Add Website Structured Data --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Cloud Mountain", // Your preferred site name
              "url": "https://cloudmountain.top/" // Your homepage URL
            })
          }}
        />
        {/* --- END: Add Website Structured Data --- */}
      </Head>

      {/* Google Analytics Scripts <<<<<< ADD THESE SECTIONS */}
      {/* This loads the gtag.js library */}
      <Script
        strategy="afterInteractive" // Load the script after the page becomes interactive
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      {/* This is the inline script for configuration */}
      <Script
        id="google-analytics" // Adding an ID is good practice, helps Next.js manage the script
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
      {/* END Google Analytics Scripts */}

      {/* This renders the current page */}
      <Component {...pageProps} />
    </>
  );
}
