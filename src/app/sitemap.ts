import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://nuprc.gov.ng";

	// Static Routes
	const routes = [
		"",
		"/history",
		"/value-statement",
		"/about/functions",
		"/board",
		"/about/faq",
		"/npms",
		"/development-production",
		"/economic-regulation",
		"/exploration",
		"/health-safety",
		"/services/development-and-production",
		"/services/economic-planning-and-regulation",
		"/services/strategic-planning-and-management",
		"/services/corporate-services-and-administration",
		"/services/health-safety-environment-and-community",
		"/media/news",
		"/media/gallery",
		"/media/video-gallery",
		"/publications",
		"/guidelines",
		"/contact",
	].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: "weekly" as const,
		priority: route === "" ? 1.0 : 0.8,
	}));

	try {
		// Fetch dynamic news routes
		const newsResponse = await fetch(`${baseUrl}/api/news?limit=100`, {
			next: { revalidate: 3600 }, // Revalidate every hour
		});

		let newsRoutes: MetadataRoute.Sitemap = [];
		if (newsResponse.ok) {
			const newsData = await newsResponse.json();
			newsRoutes = (newsData.data || []).map(
				(item: { _id: string; updatedAt?: string; createdAt: string }) => ({
					url: `${baseUrl}/media/news/${item._id}`,
					lastModified: new Date(item.updatedAt || item.createdAt),
					changeFrequency: "monthly" as const,
					priority: 0.6,
				})
			);
		}

		// Fetch dynamic publications routes
		const pubsResponse = await fetch(`${baseUrl}/api/publications?limit=100`, {
			next: { revalidate: 3600 },
		});

		let pubsRoutes: MetadataRoute.Sitemap = [];
		if (pubsResponse.ok) {
			const pubsData = await pubsResponse.json();
			pubsRoutes = (pubsData.data || []).map(
				(item: { _id: string; updatedAt?: string; createdAt: string }) => ({
					url: `${baseUrl}/publications/${item._id}`,
					lastModified: new Date(item.updatedAt || item.createdAt),
					changeFrequency: "monthly" as const,
					priority: 0.6,
				})
			);
		}

		return [...routes, ...newsRoutes, ...pubsRoutes];
	} catch (error) {
		console.error("Error generating sitemap:", error);
		// Return static routes if dynamic fetching fails
		return routes;
	}
}
