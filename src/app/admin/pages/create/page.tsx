"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { FaArrowLeft, FaSave } from "react-icons/fa";

export default function CreatePagePage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		slug: "",
		content: "", // This will hold raw HTML or text for now
		isPublished: false,
		metaTitle: "",
		metaDescription: "",
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			// Basic slug generation if empty
			const slug =
				formData.slug ||
				formData.title
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-")
					.replace(/(^-|-$)/g, "");

			const pageData = {
				...formData,
				slug,
				// sections: [] // We might want to implement sections later
			};

			await api.post("/pages", pageData);
			router.push("/admin/pages");
		} catch (error) {
			console.error("Failed to create page:", error);
			alert("Failed to create page");
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
				<h1 className="text-2xl font-bold text-gray-800">Create Private Page</h1>
			</div>

			<div className="bg-white rounded-lg shadow p-6">
				<form
					onSubmit={handleSubmit}
					className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Title */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Page Title
							</label>
							<input
								type="text"
								required
								value={formData.title}
								onChange={(e) => setFormData({ ...formData, title: e.target.value })}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
								placeholder="e.g. History of NUPRC"
							/>
						</div>

						{/* Slug */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Slug (URL Path)
							</label>
							<input
								type="text"
								value={formData.slug}
								onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
								placeholder="Leave empty to auto-generate from title"
							/>
						</div>
					</div>

					{/* Status */}
					<div className="flex items-center">
						<input
							id="isPublished"
							type="checkbox"
							checked={formData.isPublished}
							onChange={(e) =>
								setFormData({ ...formData, isPublished: e.target.checked })
							}
							className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
						/>
						<label
							htmlFor="isPublished"
							className="ml-2 block text-sm text-gray-900">
							Publish Page
						</label>
					</div>

					{/* Content */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Page Content (HTML)
						</label>
						<textarea
							rows={15}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm"
							value={formData.content}
							onChange={(e) => setFormData({ ...formData, content: e.target.value })}
							placeholder="<p>Enter your page content here...</p>"
						/>
						<p className="text-xs text-gray-500 mt-1">
							Raw HTML supported. Rich text editor coming soon.
						</p>
					</div>

					{/* SEO Metadata */}
					<div className="border-t pt-4">
						<h3 className="text-lg font-medium text-gray-900 mb-4">SEO Settings</h3>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Meta Title
								</label>
								<input
									type="text"
									value={formData.metaTitle}
									onChange={(e) =>
										setFormData({ ...formData, metaTitle: e.target.value })
									}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Meta Description
								</label>
								<textarea
									rows={2}
									value={formData.metaDescription}
									onChange={(e) =>
										setFormData({ ...formData, metaDescription: e.target.value })
									}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
								/>
							</div>
						</div>
					</div>

					{/* Submit */}
					<div className="flex justify-end pt-4">
						<button
							type="submit"
							disabled={loading}
							className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg flex items-center transition-colors shadow-sm disabled:opacity-50">
							<FaSave className="mr-2" />
							{loading ? "Saving..." : "Save Page"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
