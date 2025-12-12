import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Development & Production Department",
	description:
		"Managing technical and commercial oversight of upstream oil and gas operations in Nigeria.",
	openGraph: {
		title: "Development & Production | NUPRC",
		description: "Technical and commercial oversight of upstream operations.",
		url: "https://nuprc.gov.ng/development-production",
	},
};

export default function DevProdPage() {
	return (
		<PublicLayout>
			<HeroSection
				title="Development & Production"
				subtitle="Optimizing hydrocarbon recovery and production efficiency"
				backgroundImage="https://images.unsplash.com/photo-1518331487541-098520cc3035?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="max-w-6xl mx-auto">
						{/* Overview */}
						<div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 mb-10">
							<h2 className="text-3xl font-bold text-primary mb-6">
								DEVELOPMENT AND PRODUCTION
							</h2>
							<p className="text-gray-700 leading-relaxed mb-4">
								The Development and Production (D&P) Department is one of the six (6)
								departments of the Nigeria Upstream Petroleum Regulatory Commission
								(NUPRC) in compliance with section (18) subsection (2b) of the Petroleum
								Industry Act (PIA) 2021.
							</p>
							<p className="text-gray-700 leading-relaxed">
								D&P is primarily responsible for managing the technical and commercial
								oversights of the Upstream Oil and Gas industry in Nigeria in accordance
								with sections (6), (7) & (8) of the PIA. Additionally, D&P has the
								statutory responsibility of ensuring compliance to petroleum laws,
								regulations, and guidelines in the oil and gas industry.
							</p>
						</div>

						{/* Mandates */}
						<div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 mb-10">
							<h2 className="text-3xl font-bold text-primary mb-6">MANDATES</h2>
							<p className="text-gray-700 leading-relaxed">
								D&P executes its mandate and responsibilities through its three (3) main
								Divisions: Hydrocarbon Development Division, Hydrocarbon Production
								Division, & Energy Sustainability & Carbon Management.
							</p>
						</div>

						{/* Division 1: Hydrocarbon Development */}
						<div className="bg-gradient-to-r from-primary-50 to-accent-50 p-10 rounded-2xl border-l-4 border-primary mb-10">
							<h3 className="text-2xl font-bold text-primary mb-4">
								1. HYDROCARBON DEVELOPMENT DIVISION
							</h3>
							<p className="text-gray-700 leading-relaxed mb-6">
								The Development Division ensures efficient and effective upstream
								petroleum operations by driving optimal field development and reservoir
								performance, overseeing well operations, maintaining facility integrity,
								and ensuring asset reliability. It evaluates well proposals, ensures
								regulatory compliance, and manages unitization processes. Additionally,
								the division conducts audits, inspections, and conformity assessments to
								uphold industry standards, mitigate operational risks, and promote
								sustainable development in the sector.
							</p>

							<div className="space-y-6">
								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										A. Field Development Planning Units
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Facilitate Field Development Studies</li>
										<li>Develop strategy for Field Development Planning</li>
										<li>Carry out cost estimation and economic analysis</li>
										<li>Manage FDP applications</li>
										<li>Monitor FDP Execution</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										B. Reservoir Management and Unitisation (RMU)
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Unitization Agreements and Negotiations</li>
										<li>Scouting for Unitization Candidates</li>
										<li>Managing other unitization-related issues</li>
										<li>Reservoir Characterization and Modelling</li>
										<li>Resource Estimation and Reporting</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										C. Reservoir Performance Management (RPM)
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Reservoir Monitoring and Data Analysis</li>
										<li>Reservoir Performance Evaluation</li>
										<li>Production Optimization and Enhancement</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										D. Wells and Drilling Services (WDS)
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>
											Process Well Location Notice (Application for Approval to Drill)
										</li>
										<li>Process Well Re-Entry Applications</li>
										<li>Rig License Applications and Rig Inventory Management</li>
										<li>Drilling Operations Management</li>
										<li>Re-Entry Operations Management</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										E. Facilities Engineering
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>
											Coordinate the Issuance of Facilities Development Milestones Permits
											& Authorizations
										</li>
										<li>
											Maintain a Comprehensive Database of Metering, Pipeline, and
											Production Facilities Development Projects
										</li>
										<li>
											Propose, Review, and Implement Regulations, Guidelines, and Standards
										</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										F. Standard Conformity Assessment and Technology Adaptation (SCATA)
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Formulation and Adoption of Standards and Guidelines</li>
										<li>Facilitate Interface Management with Standards Providers</li>
										<li>Coordinate Technical Studies and Safety Cases</li>
										<li>Assess Oil and Gas Production Technologies</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										G. Decommissioning & Abandonment (D&A)
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Assess and Evaluate Early D&A Plans</li>
										<li>Track Compliance with D&A Fund Obligations</li>
										<li>Periodic Re-evaluation of Early D&A Plans</li>
										<li>Assess Nationwide Oil & Gas Infrastructure Disposition</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										H. Project Engineering & Monitoring (PEM)
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Project Planning and Coordination</li>
										<li>Project Cost and Budget Management</li>
										<li>
											Project Implementation/Monitoring Risk Assessment and Mitigation
										</li>
										<li>Project Performance Monitoring and Reporting</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Division 2: Hydrocarbon Production */}
						<div className="bg-gradient-to-r from-primary-50 to-accent-50 p-10 rounded-2xl border-l-4 border-primary mb-10">
							<h3 className="text-2xl font-bold text-primary mb-4">
								2. HYDROCARBON PRODUCTION DIVISION
							</h3>

							<div className="space-y-6">
								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										A. Production Allocation and Curtailment (PAC)
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Production Allocation Planning</li>
										<li>Curtailment Management</li>
										<li>Allocation and Curtailment Tracking</li>
										<li>Coordinate, Monitor & Regulate Well Test</li>
										<li>Domestic Crude Oil Supply Obligation Management</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										B. Petroleum Surveillance and Analytics
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Advisory and Regulatory Support</li>
										<li>Reservoir and Well Management</li>
										<li>Well Performance and Production Insights</li>
										<li>Surveillance and Compliance Oversight</li>
										<li>Production and Data Analytics</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										C. Petroleum Accounting
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Management of crude oil/condensate production and export data</li>
										<li>Provide production/export data to stakeholders</li>
										<li>
											Monitor determination and allocation of crude oil production and
											losses
										</li>
										<li>Audit companies' production/losses allocation templates</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										D. Gas Utilization
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Gas Utilization Planning</li>
										<li>Domestic Gas Delivery Obligation (DGDO)</li>
										<li>Gas Flare Permitting, Elimination & Monetization</li>
										<li>
											Gas Production and Utilization Accounting and Data Administration
										</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										E. Asset Integrity Management (AIM)
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Conformity Assessment</li>
										<li>License to Operate Upstream Oil and Gas Facilities</li>
										<li>Risk-Based Inspection</li>
										<li>Coastal Vessel License</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										F. COGTO – Crude Oil Lifting
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Regulate Oil and Gas Export Operations</li>
										<li>Ensure authorized lifting of crude oil, condensate, and gas</li>
										<li>
											Confirm export quantity and quality during outturn verification
										</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										G. COGTO – Crude Oil Facilities
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>
											Review and recommend LACT Units, Prover Loops, and Measuring Systems
										</li>
										<li>Alternate evacuation via barging and trucking</li>
										<li>Storage tank recertification</li>
										<li>Terminal maintenance and repairs processing</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Division 3: Energy Sustainability & Carbon Management */}
						<div className="bg-gradient-to-r from-primary-50 to-accent-50 p-10 rounded-2xl border-l-4 border-primary">
							<h3 className="text-2xl font-bold text-primary mb-4">
								3. ENERGY SUSTAINABILITY & CARBON MANAGEMENT (ES&CM) DIVISION
							</h3>
							<p className="text-gray-700 leading-relaxed mb-6">
								Champion the decarbonization of upstream operations to sustain
								investments in oil & gas resource development for national energy
								security and economic development.
							</p>

							<div className="space-y-6">
								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										A. Decarbonization & Energy Systems Team
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>
											Develop and implement decarbonization strategies and feasibility
											assessments
										</li>
										<li>
											Optimize energy systems for efficiency and renewable energy
											integration
										</li>
										<li>Monitor carbon emissions and implement reduction measures</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										B. Energy Data Analytics & Emissions Reporting Team
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Collect, analyze, and model energy and emissions data</li>
										<li>
											Ensure regulatory compliance through emissions reporting and
											reduction initiatives
										</li>
										<li>
											Engage stakeholders and communicate energy and emissions performance
										</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										C. Decarbonization Commercial Framework Team
									</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>
											Develop commercial frameworks, pricing mechanisms, and business
											models
										</li>
										<li>
											Conduct financial analysis and secure funding for decarbonization
											projects
										</li>
										<li>
											Build partnerships with key stakeholders and manage project risks
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
