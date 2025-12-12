"use client";

import React from "react";
import Link from "next/link";
import {
	FaMoneyBillWave,
	FaFire,
	FaUsers,
	FaChartBar,
	FaArrowRight,
	FaFileContract,
	FaGlobe,
	FaHandshake,
} from "react-icons/fa";

export default function ServicesGrid() {
	const services = [
		{
			title: "TSA Payments",
			description:
				"Securely process all regulatory fees and payments via the Remita platform.",
			icon: FaMoneyBillWave,
			link: "https://login.remita.net/remita/onepage/biller/payment.spa",
			external: true,
			gradient: "from-blue-600 to-blue-400",
			shadow: "shadow-blue-500/20",
		},
		{
			title: "NGFCP Portal",
			description: "Access the Nigerian Gas Flare Commercialisation Programme.",
			icon: FaFire,
			link: "https://ngfcp.nuprc.gov.ng/",
			external: true,
			gradient: "from-orange-600 to-orange-400",
			shadow: "shadow-orange-500/20",
		},
		{
			title: "Host Comply",
			description: "Manage Host Community Development compliance and reporting.",
			icon: FaUsers,
			link: "https://hostcomply.nuprc.gov.ng/",
			external: true,
			gradient: "from-green-600 to-green-400",
			shadow: "shadow-green-500/20",
		},
		{
			title: "Reports",
			description:
				"Access comprehensive industry reports and annual performance reviews.",
			icon: FaChartBar,
			link: "/reports",
			external: false,
			gradient: "from-purple-600 to-purple-400",
			shadow: "shadow-purple-500/20",
		},
		{
			title: "Publications",
			description:
				"Browse our latest publications, journals, and technical papers.",
			icon: FaFileContract,
			link: "/publications",
			external: false,
			gradient: "from-teal-600 to-teal-400",
			shadow: "shadow-teal-500/20",
		},
		{
			title: "Guidelines",
			description:
				"View regulatory guidelines, standards, and operational procedures.",
			icon: FaGlobe,
			link: "/guidelines",
			external: false,
			gradient: "from-indigo-600 to-indigo-400",
			shadow: "shadow-indigo-500/20",
		},
	];

	return (
		<section className="py-24 bg-gray-50 relative overflow-hidden">
			{/* Decorative Elements */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"></div>
				<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2"></div>
			</div>

			<div className="max-w-7xl mx-auto px-6 relative z-10">
				<div className="text-center mb-20">
					<span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider mb-4">
						Our Ecosystem
					</span>
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
						Regulatory <span className="text-primary">Services</span>
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
						Seamlessly access our suite of digital platforms designed to streamline
						compliance, enhance transparency, and drive efficiency in the upstream
						sector.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{services.map((service, index) => (
						<Link
							key={index}
							href={service.link}
							target={service.external ? "_blank" : undefined}
							className={`group relative bg-white p-1 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${service.shadow}`}>
							<div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white rounded-3xl" />

							{/* Content Container */}
							<div className="relative h-full bg-white rounded-[22px] p-8 flex flex-col items-start overflow-hidden border border-gray-100/50">
								{/* Gradient Background Effect on Hover */}
								<div
									className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-5 rounded-bl-full group-hover:scale-150 transition-transform duration-700 ease-out`}
								/>

								{/* Icon */}
								<div
									className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white text-3xl shadow-lg mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
									<service.icon />
								</div>

								{/* Text */}
								<h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-colors">
									{service.title}
								</h3>
								<p className="text-gray-500 mb-8 leading-relaxed flex-grow group-hover:text-gray-600">
									{service.description}
								</p>

								{/* Link Arrow */}
								<div className="flex items-center text-sm font-bold text-gray-400 group-hover:text-primary transition-colors uppercase tracking-wider">
									<span>Access Service</span>
									<span className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center ml-3 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:translate-x-2">
										<FaArrowRight size={12} />
									</span>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
