"use client";

import React from "react";
import PublicLayout from "@/components/public/PublicLayout";
import PageHeader from "@/components/public/PageHeader";
import {
	FaFilePdf,
	FaExternalLinkAlt,
	FaInfoCircle,
	FaCheckCircle,
} from "react-icons/fa";

export default function LicensingRoundPage() {
	return (
		<PublicLayout>
			<PageHeader
				title="2024 Licensing Round"
				breadcrumb="Licensing Round"
			/>

			<div className="max-w-7xl mx-auto px-4 py-16">
				{/* Introduction */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
					<div>
						<h2 className="text-3xl font-bold text-primary mb-6">
							Investment Opportunities in Nigeria&apos;s Deep Offshore
						</h2>
						<p className="text-lg text-gray-600 mb-6 leading-relaxed">
							The Nigerian Upstream Petroleum Regulatory Commission (NUPRC) announces
							the commencement of the 2024 Licensing Round. This round offers a unique
							opportunity for local and international investors to participate in the
							exploration and development of Nigeria’s vast hydrocarbon resources.
						</p>
						<p className="text-gray-600 mb-8">
							We are committed to a transparent, fair, and competitive bidding process
							in line with the Petroleum Industry Act (PIA) 2021.
						</p>
						<a
							href="#"
							className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:-translate-y-1">
							Access Bidding Portal <FaExternalLinkAlt className="ml-2" />
						</a>
					</div>
					<div className="bg-gray-100 rounded-2xl p-8 border border-gray-200">
						<h3 className="text-xl font-bold text-primary mb-4 flex items-center">
							<FaInfoCircle className="text-primary mr-2" /> Key Information
						</h3>
						<ul className="space-y-4">
							<li className="flex items-start">
								<FaCheckCircle className="text-primary-500 mt-1 mr-3 shrink-0" />
								<div>
									<span className="font-bold text-gray-800">12 Blocks on Offer:</span>
									<p className="text-sm text-gray-600">
										Deep offshore and continental shelf assets.
									</p>
								</div>
							</li>
							<li className="flex items-start">
								<FaCheckCircle className="text-primary-500 mt-1 mr-3 shrink-0" />
								<div>
									<span className="font-bold text-gray-800">Registration Deadline:</span>
									<p className="text-sm text-gray-600">June 30th, 2024</p>
								</div>
							</li>
							<li className="flex items-start">
								<FaCheckCircle className="text-primary-500 mt-1 mr-3 shrink-0" />
								<div>
									<span className="font-bold text-gray-800">Data Room Access:</span>
									<p className="text-sm text-gray-600">
										Available upon registration payment.
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>

				{/* Resources */}
				<div className="mb-16">
					<h3 className="text-2xl font-bold text-primary mb-8 border-b border-gray-200 pb-4">
						Downloads & Resources
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{[
							"2024 Licensing Round Guidelines",
							"Map of Blocks on Offer",
							"Registration Guide",
							"Fiscal Terms Overview",
							"Sample Production Sharing Contract (PSC)",
						].map((item, idx) => (
							<div
								key={idx}
								className="flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
								<div className="h-10 w-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center mr-4 group-hover:bg-red-100 transition-colors">
									<FaFilePdf />
								</div>
								<span className="font-medium text-gray-700 group-hover:text-primary transition-colors">
									{item}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</PublicLayout>
	);
}
