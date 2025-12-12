"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/lib/api";
import { FaArrowLeft, FaSave, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";

export default function EditUserPage() {
	const router = useRouter();
	const params = useParams();
	const { id } = params;

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		role: "EDITOR",
		isActive: true,
		password: "", // Optional for update
	});

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data } = await api.get(`/users/${id}`);
				const user = data.data;

				setFormData({
					firstName: user.firstName || "",
					lastName: user.lastName || "",
					email: user.email || "",
					role: user.role || "EDITOR",
					isActive: user.isActive ?? true,
					password: "",
				});
			} catch (error) {
				console.error("Failed to fetch user:", error);
				toast.error("Failed to load user details");
				router.push("/admin/users");
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchUser();
		}
	}, [id, router]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);

		try {
			const payload: any = { ...formData };
			if (!payload.password) {
				delete payload.password; // Don't send empty password
			}

			await api.put(`/users/${id}`, payload);
			toast.success("User updated successfully");
			router.push("/admin/users");
		} catch (error: any) {
			console.error("Failed to update user:", error);
			toast.error(error.response?.data?.message || "Failed to update user");
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
				<h1 className="text-2xl font-bold text-gray-800">Edit User</h1>
			</div>

			<div className="bg-white rounded-lg shadow p-6 max-w-2xl">
				<form
					onSubmit={handleSubmit}
					className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* First Name */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								First Name
							</label>
							<input
								type="text"
								required
								value={formData.firstName}
								onChange={(e) =>
									setFormData({ ...formData, firstName: e.target.value })
								}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							/>
						</div>
						{/* Last Name */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Last Name
							</label>
							<input
								type="text"
								required
								value={formData.lastName}
								onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							/>
						</div>
					</div>

					{/* Email */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Email Address
						</label>
						<input
							type="email"
							required
							value={formData.email}
							onChange={(e) => setFormData({ ...formData, email: e.target.value })}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
						/>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Role */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Role
							</label>
							<select
								value={formData.role}
								onChange={(e) => setFormData({ ...formData, role: e.target.value })}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
								<option value="SUPER_ADMIN">Super Admin</option>
								<option value="ADMIN">Admin</option>
								<option value="EDITOR">Editor</option>
								<option value="CONTENT_MANAGER">Content Manager</option>
							</select>
						</div>
						{/* Active Status */}
						<div className="flex items-end pb-2">
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
									Active Account
								</label>
							</div>
						</div>
					</div>

					<div className="border-t pt-6">
						<h3 className="text-lg font-medium text-gray-900 mb-4">
							Reset Password (Optional)
						</h3>
						{/* Password */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								New Password
							</label>
							<input
								type="password"
								value={formData.password}
								onChange={(e) => setFormData({ ...formData, password: e.target.value })}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
								placeholder="Leave blank to keep current password"
							/>
						</div>
					</div>

					{/* Submit */}
					<div className="flex justify-end pt-4">
						<button
							type="submit"
							disabled={saving}
							className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg flex items-center transition-colors shadow-sm disabled:opacity-50">
							<FaSave className="mr-2" />
							{saving ? "Updating..." : "Update User"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
