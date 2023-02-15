/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  images: {
    domains: ['howtoshout.com','secure.gravatar.com','www.saintlad.com', 'cultofgamer.com'],
  },
}

module.exports = nextConfig
