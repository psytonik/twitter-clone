/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains:["upload.wikimedia.org","lh3.googleusercontent.com","firebasestorage.googleapis.com","cdn.cnn.com","media.cnn.com","randomuser.me"]
  }
}

module.exports = nextConfig
