"use client";

import React, { useState, useEffect } from "react";
import PublicLayout from "@/components/public/PublicLayout";
import PageHeader from "@/components/public/PageHeader";
import api from "@/lib/api";
import { FaSpinner, FaImage } from "react-icons/fa";
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

export default function GalleryPage() {
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
						type: "photo",
						limit: 50,
					},
				});
				setMedia(data.data);
			} catch (error) {
				console.error("Failed to fetch media:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchMedia();
	}, []);

	return (
		<PublicLayout>
			<PageHeader
				title="Photo Gallery"
				breadcrumb="Gallery"
			/>

			<div className="max-w-7xl mx-auto px-4 py-16">
				{/* Search Bar */}
				<div className="mb-12 max-w-2xl mx-auto">
					<SearchInput
						placeholder="Search albums or photo titles..."
						onSearch={setSearchTerm}
					/>
				</div>
				{loading ? (
					<div className="flex justify-center py-20">
						<FaSpinner className="animate-spin h-10 w-10 text-primary" />
					</div>
				) : media.length === 0 ? (
					<div className="text-center py-20 bg-gray-50 rounded-xl">
						<FaImage className="mx-auto text-4xl text-gray-300 mb-4" />
						<h3 className="text-xl font-bold text-gray-600">No media found</h3>
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
							<AlbumCard
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

function AlbumCard({
	albumName,
	items,
	onClick,
}: {
	albumName: string;
	items: MediaItem[];
	onClick: () => void;
}) {
	const [heroIndex] = useState(() => Math.floor(Math.random() * items.length));
	const [currentIndex, setCurrentIndex] = useState(heroIndex);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (!isHovered || items.length <= 1) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % items.length);
		}, 1500);

		return () => {
			clearInterval(interval);
			setCurrentIndex(heroIndex);
		};
	}, [isHovered, items.length, heroIndex]);

	const currentItem = items[currentIndex];

	return (
		<div
			className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer aspect-square bg-gray-900 border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}>
			<img
				src={currentItem.url}
				alt={currentItem.title}
				className="w-full h-full object-cover transition-all duration-700 brightness-90 group-hover:brightness-100 group-hover:scale-110"
			/>

			{/* Count Badge */}
			{items.length > 1 && (
				<div className="absolute top-4 right-4 bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-lg border border-white/20">
					{items.length} PHOTOS
				</div>
			)}

			<div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-6 pt-12">
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
