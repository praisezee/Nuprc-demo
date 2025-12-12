// Server Component for SEO and Initial Data
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
	FaCalendarAlt,
	FaUser,
	FaTag,
	FaSpinner,
	FaArrowLeft,
	FaFacebook,
	FaTwitter,
	FaLinkedin,
} from "react-icons/fa";
import PublicLayout from "@/components/public/PublicLayout";
import PageHeader from "@/components/public/PageHeader";

interface NewsDetail {
	_id: string;
	title: string;
	content: string; // HTML content
	excerpt: string;
	thumbnailUrl?: string;
	publishedAt: string;
	category: string;
	author?: string | { firstName: string; lastName: string };
	tags?: string[];
}

// Helper to fetch data
async function getNews(id: string): Promise<NewsDetail | null> {
	// Using direct fetch for server-side
	// Adjust URL based on environment
	const baseUrl =
		process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
	try {
		const res = await fetch(`${baseUrl}/news/id/${id}`, {
			next: { revalidate: 60 },
		}); // Revalidate every 60 seconds
		if (!res.ok) {
			console.error(
				`Failed to fetch news detail for ID: ${id}, Status: ${res.status}`
			);
			return null;
		}
		const data = await res.json();
		return data.data;
	} catch (e) {
		console.error("Failed to fetch news detail:", e);
		return null;
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const news = await getNews(id);

	if (!news) {
		return {
			title: "News Not Found - NUPRC",
			description: "The requested news article could not be found.",
		};
	}

	return {
		title: news.title,
		description: news.excerpt,
		openGraph: {
			title: news.title,
			description: news.excerpt,
			images: [news.thumbnailUrl || "/images/default-news.jpg"],
			url: `${process.env.NEXT_PUBLIC_BASE_URL || ""}/media/news/${news._id}`,
			type: "article",
			publishedTime: news.publishedAt,
			authors: news.author
				? [
						typeof news.author === "string"
							? news.author
							: `${news.author.firstName} ${news.author.lastName}`,
				  ]
				: [],
		},
		twitter: {
			card: "summary_large_image",
			title: news.title,
			description: news.excerpt,
			images: [news.thumbnailUrl || "/images/default-news.jpg"],
		},
	};
}

export default async function NewsDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const news = await getNews(id);

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

	// Note: Client-side interactivity like useRouter, useState, useEffect are not available here.
	// For share buttons, we'll use simple links or client-side components if complex logic is needed.
	const shareUrl = encodeURIComponent(
		`${process.env.NEXT_PUBLIC_BASE_URL}/media/news/${news._id}`
	);
	const shareTitle = encodeURIComponent(news.title);

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
					{news.thumbnailUrl && (
						<div className="w-full h-96 bg-gray-100 relative">
							<Image
								src={news.thumbnailUrl}
								alt={news.title}
								className="w-full h-full object-cover"
								width={1200} // Provide appropriate width
								height={400} // Provide appropriate height
								priority // Load the main image with high priority
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
								{new Date(news.publishedAt).toLocaleDateString(undefined, {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</span>
							{news.author && (
								<span className="flex items-center">
									<FaUser className="mr-2" />
									{typeof news.author === "object"
										? `${news.author.firstName} ${news.author.lastName}`
										: news.author}
								</span>
							)}
						</div>

						{/* Title */}
						<h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
							{news.title}
						</h1>

						{/* Content - Check if content is HTML from Rich Text */}
						<div
							className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-12"
							dangerouslySetInnerHTML={{ __html: news.content || news.excerpt }} // Fallback to excerpt if no content
						/>

						{/* Tags */}
						{news.tags && news.tags.length > 0 && (
							<div className="border-t border-gray-200 pt-8 mt-8">
								<h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
									Tags
								</h4>
								<div className="flex flex-wrap gap-2">
									{news.tags.map((tag, idx) => (
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
							<span className="font-bold text-gray-900">Share this article:</span>
							<div className="flex space-x-4">
								<Link
									href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
									target="_blank"
									rel="noopener noreferrer"
									className="h-10 w-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
									<FaFacebook />
								</Link>
								<Link
									href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
									target="_blank"
									rel="noopener noreferrer"
									className="h-10 w-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors">
									<FaTwitter />
								</Link>
								<Link
									href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
									target="_blank"
									rel="noopener noreferrer"
									className="h-10 w-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors">
									<FaLinkedin />
								</Link>
							</div>
						</div>
					</div>
				</article>
			</div>
		</PublicLayout>
	);
}
