"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import {
	FaPlus,
	FaTrash,
	FaSearch,
	FaImage,
	FaVideo,
	FaExternalLinkAlt,
} from "react-icons/fa";

interface MediaItem {
	_id: string;
	title: string;
	type: "photo" | "video";
	thumbnailUrl: string;
	url: string;
	category: string;
	createdAt: string;
}

export default function MediaListPage() {
	const [media, setMedia] = useState<MediaItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [type, setType] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchMedia = async () => {
		try {
			setLoading(true);
			const { data } = await api.get("/media", {
				params: {
					page,
					limit: 12, // Grid view needs more items
					search: searchTerm,
					type: type || undefined,
				},
			});
			setMedia(data.data);
			setTotalPages(data.pagination?.pages || 1);
		} catch (error) {
			console.error("Failed to fetch media:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMedia();
	}, [page, searchTerm, type]);

	const handleDelete = async (id: string) => {
		if (confirm("Are you sure you want to delete this media item?")) {
			try {
				await api.delete(`/media/${id}`);
				fetchMedia();
			} catch (error) {
				console.error("Failed to delete media:", error);
				alert("Failed to delete media");
			}
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">Media Gallery</h1>
				<Link
					href="/admin/media/create"
					className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center transition-colors">
					<FaPlus className="mr-2" /> Upload Media
				</Link>
			</div>

			{/* Filters */}
			<div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Search */}
				<div className="relative">
					<input
						type="text"
						placeholder="Search media..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
					/>
					<FaSearch className="absolute left-3 top-3 text-gray-400" />
				</div>

				{/* Type Filter */}
				<select
					value={type}
					onChange={(e) => setType(e.target.value)}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
					<option value="">All Types</option>
					<option value="photo">Photos</option>
					<option value="video">Videos</option>
				</select>
			</div>

			{/* Grid View */}
			{loading ? (
				<div className="text-center py-10">Loading...</div>
			) : media.length === 0 ? (
				<div className="text-center py-10 text-gray-500">No media found.</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{media.map((item) => (
						<div
							key={item._id}
							className="bg-white rounded-lg shadow overflow-hidden group">
							<div className="relative h-48 bg-gray-200">
								{item.type === "photo" ? (
									<img
										src={item.thumbnailUrl || item.url}
										alt={item.title}
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
										<FaVideo className="h-12 w-12 opacity-50" />
									</div>
								)}
								{/* Overlay Actions */}
								<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
									<a
										href={item.url}
										target="_blank"
										rel="noopener noreferrer"
										className="p-2 bg-white rounded-full text-blue-600 hover:text-blue-800"
										title="View">
										<FaExternalLinkAlt />
									</a>
									<button
										onClick={() => handleDelete(item._id)}
										className="p-2 bg-white rounded-full text-red-600 hover:text-red-800"
										title="Delete">
										<FaTrash />
									</button>
								</div>
								<div className="absolute top-2 right-2">
									<span
										className={`px-2 py-1 text-xs font-semibold rounded-full ${
											item.type === "photo"
												? "bg-blue-100 text-blue-800"
												: "bg-red-100 text-red-800"
										}`}>
										{item.type}
									</span>
								</div>
							</div>
							<div className="p-4">
								<h3
									className="text-sm font-medium text-gray-900 truncate"
									title={item.title}>
									{item.title}
								</h3>
								<p className="text-xs text-gray-500 mt-1">{item.category}</p>
								<p className="text-xs text-gray-400 mt-1">
									{new Date(item.createdAt).toLocaleDateString()}
								</p>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Pagination component would go here (similar to other pages) */}
		</div>
	);
}
