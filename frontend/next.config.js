/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
    env: {
        apiUrl: 'http://localhost:5000',
      },
      webpack: (config, { isServer }) => {
        if (!isServer) {
          config.watchOptions = {
            poll: 1000,
            aggregateTimeout: 300,
          }
        }
        return config
      },
}

module.exports = nextConfig