"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import { FaUpload, FaLink } from "react-icons/fa";

export default function EditAdPage() {
	const router = useRouter();
	const params = useParams();
	const id = params.id as string;

	const [loading, setLoading] = useState(false);
	const [fetching, setFetching] = useState(true);
	const [uploading, setUploading] = useState(false);
	const [inputMethod, setInputMethod] = useState<"url" | "upload">("url");
	const [formData, setFormData] = useState({
		title: "",
		type: "text" as "text" | "image" | "video" | "youtube",
		content: "",
		link: "",
		colSpan: 1,
		rowSpan: 1,
		status: "draft" as "draft" | "published",
		order: 0,
	});

	useEffect(() => {
		const fetchAd = async () => {
			try {
				const { data } = await api.get(`/ads/${id}`);
				const ad = data.data;
				setFormData({
					title: ad.title || "",
					type: ad.type,
					content: ad.content,
					link: ad.link || "",
					colSpan: ad.colSpan || 1,
					rowSpan: ad.rowSpan || 1,
					status: ad.status,
					order: ad.order || 0,
				});
			} catch (error) {
				console.error("Failed to fetch ad:", error);
				alert("Failed to load ad");
				router.push("/admin/ads");
			} finally {
				setFetching(false);
			}
		};

		if (id) {
			fetchAd();
		}
	}, [id, router]);

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setUploading(true);
		try {
			const formDataUpload = new FormData();
			formDataUpload.append("file", file);
			formDataUpload.append("folder", "nuprc_ads");

			const { data } = await api.post("/upload", formDataUpload, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			// Set the uploaded URL as content
			setFormData((prev) => ({
				...prev,
				content: data.data.url,
			}));

			alert("File uploaded successfully!");
		} catch (error) {
			console.error("Failed to upload file:", error);
			alert("Failed to upload file");
		} finally {
			setUploading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await api.put(`/ads/${id}`, formData);
			alert("Ad updated successfully!");
			router.push("/admin/ads");
		} catch (error: unknown) {
			console.error("Failed to update ad:", error);
			const err = error as { response?: { data?: { message?: string } } };
			alert(err.response?.data?.message || "Failed to update ad");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]:
				name === "colSpan" || name === "rowSpan" || name === "order"
					? parseInt(value) || 0
					: value,
		}));
	};

	const showFileUpload = formData.type === "image" || formData.type === "video";

	if (fetching) {
		return (
			<div className="flex justify-center items-center h-64">
				<div className="text-gray-500">Loading...</div>
			</div>
		);
	}

	return (
		<div className="max-w-3xl">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-gray-800">Edit Ad</h1>
				<p className="text-gray-600 mt-1">Update ad details</p>
			</div>

			<form
				onSubmit={handleSubmit}
				className="bg-white rounded-lg shadow p-6 space-y-6">
				{/* Title */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Title (Optional)
					</label>
					<input
						type="text"
						name="title"
						value={formData.title}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
						placeholder="Enter ad title"
					/>
				</div>

				{/* Type */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Type <span className="text-red-500">*</span>
					</label>
					<select
						name="type"
						value={formData.type}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
						<option value="text">Text</option>
						<option value="image">Image</option>
						<option value="video">Video</option>
						<option value="youtube">YouTube</option>
					</select>
					<p className="text-xs text-gray-500 mt-1">
						{formData.type === "text" && "Display text content"}
						{formData.type === "image" && "Upload image or provide URL"}
						{formData.type === "video" && "Upload video or provide URL"}
						{formData.type === "youtube" && "YouTube video ID"}
					</p>
				</div>

				{/* Input Method Toggle (for image/video) */}
				{showFileUpload && (
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Input Method
						</label>
						<div className="flex gap-4">
							<button
								type="button"
								onClick={() => setInputMethod("url")}
								className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
									inputMethod === "url"
										? "bg-primary text-white border-primary"
										: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
								}`}>
								<FaLink />
								URL
							</button>
							<button
								type="button"
								onClick={() => setInputMethod("upload")}
								className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
									inputMethod === "upload"
										? "bg-primary text-white border-primary"
										: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
								}`}>
								<FaUpload />
								Upload File
							</button>
						</div>
					</div>
				)}

				{/* Content */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Content <span className="text-red-500">*</span>
					</label>

					{formData.type === "text" ? (
						<textarea
							name="content"
							value={formData.content}
							onChange={handleChange}
							required
							rows={4}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							placeholder="Enter text content"
						/>
					) : showFileUpload && inputMethod === "upload" ? (
						<div className="space-y-2">
							<input
								type="file"
								accept={
									formData.type === "image"
										? "image/jpeg,image/png,image/gif,image/webp"
										: "video/mp4,video/mpeg"
								}
								onChange={handleFileUpload}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
								disabled={uploading}
							/>
							{uploading && <p className="text-sm text-primary">Uploading...</p>}
							{formData.content && (
								<div className="p-3 bg-green-50 border border-green-200 rounded-lg">
									<p className="text-sm text-green-800">✓ Current file URL</p>
									<p className="text-xs text-green-600 mt-1 truncate">
										{formData.content}
									</p>
								</div>
							)}
						</div>
					) : (
						<input
							type="text"
							name="content"
							value={formData.content}
							onChange={handleChange}
							required
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							placeholder={
								formData.type === "youtube" ? "e.g., dQw4w9WgXcQ" : "Enter URL"
							}
						/>
					)}
				</div>

				{/* Link */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Link (Optional)
					</label>
					<input
						type="text"
						name="link"
						value={formData.link}
						onChange={handleChange}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
						placeholder="e.g., /media/news"
					/>
					<p className="text-xs text-gray-500 mt-1">
						Where to navigate when the ad is clicked
					</p>
				</div>

				{/* Grid Layout */}
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Column Span
						</label>
						<select
							name="colSpan"
							value={formData.colSpan}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
							<option value={1}>1</option>
							<option value={2}>2</option>
							<option value={3}>3</option>
							<option value={4}>4</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Row Span
						</label>
						<select
							name="rowSpan"
							value={formData.rowSpan}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
							<option value={1}>1</option>
							<option value={2}>2</option>
						</select>
					</div>
				</div>

				{/* Status and Order */}
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Status
						</label>
						<select
							name="status"
							value={formData.status}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
							<option value="draft">Draft</option>
							<option value="published">Published</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Order
						</label>
						<input
							type="number"
							name="order"
							value={formData.order}
							onChange={handleChange}
							min={0}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							placeholder="0"
						/>
						<p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
					</div>
				</div>

				{/* Actions */}
				<div className="flex justify-end space-x-3 pt-4 border-t">
					<button
						type="button"
						onClick={() => router.back()}
						className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
						Cancel
					</button>
					<button
						type="submit"
						disabled={loading || uploading}
						className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors disabled:opacity-50">
						{loading ? "Updating..." : "Update Ad"}
					</button>
				</div>
			</form>
		</div>
	);
}
