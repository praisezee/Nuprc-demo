import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import { Card, CardBody } from "@/components/ui/Card";
import React from "react";
import { FaGavel, FaDownload } from "react-icons/fa";

export default function ActsPage() {
	return (
		<PublicLayout>
			<HeroSection
				title="Acts & Regulations"
				subtitle="Legal framework guiding the petroleum industry"
				backgroundImage="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="max-w-4xl mx-auto">
						<div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-8">
							<div className="p-8 border-b border-gray-100 flex items-start gap-6">
								<div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary text-3xl shrink-0">
									<FaGavel />
								</div>
								<div>
									<h2 className="text-2xl font-bold text-primary mb-2">
										Petroleum Industry Act (PIA) 2021
									</h2>
									<p className="text-gray-600 leading-relaxed mb-4">
										The Petroleum Industry Act, 2021 provides legal, governance,
										regulatory and fiscal framework for the Nigerian petroleum industry,
										the development of host communities, and related matters.
									</p>
									<button className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors">
										<FaDownload /> Download PIA 2021
									</button>
								</div>
							</div>
						</div>

						{/* Other Acts */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{[1, 2, 3, 4].map((item) => (
								<Card
									key={item}
									className="hover:shadow-md transition-shadow">
									<CardBody className="p-6 flex justify-between items-center">
										<div>
											<h3 className="font-bold text-primary mb-1">Deep Offshore Act</h3>
											<p className="text-xs text-gray-500">Amended 2019</p>
										</div>
										<button className="text-primary hover:bg-primary-50 p-2 rounded-full transition-colors">
											<FaDownload />
										</button>
									</CardBody>
								</Card>
							))}
						</div>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
