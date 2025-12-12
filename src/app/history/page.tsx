"use client";
import React from "react";
import { HeroSection } from "@/components/ui";
import PublicLayout from "@/components/public/PublicLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Our History",
	description:
		"Learn about the history and evolution of the Nigerian Upstream Petroleum Regulatory Commission (NUPRC) from the 1950s to present day.",
	openGraph: {
		title: "Our History | NUPRC",
		description: "The evolution of petroleum regulation in Nigeria.",
		url: "https://nuprc.gov.ng/history",
	},
};

const History = () => {
	const historyEvents = [
		{
			year: "Pre-1970",
			title: "In the Beginning",
			description:
				"Petroleum matters were handled by the Hydrocarbon Section of the Ministry of Lagos Affairs, which reported directly to the Governor-General. The Unit kept records on matters relating to exploration and importation of petroleum products. It also enforced safety and other regulations.",
		},
		{
			year: "1971",
			title: "Nigerian National Oil Corporation (NNOC)",
			description:
				"A new body – The Nigerian National Oil Corporation (NNOC) - was created to handle direct commercial operational activities in the oil industry on behalf of the Federal Government. Meanwhile, the Department of Petroleum Resources in the Federal Ministry of Mines and Power continued to exercise statutory supervision and control.",
		},
		{
			year: "1975",
			title: "Upgrade to Ministry",
			description:
				"The Department was upgraded to a Ministry and named the Ministry of Petroleum and Energy, which was later renamed the Ministry of Petroleum Resources.",
		},
		{
			year: "1977",
			title: "Decree 33 of 1977",
			description:
				"This Decree merged the Ministry of Petroleum Resources and the Nigerian National Oil Corporation (NNOC) to form the Nigerian National Petroleum Corporation (NNPC) to conserve scarce manpower. The Decree also created the Petroleum Inspectorate as an integral part of the NNPC, entrusted with the regulation of the petroleum industry.",
		},
		{
			year: "1985 - 1988",
			title: "Re-establishment & Re-organization",
			description:
				"In 1985, the Ministry of Petroleum Resources was re-established, but the Petroleum Inspectorate remained within the NNPC until March 1988. Following a re-organisation, the Petroleum Inspectorate was excised from the NNPC and transferred back to the Ministry of Petroleum Resources as its Technical arm, renamed the Department of Petroleum Resources (DPR).",
		},
		{
			year: "2021",
			title: "Petroleum Industry Act (PIA)",
			description:
				"A landmark moment arrived with the signing of the Petroleum Industry Act (PIA) by President Muhammadu Buhari. This transformative legislation established the Nigerian Upstream Petroleum Regulatory Commission (NUPRC) to oversee the upstream sector, with a vision to be Africa's leading regulator.",
		},
	];

	return (
		<PublicLayout>
			<HeroSection
				title="Our History"
				subtitle="The evolution of petroleum regulation in Nigeria"
				backgroundImage="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=2000&q=80"
			/>

			<div className="container mx-auto px-4 py-16">
				<div className="max-w-4xl mx-auto">
					{/* Intro Text */}
					<div className="text-center mb-16">
						<h2 className="text-3xl font-bold text-primary mb-4">
							Historical Timeline
						</h2>
						<div className="w-20 h-1 bg-primary mx-auto rounded-full mb-8"></div>
						<p className="text-gray-600 leading-relaxed text-lg">
							From the Hydrocarbon Section of the 1950s to the modern NUPRC established
							by the PIA 2021, our journey reflects the growth and transformation of
							Nigeria's petroleum industry.
						</p>
					</div>

					<div className="space-y-12">
						{historyEvents.map((event, index) => (
							<div
								key={index}
								className="flex flex-col md:flex-row gap-6 md:gap-10 border-l-4 border-primary pl-6 md:pl-0 md:border-l-0 relative group">
								{/* Mobile Line Fix: Use border-l on container for mobile, but for desktop we want a central or distinct look. 
                                    Let's go with a clean 'Card' style vertical list for reliability and "Normal Way" look.
                                */}

								<div className="hidden md:flex flex-col items-end w-48 shrink-0 text-right pt-2 border-r-4 border-primary pr-10 relative">
									<div className="absolute right-[-10px] top-4 w-4 h-4 rounded-full bg-primary border-2 border-white"></div>
									<span className="text-2xl font-bold text-primary block">
										{event.year}
									</span>
								</div>

								<div className="md:hidden flex items-center mb-2">
									<span className="text-xl font-bold text-primary px-3 py-1 bg-primary-50 rounded-full">
										{event.year}
									</span>
								</div>

								<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex-grow">
									<h3 className="text-xl font-bold text-primary mb-3">{event.title}</h3>
									<p className="text-gray-600 leading-relaxed">{event.description}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</PublicLayout>
	);
};

export default History;
