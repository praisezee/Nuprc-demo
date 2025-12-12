"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { FaArrowLeft, FaSave, FaCloudUploadAlt } from "react-icons/fa";

export default function CreatePublicationPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "Annual Reports",
		publishYear: new Date().getFullYear().toString(),
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
			// 1. Upload file first if exists
			let fileUrl = "";
			let fileSize = 0;
			let fileType = "";

			if (file) {
				const uploadFormData = new FormData();
				uploadFormData.append("file", file);
				uploadFormData.append("folder", "nuprc_publications");

				// Note: You need to make sure your API supports multipart/form-data for upload
				// and returns the URL. We are using the upload routes we created.
				const uploadRes = await api.post("/upload", uploadFormData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});

				fileUrl = uploadRes.data.data.url;
				fileSize = uploadRes.data.data.size;
				fileType = uploadRes.data.data.format;
			} else {
				alert("Please upload a file");
				setLoading(false);
				return;
			}

			// 2. Create publication record
			const pubData = {
				...formData,
				fileUrl,
				fileSize,
				fileType,
			};

			await api.post("/publications", pubData);
			router.push("/admin/publications");
		} catch (error) {
			console.error("Failed to create publication:", error);
			alert("Failed to create publication");
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
				<h1 className="text-2xl font-bold text-gray-800">Upload Publication</h1>
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
							placeholder="e.g. 2024 Annual Report"
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
								<option value="Annual Reports">Annual Reports</option>
								<option value="Operational Reports">Operational Reports</option>
								<option value="Production Status">Production Status</option>
								<option value="Gas Reports">Gas Reports</option>
								<option value="Oil Reports">Oil Reports</option>
								<option value="Acreage Reports">Acreage Reports</option>
								<option value="Upstream Gaze Magazine">Upstream Gaze Magazine</option>
							</select>
						</div>

						{/* Year */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Publish Year
							</label>
							<input
								type="number"
								value={formData.publishYear}
								onChange={(e) =>
									setFormData({ ...formData, publishYear: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
								min="1900"
								max="2100"
							/>
						</div>
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

					{/* File Upload */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Document (PDF, Doc)
						</label>
						<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
							<input
								type="file"
								required
								onChange={handleFileChange}
								accept=".pdf,.doc,.docx,.xls,.xlsx"
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							/>
							<FaCloudUploadAlt className="h-10 w-10 text-gray-400 mb-2" />
							{file ? (
								<p className="text-sm font-medium text-primary">{file.name}</p>
							) : (
								<p className="text-sm text-gray-500">Click or drag file to upload</p>
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
							{loading ? "Uploading..." : "Save Publication"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
