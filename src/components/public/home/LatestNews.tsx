"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import { FaCalendarAlt, FaArrowRight, FaSpinner } from "react-icons/fa";

interface NewsItem {
	_id: string;
	title: string;
	excerpt: string;
	slug: string; // Assuming slug exists, or use ID
	featuredImage?: string; // Optional image
	publishedAt: string;
	category: string;
}

export default function LatestNews() {
	const [news, setNews] = useState<NewsItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchNews = async () => {
			try {
				// Fetch latest 3 published news
				const { data } = await api.get("/news?limit=3&status=published");
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
		<section className="py-20 bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 md:px-8">
				<div className="flex justify-between items-end mb-12">
					<div>
						<h2 className="text-3xl font-bold text-gray-900 mb-2">
							Latest News & Updates
						</h2>
						<div className="w-20 h-1 bg-primary rounded-full"></div>
					</div>
					<Link
						href="/media/news"
						className="hidden md:flex items-center text-primary font-bold hover:text-primary-dark transition-colors">
						View All News <FaArrowRight className="ml-2" />
					</Link>
				</div>

				{loading ? (
					<div className="flex justify-center py-12">
						<FaSpinner className="animate-spin h-8 w-8 text-primary" />
					</div>
				) : news.length === 0 ? (
					<div className="text-center py-12 text-gray-500">
						No news updates at the moment.
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{news.map((item) => (
							<article
								key={item._id}
								className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
								{/* Image */}
								<div className="h-48 overflow-hidden bg-gray-200 relative">
									{item.featuredImage ? (
										<Image
											src={item.featuredImage}
											alt={item.title}
											fill
											className="object-cover transform group-hover:scale-110 transition-transform duration-500"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary">
											<span className="font-bold text-lg opacity-20">NUPRC NEWS</span>
										</div>
									)}
									<div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
										{item.category}
									</div>
								</div>

								{/* Content */}
								<div className="p-6 flex-grow flex flex-col">
									<div className="flex items-center text-gray-500 text-xs mb-3">
										<FaCalendarAlt className="mr-2" />
										{new Date(item.publishedAt).toLocaleDateString(undefined, {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</div>
									<h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
										<Link href={`/media/news/${item._id}`}>{item.title}</Link>
									</h3>
									<p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
										{item.excerpt}
									</p>
									<Link
										href={`/media/news/${item._id}`}
										className="inline-flex items-center text-primary font-bold text-sm hover:underline mt-auto">
										Read More <FaArrowRight className="ml-1 text-xs" />
									</Link>
								</div>
							</article>
						))}
					</div>
				)}

				<div className="mt-8 md:hidden text-center">
					<Link
						href="/media/news"
						className="inline-flex items-center text-primary font-bold hover:text-primary-dark transition-colors">
						View All News <FaArrowRight className="ml-2" />
					</Link>
				</div>
			</div>
		</section>
	);
}
