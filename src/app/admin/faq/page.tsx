"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import {
	FaPlus,
	FaEdit,
	FaTrash,
	FaSearch,
	FaQuestionCircle,
} from "react-icons/fa";

interface FAQ {
	_id: string;
	question: string;
	category: string;
	isPublished: boolean;
	order: number;
}

export default function FAQListPage() {
	const [faqs, setFaqs] = useState<FAQ[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [category, setCategory] = useState("");

	const fetchFaqs = async () => {
		try {
			setLoading(true);
			const { data } = await api.get("/faq", {
				params: {
					search: searchTerm,
					category: category || undefined,
				},
			});
			setFaqs(data.data);
		} catch (error) {
			console.error("Failed to fetch FAQs:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchFaqs();
	}, [searchTerm, category]);

	const handleDelete = async (id: string) => {
		if (confirm("Are you sure you want to delete this FAQ?")) {
			try {
				await api.delete(`/faq/${id}`);
				fetchFaqs();
			} catch (error) {
				console.error("Failed to delete FAQ:", error);
				alert("Failed to delete FAQ");
			}
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">
					Frequently Asked Questions
				</h1>
				<Link
					href="/admin/faq/create"
					className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center transition-colors">
					<FaPlus className="mr-2" /> Add Question
				</Link>
			</div>

			{/* Filters */}
			<div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
				{/* Search */}
				<div className="relative">
					<input
						type="text"
						placeholder="Search questions..."
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
					<option value="General">General</option>
					<option value="Licensing">Licensing</option>
					<option value="Operations">Operations</option>
					<option value="Royalties">Royalties</option>
				</select>
			</div>

			{/* Table */}
			<div className="bg-white rounded-lg shadow overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Question
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Category
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
							) : faqs.length === 0 ? (
								<tr>
									<td
										colSpan={5}
										className="px-6 py-4 text-center text-gray-500">
										No FAQs found.
									</td>
								</tr>
							) : (
								faqs.map((faq) => (
									<tr
										key={faq._id}
										className="hover:bg-gray-50">
										<td className="px-6 py-4">
											<div className="flex items-center">
												<FaQuestionCircle className="text-gray-400 mr-2 h-4 w-4" />
												<div
													className="text-sm font-medium text-gray-900 truncate max-w-lg"
													title={faq.question}>
													{faq.question}
												</div>
											</div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500">{faq.category}</td>
										<td className="px-6 py-4">
											<span
												className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
													faq.isPublished
														? "bg-primary-100 text-primary-800"
														: "bg-yellow-100 text-yellow-800"
												}`}>
												{faq.isPublished ? "Published" : "Draft"}
											</span>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500">{faq.order}</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<div className="flex justify-end space-x-2">
												<Link
													href={`/admin/faq/${faq._id}`}
													className="text-blue-600 hover:text-blue-900"
													title="Edit">
													<FaEdit className="h-4 w-4" />
												</Link>
												<button
													onClick={() => handleDelete(faq._id)}
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
		</div>
	);
}
