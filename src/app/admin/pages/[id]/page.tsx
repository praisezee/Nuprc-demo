"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import { FaArrowLeft, FaSave, FaSpinner } from "react-icons/fa";

export default function EditPagePage() {
	const router = useRouter();
	const params = useParams();
	const { id } = params;

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		slug: "",
		content: "",
		isPublished: false,
		metaTitle: "",
		metaDescription: "",
	});

	useEffect(() => {
		const fetchPage = async () => {
			try {
				const { data } = await api.get(`/pages/id/${id}`);
				const page = data.data;

				setFormData({
					title: page.title || "",
					slug: page.slug || "",
					content: page.content || "",
					isPublished: page.isPublished || false,
					metaTitle: page.metaTitle || "",
					metaDescription: page.metaDescription || "",
				});
			} catch (error) {
				console.error("Failed to fetch page:", error);
				alert("Failed to load page details");
				router.push("/admin/pages");
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchPage();
		}
	}, [id, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);

		try {
			const pageData = {
				...formData,
				// sections: [] // Preserve sections if they exist? API update likely handles this
			};

			await api.put(`/pages/${id}`, pageData);
			router.push("/admin/pages");
		} catch (error) {
			console.error("Failed to update page:", error);
			alert("Failed to update page");
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
				<h1 className="text-2xl font-bold text-gray-800">Edit Page</h1>
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
						/>
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
							disabled={saving}
							className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg flex items-center transition-colors shadow-sm disabled:opacity-50">
							<FaSave className="mr-2" />
							{saving ? "Updating..." : "Update Page"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
