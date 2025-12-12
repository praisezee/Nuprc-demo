"use client";

import React from "react";
import PublicLayout from "@/components/public/PublicLayout";
import PageHeader from "@/components/public/PageHeader";
import { FaHistory, FaCheckCircle, FaAward } from "react-icons/fa";

export default function HistoryPage() {
	const milestones = [
		{
			year: "2021",
			title: "Establishment of NUPRC",
			description:
				"The Nigerian Upstream Petroleum Regulatory Commission (NUPRC) was established by the Petroleum Industry Act (PIA) 2021 to replace the Department of Petroleum Resources (DPR).",
		},
		{
			year: "1988",
			title: "Creation of DPR",
			description:
				"The Nigerian National Petroleum Corporation (NNPC) was re-organized, and the Petroleum Inspectorate Commission was excised and transferred to the Ministry of Petroleum Resources as the Department of Petroleum Resources (DPR).",
		},
		{
			year: "1977",
			title: "NNPC Established",
			description:
				"The Nigerian National Petroleum Corporation (NNPC) was created by Decree 33 of 1977, merging the Nigerian National Oil Corporation (NNOC) and the Ministry of Petroleum Resources.",
		},
		{
			year: "1970",
			title: "Department of Petroleum Resources",
			description:
				"The Department of Petroleum Resources began as a Hydrocarbon Section of the Ministry of Lagos Affairs.",
		},
	];

	return (
		<PublicLayout>
			<PageHeader
				title="Our History"
				breadcrumb="History"
			/>

			<div className="max-w-4xl mx-auto px-4 py-16">
				<div className="prose prose-lg text-gray-600 mb-16 mx-auto">
					<p className="lead text-xl text-gray-800 font-semibold text-center mb-8">
						The journey of regulating Nigeria’s petroleum industry has evolved over
						decades to meet the dynamic needs of the sector.
					</p>
					<p>
						The Nigerian Upstream Petroleum Regulatory Commission (NUPRC) is the key
						regulator of the upstream petroleum sector in Nigeria. We are responsible
						for ensuring compliance with petroleum laws, regulations, and guidelines
						in the Oil & Gas Industry. The Commission also monitors operations at
						drilling sites, producing wells, production platforms and flowstations,
						crude oil export terminals, and all pipelines carrying crude oil, natural
						gas, and petroleum products.
					</p>
				</div>

				<div className="relative border-l-4 border-primary/20 ml-4 md:ml-12 space-y-12">
					{milestones.map((item, index) => (
						<div
							key={index}
							className="relative pl-8 md:pl-12">
							{/* Dot */}
							<div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-white border-4 border-primary"></div>

							<div className="flex flex-col md:flex-row md:items-start">
								<span className="text-3xl font-bold text-primary/40 mr-6 mb-2 md:mb-0 w-24 flex-shrink-0">
									{item.year}
								</span>
								<div>
									<h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
									<p className="text-gray-600 leading-relaxed">{item.description}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</PublicLayout>
	);
}
