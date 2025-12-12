import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import React from "react";
import { FaSearchLocation, FaMapMarkedAlt } from "react-icons/fa";

export default function ExplorationPage() {
	return (
		<PublicLayout>
			<HeroSection
				title="Exploration"
				subtitle="Fostering discovery and increasing Nigeria's oil and gas reserves"
				backgroundImage="https://images.unsplash.com/photo-1596484365775-6e5454199c15?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4 md:px-8">
					<div className="max-w-4xl mx-auto">
						{/* Main Introduction */}
						<div className="mb-12">
							<h2 className="text-3xl font-bold text-primary mb-6">
								Exploration and Acreage Management Department
							</h2>
							<p className="text-gray-700 leading-relaxed text-lg mb-6">
								The Exploration and Acreage Management Department is a critical unit
								within the Nigerian Upstream Petroleum Regulatory Commission (NUPRC). It
								is responsible for monitoring and regulating exploration activities and
								managing concession acreages in accordance with the Petroleum Act
								(1969), the Petroleum Industry Act (2021), relevant regulations,
								guidelines, and best practices in Nigeria. Additionally, the Department
								ensures the sustainable exploration and development of Nigeria’s oil and
								gas resources to grow its reserves and increase production.
							</p>
						</div>

						{/* Key Responsibilities */}
						<div className="mb-10">
							<h3 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
								Key Responsibilities
							</h3>

							<div className="grid gap-8">
								{/* Permits/Approvals */}
								<div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
									<div className="flex items-start gap-4">
										<div className="shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xl mt-1">
											<FaMapMarkedAlt />
										</div>
										<div>
											<h4 className="text-xl font-bold text-gray-900 mb-3">
												Permits & Approvals
											</h4>
											<p className="text-gray-700 leading-relaxed">
												The Exploration and Acreage Management Department is solely
												responsible for issuing permits and approvals for geophysical data
												acquisition, geotechnical and geo-hazard evaluations, exploratory
												field nomenclature, naming, and well classification, core, fluid,
												and subsurface data acquisition, analysis, and/or export; and
												overseeing drilling activities (exploration, 1st appraisal, and 2nd
												appraisal wells). It also monitors seismic surveys, prospect
												evaluation, and frontier exploration activities, ensuring their
												management and funding align with the provisions of the Petroleum
												Industry Act (PIA) 2021.
											</p>
										</div>
									</div>
								</div>

								{/* Data Collection/Analysis */}
								<div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
									<div className="flex items-start gap-4">
										<div className="shrink-0 w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary text-xl mt-1">
											<FaSearchLocation />
										</div>
										<div>
											<h4 className="text-xl font-bold text-gray-900 mb-3">
												Data Collection & Analysis
											</h4>
											<p className="text-gray-700 leading-relaxed mb-4">
												The E&AM collaborates with academic institutions and industry
												stakeholders to collect, collate, analyze, and disseminate data for
												research and National Data Repository (NDR) archiving and management
												in addition to maintaining a comprehensive database of oil and gas
												concessions, including Oil Prospecting Licenses (OPLs), Oil Mining
												Leases (OMLs), Petroleum Prospecting Licenses (PPLs), and Petroleum
												Mining Leases (PMLs). It evaluates hydrocarbon potential in
												sedimentary basins, conducts licensing rounds, processes
												applications for license/lease allocations, assignments of interest,
												renewals, conversions, extensions, and relinquishments, and performs
												continuous evaluations of license/lease performance.
											</p>
											<p className="text-gray-700 leading-relaxed">
												Furthermore, the Department also collaborates with multi-client data
												companies to conduct speculative surveys and lease data to investors
												and stakeholders. It compiles crude oil and gas production figures
												for derivation by the Revenue Mobilization Allocation and Fiscal
												Commission (RMAFC) and provides Mapping and Geographic Information
												System (GIS) services.
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
