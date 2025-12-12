"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import {
	FaPlus,
	FaEdit,
	FaTrash,
	FaDownload,
	FaSearch,
	FaBook,
} from "react-icons/fa";
import toast from "react-hot-toast";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

interface Regulation {
	_id: string;
	title: string;
	category: string;
	effectiveDate: string;
	status: "draft" | "published";
	fileUrl: string;
	createdAt: string;
}

export default function GuidelinesListPage() {
	const [guidelines, setGuidelines] = useState<Regulation[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// Delete Modal State
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const fetchGuidelines = async () => {
		try {
			setLoading(true);
			const { data } = await api.get("/regulations", {
				params: {
					page,
					limit: 10,
					search: searchTerm,
					category: "Guidelines", // Hardcoded filter
				},
			});
			setGuidelines(data.data);
			setTotalPages(data.pagination?.pages || 1);
		} catch (error) {
			console.error("Failed to fetch guidelines:", error);
			toast.error("Failed to fetch guidelines");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchGuidelines();
	}, [page, searchTerm]);

	const confirmDelete = (id: string) => {
		setDeleteId(id);
		setIsDeleteModalOpen(true);
	};

	const handleDelete = async () => {
		if (!deleteId) return;
		setIsDeleting(true);
		try {
			await api.delete(`/regulations/${deleteId}`);
			toast.success("Guideline deleted successfully");
			fetchGuidelines();
			setIsDeleteModalOpen(false);
		} catch (error) {
			console.error("Failed to delete guideline:", error);
			toast.error("Failed to delete guideline");
		} finally {
			setIsDeleting(false);
			setDeleteId(null);
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
					Guidelines Management
				</h1>
				<Link
					href="/admin/guidelines/create"
					className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center transition-colors">
					<FaPlus className="mr-2" /> Add New Guideline
				</Link>
			</div>

			{/* Filters */}
			<div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Search */}
				<div className="relative">
					<input
						type="text"
						placeholder="Search guidelines..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 placeholder-gray-400"
					/>
					<FaSearch className="absolute left-3 top-3 text-gray-400" />
				</div>
			</div>

			{/* Table */}
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead className="bg-gray-50 dark:bg-gray-900">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
									Title
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
									Effective Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
							{loading ? (
								<tr>
									<td
										colSpan={4}
										className="px-6 py-4 text-center dark:text-gray-300">
										Loading...
									</td>
								</tr>
							) : guidelines.length === 0 ? (
								<tr>
									<td
										colSpan={4}
										className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
										No guidelines found.
									</td>
								</tr>
							) : (
								guidelines.map((item) => (
									<tr
										key={item._id}
										className="hover:bg-gray-50 dark:hover:bg-gray-700">
										<td className="px-6 py-4">
											<div className="flex items-center">
												<FaBook className="text-primary mr-2 h-4 w-4" />
												<div
													className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-xs"
													title={item.title}>
													{item.title}
												</div>
											</div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
											{new Date(item.effectiveDate).toLocaleDateString()}
										</td>
										<td className="px-6 py-4">
											<span
												className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
													item.status === "published"
														? "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100"
														: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
												}`}>
												{item.status}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<div className="flex justify-end space-x-2">
												<a
													href={item.fileUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
													title="Download/View">
													<FaDownload className="h-4 w-4" />
												</a>
												<Link
													href={`/admin/guidelines/${item._id}`}
													className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200"
													title="Edit">
													<FaEdit className="h-4 w-4" />
												</Link>
												<button
													onClick={() => confirmDelete(item._id)}
													className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200"
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

				{/* Pagination */}
				<div className="bg-white dark:bg-gray-800 px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6">
					<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
						<div>
							<p className="text-sm text-gray-700 dark:text-gray-300">
								Page <span className="font-medium">{page}</span> of{" "}
								<span className="font-medium">{totalPages}</span>
							</p>
						</div>
						<div>
							<nav
								className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
								aria-label="Pagination">
								<button
									onClick={() => setPage(Math.max(1, page - 1))}
									disabled={page === 1}
									className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50">
									Previous
								</button>
								<button
									onClick={() => setPage(Math.min(totalPages, page + 1))}
									disabled={page === totalPages}
									className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50">
									Next
								</button>
							</nav>
						</div>
					</div>
				</div>
			</div>

			<ConfirmationModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleDelete}
				title="Delete Guideline"
				message="Are you sure you want to delete this guideline? This action cannot be undone."
				confirmText="Delete Guideline"
				isLoading={isDeleting}
				isDelete={true}
			/>
		</div>
	);
}
