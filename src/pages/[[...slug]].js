// src/pages/[[...slug]].js

import React from 'react'; // Keep if your Page component uses React features

// Corrected imports based on your provided file paths:
import { allContent } from '../utils/local-content';         // For src/utils/local-content.ts
import { getComponent } from '../components/components-registry'; // For src/components/components-registry.ts
import { resolveStaticProps } from '../utils/static-props-resolvers'; // For src/utils/static-props-resolvers.js
import { resolveStaticPaths } from '../utils/static-paths-resolvers'; // For src/utils/static-paths-resolvers.js

import fs from 'fs'; // Node.js file system module, needed if allContent doesn't handle reading
import path from 'path'; // Node.js path module
// import matter from 'gray-matter'; // Only if allContent or resolveStaticProps doesn't handle frontmatter parsing.
                                  // If those utils already return parsed frontmatter and content, you might not need to call matter() here.
                                  // For this example, I'm assuming resolveStaticProps might need the raw path, and might do the reading/parsing.
                                  // Or, allContent provides everything and resolveStaticProps just filters.
                                  // The original code implied resolveStaticProps took urlPath and data (allContent)

// Your Main Page Component (adapt this to your actual component)
function DynamicPage(props) {
  const { page, site, hasPageError, errorMessage, errorPageIdentifier } = props;

  if (hasPageError) {
    console.error(`[DynamicPage Component] Rendering error state for page: ${errorPageIdentifier}, Message: ${errorMessage}`);
    return (
      <div>
        <h1>Error Loading Page Content</h1>
        <p>We're sorry, but an issue occurred while trying to load the content for this page.</p>
        {process.env.NODE_ENV === 'development' && (
          <pre>Error for page: {errorPageIdentifier} - Message: {errorMessage}</pre>
        )}
      </div>
    );
  }

  if (!page) {
    console.warn('[DynamicPage Component] Page prop is missing. This might indicate an issue in resolveStaticProps or data.', props);
    return <div>Error: Page data is not available.</div>;
  }

  // Original error checks from your provided [[...slug]].js
  if (!page.__metadata) {
    // This error is already in your original code, keeping it.
    // Consider if this should be caught in getStaticProps and return notFound instead of throwing at render.
    throw new Error(`page has no type, page path from props: '${page.path || 'N/A'}'`);
  }

  const modelName = page.__metadata.modelName;
  if (!modelName) {
    throw new Error(`page has no modelName, page path from props: '${page.path || 'N/A'}'`);
  }

  const PageLayout = getComponent(modelName);
  if (!PageLayout) {
    throw new Error(`no page layout matching the page model: ${modelName}`);
  }

  // Fallback for title if not in frontmatter (assuming page prop has a title)
  const pageTitle = page.title || `Page: ${pageIdentifierFromProps(props)}`; // Helper function to get identifier

  return <PageLayout page={page} site={site} />; // Your original rendering
}

// Helper to get an identifier for logging in the component
function pageIdentifierFromProps(props) {
    if (props.errorPageIdentifier) return props.errorPageIdentifier;
    if (props.page && props.page.path) return props.page.path; // Assuming 'path' exists on your page object
    return 'Unknown Page';
}


export async function getStaticPaths() {
  console.log('[getStaticPaths] Starting...');
  try {
    const data = allContent(); // This should return all necessary data to determine paths
    const paths = resolveStaticPaths(data); // This should generate the array of { params: { slug: [...] } }
    console.log(`[getStaticPaths] Successfully generated ${paths.length} paths.`);
    // console.log('[getStaticPaths] Example path object:', JSON.stringify(paths[0], null, 2)); // Log an example path
    return { paths, fallback: false };
  } catch (error) {
    console.error('----------------------------------------------------------------');
    console.error('[getStaticPaths CAUGHT ERROR]');
    console.error(`Error Message: ${error.message}`);
    console.error(`Error Stack: ${error.stack}`);
    console.error(`Full Error Object:`, error);
    console.error('----------------------------------------------------------------');
    throw error; // Re-throw to fail the build and make the error visible
  }
}

export async function getStaticProps({ params }) {
  let urlPath;
  if (params && params.slug && params.slug.length > 0) {
    urlPath = '/' + params.slug.join('/');
  } else {
    urlPath = '/'; // Homepage
  }

  console.log(`[getStaticProps START] for urlPath: "${urlPath}"`);

  try {
    const data = allContent(); // Assuming this fetches all content data (e.g., list of all .md file contents/metadata)

    // resolveStaticProps is responsible for finding the specific page data for 'urlPath'
    // from the 'data' (all content) and returning the props for that page.
    // It likely handles the mapping from 'urlPath' to your .md file names internally.
    const props = await resolveStaticProps(urlPath, data);

    if (!props || !props.page) {
      console.warn(`[getStaticProps] 'resolveStaticProps' did not return a 'page' object in props for urlPath: "${urlPath}". This will likely lead to a 404 or error. Props received:`, props);
      return { notFound: true };
    }

    console.log(`[getStaticProps SUCCESS] for urlPath: "${urlPath}". Page title from props: ${props.page?.title || 'N/A'}`);
    return { props };

  } catch (error) {
    console.error('----------------------------------------------------------------');
    console.error(`[getStaticProps CAUGHT ERROR] for urlPath: "${urlPath}"`);
    // Check if the error might be a "file not found" type, even if abstracted by your utils
    if (error.message && (error.message.includes('ENOENT') || error.message.toLowerCase().includes('not found'))) {
      console.error(`Specific Hint: Error suggests a file or resource related to "${urlPath}" was not found. Check 'allContent' or 'resolveStaticProps' logic.`);
    }
    console.error(`Error Message: ${error.message}`);
    console.error(`Error Name: ${error.name}`); // e.g. 'TypeError', 'ReferenceError'
    console.error(`Error Stack: ${error.stack}`);
    console.error(`Full Error Object:`, error);
    console.error('----------------------------------------------------------------');

    // If any error occurs (file not found, parsing error from utils, etc.),
    // return notFound: true to generate a 404 page.
    return { notFound: true };
  }
}

export default DynamicPage;
