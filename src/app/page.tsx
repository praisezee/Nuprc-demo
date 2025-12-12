"use client";

import dynamic from "next/dynamic";
import React from "react";
import PublicLayout from "@/components/public/PublicLayout";
import HeroCarousel from "@/components/ui/HeroCarousel";
import LatestNews from "@/components/public/home/LatestNews";
import ServicesGrid from "@/components/public/home/ServicesGrid";
import QuickLinks from "@/components/public/home/QuickLinks";

import AdsGrid from "@/components/public/home/AdsGrid";
import Image from "next/image";
import { servicom } from "@/assets";

// Dynamic imports for components that use browser-only APIs (react-pageflip uses DOMMatrix)
const PdfSectionWrapper = dynamic(
	() => import("@/components/public/home/PdfSectionWrapper"),
	{
		ssr: false,
		loading: () => (
			<div className="py-24 bg-gray-50 flex justify-center items-center">
				<div className="text-gray-400">Loading...</div>
			</div>
		),
	}
);

const ServiceCharterSection = dynamic(
	() => import("@/components/public/home/ServiceCharterSection"),
	{
		ssr: false,
		loading: () => (
			<div className="py-24 bg-gray-50 flex justify-center items-center">
				<div className="text-gray-400">Loading...</div>
			</div>
		),
	}
);

export default function Home() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [config, setConfig] = React.useState<any>(null); // Use explicit type if possible, or any for now until config type is shared

	React.useEffect(() => {
		const fetchConfig = async () => {
			try {
				const response = await fetch(
					`${
						process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
					}/config/home`
				);
				const data = await response.json();
				if (data.success) {
					setConfig(data.data);
				}
			} catch (error) {
				console.error("Failed to fetch home config:", error);
			}
		};

		fetchConfig();
	}, []);

	// Default values if fetch fails or loading
	const magazineFile =
		config?.pdfs?.magazine?.file || "/pdfs/Upstream-Gaze-Magazine-Vol.-11.pdf";
	const magazineTitle =
		config?.pdfs?.magazine?.title || "The Upstream Gaze - Vol. 11";
	const charterFile =
		config?.pdfs?.serviceCharter?.file ||
		"/pdfs/2025-NURPC-Integrated-Charter-printed.pdf";

	return (
		<PublicLayout>
			<HeroCarousel />

			{/* Ads Grid Section */}
			<AdsGrid />

			{/* Savicom Logo Section */}
			<section className="py-12 bg-gray-50 border-y border-gray-100">
				<div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-8">
					<div className="text-center md:text-left">
						<h3 className="text-2xl font-bold text-gray-800">Servicom</h3>
						<p className="text-gray-600 max-w-lg">
							Commitment to efficient, timely, and transparent service delivery.
						</p>
					</div>
					<div className="w-48 h-24 relative bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
						{/* Placeholder for Savicom Logo specifically requested */}
						{/* Servicom Logo */}
						<Image
							src={servicom}
							className="object-contain p-2"
							alt="Servicom logo"
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
				</div>
			</section>

			<ServicesGrid />

			{/* Magazine Section with PdfFlipper */}
			<PdfSectionWrapper
				file={magazineFile}
				title={magazineTitle}
			/>

			{/* Service Charter Section */}
			<ServiceCharterSection file={charterFile} />

			<QuickLinks />

			<section className="py-16 bg-white">
				<div className="container mx-auto px-6">
					<h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
						Latest News
					</h2>
					<LatestNews />
				</div>
			</section>
		</PublicLayout>
	);
}
