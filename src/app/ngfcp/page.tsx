import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import { Card, CardBody } from "@/components/ui/Card";
import React from "react";
import { FaFire } from "react-icons/fa";

export default function NgfcpPage() {
	return (
		<PublicLayout>
			<HeroSection
				title="NGFCP"
				subtitle="Nigerian Gas Flare Commercialisation Programme"
				backgroundImage="https://images.unsplash.com/photo-1563297003-888981412089?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="max-w-4xl mx-auto text-center mb-12">
						<div className="inline-block p-4 rounded-full bg-primary-50 text-primary text-3xl mb-6">
							<FaFire />
						</div>
						<h2 className="text-3xl font-bold text-primary mb-6">
							Gas Flare Commercialisation
						</h2>
						<p className="text-gray-600 leading-relaxed text-lg">
							The Nigerian Gas Flare Commercialisation Programme (NGFCP) is a key
							initiative to eliminate gas flaring by technically and commercially
							sustainable gas utilization projects.
						</p>
					</div>

					<div className="bg-white p-8 rounded-xl shadow-lg border border-primary/10 max-w-4xl mx-auto">
						<h3 className="text-xl font-bold text-primary mb-4">
							Programme Objectives
						</h3>
						<ul className="space-y-4">
							<li className="flex items-start">
								<span className="w-2 h-2 mt-2 bg-primary rounded-full mr-4 shrink-0"></span>
								<span className="text-gray-600">Eliminate routine gas flaring.</span>
							</li>
							<li className="flex items-start">
								<span className="w-2 h-2 mt-2 bg-primary rounded-full mr-4 shrink-0"></span>
								<span className="text-gray-600">Create value from waste gas.</span>
							</li>
							<li className="flex items-start">
								<span className="w-2 h-2 mt-2 bg-primary rounded-full mr-4 shrink-0"></span>
								<span className="text-gray-600">
									Improve environmental and social impact in oil-producing areas.
								</span>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
