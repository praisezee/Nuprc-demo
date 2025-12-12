"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

import hero1 from "@/assets/hero1.jpg";
import hero2 from "@/assets/hero2.jpg";
import hero3 from "@/assets/hero3.jpg";

const slides = [
	{
		id: 1,
		image: hero1,
		title: "Enabling Business in the Upstream Sector",
		description:
			"We are committed to ensuring sustainable development of Nigeria's petroleum resources for shared prosperity.",
	},
	{
		id: 2,
		image: hero2,
		title: "Promoting Sustainable Development",
		description:
			"Driving value for stakeholders through effective regulation and governance in the oil and gas industry.",
	},
	{
		id: 3,
		image: hero3,
		title: "World Class Regulatory Commission",
		description:
			"Setting the standard for excellence in petroleum regulation and technical compliance.",
	},
];

export default function HeroCarousel() {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % slides.length);
		}, 6000);
		return () => clearInterval(timer);
	}, []);

	const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
	const prevSlide = () =>
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

	return (
		<div className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-gray-900 group">
			{/* Slides */}
			{slides.map((slide, index) => (
				<div
					key={slide.id}
					className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
						index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
					}`}>
					<Image
						src={slide.image}
						alt={slide.title}
						fill
						className="object-cover opacity-60"
						priority={index === 0}
						quality={90}
					/>
					<div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent"></div>

					{/* Content */}
					<div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 text-white max-w-5xl">
						<div
							className={`transition-all duration-1000 transform ${
								index === currentSlide
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}>
							<span className="inline-block py-1 px-3 rounded bg-secondary/20 text-secondary border border-secondary/40 text-sm font-bold uppercase tracking-wider mb-4 backdrop-blur-sm">
								NIGERIAN UPSTREAM PETROLEUM REGULATORY COMMISSION
							</span>
						</div>

						<h1
							className={`text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight drop-shadow-xl transition-all duration-1000 delay-200 transform ${
								index === currentSlide
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}>
							{slide.title}
						</h1>

						<p
							className={`text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed transition-all duration-1000 delay-300 transform ${
								index === currentSlide
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}>
							{slide.description}
						</p>

						<div
							className={`flex flex-wrap gap-4 transition-all duration-1000 delay-500 transform ${
								index === currentSlide
									? "translate-y-0 opacity-100"
									: "translate-y-10 opacity-0"
							}`}>
							<Link
								href="/about/functions"
								className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-bold transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-primary/40 flex items-center">
								Learn More <FaArrowRight className="ml-2" />
							</Link>
							<Link
								href="/services/development-and-production"
								className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-primary text-white rounded-lg font-bold transition-all flex items-center">
								Our Services
							</Link>
						</div>
					</div>
				</div>
			))}

			{/* Controls */}
			<div className="absolute bottom-10 right-10 z-30 hidden md:flex space-x-4">
				<button
					onClick={prevSlide}
					className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/20">
					←
				</button>
				<button
					onClick={nextSlide}
					className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/20">
					→
				</button>
			</div>

			{/* Indicators */}
			<div className="absolute bottom-10 left-6 md:left-20 z-30 flex space-x-3">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`h-1.5 rounded-full transition-all duration-300 ${
							index === currentSlide
								? "w-10 bg-secondary"
								: "w-6 bg-white/30 hover:bg-white/50"
						}`}
					/>
				))}
			</div>
		</div>
	);
}
