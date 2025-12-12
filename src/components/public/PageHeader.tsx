"use client";

import React from "react";

interface PageHeaderProps {
	title: string;
	breadcrumb?: string;
	backgroundImage?: string;
}

export default function PageHeader({
	title,
	breadcrumb,
	backgroundImage,
}: PageHeaderProps) {
	return (
		<div className="relative bg-gray-900 h-64 flex items-center justify-center overflow-hidden">
			{/* Background - decorative abstract or image */}
			{backgroundImage ? (
				<>
					<div
						className="absolute inset-0 bg-cover bg-center z-0"
						style={{ backgroundImage: `url(${backgroundImage})` }}
					/>
					<div className="absolute inset-0 bg-black/60 z-0" />
				</>
			) : (
				<div className="absolute inset-0 bg-primary/90">
					<div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:32px_32px]"></div>
					<div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
					<div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
				</div>
			)}

			<div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
				<h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-sm animate-fadeInUp">
					{title}
				</h1>
				{breadcrumb && (
					<nav className="text-white/80 text-sm md:text-base font-medium flex items-center justify-center animate-fadeInUp delay-100">
						<a
							href="/"
							className="hover:text-white transition-colors cursor-pointer">
							Home
						</a>
						<span className="mx-2 opacity-60">/</span>
						<span className="text-secondary">{breadcrumb}</span>
					</nav>
				)}
			</div>
		</div>
	);
}
