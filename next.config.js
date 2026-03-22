/**
 * @type {import('next').NextConfig}
 */
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
    // Static export only for production build (not for dev server)
    // Dev server needs API routes for TinaCMS
    output: isDev ? undefined : 'export',
    images: {
        unoptimized: true,
    },
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW
    },
    trailingSlash: false,
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ['@tinacms/cli', 'tinacms'],
    },
    webpack: (config, { isServer }) => {
        config.cache = false;
        return config;
    },
};

module.exports = nextConfig;
