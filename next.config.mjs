/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
      {
        protocol: 'http',
        hostname: 'food-ordering-delivery-app.s3.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
