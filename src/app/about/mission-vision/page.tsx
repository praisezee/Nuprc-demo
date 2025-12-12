"use client";

import React from "react";
import PublicLayout from "@/components/public/PublicLayout";
import PageHeader from "@/components/public/PageHeader";
import {
	FaBullseye,
	FaEye,
	FaGem,
	FaAward,
	FaCheckCircle,
} from "react-icons/fa";

export default function MissionVisionPage() {
	return (
		<PublicLayout>
			<PageHeader
				title="Mission & Vision"
				breadcrumb="Mission & Vision"
			/>

			<div className="max-w-7xl mx-auto px-4 py-20">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
					<div className="order-2 md:order-1">
						<div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10 relative overflow-hidden group hover:shadow-lg transition-shadow">
							<div className="absolute -right-10 -bottom-10 text-primary/5 text-9xl">
								<FaBullseye />
							</div>
							<div className="relative z-10">
								<div className="h-16 w-16 bg-primary rounded-xl flex items-center justify-center text-white text-3xl mb-6 shadow-md">
									<FaBullseye />
								</div>
								<h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
								<p className="text-xl text-gray-700 leading-relaxed font-medium">
									"Promoting sustainable value creation from Nigeria’s Petroleum
									Resources for shared prosperity."
								</p>
							</div>
						</div>
					</div>
					<div className="order-1 md:order-2 space-y-6">
						<p className="text-lg text-gray-600 leading-relaxed">
							Our mission statement reflects our commitment to ensuring that the
							exploration and production of Nigeria's oil and gas resources translate
							into tangible benefits for the nation and its citizens, while strictly
							adhering to environmental and sustainability standards.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					<div className="space-y-6">
						<p className="text-lg text-gray-600 leading-relaxed">
							We aspire to be a world-class regulator, setting standards in the oil and
							gas industry that attract investment, foster transparency, and drive
							economic growth for Nigeria and Africa at large.
						</p>
					</div>
					<div>
						<div className="bg-accent/5 rounded-3xl p-8 md:p-12 border border-accent/10 relative overflow-hidden group hover:shadow-lg transition-shadow">
							<div className="absolute -right-10 -bottom-10 text-accent/5 text-9xl">
								<FaEye />
							</div>
							<div className="relative z-10">
								<div className="h-16 w-16 bg-accent rounded-xl flex items-center justify-center text-white text-3xl mb-6 shadow-md">
									<FaEye />
								</div>
								<h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
								<p className="text-xl text-gray-700 leading-relaxed font-medium">
									"Be Africa’s leading Regulator."
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Core Values */}
				<div className="mt-24 text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-16">Core Values</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
						{[
							{ title: "Professionalism", icon: FaAward },
							{ title: "Integrity", icon: FaGem },
							{ title: "Accountability", icon: FaCheckCircle },
							{ title: "Transparency", icon: FaEye },
						].map((val, idx) => (
							<div
								key={idx}
								className="flex flex-col items-center group">
								<div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center text-primary text-3xl mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm">
									<val.icon />
								</div>
								<h3 className="text-lg font-bold text-gray-800">{val.title}</h3>
							</div>
						))}
					</div>
				</div>
			</div>
		</PublicLayout>
	);
}
