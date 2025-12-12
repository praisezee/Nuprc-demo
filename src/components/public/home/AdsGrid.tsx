"use client";

import Link from "next/link";
import Image from "next/image";
import { FaPlay, FaExternalLinkAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

type AdType = "text" | "image" | "video" | "youtube";

interface AdItem {
	_id: string;
	type: AdType;
	content: string;
	title?: string;
	link?: string;
	colSpan?: number;
	rowSpan?: number;
}

export default function AdsGrid() {
	const [ads, setAds] = useState<AdItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAds = async () => {
			try {
				const response = await fetch(
					`${
						process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
					}/ads/published`
				);
				const data = await response.json();
				if (data.success) {
					setAds(data.data);
				}
			} catch (error) {
				console.error("Failed to fetch ads:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchAds();
	}, []);

	if (loading) {
		return (
			<section className="py-16 bg-white">
				<div className="container mx-auto px-6">
					<div className="flex items-center justify-center h-64">
						<div className="text-gray-400">Loading...</div>
					</div>
				</div>
			</section>
		);
	}

	if (ads.length === 0) {
		return null; // Don't show section if no ads
	}

	return (
		<section className="py-16 bg-white">
			<div className="container mx-auto px-6">
				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl md:text-3xl font-bold text-gray-900">
						Featured <span className="text-primary">Highlights</span>
					</h2>
					<Link
						href="/media/news"
						className="text-sm font-bold text-primary hover:text-primary-dark flex items-center gap-2">
						View All Updates <FaExternalLinkAlt size={12} />
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
					{ads.map((ad) => (
						<AdCard
							key={ad._id}
							ad={ad}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

function AdCard({ ad }: { ad: AdItem }) {
	// Tailwind class mapping for spans
	const colClass =
		ad.colSpan === 2
			? "md:col-span-2"
			: ad.colSpan === 3
			? "md:col-span-3"
			: ad.colSpan === 4
			? "md:col-span-4"
			: "md:col-span-1";
	const rowClass = ad.rowSpan === 2 ? "row-span-2" : "row-span-1";

	return (
		<div
			className={`relative group overflow-hidden rounded-2xl shadow-md border border-gray-100 bg-gray-50 hover:shadow-xl transition-all duration-300 ${colClass} ${rowClass}`}>
			{ad.type === "image" && (
				<Link
					href={ad.link || "#"}
					className="block w-full h-full relative">
					<Image
						src={ad.content}
						alt={ad.title || "Ad"}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-500"
						unoptimized
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
						<h3 className="text-white font-bold text-lg">{ad.title}</h3>
					</div>
				</Link>
			)}

			{ad.type === "text" && (
				<Link
					href={ad.link || "#"}
					className="flex flex-col h-full p-6 bg-white hover:bg-gray-50 transition-colors">
					<h3 className="text-lg font-bold text-gray-900 mb-3">{ad.title}</h3>
					<p className="text-gray-600 text-sm leading-relaxed overflow-hidden">
						{ad.content}
					</p>
					<span className="mt-auto pt-4 text-xs font-bold text-primary uppercase tracking-wide">
						Read More
					</span>
				</Link>
			)}

			{ad.type === "video" && (
				<div className="w-full h-full relative bg-black group">
					<video
						src={ad.content}
						className="w-full h-full object-cover"
						muted
						loop
						playsInline
					/>
					<div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
						<button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/50 group-hover:scale-110 transition-transform">
							<FaPlay
								size={16}
								className="ml-1"
							/>
						</button>
					</div>
					<div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
						<h3 className="text-white font-bold text-sm truncate">{ad.title}</h3>
					</div>
				</div>
			)}

			{ad.type === "youtube" && (
				<div className="w-full h-full relative bg-black">
					<iframe
						src={`https://www.youtube.com/embed/${ad.content}`}
						title={ad.title}
						className="w-full h-full"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</div>
			)}
		</div>
	);
}
