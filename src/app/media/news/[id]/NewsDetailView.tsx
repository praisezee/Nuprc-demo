"use client";

import React from "react";
import Link from "next/link";
import PublicLayout from "@/components/public/PublicLayout";
import PageHeader from "@/components/public/PageHeader";
import {
	FaCalendarAlt,
	FaUser,
	FaTag,
	FaArrowLeft,
	FaFacebook,
	FaTwitter,
	FaLinkedin,
} from "react-icons/fa";
import Image from "next/image";
import { INews } from "@/types/content";

interface NewsDetailViewProps {
	news: INews;
}

export default function NewsDetailView({ news }: NewsDetailViewProps) {
	if (!news) {
		return (
			<PublicLayout>
				<div className="max-w-4xl mx-auto py-20 text-center">
					<h1 className="text-2xl font-bold text-gray-800 mb-4">
						Article not found
					</h1>
					<Link
						href="/media/news"
						className="text-primary hover:underline">
						Return to News
					</Link>
				</div>
			</PublicLayout>
		);
	}

	return (
		<PublicLayout>
			<PageHeader
				title={news.category}
				breadcrumb="News Detail"
			/>

			<div className="max-w-4xl mx-auto px-4 py-16">
				<Link
					href="/media/news"
					className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
					<FaArrowLeft className="mr-2" /> Back to News
				</Link>

				<article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
					{/* Header Image */}
					{news.featuredImage && (
						<div className="w-full h-96 bg-gray-100 relative">
							<Image
								src={news.featuredImage}
								alt={news.title}
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
						</div>
					)}

					<div className="p-8 md:p-12">
						{/* Meta */}
						<div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 gap-6">
							<span className="flex items-center text-primary font-bold uppercase tracking-wider">
								<FaTag className="mr-2" /> {news.category}
							</span>
							<span className="flex items-center">
								<FaCalendarAlt className="mr-2" />
								{news.publishedAt &&
									new Date(news.publishedAt).toLocaleDateString(undefined, {
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
							</span>
							{news.author && (
								<span className="flex items-center">
									<FaUser className="mr-2" />{" "}
									{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
									{typeof news.author === "object" && (news.author as any).firstName
										? // eslint-disable-next-line @typescript-eslint/no-explicit-any
										  `${(news.author as any).firstName} ${(news.author as any).lastName}`
										: "NUPRC Admin"}
								</span>
							)}
						</div>

						{/* Title */}
						<h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
							{news.title}
						</h1>

						{/* Content */}
						<div
							className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12"
							dangerouslySetInnerHTML={{ __html: news.content || news.excerpt }}
						/>

						{/* Tags */}
						{news.tags && news.tags.length > 0 && (
							<div className="border-t border-gray-200 pt-8 mt-8">
								<h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
									Tags
								</h4>
								<div className="flex flex-wrap gap-2">
									{news.tags.map((tag: string, idx: number) => (
										<span
											key={idx}
											className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
											#{tag}
										</span>
									))}
								</div>
							</div>
						)}

						{/* Share */}
						<div className="border-t border-gray-200 pt-8 mt-8 flex items-center justify-between">
							<span className="font-bold text-gray-900">Share:</span>
							<div className="flex space-x-4">
								<button className="h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
									<FaFacebook />
								</button>
								<button className="h-10 w-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
									<FaTwitter />
								</button>
								<button className="h-10 w-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
									<FaLinkedin />
								</button>
							</div>
						</div>
					</div>
				</article>
			</div>
		</PublicLayout>
	);
}
