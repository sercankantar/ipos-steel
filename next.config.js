/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		// Build sırasında ESLint hatalarını ignore et
		ignoreDuringBuilds: true,
	},
	typescript: {
		// TypeScript hatalarını da ignore et
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
			},
			{
				protocol: "https",
				hostname: "digitalhippo-production.up.railway.app",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "logo.clearbit.com",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
	},
};

module.exports = nextConfig;
