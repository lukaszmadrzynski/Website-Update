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
        if (isServer) {
            config.cache = false;
        }
        return config;
    }
};

module.exports = nextConfig;
