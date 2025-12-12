"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import {
	FaPlus,
	FaEdit,
	FaTrash,
	FaSearch,
	FaExternalLinkAlt,
	FaToggleOn,
	FaToggleOff,
} from "react-icons/fa";

interface Portal {
	_id: string;
	name: string;
	url: string;
	category: string;
	isActive: boolean;
	order: number;
}

export default function PortalsListPage() {
	const [portals, setPortals] = useState<Portal[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");

	const fetchPortals = async () => {
		try {
			setLoading(true);
			const { data } = await api.get("/portals");
			setPortals(data.data);
		} catch (error) {
			console.error("Failed to fetch portals:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchPortals();
	}, []);

	const handleDelete = async (id: string) => {
		if (confirm("Are you sure you want to delete this portal?")) {
			try {
				await api.delete(`/portals/${id}`);
				fetchPortals();
			} catch (error) {
				console.error("Failed to delete portal:", error);
				alert("Failed to delete portal");
			}
		}
	};

	const handleToggleActive = async (id: string, currentStatus: boolean) => {
		try {
			await api.put(`/portals/${id}`, { isActive: !currentStatus });
			fetchPortals();
		} catch (error) {
			console.error("Failed to update portal status:", error);
		}
	};

	const filteredPortals = portals.filter((portal) =>
		portal.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">Portal Links</h1>
				<Link
					href="/admin/portals/create"
					className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center transition-colors">
					<FaPlus className="mr-2" /> Add Portal
				</Link>
			</div>

			{/* Search */}
			<div className="mb-6 max-w-md">
				<div className="relative">
					<input
						type="text"
						placeholder="Search portals..."
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
									Name
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
							) : filteredPortals.length === 0 ? (
								<tr>
									<td
										colSpan={5}
										className="px-6 py-4 text-center text-gray-500">
										No portals found.
									</td>
								</tr>
							) : (
								filteredPortals.map((portal) => (
									<tr
										key={portal._id}
										className="hover:bg-gray-50">
										<td className="px-6 py-4">
											<div className="flex items-center">
												<div className="text-sm font-medium text-gray-900">
													{portal.name}
												</div>
												<a
													href={portal.url}
													target="_blank"
													rel="noopener noreferrer"
													className="ml-2 text-gray-400 hover:text-gray-600">
													<FaExternalLinkAlt className="h-3 w-3" />
												</a>
											</div>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500">{portal.category}</td>
										<td className="px-6 py-4">
											<button
												onClick={() => handleToggleActive(portal._id, portal.isActive)}
												className={`flex items-center text-sm ${
													portal.isActive ? "text-primary-600" : "text-gray-400"
												}`}>
												{portal.isActive ? (
													<FaToggleOn className="h-6 w-6 mr-1" />
												) : (
													<FaToggleOff className="h-6 w-6 mr-1" />
												)}
												{portal.isActive ? "Active" : "Inactive"}
											</button>
										</td>
										<td className="px-6 py-4 text-sm text-gray-500">{portal.order}</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<div className="flex justify-end space-x-2">
												<Link
													href={`/admin/portals/${portal._id}`}
													className="text-blue-600 hover:text-blue-900"
													title="Edit">
													<FaEdit className="h-4 w-4" />
												</Link>
												<button
													onClick={() => handleDelete(portal._id)}
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
