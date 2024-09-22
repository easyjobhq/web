/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'firebasestorage.googleapis.com',
        'example.com',  // Add more domains as needed
        'another-example.com',
        // Add other domains here
      ],
    },
  };
  

export default nextConfig;
