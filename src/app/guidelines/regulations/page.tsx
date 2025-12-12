"use client";

import React, { useState, useEffect } from "react";
import PublicLayout from "@/components/public/PublicLayout";
import PageHeader from "@/components/public/PageHeader";
import api from "@/lib/api";
import {
	FaFilePdf,
	FaSearch,
	FaFilter,
	FaSpinner,
	FaDownload,
} from "react-icons/fa";

interface Regulation {
	_id: string;
	title: string;
	category: string; // e.g., 'Gazetted Regulations', 'PIA', 'Guidelines'
	fileUrl: string;
	effectiveDate: string;
	description?: string;
	refNumber?: string;
}

export default function RegulationsPage() {
	const [regulations, setRegulations] = useState<Regulation[]>([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("");

	useEffect(() => {
		const fetchRegulations = async () => {
			setLoading(true);
			try {
				const { data } = await api.get("/regulations", {
					params: {
						search,
						category: category || undefined,
						limit: 20, // Fetch more for public list
					},
				});
				setRegulations(data.data);
			} catch (error) {
				console.error("Failed to fetch regulations:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchRegulations();
	}, [search, category]);

	return (
		<PublicLayout>
			<PageHeader
				title="Regulations & Guidelines"
				breadcrumb="Regulations"
			/>

			<div className="max-w-7xl mx-auto px-4 py-16">
				{/* Filter Bar */}
				<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
					<div className="relative w-full md:w-96">
						<input
							type="text"
							placeholder="Search regulations..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
						/>
						<FaSearch className="absolute left-3 top-3.5 text-gray-400" />
					</div>

					<div className="flex items-center space-x-2 w-full md:w-auto">
						<FaFilter className="text-gray-500" />
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="flex-grow md:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
							<option value="">All Categories</option>
							<option value="Gazetted Regulation">Gazetted Regulations</option>
							<option value="Guidelines">Guidelines</option>
							<option value="Acts">Acts</option>
							<option value="Policies">Policies</option>
						</select>
					</div>
				</div>

				{/* Content */}
				{loading ? (
					<div className="flex justify-center py-20">
						<FaSpinner className="animate-spin h-10 w-10 text-primary" />
					</div>
				) : regulations.length === 0 ? (
					<div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
						<h3 className="text-xl font-bold text-gray-600 mb-2">
							No documents found
						</h3>
						<p className="text-gray-500">Try adjusting your search or filters.</p>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4">
						{regulations.map((item) => (
							<div
								key={item._id}
								className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between group">
								<div className="flex items-start mb-4 md:mb-0">
									<div className="h-12 w-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center text-2xl mr-4 flex-shrink-0">
										<FaFilePdf />
									</div>
									<div>
										<h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-1">
											{item.title}
										</h3>
										<div className="flex items-center text-sm text-gray-500 space-x-4">
											{item.refNumber && (
												<span className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">
													{item.refNumber}
												</span>
											)}
											<span>{new Date(item.effectiveDate).getFullYear()}</span>
											<span className="capitalize">{item.category}</span>
										</div>
									</div>
								</div>
								<a
									href={item.fileUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full md:w-auto px-6 py-2 bg-gray-50 hover:bg-primary text-gray-700 hover:text-white rounded-lg transition-colors flex items-center justify-center font-bold text-sm">
									<FaDownload className="mr-2" /> Download
								</a>
							</div>
						))}
					</div>
				)}
			</div>
		</PublicLayout>
	);
}
