/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW
    },
    trailingSlash: true,
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
