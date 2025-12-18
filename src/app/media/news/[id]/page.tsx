// Server Component for SEO and Initial Data
import { Metadata } from "next";
import Link from "next/link";
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
import NewsCarousel from "./NewsCarousel";
import NewsDetailSearch from "./NewsDetailSearch";

interface NewsDetail {
	_id: string;
	title: string;
	content: string; // HTML content
	excerpt: string;
	featuredImage?: string;
	images?: string[];
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
			images: [news.featuredImage || "/images/default-news.jpg"],
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
			images: [news.featuredImage || "/images/default-news.jpg"],
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
			<div className="bg-gray-50/50 min-h-screen">
				{/* Cinematic Header Section */}
				<div className="relative">
					<NewsCarousel
						images={
							news.images && news.images.length > 0
								? news.images
								: news.featuredImage
								? [news.featuredImage]
								: []
						}
						title={news.title}
					/>

					{/* Breadcrumb Over Carousel */}
					<div className="absolute top-8 left-0 w-full z-10">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
								<Link
									href="/media/news"
									className="inline-flex items-center px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-primary transition-all duration-300 font-bold text-sm">
									<FaArrowLeft className="mr-2" /> Back to News
								</Link>
								<div className="bg-black/30 backdrop-blur-md p-1 rounded-xl">
									<NewsDetailSearch />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
						{/* Main Content Area */}
						<div className="lg:col-span-8">
							<div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-2xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
								{/* Decorative Element */}
								<div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
								<div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

								<div className="relative z-10">
									{/* Category Label */}
									<div className="mb-8">
										<span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-black uppercase tracking-widest rounded-full">
											{news.category}
										</span>
									</div>

									{/* Title */}
									<h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-10 leading-[1.1] tracking-tight">
										{news.title}
									</h1>

									{/* Mobile-only Meta */}
									<div className="lg:hidden flex flex-wrap items-center gap-6 mb-12 py-6 border-y border-gray-100 italic text-gray-500">
										<span className="flex items-center">
											<FaCalendarAlt className="mr-2 text-primary" />
											{new Date(news.publishedAt).toLocaleDateString()}
										</span>
										{news.author && (
											<span className="flex items-center">
												<FaUser className="mr-2 text-primary" />
												{typeof news.author === "object"
													? `${news.author.firstName} ${news.author.lastName}`
													: news.author}
											</span>
										)}
									</div>

									{/* Content */}
									<div
										className="prose prose-xl max-w-none prose-p:text-gray-700 prose-p:leading-[1.8] prose-headings:text-gray-900 prose-headings:font-black prose-a:text-primary hover:prose-a:underline prose-img:rounded-2xl"
										dangerouslySetInnerHTML={{ __html: news.content || news.excerpt }}
									/>

									{/* Tags Section */}
									{news.tags && news.tags.length > 0 && (
										<div className="mt-20 pt-12 border-t border-gray-100">
											<h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
												Topics & Tags
											</h4>
											<div className="flex flex-wrap gap-3">
												{news.tags.map((tag, idx) => (
													<span
														key={idx}
														className="bg-gray-50 text-gray-700 px-6 py-2 rounded-xl text-sm font-bold border border-gray-100 hover:border-primary hover:text-primary transition-all cursor-default">
														#{tag}
													</span>
												))}
											</div>
										</div>
									)}
								</div>
							</div>
						</div>

						{/* Sticky Sidebar */}
						<div className="lg:col-span-4">
							<div className="sticky top-32 space-y-8">
								{/* Article Info Card */}
								<div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/30 border border-gray-100">
									<h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-6">
										Article Details
									</h4>
									<div className="space-y-6">
										<div className="flex items-start">
											<div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 mr-4">
												<FaCalendarAlt />
											</div>
											<div>
												<p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
													Published On
												</p>
												<p className="text-gray-900 font-bold">
													{new Date(news.publishedAt).toLocaleDateString(undefined, {
														year: "numeric",
														month: "long",
														day: "numeric",
													})}
												</p>
											</div>
										</div>

										{news.author && (
											<div className="flex items-start">
												<div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 mr-4">
													<FaUser />
												</div>
												<div>
													<p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
														Authored By
													</p>
													<p className="text-gray-900 font-bold">
														{typeof news.author === "object"
															? `${news.author.firstName} ${news.author.lastName}`
															: news.author}
													</p>
												</div>
											</div>
										)}
									</div>

									{/* Social Share */}
									<div className="mt-10 pt-8 border-t border-gray-50 text-center">
										<p className="text-sm font-bold text-gray-900 mb-6">
											Share this update
										</p>
										<div className="flex justify-center space-x-4">
											<Link
												href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
												target="_blank"
												rel="noopener noreferrer"
												className="h-12 w-12 bg-gray-50 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-1">
												<FaFacebook className="text-xl" />
											</Link>
											<Link
												href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
												target="_blank"
												rel="noopener noreferrer"
												className="h-12 w-12 bg-gray-50 text-sky-500 rounded-2xl flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-1">
												<FaTwitter className="text-xl" />
											</Link>
											<Link
												href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
												target="_blank"
												rel="noopener noreferrer"
												className="h-12 w-12 bg-gray-50 text-blue-700 rounded-2xl flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-1">
												<FaLinkedin className="text-xl" />
											</Link>
										</div>
									</div>
								</div>

								{/* Newsletter/Action Card */}
								<div className="bg-primary rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-primary/20">
									<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
									<div className="relative z-10 text-center">
										<h4 className="text-xl font-black mb-4">Stay Informed</h4>
										<p className="text-primary-50/80 text-sm leading-relaxed mb-6">
											Subscribe to our newsletter for the latest regulatory updates and
											energy news.
										</p>
										<Link
											href="/contact"
											className="block w-full py-4 bg-white text-primary rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-50 transition-colors shadow-lg">
											Contact Us
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PublicLayout>
	);
}
