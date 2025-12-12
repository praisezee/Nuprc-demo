"use client";

import React, { useState, useEffect } from "react";
import api from "@/lib/api";
import { FaSave, FaSpinner, FaCog } from "react-icons/fa";

export default function SettingsPage() {
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [formData, setFormData] = useState({
		siteName: "",
		contactEmail: "",
		contactPhone: "",
		address: "",
		twitterUrl: "",
		facebookUrl: "",
		linkedinUrl: "",
		instagramUrl: "",
	});

	useEffect(() => {
		const fetchSettings = async () => {
			try {
				const { data } = await api.get("/settings");
				// Assuming API returns settings object, or default values if not set
				if (data.data) {
					setFormData({
						siteName: data.data.siteName || "NUPRC",
						contactEmail: data.data.contactEmail || "",
						contactPhone: data.data.contactPhone || "",
						address: data.data.address || "",
						twitterUrl: data.data.twitterUrl || "",
						facebookUrl: data.data.facebookUrl || "",
						linkedinUrl: data.data.linkedinUrl || "",
						instagramUrl: data.data.instagramUrl || "",
					});
				}
			} catch (error) {
				console.error("Failed to fetch settings:", error);
				// Don't alert here, just let it be empty/defaults if first time
			} finally {
				setLoading(false);
			}
		};

		fetchSettings();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);

		try {
			await api.put("/settings", formData); // Assuming PUT /settings updates the singleton settings doc
			alert("Settings saved successfully");
		} catch (error) {
			console.error("Failed to save settings:", error);
			alert("Failed to save settings");
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
				<FaCog className="text-gray-600 mr-3 h-6 w-6" />
				<h1 className="text-2xl font-bold text-gray-800">General Settings</h1>
			</div>

			<div className="bg-white rounded-lg shadow p-6 max-w-3xl">
				<form
					onSubmit={handleSubmit}
					className="space-y-8">
					{/* General Information */}
					<section>
						<h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
							Site Information
						</h3>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Site Name
								</label>
								<input
									type="text"
									value={formData.siteName}
									onChange={(e) =>
										setFormData({ ...formData, siteName: e.target.value })
									}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
								/>
							</div>
						</div>
					</section>

					{/* Contact Information */}
					<section>
						<h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
							Contact Details
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Contact Email
								</label>
								<input
									type="email"
									value={formData.contactEmail}
									onChange={(e) =>
										setFormData({ ...formData, contactEmail: e.target.value })
									}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Phone Number
								</label>
								<input
									type="text"
									value={formData.contactPhone}
									onChange={(e) =>
										setFormData({ ...formData, contactPhone: e.target.value })
									}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
								/>
							</div>
						</div>
						<div className="mt-4">
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Office Address
							</label>
							<textarea
								rows={3}
								value={formData.address}
								onChange={(e) => setFormData({ ...formData, address: e.target.value })}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							/>
						</div>
					</section>

					{/* Social Media */}
					<section>
						<h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
							Social Media Links
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Twitter URL
								</label>
								<input
									type="url"
									value={formData.twitterUrl}
									onChange={(e) =>
										setFormData({ ...formData, twitterUrl: e.target.value })
									}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
									placeholder="https://twitter.com/..."
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Facebook URL
								</label>
								<input
									type="url"
									value={formData.facebookUrl}
									onChange={(e) =>
										setFormData({ ...formData, facebookUrl: e.target.value })
									}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
									placeholder="https://facebook.com/..."
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									LinkedIn URL
								</label>
								<input
									type="url"
									value={formData.linkedinUrl}
									onChange={(e) =>
										setFormData({ ...formData, linkedinUrl: e.target.value })
									}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
									placeholder="https://linkedin.com/..."
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Instagram URL
								</label>
								<input
									type="url"
									value={formData.instagramUrl}
									onChange={(e) =>
										setFormData({ ...formData, instagramUrl: e.target.value })
									}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
									placeholder="https://instagram.com/..."
								/>
							</div>
						</div>
					</section>

					{/* Submit */}
					<div className="flex justify-end pt-4">
						<button
							type="submit"
							disabled={saving}
							className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg flex items-center transition-colors shadow-sm disabled:opacity-50">
							<FaSave className="mr-2" />
							{saving ? "Saving..." : "Save Settings"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
