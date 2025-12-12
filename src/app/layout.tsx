import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		template: "%s | NUPRC",
		default: "NUPRC - Nigerian Upstream Petroleum Regulatory Commission",
	},
	description:
		"The Nigerian Upstream Petroleum Regulatory Commission (NUPRC) is responsible for the technical and commercial regulation of upstream petroleum operations in Nigeria.",
	keywords: [
		"NUPRC",
		"Nigerian Upstream Petroleum Regulatory Commission",
		"Oil and Gas Nigeria",
		"Petroleum Regulation",
		"Upstream Petroleum",
		"Nigeria Oil",
	],
	openGraph: {
		title: "NUPRC - Nigerian Upstream Petroleum Regulatory Commission",
		description:
			"The Nigerian Upstream Petroleum Regulatory Commission (NUPRC) is responsible for the technical and commercial regulation of upstream petroleum operations in Nigeria.",
		url: "https://nuprc.gov.ng",
		siteName: "NUPRC",
		type: "website",
		locale: "en_NG",
	},
	twitter: {
		card: "summary_large_image",
		title: "NUPRC - Nigerian Upstream Petroleum Regulatory Commission",
		description:
			"The Nigerian Upstream Petroleum Regulatory Commission (NUPRC) is responsible for the technical and commercial regulation of upstream petroleum operations in Nigeria.",
	},
	robots: {
		index: true,
		follow: true,
	},
	icons: {
		icon: {
			url: "/assets/logo.png",
			type: "image/png",
			sizes: "16x16",
		},
		apple: {
			url: "/assets/logo.png",
			type: "image/png",
			sizes: "16x16",
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<Toaster position="top-right" />
				{children}
			</body>
		</html>
	);
}
