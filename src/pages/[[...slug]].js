// src/pages/[[...slug]].js

import React from 'react';
import { allContent } from '../../utils/local-content'; // Reads all .md files
import { getComponent } from '../../components/components-registry';
import { resolveStaticProps } from '../../utils/static-props-resolvers'; // Processes data for a single page
import { resolveStaticPaths } from '../../utils/static-paths-resolvers'; // Generates paths for Next.js

// Your Page component
function Page(props) {
  const { page, site } = props; // Props from getStaticProps
  // console.log('[Page Component] Props received:', props); // For debugging props

  // Handle cases where page data might be missing, even if no explicit error was thrown in getStaticProps
  if (!page) {
    console.warn('[Page Component] Page prop is missing. This might indicate an issue in resolveStaticProps or data.', props);
    return <div>Error: Page data is not available.</div>;
  }
  if (!page.__metadata) {
    // This error is already in your original code, keeping it.
    throw new Error(`page has no type, page '${props.path}'`);
  }

  const modelName = page.__metadata.modelName;
  if (!modelName) {
    // This error is already in your original code, keeping it.
    throw new Error(`page has no type, page '${props.path}'`);
  }

  const PageLayout = getComponent(modelName);
  if (!PageLayout) {
    // This error is already in your original code, keeping it.
    throw new Error(`no page layout matching the page model: ${modelName}`);
  }

  return <PageLayout page={page} site={site} />;
}

export async function getStaticPaths() {
  console.log('[getStaticPaths] Starting...');
  try {
    const data = allContent(); // Reads all .md files
    // console.log('[getStaticPaths] Data from allContent():', data); // For debugging
    const paths = resolveStaticPaths(data);
    // console.log('[getStaticPaths] Resolved paths:', JSON.stringify(paths, null, 2)); // For debugging
    console.log(`[getStaticPaths] Successfully generated ${paths.length} paths.`);
    return { paths, fallback: false }; // fallback: false means 404 for unknown paths
  } catch (error) {
    console.error('----------------------------------------------------------------');
    console.error('[getStaticPaths CAUGHT ERROR]');
    console.error(`Error Message: ${error.message}`);
    console.error(`Error Stack: ${error.stack}`);
    console.error(`Full Error Object:`, error);
    console.error('----------------------------------------------------------------');
    // If getStaticPaths fails, Next.js build will likely fail.
    // Returning empty paths might prevent build failure but hide the issue.
    // It's better to let the build fail here so you know something is wrong.
    throw error; // Re-throw to make the build fail and surface the error
  }
}

export async function getStaticProps({ params }) {
  // Construct urlPath from slug parts. params.slug will be an array.
  // Example: if URL is /ecotours/my-tour, params.slug will be ['ecotours', 'my-tour']
  // urlPath should become '/ecotours/my-tour'
  // If it's the homepage, params.slug will be undefined or an empty array depending on Next.js version for [[...slug]].
  let urlPath;
  if (params && params.slug && params.slug.length > 0) {
    urlPath = '/' + params.slug.join('/');
  } else {
    urlPath = '/'; // For the homepage
  }

  console.log(`[getStaticProps START] for urlPath: "${urlPath}"`);

  try {
    const data = allContent(); // Reads all .md files
    // console.log('[getStaticProps] Data from allContent() for path:', urlPath, data); // For debugging

    // resolveStaticProps is likely where the specific .md file is found and processed
    // based on urlPath and the full data set.
    const props = await resolveStaticProps(urlPath, data);
    // console.log('[getStaticProps] Props from resolveStaticProps for path:', urlPath, props); // For debugging

    if (!props || !props.page) {
      // This indicates resolveStaticProps couldn't find or process the page for this urlPath
      console.warn(`[getStaticProps] resolveStaticProps did not return page data for urlPath: "${urlPath}". Returning 404.`);
      return { notFound: true };
    }

    console.log(`[getStaticProps SUCCESS] for urlPath: "${urlPath}". Page title from props: ${props.page?.title || 'N/A'}`);
    return { props };

  } catch (error) {
    console.error('----------------------------------------------------------------');
    console.error(`[getStaticProps CAUGHT ERROR] for urlPath: "${urlPath}"`);
    // If error.code === 'ENOENT' or similar for file not found, it might come from allContent or resolveStaticProps
    if (error.code === 'ENOENT') {
        console.error(`Specific Error: File not found related to path ${urlPath}. Check 'allContent' or 'resolveStaticProps'.`);
    }
    console.error(`Error Message: ${error.message}`);
    console.error(`Error Name: ${error.name}`);
    console.error(`Error Stack: ${error.stack}`);
    console.error(`Full Error Object:`, error); // Log the entire error object
    console.error('----------------------------------------------------------------');

    // If an error occurs trying to get props for a page (e.g., file not found, parsing error),
    // it's best to return notFound: true so Next.js generates a 404 for this path.
    // This is critical if the error means the page *cannot* be built.
    // If it's an intermittent error from an external API, you might have different handling.
    // Given your setup, a file system error should result in a 404.
    return { notFound: true };
    // Alternatively, to force a 500 error page during build (which Netlify might then serve):
    // throw error;
    // But for SSG, notFound: true is usually cleaner if the page simply can't be generated.
  }
}

export default Page;
