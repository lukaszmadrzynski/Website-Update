import Head from 'next/head';
import '../css/main.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>  {/* Use Fragments to wrap multiple elements */}
      <Head>
        {/* --- START: Add Website Structured Data --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Cloud Mountain", // Your preferred site name
            "url": "https://cloudmountain.top/" // Your homepage URL
          }) }}
        />
        {/* --- END: Add Website Structured Data --- */}
      </Head>

      {/* This renders the current page */}
      <Component {...pageProps} />
    </>
  );
}
