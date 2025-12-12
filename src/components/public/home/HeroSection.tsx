"use client";

import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import Image from "next/image";

export default function HeroSection() {
	return (
		<div className="relative bg-gray-900 h-[600px] w-full overflow-hidden">
			<div className="absolute inset-0">
				<Image
					src="/images/hero-bg.jpg"
					alt="Offshore Rig"
					fill
					className="object-cover opacity-40"
					priority
					quality={90}
				/>
				<div className="absolute inset-0 bg-linear-to-r from-gray-900 via-gray-900/40 to-transparent"></div>
			</div>

			{/* Content */}
			<div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col justify-center">
				<div className="max-w-2xl animate-fadeInUp">
					<span className="inline-block py-1 px-3 rounded bg-accent/20 text-accent border border-accent/40 text-sm font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">
						The Energy Center
					</span>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
						Promoting Sustainable{" "}
						<span className="text-primary italic">Value Creation</span>
					</h1>
					<p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl">
						From Nigeria&apos;s petroleum resources for shared prosperity. We ensure
						technical and commercial regulation of the upstream sector.
					</p>
					<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
						<Link
							href="/guidelines/regulations"
							className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-primary/50">
							View Guidelines
							<FaArrowRight className="ml-2" />
						</Link>
						<Link
							href="/services/licensing"
							className="inline-flex items-center justify-center bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-4 px-8 rounded-lg transition-all">
							2024 Licensing Round
						</Link>
					</div>
				</div>

				{/* Navigation Dots (Visual Only for now) */}
				<div className="absolute bottom-10 left-4 md:left-8 flex space-x-2">
					<div className="w-12 h-1 bg-primary rounded-full"></div>
					<div className="w-2 h-1 bg-white/30 rounded-full"></div>
					<div className="w-2 h-1 bg-white/30 rounded-full"></div>
				</div>
			</div>
		</div>
	);
}
