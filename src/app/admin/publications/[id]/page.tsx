"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import {
	FaArrowLeft,
	FaSave,
	FaCloudUploadAlt,
	FaSpinner,
} from "react-icons/fa";

export default function EditPublicationPage() {
	const router = useRouter();
	const params = useParams();
	const { id } = params;

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [currentFileUrl, setCurrentFileUrl] = useState("");
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		category: "Annual Reports",
		publishYear: new Date().getFullYear().toString(),
	});

	useEffect(() => {
		const fetchPublication = async () => {
			try {
				const { data } = await api.get(`/publications/${id}`);
				const pub = data.data;

				setFormData({
					title: pub.title || "",
					description: pub.description || "",
					category: pub.category || "Annual Reports",
					publishYear: pub.publishYear || new Date().getFullYear().toString(),
				});
				setCurrentFileUrl(pub.fileUrl);
			} catch (error) {
				console.error("Failed to fetch publication:", error);
				alert("Failed to load publication details");
				router.push("/admin/publications");
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchPublication();
		}
	}, [id, router]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);

		try {
			// 1. Upload new file if selected
			let fileUrl = currentFileUrl;
			let fileSize;
			let fileType;

			if (file) {
				const uploadFormData = new FormData();
				uploadFormData.append("file", file);
				uploadFormData.append("folder", "nuprc_publications");

				const uploadRes = await api.post("/upload", uploadFormData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});

				fileUrl = uploadRes.data.data.url;
				fileSize = uploadRes.data.data.size;
				fileType = uploadRes.data.data.format;
			}

			// 2. Update publication record
			const pubData = {
				...formData,
				...(file && { fileUrl, fileSize, fileType }), // Only update file info if new file uploaded
			};

			await api.put(`/publications/${id}`, pubData);
			router.push("/admin/publications");
		} catch (error) {
			console.error("Failed to update publication:", error);
			alert("Failed to update publication");
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<FaSpinner className="animate-spin h-8 w-8 text-primary" />
			</div>
		);
	}

	return (
		<div>
			<div className="flex items-center mb-6">
				<button
					onClick={() => router.back()}
					className="mr-3 text-gray-600 hover:text-gray-900">
					<FaArrowLeft />
				</button>
				<h1 className="text-2xl font-bold text-gray-800">Edit Publication</h1>
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
							Update Document (Optional)
						</label>
						{currentFileUrl && (
							<div className="mb-2 text-sm text-gray-600">
								Current file:{" "}
								<a
									href={currentFileUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline">
									View File
								</a>
							</div>
						)}
						<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
							<input
								type="file"
								onChange={handleFileChange}
								accept=".pdf,.doc,.docx,.xls,.xlsx"
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							/>
							<FaCloudUploadAlt className="h-10 w-10 text-gray-400 mb-2" />
							{file ? (
								<p className="text-sm font-medium text-primary">{file.name}</p>
							) : (
								<p className="text-sm text-gray-500">
									Click or drag new file to replace current one
								</p>
							)}
						</div>
					</div>

					{/* Submit */}
					<div className="flex justify-end pt-4">
						<button
							type="submit"
							disabled={saving}
							className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg flex items-center transition-colors shadow-sm disabled:opacity-50">
							<FaSave className="mr-2" />
							{saving ? "Updating..." : "Update Publication"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
