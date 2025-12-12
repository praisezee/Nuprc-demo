import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "via.placeholder.com",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
			{
				protocol: "https",
				hostname: "www.nuprc.gov.ng", // Allow existing site assets during migration
			},
		],
	},
	// Enable Turbopack with empty config to silence webpack warning
	turbopack: {},
};

export default nextConfig;
