/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    // Static export configuration for Cloudflare Pages
    output: 'export',
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
