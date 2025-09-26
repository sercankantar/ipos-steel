/** @type {import('next').NextConfig} */
const nextConfig = {
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
		],
	},
};

module.exports = nextConfig;
