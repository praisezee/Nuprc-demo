"use client";

import React, { useState, useEffect } from "react";
import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import { Card, CardBody } from "@/components/ui/Card";
import api from "@/lib/api";
import { FaChartBar, FaFilePdf, FaSpinner, FaDownload } from "react-icons/fa";

interface Publication {
	_id: string;
	title: string;
	description: string;
	category: string;
	fileUrl: string;
	fileSize: number;
	fileType: string;
	publishYear: number;
	downloadCount: number;
}

export default function ReportsPage() {
	const [reports, setReports] = useState<Publication[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchReports = async () => {
			try {
				// Fetching all publications for now, likely want to filter for 'Report' types
				// Ideally API supports filtering by multiple categories or we filter client side
				const { data } = await api.get("/publications", {
					params: {
						search: "Report", // Simple search for now, or filter by specific categories if API supported comma separated
						limit: 12,
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
			<HeroSection
				title="Reports"
				subtitle="Data, Statistics, and Performance Metrics"
				backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="mb-12 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center md:flex-row flex-col gap-6 text-center md:text-left">
						<div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary text-2xl shrink-0">
							<FaChartBar />
						</div>
						<div>
							<h2 className="text-2xl font-bold text-gray-900 mb-2">
								Reports Archive
							</h2>
							<p className="text-gray-600">
								Access our repository of monthly and quarterly production reports,
								statistical bulletins, and technical performance reviews.
							</p>
						</div>
					</div>

					{loading ? (
						<div className="flex justify-center py-20">
							<FaSpinner className="animate-spin h-10 w-10 text-primary" />
						</div>
					) : reports.length === 0 ? (
						<div className="text-center py-20 bg-white rounded-xl shadow-sm">
							<FaChartBar className="mx-auto text-4xl text-gray-300 mb-4" />
							<h3 className="text-xl font-bold text-gray-600">No reports found</h3>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{reports.map((item) => (
								<Card
									key={item._id}
									className="h-full hover:shadow-lg transition-all group border-t-4 border-accent/20 hover:border-accent flex flex-col">
									<CardBody className="p-8 flex flex-col h-full">
										<div className="flex justify-between items-start mb-6">
											<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 group-hover:bg-accent group-hover:text-white transition-colors">
												<FaChartBar />
											</div>
											<div className="flex flex-col items-center">
												<FaFilePdf className="text-red-500 text-xl mb-1" />
												<span className="text-xs text-gray-400">
													{(item.fileSize / 1024 / 1024).toFixed(1)}MB
												</span>
											</div>
										</div>
										<div className="mb-2">
											<span className="text-xs font-bold text-accent uppercase tracking-wide">
												{item.category}
											</span>
										</div>
										<h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
											{item.title}
										</h3>
										<p className="text-sm text-gray-500 mb-4 line-clamp-3 grow">
											{item.description}
										</p>
										<div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto">
											<span className="text-xs text-gray-400 font-medium">
												Year: {item.publishYear}
											</span>
											<a
												href={item.fileUrl}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center text-accent font-bold text-sm uppercase tracking-wide hover:underline">
												Download <FaDownload className="ml-2 w-3 h-3" />
											</a>
										</div>
									</CardBody>
								</Card>
							))}
						</div>
					)}
				</div>
			</section>
		</PublicLayout>
	);
}
