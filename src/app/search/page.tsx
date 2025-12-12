"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PublicLayout from "@/components/public/PublicLayout";
import PageHeader from "@/components/public/PageHeader";
import api from "@/lib/api";
import {
	FaSearch,
	FaSpinner,
	FaFileAlt,
	FaNewspaper,
	FaBook,
} from "react-icons/fa";

interface SearchResult {
	_id: string;
	title: string;
	type: "news" | "publication" | "regulation" | "page";
	url: string;
	excerpt?: string;
	date?: string;
}

export default function SearchPage() {
	const searchParams = useSearchParams();
	const query = searchParams.get("q");

	const [results, setResults] = useState<SearchResult[]>([]);
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState("all");

	useEffect(() => {
		if (query) {
			performSearch(query);
		}
	}, [query]);

	const performSearch = async (searchTerm: string) => {
		setLoading(true);
		try {
			// In a real app, this would be a dedicated search endpoint aggregating multiple collections
			// For now, we'll simulate by fetching from multiple endpoints based on limitations
			// Ideally: await api.get('/search', { params: { q: searchTerm } })

			const [newsRes, pubsRes, regsRes] = await Promise.all([
				api.get("/news", { params: { search: searchTerm, limit: 5 } }),
				api.get("/publications", { params: { search: searchTerm, limit: 5 } }),
				api.get("/regulations", { params: { search: searchTerm, limit: 5 } }),
			]);

			/* eslint-disable @typescript-eslint/no-explicit-any */
			const newsResults = newsRes.data.data.map((item: any) => ({
				_id: item._id,
				title: item.title,
				type: "news" as const,
				url: `/media/news/${item._id}`,
				excerpt: item.excerpt,
				date: item.publishedAt,
			}));

			const pubsResults = pubsRes.data.data.map((item: any) => ({
				_id: item._id,
				title: item.title,
				type: "publication" as const,
				url: item.fileUrl,
				excerpt: `Category: ${item.category}`,
				date: item.createdAt,
			}));

			const regsResults = regsRes.data.data.map((item: any) => ({
				_id: item._id,
				title: item.title,
				type: "regulation" as const,
				url: item.fileUrl,
				excerpt: `Category: ${item.category}`,
				date: item.effectiveDate,
			}));
			/* eslint-enable @typescript-eslint/no-explicit-any */

			setResults([...newsResults, ...pubsResults, ...regsResults]);
		} catch (error) {
			console.error("Search failed:", error);
		} finally {
			setLoading(false);
		}
	};

	const filteredResults =
		activeTab === "all" ? results : results.filter((r) => r.type === activeTab);

	return (
		<PublicLayout>
			<PageHeader
				title="Search Results"
				breadcrumb="Search"
			/>

			<div className="max-w-4xl mx-auto px-4 py-16">
				<div className="mb-8">
					<h2 className="text-xl text-gray-600 mb-4">
						Showing results for{" "}
						<span className="font-bold text-gray-900">"{query}"</span>
					</h2>

					{/* Tabs */}
					<div className="flex border-b border-gray-200 space-x-6 overflow-x-auto">
						{["all", "news", "publication", "regulation"].map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`pb-4 px-2 text-sm font-bold capitalize transition-colors ${
									activeTab === tab
										? "border-b-2 border-primary text-primary"
										: "text-gray-500 hover:text-gray-700"
								}`}>
								{tab === "all" ? "All Results" : tab + "s"}
							</button>
						))}
					</div>
				</div>

				{loading ? (
					<div className="flex justify-center py-12">
						<FaSpinner className="animate-spin h-8 w-8 text-primary" />
					</div>
				) : filteredResults.length === 0 ? (
					<div className="text-center py-12 bg-gray-50 rounded-lg">
						<FaSearch className="mx-auto text-4xl text-gray-300 mb-4" />
						<h3 className="text-lg font-bold text-gray-600">No results found</h3>
						<p className="text-gray-500">
							Try checking your spelling or use different keywords.
						</p>
					</div>
				) : (
					<div className="space-y-6">
						{filteredResults.map((result, idx) => (
							<div
								key={`${result.type}-${result._id}`}
								className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
								<div className="flex items-center mb-2">
									<span
										className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded mr-3 ${
											result.type === "news"
												? "bg-orange-100 text-orange-600"
												: result.type === "publication"
												? "bg-blue-100 text-blue-600"
												: "bg-primary-100 text-primary-600"
										}`}>
										{result.type}
									</span>
									{result.date && (
										<span className="text-xs text-gray-400">
											{new Date(result.date).toLocaleDateString()}
										</span>
									)}
								</div>
								<h3 className="text-xl font-bold text-gray-900 mb-2">
									{result.type === "news" ? (
										<Link
											href={result.url}
											className="hover:text-primary transition-colors">
											{result.title}
										</Link>
									) : (
										<a
											href={result.url}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-primary transition-colors flex items-center">
											{result.title}
										</a>
									)}
								</h3>
								{result.excerpt && (
									<p className="text-gray-600 text-sm line-clamp-2">{result.excerpt}</p>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</PublicLayout>
	);
}
