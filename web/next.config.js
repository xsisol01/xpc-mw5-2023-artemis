/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    notSecureApiUrl: 'http://localhost:5002/api',
    apiUrl: 'https://localhost:7242/api',
    CLOUD_UPDATE_PRESET: 'xpc-mw5',
    CLOUD_NAME: 'dsukq0bf7',
    CLOUD_API: 'https://api.cloudinary.com/v1_1/dsukq0bf7/image/upload'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
}

module.exports = nextConfig
