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
		publishedAt: new Date().toISOString().split("T")[0], // Default to today
	});

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);
		formData.append("folder", "news");

		setUploading(true);
		try {
			const { data } = await api.post("/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setFormData((prev) => ({ ...prev, featuredImage: data.data.url }));
			showToast("Image uploaded successfully", "success");
		} catch (error) {
			console.error("Upload failed:", error);
			showToast("Failed to upload image", "error");
		} finally {
			setUploading(false);
		}
	};

	const removeImage = () => {
		setFormData((prev) => ({ ...prev, featuredImage: "" }));
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

					{/* Featured Image */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Featured Image
						</label>
						<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg relative">
							{formData.featuredImage ? (
								<div className="relative w-full h-48">
									<Image
										src={formData.featuredImage}
										alt="Featured"
										fill
										className="object-cover rounded-md"
									/>
									<button
										type="button"
										onClick={removeImage}
										className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors">
										<FaTimes />
									</button>
								</div>
							) : (
								<div className="space-y-1 text-center">
									{uploading ? (
										<div className="text-gray-500">Uploading...</div>
									) : (
										<>
											<FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
											<div className="flex text-sm text-gray-600">
												<label
													htmlFor="file-upload"
													className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
													<span>Upload a file</span>
													<input
														id="file-upload"
														name="file-upload"
														type="file"
														className="sr-only"
														accept="image/*"
														onChange={handleFileChange}
													/>
												</label>
												<p className="pl-1">or drag and drop</p>
											</div>
											<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
										</>
									)}
								</div>
							)}
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
