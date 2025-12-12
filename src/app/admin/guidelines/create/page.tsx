"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { FaArrowLeft, FaSave, FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";

export default function CreateGuidelinePage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "Guidelines", // Hardcoded
		effectiveDate: new Date().toISOString().split("T")[0],
		status: "draft",
		tags: "",
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			// 1. Upload file
			let fileUrl = "";
			if (file) {
				const uploadFormData = new FormData();
				uploadFormData.append("file", file);
				uploadFormData.append("folder", "nuprc_guidelines");

				const uploadRes = await api.post("/upload", uploadFormData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});

				fileUrl = uploadRes.data.data.url;
			} else {
				toast.error("Please upload a document");
				setLoading(false);
				return;
			}

			// 2. Create guideline record
			const processedData = {
				...formData,
				fileUrl,
				tags: formData.tags.split(",").map((t) => t.trim()),
			};

			await api.post("/regulations", processedData);
			toast.success("Guideline created successfully");
			router.push("/admin/guidelines");
		} catch (error) {
			console.error("Failed to create guideline:", error);
			toast.error("Failed to create guideline");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="flex items-center mb-6">
				<button
					onClick={() => router.back()}
					className="mr-3 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
					<FaArrowLeft />
				</button>
				<h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
					Add New Guideline
				</h1>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-2xl">
				<form
					onSubmit={handleSubmit}
					className="space-y-6">
					{/* Title */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Title
						</label>
						<input
							type="text"
							required
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
							placeholder="e.g. Flare Gas Guidelines"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Effective Date */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
								Effective Date
							</label>
							<input
								type="date"
								required
								value={formData.effectiveDate}
								onChange={(e) =>
									setFormData({ ...formData, effectiveDate: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
							/>
						</div>

						{/* Status */}
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
								Status
							</label>
							<select
								value={formData.status}
								onChange={(e) => setFormData({ ...formData, status: e.target.value })}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
								<option value="draft">Draft</option>
								<option value="published">Published</option>
							</select>
						</div>
					</div>

					{/* Description */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Description (Optional)
						</label>
						<textarea
							rows={3}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
							value={formData.description}
							onChange={(e) =>
								setFormData({ ...formData, description: e.target.value })
							}
						/>
					</div>

					{/* Tags */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Tags (comma separated)
						</label>
						<input
							type="text"
							value={formData.tags}
							onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
							placeholder="guideline, technical, gas"
						/>
					</div>

					{/* File Upload */}
					<div>
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							Document (PDF)
						</label>
						<div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer relative">
							<input
								type="file"
								required
								onChange={handleFileChange}
								accept=".pdf"
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							/>
							<FaCloudUploadAlt className="h-10 w-10 text-gray-400 dark:text-gray-500 mb-2" />
							{file ? (
								<p className="text-sm font-medium text-primary">{file.name}</p>
							) : (
								<p className="text-sm text-gray-500 dark:text-gray-400">
									Click or drag PDF file to upload
								</p>
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
							{loading ? "Saving..." : "Save Guideline"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
