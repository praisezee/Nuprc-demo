"use client";

import React, { useState, useEffect } from "react";
import PublicLayout from "@/components/public/PublicLayout";
import PageHeader from "@/components/public/PageHeader";
import api from "@/lib/api";
import { FaFileAlt, FaDownload, FaSpinner, FaSearch } from "react-icons/fa";

interface Publication {
	_id: string;
	title: string;
	category: string;
	fileUrl: string;
	publishYear: number;
}

export default function AnnualReportsPage() {
	const [reports, setReports] = useState<Publication[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchReports = async () => {
			setLoading(true);
			try {
				const { data } = await api.get("/publications", {
					params: {
						category: "Annual Report",
						limit: 20,
					},
				});
				setReports(data.data);
			} catch (error) {
				console.error("Failed to fetch reports:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchReports();
	}, []);

	return (
		<PublicLayout>
			<PageHeader
				title="Annual Reports"
				breadcrumb="Annual Reports"
			/>

			<div className="max-w-7xl mx-auto px-4 py-16">
				<div className="max-w-3xl mx-auto text-center mb-16">
					<h2 className="text-2xl font-bold text-gray-900 mb-4">
						Oil & Gas Industry Annual Reports (NOGIAR)
					</h2>
					<p className="text-gray-600">
						Access comprehensive annual reports detailing the performance, statistics,
						and developments in the Nigerian Oil and Gas Industry.
					</p>
				</div>

				{loading ? (
					<div className="flex justify-center py-20">
						<FaSpinner className="animate-spin h-10 w-10 text-primary" />
					</div>
				) : reports.length === 0 ? (
					<div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
						<h3 className="text-xl font-bold text-gray-600 mb-2">No reports found</h3>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{reports.map((report) => (
							<div
								key={report._id}
								className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300 border border-gray-100 flex flex-col items-center text-center group">
								<div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center text-primary text-3xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
									<FaFileAlt />
								</div>
								<h3 className="text-lg font-bold text-gray-900 mb-2">{report.title}</h3>
								<p className="text-sm text-gray-500 mb-6 bg-gray-100 px-3 py-1 rounded-full font-medium">
									Year: {report.publishYear}
								</p>

								<a
									href={report.fileUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center">
									<FaDownload className="mr-2" /> Download Report
								</a>
							</div>
						))}
					</div>
				)}
			</div>
		</PublicLayout>
	);
}
