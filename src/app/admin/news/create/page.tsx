"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import api from "@/lib/api";
import { useToast } from "@/context/ToastContext";
// import { Editor } from '@/components/Editor'; // Placeholder for Rich Text Editor
import { FaArrowLeft, FaSave, FaCloudUploadAlt, FaTimes } from "react-icons/fa";

export default function CreateNewsPage() {
	const router = useRouter();
	const { showToast } = useToast();
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		excerpt: "",
		content: "",
		category: "Press Release",
		tags: "",
		status: "draft",
		featuredImage: "",
		images: [] as string[],
		publishedAt: new Date().toISOString().split("T")[0], // Default to today
	});

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		setUploading(true);
		try {
			const newImages: string[] = [];

			for (const file of Array.from(files)) {
				const uploadFormData = new FormData();
				uploadFormData.append("file", file);
				uploadFormData.append("folder", "news");

				const { data } = await api.post("/upload", uploadFormData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				newImages.push(data.data.url);
			}

			setFormData((prev) => ({
				...prev,
				featuredImage: prev.featuredImage || newImages[0],
				images: [...prev.images, ...newImages],
			}));
			showToast(`${newImages.length} image(s) uploaded successfully`, "success");
		} catch (error) {
			console.error("Upload failed:", error);
			showToast("Failed to upload image(s)", "error");
		} finally {
			setUploading(false);
		}
	};

	const removeImage = (index: number) => {
		setFormData((prev) => {
			const newImages = [...prev.images];
			const removed = newImages.splice(index, 1)[0];
			let newFeatured = prev.featuredImage;
			if (removed === prev.featuredImage) {
				newFeatured = newImages.length > 0 ? newImages[0] : "";
			}
			return { ...prev, images: newImages, featuredImage: newFeatured };
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Process tags
			const processedData = {
				...formData,
				tags: formData.tags.split(",").map((t) => t.trim()),
			};

			await api.post("/news", processedData);
			showToast("Article created successfully", "success");
			router.push("/admin/news");
		} catch (error) {
			console.error("Failed to create news:", error);
			showToast("Failed to create article", "error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="flex items-center mb-6">
				<button
					onClick={() => router.back()}
					className="mr-3 text-gray-600 hover:text-gray-900">
					<FaArrowLeft />
				</button>
				<h1 className="text-2xl font-bold text-gray-800">Create News Article</h1>
			</div>

			<div className="bg-white rounded-lg shadow p-6">
				<form
					onSubmit={handleSubmit}
					className="space-y-6">
					{/* Title */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Title
						</label>
						<input
							type="text"
							required
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							placeholder="Article Title"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Category */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Category
							</label>
							<select
								value={formData.category}
								onChange={(e) => setFormData({ ...formData, category: e.target.value })}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
								<option value="Press Release">Press Release</option>
								<option value="News">News</option>
								<option value="Bulletin">Bulletin</option>
								<option value="Event">Event</option>
							</select>
						</div>

						{/* Status */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Status
							</label>
							<select
								value={formData.status}
								onChange={(e) =>
									setFormData({ ...formData, status: e.target.value }) as any
								}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
								<option value="draft">Draft</option>
								<option value="published">Published</option>
							</select>
						</div>
					</div>

					{/* Featured Image & Gallery */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Images (First one will be featured)
						</label>
						<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-4">
							{formData.images.map((img, idx) => (
								<div
									key={idx}
									className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
										formData.featuredImage === img ? "border-primary" : "border-gray-200"
									}`}>
									<Image
										src={img}
										alt={`Gallery ${idx}`}
										fill
										className="object-cover"
									/>
									<button
										type="button"
										onClick={() => removeImage(idx)}
										className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors z-10">
										<FaTimes className="text-[10px]" />
									</button>
									{formData.featuredImage === img && (
										<div className="absolute inset-x-0 bottom-0 bg-primary/80 text-white text-[10px] py-0.5 text-center font-bold">
											FEATURED
										</div>
									)}
								</div>
							))}
							<label className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
								<input
									type="file"
									multiple
									onChange={handleFileChange}
									className="sr-only"
									accept="image/*"
								/>
								<FaCloudUploadAlt className="text-gray-400 text-2xl mb-1" />
								<span className="text-[10px] text-gray-500 font-medium">Add Image</span>
							</label>
						</div>
					</div>

					{/* Excerpt */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Excerpt (Short Summary)
						</label>
						<textarea
							rows={3}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							value={formData.excerpt}
							onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
						/>
					</div>

					{/* Content (Rich Text Placeholder) */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Content
						</label>
						<textarea
							rows={10}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
							value={formData.content}
							onChange={(e) => setFormData({ ...formData, content: e.target.value })}
							placeholder="Content here... (Rich text editor integration coming next)"
						/>
					</div>

					{/* Tags */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Tags (comma separated)
						</label>
						<input
							type="text"
							value={formData.tags}
							onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							placeholder="oil, gas, regulation"
						/>
					</div>

					{/* Submit */}
					<div className="flex justify-end pt-4">
						<button
							type="submit"
							disabled={loading || uploading}
							className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg flex items-center transition-colors shadow-sm disabled:opacity-50">
							<FaSave className="mr-2" />
							{loading ? "Saving..." : "Save Article"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
