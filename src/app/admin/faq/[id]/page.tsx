"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import { FaArrowLeft, FaSave, FaSpinner } from "react-icons/fa";

export default function EditFAQPage() {
	const router = useRouter();
	const params = useParams();
	const { id } = params;

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [formData, setFormData] = useState({
		question: "",
		answer: "",
		category: "General",
		isPublished: true,
		order: 0,
	});

	useEffect(() => {
		const fetchFAQ = async () => {
			try {
				const { data } = await api.get(`/faq/${id}`);
				const faq = data.data;

				setFormData({
					question: faq.question || "",
					answer: faq.answer || "",
					category: faq.category || "General",
					isPublished: faq.isPublished ?? true,
					order: faq.order || 0,
				});
			} catch (error) {
				console.error("Failed to fetch FAQ:", error);
				alert("Failed to load FAQ details");
				router.push("/admin/faq");
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchFAQ();
		}
	}, [id, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);

		try {
			await api.put(`/faq/${id}`, formData);
			router.push("/admin/faq");
		} catch (error) {
			console.error("Failed to update FAQ:", error);
			alert("Failed to update FAQ");
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
				<h1 className="text-2xl font-bold text-gray-800">Edit FAQ</h1>
			</div>

			<div className="bg-white rounded-lg shadow p-6 max-w-2xl">
				<form
					onSubmit={handleSubmit}
					className="space-y-6">
					{/* Question */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Question
						</label>
						<input
							type="text"
							required
							value={formData.question}
							onChange={(e) => setFormData({ ...formData, question: e.target.value })}
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
								<option value="General">General</option>
								<option value="Licensing">Licensing</option>
								<option value="Operations">Operations</option>
								<option value="Royalties">Royalties</option>
								<option value="Health & Safety">Health & Safety</option>
							</select>
						</div>

						{/* Order */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Display Order
							</label>
							<input
								type="number"
								value={formData.order}
								onChange={(e) =>
									setFormData({ ...formData, order: parseInt(e.target.value) })
								}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
								min="0"
							/>
						</div>
					</div>

					{/* Answer */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Answer
						</label>
						<textarea
							rows={5}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							value={formData.answer}
							onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
						/>
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
							Published
						</label>
					</div>

					{/* Submit */}
					<div className="flex justify-end pt-4">
						<button
							type="submit"
							disabled={saving}
							className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg flex items-center transition-colors shadow-sm disabled:opacity-50">
							<FaSave className="mr-2" />
							{saving ? "Updating..." : "Update FAQ"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
