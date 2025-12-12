"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

interface AdItem {
	_id: string;
	title?: string;
	type: "text" | "image" | "video" | "youtube";
	content: string;
	status: "draft" | "published";
	order: number;
	createdAt: string;
}

export default function AdsListPage() {
	const [ads, setAds] = useState<AdItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchAds = async () => {
		try {
			setLoading(true);
			const { data } = await api.get("/ads", {
				params: {
					page,
					limit: 10,
					search: searchTerm,
				},
			});
			setAds(data.data);
			setTotalPages(data.pagination?.pages || 1);
		} catch (error) {
			console.error("Failed to fetch ads:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAds();
	}, [page, searchTerm]);

	const handleDelete = async (id: string) => {
		if (confirm("Are you sure you want to delete this ad?")) {
			try {
				await api.delete(`/ads/${id}`);
				fetchAds(); // Refresh list
			} catch (error) {
				console.error("Failed to delete ad:", error);
				alert("Failed to delete ad");
			}
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">Ads Management</h1>
				<Link
					href="/admin/ads/create"
					className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center transition-colors">
					<FaPlus className="mr-2" /> Create New
				</Link>
			</div>

			{/* Search Bar */}
			<div className="mb-6">
				<div className="relative max-w-md">
					<input
						type="text"
						placeholder="Search ads..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
					/>
					<FaSearch className="absolute left-3 top-3 text-gray-400" />
				</div>
			</div>

			{/* Table */}
			<div className="bg-white rounded-lg shadow overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Title
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Type
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Order
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
							) : ads.length === 0 ? (
								<tr>
									<td
										colSpan={5}
										className="px-6 py-4 text-center text-gray-500">
										No ads found.
									</td>
								</tr>
							) : (
								ads.map((item) => (
									<tr
										key={item._id}
										className="hover:bg-gray-50">
										<td className="px-6 py-4">
											<div className="text-sm font-medium text-gray-900 truncate max-w-xs">
												{item.title || "(No title)"}
											</div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500 capitalize">
											{item.type}
										</td>
										<td className="px-6 py-4">
											<span
												className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
													item.status === "published"
														? "bg-primary-100 text-primary-800"
														: "bg-yellow-100 text-yellow-800"
												}`}>
												{item.status}
											</span>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500">{item.order}</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<div className="flex justify-end space-x-2">
												<Link
													href={`/admin/ads/${item._id}`}
													className="text-blue-600 hover:text-blue-900"
													title="Edit">
													<FaEdit className="h-4 w-4" />
												</Link>
												<button
													onClick={() => handleDelete(item._id)}
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

				{/* Pagination */}
				<div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
					<div className="flex-1 flex justify-between sm:hidden">
						<button
							onClick={() => setPage(Math.max(1, page - 1))}
							disabled={page === 1}
							className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
							Previous
						</button>
						<button
							onClick={() => setPage(Math.min(totalPages, page + 1))}
							disabled={page === totalPages}
							className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
							Next
						</button>
					</div>
					<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
						<div>
							<p className="text-sm text-gray-700">
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
									className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
									Previous
								</button>
								<button
									onClick={() => setPage(Math.min(totalPages, page + 1))}
									disabled={page === totalPages}
									className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
									Next
								</button>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
