"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import toast from "react-hot-toast";

export default function CreateUserPage() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: "EDITOR",
		isActive: true,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		if (formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match");
			setLoading(false);
			return;
		}

		try {
			// Exclude confirmPassword from payload
			const { confirmPassword, ...payload } = formData;
			await api.post("/users", payload); // Or /auth/register depending on backend
			toast.success("User created successfully");
			router.push("/admin/users");
		} catch (error: any) {
			console.error("Failed to create user:", error);
			toast.error(error.response?.data?.message || "Failed to create user");
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
				<h1 className="text-2xl font-bold text-gray-800">Add New User</h1>
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
						<h3 className="text-lg font-medium text-gray-900 mb-4">Set Password</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Password */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Password
								</label>
								<input
									type="password"
									required
									value={formData.password}
									onChange={(e) =>
										setFormData({ ...formData, password: e.target.value })
									}
									className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
								/>
							</div>
							{/* Confirm Password */}
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Confirm Password
								</label>
								<input
									type="password"
									required
									value={formData.confirmPassword}
									onChange={(e) =>
										setFormData({ ...formData, confirmPassword: e.target.value })
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
							{loading ? "Creating..." : "Create User"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
