"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { FaBullhorn } from "react-icons/fa";

interface NewsItem {
	_id: string;
	title: string;
}

export default function NewsTicker() {
	const [news, setNews] = useState<NewsItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchLatestNews = async () => {
			try {
				const { data } = await api.get("/news", {
					params: {
						status: "published",
						limit: 5,
					},
				});
				setNews(data.data);
			} catch (error) {
				console.error("Failed to fetch news for ticker:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchLatestNews();
	}, []);

	if (loading || news.length === 0) return null;

	return (
		<div className="bg-accent/10 border-b border-accent/20 h-10 flex items-center overflow-hidden">
			<div className="bg-accent px-4 h-full flex items-center justify-center gap-2 text-primary font-bold text-xs uppercase tracking-widest z-10 shadow-lg">
				<FaBullhorn />
				<span className="whitespace-nowrap">Latest News</span>
			</div>
			<div className="flex-grow relative h-full flex items-center overflow-hidden">
				<div className="animate-marquee whitespace-nowrap flex items-center gap-12">
					{[...news, ...news].map((item, index) => (
						<Link
							key={`${item._id}-${index}`}
							href={`/media/news/${item._id}`}
							className="text-sm font-semibold text-gray-700 hover:text-primary transition-colors flex items-center gap-2">
							<span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
							{item.title}
						</Link>
					))}
				</div>
			</div>

			<style jsx>{`
				.animate-marquee {
					display: inline-flex;
					animation: marquee 30s linear infinite;
				}
				.animate-marquee:hover {
					animation-play-state: paused;
				}
				@keyframes marquee {
					0% {
						transform: translateX(0);
					}
					100% {
						transform: translateX(-50%);
					}
				}
			`}</style>
		</div>
	);
}
