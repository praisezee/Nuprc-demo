"use client";

import React, { useState, useEffect } from "react";
import PublicLayout from "@/components/public/PublicLayout";
import PageHeader from "@/components/public/PageHeader";
import api from "@/lib/api";
import {
	FaFilePdf,
	FaSearch,
	FaSpinner,
	FaDownload,
	FaBook,
} from "react-icons/fa";

interface Regulation {
	_id: string;
	title: string;
	category: string;
	fileUrl: string;
	effectiveDate: string;
	description?: string;
	refNumber?: string;
}

export default function GuidelinesPage() {
	const [guidelines, setGuidelines] = useState<Regulation[]>([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchGuidelines = async () => {
			setLoading(true);
			try {
				const { data } = await api.get("/regulations", {
					params: {
						search,
						category: "Guidelines",
						limit: 50,
					},
				});
				setGuidelines(data.data);
			} catch (error) {
				console.error("Failed to fetch guidelines:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchGuidelines();
	}, [search]);

	return (
		<PublicLayout>
			<PageHeader
				title="Guidelines"
				breadcrumb="Guidelines"
				backgroundImage="/images/guidelines-bg.jpg"
			/>

			<div className="max-w-7xl mx-auto px-4 py-16">
				{/* Search Bar */}
				<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
					<div className="relative w-full max-w-2xl mx-auto">
						<input
							type="text"
							placeholder="Search guidelines..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-lg"
						/>
						<FaSearch className="absolute left-5 top-5 text-gray-400 text-lg" />
					</div>
				</div>

				{/* Content */}
				{loading ? (
					<div className="flex justify-center py-20">
						<FaSpinner className="animate-spin h-10 w-10 text-primary" />
					</div>
				) : guidelines.length === 0 ? (
					<div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
						<div className="mx-auto h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400 text-2xl">
							<FaBook />
						</div>
						<h3 className="text-xl font-bold text-gray-600 mb-2">
							No guidelines found
						</h3>
						<p className="text-gray-500">
							Guidelines will appear here once uploaded by the admin.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{guidelines.map((item) => (
							<div
								key={item._id}
								className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col justify-between group h-full">
								<div>
									<div className="flex items-start mb-4">
										<div className="h-10 w-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-xl mr-3 flex-shrink-0">
											<FaBook />
										</div>
										<div>
											<h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2 line-clamp-2">
												{item.title}
											</h3>
											{item.description && (
												<p className="text-gray-500 text-sm line-clamp-3 mb-3">
													{item.description}
												</p>
											)}
										</div>
									</div>

									<div className="flex flex-wrap gap-2 mb-4">
										{item.refNumber && (
											<span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono text-gray-600">
												Ref: {item.refNumber}
											</span>
										)}
										<span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-medium">
											{new Date(item.effectiveDate).getFullYear()}
										</span>
									</div>
								</div>

								<div className="border-t pt-4 mt-auto">
									<a
										href={item.fileUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium">
										<FaDownload className="mr-2" /> Download Document
									</a>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</PublicLayout>
	);
}
