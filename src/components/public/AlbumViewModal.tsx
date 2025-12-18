"use client";

import React from "react";
import { FaTimes, FaImage, FaPlay } from "react-icons/fa";

interface MediaItem {
	_id: string;
	title: string;
	type: "photo" | "video";
	url: string;
	caption?: string;
}

interface AlbumViewModalProps {
	isOpen: boolean;
	onClose: () => void;
	albumName: string;
	items: MediaItem[];
}

export default function AlbumViewModal({
	isOpen,
	onClose,
	albumName,
	items,
}: AlbumViewModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/90 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal Content */}
			<div className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
				{/* Header */}
				<div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
					<div>
						<h2 className="text-2xl font-black text-primary">{albumName}</h2>
						<p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
							{items.length} {items[0]?.type === "photo" ? "Photos" : "Videos"}
						</p>
					</div>
					<button
						onClick={onClose}
						className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:text-red-500 transition-all hover:scale-110">
						<FaTimes />
					</button>
				</div>

				{/* Grid */}
				<div className="flex-grow overflow-y-auto p-8 bg-gray-50/30">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{items.map((item) => (
							<div
								key={item._id}
								className="group relative rounded-2xl overflow-hidden bg-black shadow-lg aspect-auto min-h-[250px] border border-gray-200">
								{item.type === "photo" ? (
									<img
										src={item.url}
										alt={item.title}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								) : (
									<video
										src={item.url}
										className="w-full h-full object-cover"
										controls
									/>
								)}

								{/* Overlay for Photos */}
								{item.type === "photo" && (
									<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
										<p className="text-white font-bold text-sm">{item.title}</p>
										{item.caption && (
											<p className="text-gray-300 text-xs mt-1 line-clamp-2">
												{item.caption}
											</p>
										)}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
