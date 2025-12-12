"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { FaArrowLeft, FaSave } from "react-icons/fa";

export default function CreatePortalPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		url: "",
		category: "Regulatory",
		isActive: true,
		isExternal: true, // Most portals are external
		requiresAuth: true,
		order: 0,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			await api.post("/portals", formData);
			router.push("/admin/portals");
		} catch (error) {
			console.error("Failed to create portal:", error);
			alert("Failed to create portal");
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
				<h1 className="text-2xl font-bold text-gray-800">Add Portal Link</h1>
			</div>

			<div className="bg-white rounded-lg shadow p-6 max-w-2xl">
				<form
					onSubmit={handleSubmit}
					className="space-y-6">
					{/* Name */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Portal Name
						</label>
						<input
							type="text"
							required
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							placeholder="e.g. NUPRC Remita Payment Portal"
						/>
					</div>

					{/* URL */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							URL
						</label>
						<input
							type="url"
							required
							value={formData.url}
							onChange={(e) => setFormData({ ...formData, url: e.target.value })}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							placeholder="https://..."
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
								<option value="Regulatory">Regulatory</option>
								<option value="Operational">Operational</option>
								<option value="Financial">Financial</option>
								<option value="Services">Services</option>
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

					{/* checkboxes */}
					<div className="flex space-x-6">
						<div className="flex items-center">
							<input
								id="isActive"
								type="checkbox"
								checked={formData.isActive}
								onChange={(e) =>
									setFormData({ ...formData, isActive: e.target.checked })
								}
								className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
							/>
							<label
								htmlFor="isActive"
								className="ml-2 block text-sm text-gray-900">
								Active
							</label>
						</div>
						<div className="flex items-center">
							<input
								id="isExternal"
								type="checkbox"
								checked={formData.isExternal}
								onChange={(e) =>
									setFormData({ ...formData, isExternal: e.target.checked })
								}
								className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
							/>
							<label
								htmlFor="isExternal"
								className="ml-2 block text-sm text-gray-900">
								External Link
							</label>
						</div>
						<div className="flex items-center">
							<input
								id="requiresAuth"
								type="checkbox"
								checked={formData.requiresAuth}
								onChange={(e) =>
									setFormData({ ...formData, requiresAuth: e.target.checked })
								}
								className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
							/>
							<label
								htmlFor="requiresAuth"
								className="ml-2 block text-sm text-gray-900">
								Requires Login
							</label>
						</div>
					</div>

					{/* Submit */}
					<div className="flex justify-end pt-4">
						<button
							type="submit"
							disabled={loading}
							className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg flex items-center transition-colors shadow-sm disabled:opacity-50">
							<FaSave className="mr-2" />
							{loading ? "Saving..." : "Save Portal"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
