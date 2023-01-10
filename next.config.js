/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config) {
    config.experiments.topLevelAwait = true;
    return config;
  },
};

module.exports = nextConfig;
