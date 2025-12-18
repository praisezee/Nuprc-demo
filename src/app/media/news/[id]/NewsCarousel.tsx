"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function NewsCarousel({
	images,
	title,
}: {
	images: string[];
	title: string;
}) {
	if (!images || images.length === 0) return null;

	if (images.length === 1) {
		return (
			<div className="w-full h-[450px] md:h-[700px] bg-gray-100 relative group overflow-hidden">
				<Image
					src={images[0]}
					alt={title}
					fill
					className="object-cover transition-transform duration-1000 group-hover:scale-105"
					priority
				/>
				<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
			</div>
		);
	}

	return (
		<div className="w-full h-[450px] md:h-[700px] bg-gray-900 relative shadow-2xl">
			<Swiper
				modules={[Navigation, Pagination, Autoplay, EffectFade]}
				navigation
				pagination={{ clickable: true, dynamicBullets: true }}
				autoplay={{ delay: 6000, disableOnInteraction: false }}
				effect="fade"
				loop={true}
				className="h-full w-full">
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<div className="relative w-full h-full group overflow-hidden">
							<Image
								src={image}
								alt={`${title} - image ${index + 1}`}
								fill
								className="object-cover transition-transform duration-1000 group-hover:scale-105"
								priority={index === 0}
							/>
							<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<style
				jsx
				global>{`
				.swiper-button-next,
				.swiper-button-prev {
					color: white;
					background: rgba(0, 0, 0, 0.3);
					width: 50px;
					height: 50px;
					border-radius: 50%;
					backdrop-filter: blur(4px);
				}
				.swiper-button-next:after,
				.swiper-button-prev:after {
					font-size: 20px;
					font-weight: bold;
				}
				.swiper-pagination-bullet {
					background: white;
					opacity: 0.5;
				}
				.swiper-pagination-bullet-active {
					background: #008037 !important; /* primary color */
					opacity: 1;
				}
			`}</style>
		</div>
	);
}
