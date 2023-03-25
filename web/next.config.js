/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  appDir: true,
  env: {
    apiUrl: 'http://localhost:4000'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/img/**',
      }
    ]
  }
}

module.exports = nextConfig
