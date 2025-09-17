/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
}

export default nextConfig
