import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import React from "react";
import { FaEye, FaBullseye, FaGem } from "react-icons/fa";

export default function VisionMissionPage() {
	return (
		<PublicLayout>
			<HeroSection
				title="Vision & Mission"
				subtitle="Our guiding principles and core values"
				backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
						{/* Vision */}
						<div className="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-primary hover:-translate-y-2 transition-transform">
							<div className="h-16 w-16 bg-primary-50 text-primary rounded-full flex items-center justify-center mb-6 text-2xl mx-auto">
								<FaEye />
							</div>
							<h2 className="text-2xl font-bold text-primary mb-4 text-center">
								Our Vision
							</h2>
							<p className="text-gray-600 text-center leading-relaxed">
								To be Africa's Leading Regulator.
							</p>
						</div>

						{/* Mission */}
						<div className="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-primary hover:-translate-y-2 transition-transform">
							<div className="h-16 w-16 bg-primary-50 text-primary rounded-full flex items-center justify-center mb-6 text-2xl mx-auto">
								<FaBullseye />
							</div>
							<h2 className="text-2xl font-bold text-primary mb-4 text-center">
								Our Mission
							</h2>
							<p className="text-gray-600 text-center leading-relaxed">
								Promoting Sustainable Value Creation from Nigeria's Petroleum Resources
								for Shared Prosperity.
							</p>
						</div>

						{/* Core Values */}
						<div className="bg-white p-10 rounded-2xl shadow-lg border-t-4 border-primary hover:-translate-y-2 transition-transform">
							<div className="h-16 w-16 bg-primary-50 text-primary rounded-full flex items-center justify-center mb-6 text-2xl mx-auto">
								<FaGem />
							</div>
							<h2 className="text-2xl font-bold text-primary mb-4 text-center">
								Core Values
							</h2>
							<ul className="text-gray-600 space-y-2 text-center">
								<li>Professionalism</li>
								<li>Accountability</li>
								<li>Transparency</li>
								<li>Integrity</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
