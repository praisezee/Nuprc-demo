"use client";

import React from "react";
import Image from "next/image";

interface HeroSectionProps {
	title: string;
	subtitle?: string;
	backgroundImage?: string;
}

export default function HeroSection({
	title,
	subtitle,
	backgroundImage = "/images/hero-bg.jpg", // Default fallback if needed
}: HeroSectionProps) {
	// Fallback to a solid color if image path is not valid/provided or handle external images
	const isExternal = backgroundImage.startsWith("http");

	return (
		<div className="relative bg-gray-900 h-[400px] w-full overflow-hidden flex items-center justify-center text-center">
			{/* Background Image - Only render if we have a valid source. 
                Using a simple div with opacity for 'fallback' if Next/Image complicates things with external domains not in config
            */}
			<div className="absolute inset-0 z-0">
				{isExternal ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={backgroundImage}
						alt={title}
						className="w-full h-full object-cover opacity-30"
					/>
				) : (
					// Assuming internal images are configured or just use standard img for safety now to avoid config errors
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={backgroundImage}
						alt={title}
						className="w-full h-full object-cover opacity-30"
					/>
				)}
				<div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply"></div>
			</div>

			<div className="relative z-10 max-w-4xl mx-auto px-4">
				<h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
					{title}
				</h1>
				{subtitle && (
					<div className="w-24 h-1 bg-accent mx-auto mb-6 rounded-full"></div>
				)}
				{subtitle && (
					<p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto">
						{subtitle}
					</p>
				)}
			</div>
		</div>
	);
}
