"use client";

import React from "react";
import Link from "next/link";
import { FaFilePdf, FaExternalLinkAlt, FaChevronRight } from "react-icons/fa";

export default function QuickLinks() {
	const links = [
		{ title: "2024 Licensing Round Guidelines", url: "#", type: "pdf" },
		{ title: "Petroleum Industry Act (PIA) 2021", url: "#", type: "pdf" },
		{ title: "NUPRC Service Charter", url: "/services/servicom", type: "link" },
		{
			title: "Oil Production Status Report",
			url: "/technical/oil-production",
			type: "link",
		},
		{
			title: "Gas Flare Commercialisation Programme",
			url: "https://ngfcp.nuprc.gov.ng",
			type: "external",
		},
		{ title: "Upstream Investment Opportunities", url: "#", type: "pdf" },
	];

	return (
		<section className="py-16 bg-white border-t border-gray-100">
			<div className="max-w-7xl mx-auto px-4 md:px-8">
				<div className="bg-primary-dark rounded-2xl p-8 md:p-12 relative overflow-hidden">
					{/* Background Pattern */}
					<div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
					<div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

					<div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
						<div>
							<h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
								Commission Quick Links
							</h2>
							<p className="text-gray-300">
								Fast access to essential documents and resources.
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
						{links.map((link, index) => (
							<Link
								key={index}
								href={link.url}
								target={link.type === "external" ? "_blank" : undefined}
								className="flex items-center p-4 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/30 rounded-lg transition-all group backdrop-blur-sm">
								<div className="flex-shrink-0 mr-4 h-10 w-10 bg-white/10 rounded-full flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
									{link.type === "pdf" && <FaFilePdf />}
									{link.type === "external" && <FaExternalLinkAlt size={14} />}
									{link.type === "link" && <FaChevronRight />}
								</div>
								<span className="text-white font-medium text-sm group-hover:text-accent transition-colors">
									{link.title}
								</span>
							</Link>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
