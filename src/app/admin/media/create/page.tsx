"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import {
	FaArrowLeft,
	FaSave,
	FaCloudUploadAlt,
	FaImage,
	FaVideo,
} from "react-icons/fa";

export default function CreateMediaPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string>("");
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		type: "photo" as "photo" | "video",
		category: "General",
		album: "",
		tags: "",
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			setFile(selectedFile);

			// Create local preview URL
			const objectUrl = URL.createObjectURL(selectedFile);
			setPreviewUrl(objectUrl);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			// 1. Upload file
			let uploadData;
			if (file) {
				const uploadFormData = new FormData();
				uploadFormData.append("file", file);
				uploadFormData.append("folder", "nuprc_media");

				const uploadRes = await api.post("/upload", uploadFormData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});

				uploadData = uploadRes.data.data;
			} else {
				alert("Please upload a media file");
				setLoading(false);
				return;
			}

			// 2. Create media record
			const mediaData = {
				title: formData.title,
				description: formData.description,
				type: formData.type,
				url: uploadData.url,
				thumbnailUrl:
					formData.type === "video"
						? uploadData.url.replace(/\.[^/.]+$/, ".jpg")
						: uploadData.url, // Simple thumbnail logic for now
				category: formData.category,
				album: formData.album,
				tags: formData.tags.split(",").map((t) => t.trim()),
			};

			await api.post("/media", mediaData);
			router.push("/admin/media");
		} catch (error) {
			console.error("Failed to create media:", error);
			alert("Failed to create media item");
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
				<h1 className="text-2xl font-bold text-gray-800">Upload Media</h1>
			</div>

			<div className="bg-white rounded-lg shadow p-6 max-w-2xl">
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
							placeholder="e.g. Annual Conference 2024"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Type */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Media Type
							</label>
							<div className="flex space-x-4">
								<button
									type="button"
									onClick={() => setFormData({ ...formData, type: "photo" })}
									className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center border transition-all ${
										formData.type === "photo"
											? "bg-blue-50 border-blue-500 text-blue-700" // Using blue for photo
											: "border-gray-300 text-gray-600 hover:bg-gray-50"
									}`}>
									<FaImage className="mr-2" /> Photo
								</button>
								<button
									type="button"
									onClick={() => setFormData({ ...formData, type: "video" })}
									className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center border transition-all ${
										formData.type === "video"
											? "bg-red-50 border-red-500 text-red-700" // Using red for video
											: "border-gray-300 text-gray-600 hover:bg-gray-50"
									}`}>
									<FaVideo className="mr-2" /> Video
								</button>
							</div>
						</div>

						{/* Category */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Category
							</label>
							<select
								value={formData.category}
								onChange={(e) => setFormData({ ...formData, category: e.target.value })}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
								<option value="General">General</option>
								<option value="Events">Events</option>
								<option value="Inspections">Inspections</option>
								<option value="Conferences">Conferences</option>
								<option value="CSR">CSR</option>
							</select>
						</div>
					</div>

					{/* Album */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Album Name (Optional)
						</label>
						<input
							type="text"
							value={formData.album}
							onChange={(e) => setFormData({ ...formData, album: e.target.value })}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							placeholder="e.g. 2024 Licensing Round"
						/>
					</div>

					{/* Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Description (Optional)
						</label>
						<textarea
							rows={3}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
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
							placeholder="event, 2024, lagos"
						/>
					</div>

					{/* File Upload */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							File Upload
						</label>
						<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative overflow-hidden">
							<input
								type="file"
								required
								onChange={handleFileChange}
								accept={formData.type === "photo" ? "image/*" : "video/*"}
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
							/>

							{previewUrl && formData.type === "photo" ? (
								<img
									src={previewUrl}
									alt="Preview"
									className="h-48 object-contain mb-2"
								/>
							) : previewUrl && formData.type === "video" ? (
								<video
									src={previewUrl}
									className="h-48 mb-2"
									controls
								/>
							) : (
								<>
									<FaCloudUploadAlt className="h-10 w-10 text-gray-400 mb-2" />
									<p className="text-sm text-gray-500">
										Click or drag {formData.type === "photo" ? "image" : "video"} to
										upload
									</p>
								</>
							)}
							{file && (
								<p className="text-sm font-medium text-primary mt-2">{file.name}</p>
							)}
						</div>
					</div>

					{/* Submit */}
					<div className="flex justify-end pt-4">
						<button
							type="submit"
							disabled={loading}
							className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg flex items-center transition-colors shadow-sm disabled:opacity-50">
							<FaSave className="mr-2" />
							{loading ? "Uploading..." : "Save Media"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
