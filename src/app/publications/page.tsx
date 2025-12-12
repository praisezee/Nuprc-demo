"use client";

import React, { useState, useEffect } from "react";
import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import { Card, CardBody } from "@/components/ui/Card";
import api from "@/lib/api";
import { FaBook, FaFilePdf, FaSpinner, FaDownload } from "react-icons/fa";

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

export default function PublicationsPage() {
	const [publications, setPublications] = useState<Publication[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPublications = async () => {
			try {
				const { data } = await api.get("/publications", {
					params: {
						limit: 12,
					},
				});
				setPublications(data.data);
			} catch (error) {
				console.error("Failed to fetch publications:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPublications();
	}, []);

	return (
		<PublicLayout>
			<HeroSection
				title="Publications"
				subtitle="Research, Gazettes, and Industry Guides"
				backgroundImage="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					{loading ? (
						<div className="flex justify-center py-20">
							<FaSpinner className="animate-spin h-10 w-10 text-primary" />
						</div>
					) : publications.length === 0 ? (
						<div className="text-center py-20 bg-white rounded-xl shadow-sm">
							<FaBook className="mx-auto text-4xl text-gray-300 mb-4" />
							<h3 className="text-xl font-bold text-gray-600">
								No publications found
							</h3>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{publications.map((item) => (
								<Card
									key={item._id}
									className="h-full hover:shadow-lg transition-all group border-t-4 border-primary/20 hover:border-primary flex flex-col">
									<CardBody className="p-8 flex flex-col h-full">
										<div className="flex justify-between items-start mb-6">
											<div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors">
												<FaBook />
											</div>
											<div className="flex flex-col items-center">
												<FaFilePdf className="text-red-500 text-xl mb-1" />
												<span className="text-xs text-gray-400">
													{(item.fileSize / 1024 / 1024).toFixed(1)}MB
												</span>
											</div>
										</div>
										<div className="mb-2">
											<span className="text-xs font-bold text-primary uppercase tracking-wide">
												{item.category}
											</span>
										</div>
										<h3 className="text-lg font-bold text-primary mb-2 line-clamp-2">
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
												className="flex items-center text-primary font-bold text-sm uppercase tracking-wide hover:underline">
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
