/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
      domains: [
        'firebasestorage.googleapis.com',
        'example.com',  // Add more domains as needed
        'easyjob-bucket.s3.us-east-2.amazonaws.com',
        // Add other domains here
        'images.unsplash.com',
        'images.pexels.com',
        'easyjob-bucket.s3.us-east-2.amazonaws.com',
        'assets.aceternity.com',
      ],

    },
  };
  

export default nextConfig;
