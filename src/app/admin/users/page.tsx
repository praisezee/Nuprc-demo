"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: string;
	isActive: boolean;
	lastLogin: string;
	createdAt: string;
}

export default function UsersListPage() {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [roleFilter, setRoleFilter] = useState("");

	// Delete Modal State
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const { data } = await api.get("/users", {
				params: {
					search: searchTerm,
					role: roleFilter || undefined,
				},
			});
			setUsers(data.data);
		} catch (error) {
			console.error("Failed to fetch users:", error);
			toast.error("Failed to fetch users");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, [searchTerm, roleFilter]);

	const confirmDelete = (id: string) => {
		setDeleteId(id);
		setIsDeleteModalOpen(true);
	};

	const handleDelete = async () => {
		if (!deleteId) return;
		setIsDeleting(true);
		try {
			await api.delete(`/users/${deleteId}`);
			toast.success("User deleted successfully");
			fetchUsers();
			setIsDeleteModalOpen(false);
		} catch (error) {
			console.error("Failed to delete user:", error);
			toast.error("Failed to delete user");
		} finally {
			setIsDeleting(false);
			setDeleteId(null);
		}
	};

	const getRoleBadge = (role: string) => {
		switch (role) {
			case "SUPER_ADMIN":
				return (
					<span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
						Super Admin
					</span>
				);
			case "ADMIN":
				return (
					<span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
						Admin
					</span>
				);
			case "EDITOR":
				return (
					<span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
						Editor
					</span>
				);
			default:
				return (
					<span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
						{role}
					</span>
				);
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">User Management</h1>
				<Link
					href="/admin/users/create"
					className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center transition-colors">
					<FaPlus className="mr-2" /> Add User
				</Link>
			</div>

			{/* Filters */}
			<div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Search */}
				<div className="relative">
					<input
						type="text"
						placeholder="Search by name or email..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
					/>
					<FaSearch className="absolute left-3 top-3 text-gray-400" />
				</div>

				{/* Role Filter */}
				<select
					value={roleFilter}
					onChange={(e) => setRoleFilter(e.target.value)}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
					<option value="">All Roles</option>
					<option value="SUPER_ADMIN">Super Admin</option>
					<option value="ADMIN">Admin</option>
					<option value="EDITOR">Editor</option>
					<option value="CONTENT_MANAGER">Content Manager</option>
				</select>
			</div>

			{/* Table */}
			<div className="bg-white rounded-lg shadow overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									User
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Role
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Last Login
								</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{loading ? (
								<tr>
									<td
										colSpan={5}
										className="px-6 py-4 text-center">
										Loading...
									</td>
								</tr>
							) : users.length === 0 ? (
								<tr>
									<td
										colSpan={5}
										className="px-6 py-4 text-center text-gray-500">
										No users found.
									</td>
								</tr>
							) : (
								users.map((user) => (
									<tr
										key={user._id}
										className="hover:bg-gray-50">
										<td className="px-6 py-4">
											<div className="flex items-center">
												<div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold mr-3">
													{user.firstName?.[0] || "U"}
													{user.lastName?.[0] || ""}
												</div>
												<div>
													<div className="text-sm font-medium text-gray-900">
														{user.firstName} {user.lastName}
													</div>
													<div className="text-sm text-gray-500">{user.email}</div>
												</div>
											</div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500">
											{getRoleBadge(user.role)}
										</td>
										<td className="px-6 py-4">
											<span
												className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
													user.isActive
														? "bg-primary-100 text-primary-800"
														: "bg-red-100 text-red-800"
												}`}>
												{user.isActive ? "Active" : "Inactive"}
											</span>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500">
											{user.lastLogin
												? new Date(user.lastLogin).toLocaleString()
												: "Never"}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<div className="flex justify-end space-x-2">
												<Link
													href={`/admin/users/${user._id}`}
													className="text-blue-600 hover:text-blue-900"
													title="Edit">
													<FaEdit className="h-4 w-4" />
												</Link>
												<button
													onClick={() => confirmDelete(user._id)}
													className="text-red-600 hover:text-red-900"
													title="Delete">
													<FaTrash className="h-4 w-4" />
												</button>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			<ConfirmationModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleDelete}
				title="Delete User"
				message="Are you sure you want to delete this user? This action cannot be undone."
				confirmText="Delete User"
				isLoading={isDeleting}
				isDelete={true}
			/>
		</div>
	);
}
