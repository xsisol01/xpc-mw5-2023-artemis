/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  appDir: true,
  env: {
    apiUrl: 'https://localhost:7242/api'
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.*', // fakestoreapi.com
         port: '',
        pathname: '/img/**',
      }
    ]
  },
  async rewrites() {
    return [
      // {
      //   source: "/api/:path*",
      //   destination: "https://localhost:7242/api/:path*",
      // },
      // {
      //   source: "/api/Commodity",
      //   destination: "https://localhost:7242/api/Commodity",
      // },
      // {
      //   source: "/api/Commodity/byId/:path*",
      //   destination: "https://localhost:7242/api/Commodity/byId/:path*",
      // },
    ];
   }
}

module.exports = nextConfig
