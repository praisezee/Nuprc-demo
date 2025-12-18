"use client";

import React, { useState, useEffect } from "react";
import PublicLayout from "@/components/public/PublicLayout";
import PageHeader from "@/components/public/PageHeader";
import api from "@/lib/api";
import { FaSpinner, FaPlay } from "react-icons/fa";
import AlbumViewModal from "@/components/public/AlbumViewModal";
import SearchInput from "@/components/ui/SearchInput";

interface MediaItem {
	_id: string;
	title: string;
	type: "photo" | "video";
	url: string;
	caption?: string;
	album?: string;
	createdAt: string;
}

export default function VideoGalleryPage() {
	const [media, setMedia] = useState<MediaItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedAlbum, setSelectedAlbum] = useState<{
		name: string;
		items: MediaItem[];
	} | null>(null);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchMedia = async () => {
			setLoading(true);
			try {
				const { data } = await api.get("/media", {
					params: {
						type: "video",
						limit: 50, // Increased limit for albums and search
					},
				});
				setMedia(data.data);
			} catch (error) {
				console.error("Failed to fetch videos:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchMedia();
	}, []);

	return (
		<PublicLayout>
			<PageHeader
				title="Video Gallery"
				breadcrumb="Video Gallery"
			/>

			<div className="max-w-7xl mx-auto px-4 py-16">
				{/* Search Bar */}
				<div className="mb-12 max-w-2xl mx-auto">
					<SearchInput
						placeholder="Search video albums or titles..."
						onSearch={setSearchTerm}
					/>
				</div>
				{loading ? (
					<div className="flex justify-center py-20">
						<FaSpinner className="animate-spin h-10 w-10 text-primary" />
					</div>
				) : media.length === 0 ? (
					<div className="text-center py-20 bg-gray-50 rounded-xl">
						<FaPlay className="mx-auto text-4xl text-gray-300 mb-4" />
						<h3 className="text-xl font-bold text-gray-600">No videos found</h3>
						<p className="text-gray-500">Check back later for updates.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
						{Object.entries(
							media
								.filter(
									(item) =>
										(item.album || "General")
											.toLowerCase()
											.includes(searchTerm.toLowerCase()) ||
										item.title.toLowerCase().includes(searchTerm.toLowerCase())
								)
								.reduce((acc: Record<string, MediaItem[]>, item) => {
									const albumName = item.album || "General";
									if (!acc[albumName]) acc[albumName] = [];
									acc[albumName].push(item);
									return acc;
								}, {})
						).map(([albumName, items]) => (
							<VideoAlbumCard
								key={albumName}
								albumName={albumName}
								items={items}
								onClick={() => setSelectedAlbum({ name: albumName, items })}
							/>
						))}
					</div>
				)}
			</div>
			<AlbumViewModal
				isOpen={!!selectedAlbum}
				onClose={() => setSelectedAlbum(null)}
				albumName={selectedAlbum?.name || ""}
				items={selectedAlbum?.items || []}
			/>
		</PublicLayout>
	);
}

function VideoAlbumCard({
	albumName,
	items,
	onClick,
}: {
	albumName: string;
	items: MediaItem[];
	onClick: () => void;
}) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [heroIndex] = useState(() => Math.floor(Math.random() * items.length));

	useEffect(() => {
		if (!isHovered || items.length <= 1) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % items.length);
		}, 3000); // Slower cycle for videos

		return () => {
			clearInterval(interval);
			setCurrentIndex(heroIndex);
		};
	}, [isHovered, items.length, heroIndex]);

	const currentItem = items[currentIndex];

	return (
		<div
			className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer aspect-square bg-black border border-gray-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}>
			<video
				src={currentItem.url}
				className="w-full h-full object-cover transition-opacity duration-500 opacity-80 group-hover:opacity-100"
				muted
				playsInline
				autoPlay={isHovered}
				loop
			/>

			{/* Count Badge */}
			{items.length > 1 && (
				<div className="absolute top-4 right-4 bg-red-600/90 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-lg border border-white/20">
					{items.length} VIDEOS
				</div>
			)}

			<div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:scale-110 transition-transform duration-300">
				<div className="h-14 w-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 shadow-2xl opacity-80 group-hover:opacity-100">
					<FaPlay className="ml-1" />
				</div>
			</div>

			<div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/40 to-transparent p-6 pt-12">
				<h3 className="text-white font-extrabold text-lg leading-tight mb-1 drop-shadow-md">
					{albumName}
				</h3>
				{albumName !== "General" && items.length > 0 && (
					<p className="text-gray-300 text-xs font-medium uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
						{items[0].title}
					</p>
				)}
			</div>
		</div>
	);
}
