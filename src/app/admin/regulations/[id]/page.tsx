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

export default function EditRegulationPage() {
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
		category: "P.I.A",
		effectiveDate: "",
		status: "draft",
		tags: "",
	});

	useEffect(() => {
		const fetchRegulation = async () => {
			try {
				const { data } = await api.get(`/regulations/${id}`);
				const reg = data.data;

				// Format tags
				const tagsString = Array.isArray(reg.tags)
					? reg.tags.join(", ")
					: reg.tags || "";
				// Format date
				const dateStr = reg.effectiveDate
					? new Date(reg.effectiveDate).toISOString().split("T")[0]
					: "";

				setFormData({
					title: reg.title || "",
					description: reg.description || "",
					category: reg.category || "P.I.A",
					effectiveDate: dateStr,
					status: reg.status || "draft",
					tags: tagsString,
				});
				setCurrentFileUrl(reg.fileUrl);
			} catch (error) {
				console.error("Failed to fetch regulation:", error);
				alert("Failed to load regulation details");
				router.push("/admin/regulations");
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchRegulation();
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

			if (file) {
				const uploadFormData = new FormData();
				uploadFormData.append("file", file);
				uploadFormData.append("folder", "nuprc_regulations");

				const uploadRes = await api.post("/upload", uploadFormData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});

				fileUrl = uploadRes.data.data.url;
			}

			// 2. Update regulation record
			const processedData = {
				...formData,
				fileUrl,
				tags: formData.tags.split(",").map((t: string) => t.trim()),
			};

			await api.put(`/regulations/${id}`, processedData);
			router.push("/admin/regulations");
		} catch (error) {
			console.error("Failed to update regulation:", error);
			alert("Failed to update regulation");
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
				<h1 className="text-2xl font-bold text-gray-800">Edit Regulation</h1>
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
								<option value="Pre P.I.A">Pre P.I.A</option>
								<option value="P.I.A">P.I.A</option>
								<option value="Gazzetted Regulations">Gazzetted Regulations</option>
								<option value="Acts">Acts</option>
							</select>
						</div>

						{/* Effective Date */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Effective Date
							</label>
							<input
								type="date"
								required
								value={formData.effectiveDate}
								onChange={(e) =>
									setFormData({ ...formData, effectiveDate: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							/>
						</div>
					</div>

					{/* Status */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Status
						</label>
						<select
							value={formData.status}
							onChange={(e) => setFormData({ ...formData, status: e.target.value })}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
							<option value="draft">Draft</option>
							<option value="published">Published</option>
						</select>
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
								accept=".pdf"
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							/>
							<FaCloudUploadAlt className="h-10 w-10 text-gray-400 mb-2" />
							{file ? (
								<p className="text-sm font-medium text-primary">{file.name}</p>
							) : (
								<p className="text-sm text-gray-500">
									Click or drag new PDF to replace
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
							{saving ? "Updating..." : "Update Regulation"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
