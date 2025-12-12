"use client";

import React, { useState, useEffect } from "react";
import PublicLayout from "@/components/public/PublicLayout";
import PageHeader from "@/components/public/PageHeader";
import api from "@/lib/api";
import { FaSpinner, FaImage } from "react-icons/fa";

interface MediaItem {
	_id: string;
	title: string;
	type: "photo" | "video";
	url: string;
	caption?: string;
	createdAt: string;
}

export default function GalleryPage() {
	const [media, setMedia] = useState<MediaItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMedia = async () => {
			setLoading(true);
			try {
				const { data } = await api.get("/media", {
					params: {
						type: "photo",
						limit: 12,
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
				{/* Content */}
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
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
						{media.map((item) => (
							<div
								key={item._id}
								className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer aspect-square bg-gray-200">
								<img
									src={item.url}
									alt={item.title}
									className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
								/>

								{/* Overlay */}
								<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
									<h3 className="text-white font-bold mb-1">{item.title}</h3>
									<p className="text-gray-300 text-xs line-clamp-2">{item.caption}</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</PublicLayout>
	);
}
