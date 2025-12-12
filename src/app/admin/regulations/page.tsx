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
	FaGavel,
} from "react-icons/fa";

interface Regulation {
	_id: string;
	title: string;
	category: string;
	effectiveDate: string;
	status: "draft" | "published";
	fileUrl: string;
	createdAt: string;
}

export default function RegulationsListPage() {
	const [regulations, setRegulations] = useState<Regulation[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [category, setCategory] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchRegulations = async () => {
		try {
			setLoading(true);
			const { data } = await api.get("/regulations", {
				params: {
					page,
					limit: 10,
					search: searchTerm,
					category: category || undefined,
				},
			});
			setRegulations(data.data);
			setTotalPages(data.pagination?.pages || 1);
		} catch (error) {
			console.error("Failed to fetch regulations:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRegulations();
	}, [page, searchTerm, category]);

	const handleDelete = async (id: string) => {
		if (confirm("Are you sure you want to delete this regulation?")) {
			try {
				await api.delete(`/regulations/${id}`);
				fetchRegulations();
			} catch (error) {
				console.error("Failed to delete regulation:", error);
				alert("Failed to delete regulation");
			}
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">
					Regulations & Guidelines
				</h1>
				<Link
					href="/admin/regulations/create"
					className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center transition-colors">
					<FaPlus className="mr-2" /> Add New
				</Link>
			</div>

			{/* Filters */}
			<div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Search */}
				<div className="relative">
					<input
						type="text"
						placeholder="Search regulations..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
					/>
					<FaSearch className="absolute left-3 top-3 text-gray-400" />
				</div>

				{/* Category Filter */}
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
					<option value="">All Categories</option>
					<option value="Pre P.I.A">Pre P.I.A</option>
					<option value="P.I.A">P.I.A</option>
					<option value="Gazzetted Regulations">Gazzetted Regulations</option>
					<option value="Acts">Acts</option>
				</select>
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
									Category
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Effective Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
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
							) : regulations.length === 0 ? (
								<tr>
									<td
										colSpan={5}
										className="px-6 py-4 text-center text-gray-500">
										No regulations found.
									</td>
								</tr>
							) : (
								regulations.map((item) => (
									<tr
										key={item._id}
										className="hover:bg-gray-50">
										<td className="px-6 py-4">
											<div className="flex items-center">
												<FaGavel className="text-primary mr-2 h-4 w-4" />
												<div
													className="text-sm font-medium text-gray-900 truncate max-w-xs"
													title={item.title}>
													{item.title}
												</div>
											</div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500">{item.category}</td>
										<td className="px-6 py-4 text-sm text-gray-500">
											{new Date(item.effectiveDate).toLocaleDateString()}
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
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<div className="flex justify-end space-x-2">
												<a
													href={item.fileUrl}
													target="_blank"
													rel="noopener noreferrer"
													className="text-gray-600 hover:text-gray-900"
													title="Download/View">
													<FaDownload className="h-4 w-4" />
												</a>
												<Link
													href={`/admin/regulations/${item._id}`}
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
