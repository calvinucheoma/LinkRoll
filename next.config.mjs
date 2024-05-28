/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*.googleusercontent.com',
        port: '',
      },
      {
        hostname: 'linkroll.s3.amazonaws.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
