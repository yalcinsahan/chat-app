/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
    env: {
        apiUrl: 'http://localhost:5000',
      },
}

module.exports = nextConfig