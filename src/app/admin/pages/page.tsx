"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaGlobe } from "react-icons/fa";

interface StaticPage {
	_id: string;
	title: string;
	slug: string;
	isPublished: boolean;
	updatedAt: string;
}

export default function PagesListPage() {
	const [pages, setPages] = useState<StaticPage[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	const fetchPages = async () => {
		try {
			setLoading(true);
			// Assuming GET /pages returns list. Adjust if pagination is implemented similarly
			const { data } = await api.get("/pages");
			setPages(data.data);
		} catch (error) {
			console.error("Failed to fetch pages:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPages();
	}, []);

	// Filter client-side for now as there might not be many static pages
	const filteredPages = pages.filter(
		(page) =>
			page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			page.slug.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">Static Pages</h1>
				<Link
					href="/admin/pages/create"
					className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center transition-colors">
					<FaPlus className="mr-2" /> Create New Page
				</Link>
			</div>

			{/* Search */}
			<div className="mb-6 max-w-md">
				<div className="relative">
					<input
						type="text"
						placeholder="Search pages..."
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
									Slug (URL)
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Last Updated
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
							) : filteredPages.length === 0 ? (
								<tr>
									<td
										colSpan={5}
										className="px-6 py-4 text-center text-gray-500">
										No pages found.
									</td>
								</tr>
							) : (
								filteredPages.map((page) => (
									<tr
										key={page._id}
										className="hover:bg-gray-50">
										<td className="px-6 py-4">
											<div className="text-sm font-medium text-gray-900">{page.title}</div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500">/{page.slug}</td>
										<td className="px-6 py-4 text-sm text-gray-500">
											{new Date(page.updatedAt).toLocaleDateString()}
										</td>
										<td className="px-6 py-4">
											<span
												className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
													page.isPublished
														? "bg-primary-100 text-primary-800"
														: "bg-yellow-100 text-yellow-800"
												}`}>
												{page.isPublished ? "Published" : "Draft"}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<div className="flex justify-end space-x-2">
												<Link
													href={`/admin/pages/${page._id}`}
													className="text-blue-600 hover:text-blue-900"
													title="Edit">
													<FaEdit className="h-4 w-4" />
												</Link>
												<a
													href={`/${page.slug}`} // Public view link
													target="_blank"
													rel="noopener noreferrer"
													className="text-gray-400 hover:text-gray-600"
													title="View Live">
													<FaGlobe className="h-4 w-4" />
												</a>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
