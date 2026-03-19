/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW
    },
    trailingSlash: true,
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        config.cache = false;
        return config;
    },
    output: 'export'
};

module.exports = nextConfig;
``*
