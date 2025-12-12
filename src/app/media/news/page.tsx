"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import { Card, CardBody } from "@/components/ui/Card";
import api from "@/lib/api";
import { FaSpinner, FaCalendarAlt, FaNewspaper } from "react-icons/fa";

interface NewsItem {
	_id: string;
	title: string;
	slug: string;
	excerpt: string;
	featuredImage?: string;
	category: string;
	publishedAt: string;
	createdAt: string;
}

export default function NewsPage() {
	const [news, setNews] = useState<NewsItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const { data } = await api.get("/news", {
					params: {
						status: "published",
						limit: 9, // Fetch 9 items initially
					},
				});
				setNews(data.data);
			} catch (error) {
				console.error("Failed to fetch news:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchNews();
	}, []);

	return (
		<PublicLayout>
			<HeroSection
				title="News & Events"
				subtitle="Latest updates from the Commission"
				backgroundImage="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					{loading ? (
						<div className="flex justify-center items-center py-20">
							<FaSpinner className="animate-spin h-12 w-12 text-primary" />
						</div>
					) : news.length === 0 ? (
						<div className="text-center py-20 bg-white rounded-xl shadow-sm">
							<FaNewspaper className="mx-auto text-4xl text-gray-300 mb-4" />
							<h3 className="text-xl font-bold text-gray-600">
								No news articles found
							</h3>
							<p className="text-gray-500 mt-2">
								Please check back later for updates.
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{news.map((item) => (
								<Card
									key={item._id}
									className="h-full hover:shadow-xl transition-all group overflow-hidden flex flex-col">
									<div className="h-48 bg-gray-200 relative overflow-hidden">
										{item.featuredImage ? (
											<Image
												src={item.featuredImage}
												alt={item.title}
												fill
												className="object-cover transition-transform duration-500 group-hover:scale-110"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
												<FaNewspaper className="text-4xl" />
											</div>
										)}
										<div className="absolute top-4 left-4">
											<span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
												{item.category}
											</span>
										</div>
									</div>
									<CardBody className="p-6 flex flex-col grow">
										<div className="flex items-center text-xs text-gray-500 mb-3">
											<FaCalendarAlt className="mr-1.5 text-primary" />
											{new Date(item.publishedAt || item.createdAt).toLocaleDateString(
												undefined,
												{
													month: "long",
													day: "numeric",
													year: "numeric",
												}
											)}
										</div>

										<h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
											<Link href={`/media/news/${item._id}`}>{item.title}</Link>
										</h3>

										<p className="text-gray-600 text-sm line-clamp-3 mb-6 grow">
											{item.excerpt}
										</p>

										<Link
											href={`/media/news/${item._id}`}
											className="inline-block text-sm font-bold text-primary hover:text-primary-dark transition-colors uppercase tracking-wide border-b-2 border-transparent hover:border-primary w-fit">
											Read More
										</Link>
									</CardBody>
								</Card>
							))}
						</div>
					)}

					{/* Pagination (Simple Load More for now, can be expanded) */}
					{/* {news.length > 0 && <div className="mt-12 text-center">...</div>} */}
				</div>
			</section>
		</PublicLayout>
	);
}
