import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Economic Regulation & Strategic Planning",
	description:
		"Managing commercial aspects of Nigeria's upstream petroleum operations and strategic planning.",
	openGraph: {
		title: "Economic Regulation & Strategic Planning | NUPRC",
		description:
			"Commercial regulation and strategic planning for upstream petroleum.",
		url: "https://nuprc.gov.ng/economic-regulation",
	},
};

export default function EconomicRegulationPage() {
	return (
		<PublicLayout>
			<HeroSection
				title="Economic Regulation & Strategic Planning"
				subtitle="Managing commercial aspects of Nigeria's upstream petroleum operations"
				backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="max-w-6xl mx-auto">
						{/* Overview */}
						<div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 mb-10">
							<h2 className="text-3xl font-bold text-primary mb-6">
								ECONOMIC REGULATION AND STRATEGIC PLANNING (ER&SP) DEPARTMENT
							</h2>
							<p className="text-gray-700 leading-relaxed mb-4">
								The Economic Regulation and Strategic Planning (ER&SP) Department is one
								of the six (6) departments of the Nigeria Upstream Petroleum Regulatory
								Commission (NUPRC) in compliance with section (18) subsection (2) of the
								Petroleum Industry Act (PIA) 2021.
							</p>
							<p className="text-gray-700 leading-relaxed">
								The ER&SP Department of the Nigeria Upstream Petroleum Regulatory
								Commission manages the commercial aspects of Nigeria's upstream
								petroleum operations in accordance with sections (7) and (8) of the PIA.
								In addition, the Department monitors and coordinates strategic and
								budget planning for the Commission.
							</p>
						</div>

						{/* Mandates */}
						<div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 mb-10">
							<h2 className="text-3xl font-bold text-primary mb-6">MANDATES</h2>
							<p className="text-gray-700 leading-relaxed">
								ER&SP executes its mandate and responsibilities through its two (2) main
								Divisions: Economic Regulation and Strategic Planning.
							</p>
						</div>

						{/* Economic Regulation Division */}
						<div className="bg-gradient-to-r from-primary-50 to-accent-50 p-10 rounded-2xl border-l-4 border-primary mb-10">
							<h3 className="text-2xl font-bold text-primary mb-4">
								ECONOMIC REGULATION DIVISION
							</h3>
							<p className="text-gray-700 leading-relaxed mb-6">
								This Division ensures the Nigerian government benefits economically from
								petroleum resources. The division's mandate includes managing royalties,
								rentals, and fees, setting market-reflective oil prices, monitoring
								licensees' financial viability, approving commercial aspects of field
								development plans, and conducting economic studies and due diligence.
							</p>

							<div className="space-y-6">
								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-3">
										Fiscal Value Administration Unit
									</h4>
									<p className="text-gray-700 mb-2 font-semibold">Key Functions:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
										<li>Royalty assessment management</li>
										<li>Conduct market research on prices and valuation</li>
										<li>Regulatory compliance and reporting</li>
									</ul>
									<p className="text-gray-700 mb-2 font-semibold">Deliverables:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Publish quarterly indebtedness status of all E&P companies</li>
										<li>Issuance of quarterly demand notice to E&P companies</li>
										<li>Publish monthly market analysis reports</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-3">
										Fiscal Advisory and Policy Implementation Unit
									</h4>
									<p className="text-gray-700 mb-2 font-semibold">Key Functions:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
										<li>Advise Management on impact of Fiscal and Policy</li>
										<li>
											Administration of third-party Open Access for crude oil and gas
											handling
										</li>
										<li>Mediation on conflict on gas supply debts and fiscal pricing</li>
										<li>
											Determination of Upstream Gas Cost for Domestic Gas Supply Obligation
										</li>
									</ul>
									<p className="text-gray-700 mb-2 font-semibold">Deliverables:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>
											Issuance of Third-Party Crude Oil Handling and Transportation Permit
										</li>
										<li>Annual computation of domestic gas cost</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-3">
										Economic Value Administration Unit
									</h4>
									<p className="text-gray-700 mb-2 font-semibold">Key Functions:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
										<li>Valuation of Petroleum Assets</li>
										<li>
											Conducting Financial Due Diligence on upstream petroleum transactions
										</li>
										<li>Field Development Plan budgeting analysis</li>
										<li>Monitoring Financial viability and capacity of E&P companies</li>
										<li>Project cost management</li>
										<li>Assessment of statutory funds (D&A Fund, ERF, HCD Fund)</li>
									</ul>
									<p className="text-gray-700 mb-2 font-semibold">Deliverables:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Petroleum Assets Valuation Reports</li>
										<li>
											Upstream Petroleum transactions Financial Considerations Reports
										</li>
										<li>Annual E&P Companies Financial Performance Reports</li>
										<li>Annual Statutory Funds Assessment Reports</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-3">
										Revenue Reporting & Audit Engagement Unit
									</h4>
									<p className="text-gray-700 mb-2 font-semibold">Key Functions:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
										<li>Revenue reporting</li>
										<li>Revenue audit engagement</li>
										<li>Stakeholder engagement</li>
										<li>Process improvement</li>
									</ul>
									<p className="text-gray-700 mb-2 font-semibold">Deliverables:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>
											Monthly revenue reports for internal and external stakeholders
										</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-3">
										Revenue Monitoring & Control Unit
									</h4>
									<p className="text-gray-700 mb-2 font-semibold">Key Functions:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
										<li>Revenue monitoring</li>
										<li>Revenue control</li>
										<li>Revenue analysis</li>
										<li>Process improvement</li>
									</ul>
									<p className="text-gray-700 mb-2 font-semibold">Deliverables:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>
											Monthly report of Revenue Assurance activities on COTEX, GATEX,
											REMITA, IGR platforms
										</li>
										<li>
											Monthly report on Internally Generated Revenue (IGR) and
											Miscellaneous Oil Revenue (MOR)
										</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-3">
										Revenue Ledger and Information Systems Unit
									</h4>
									<p className="text-gray-700 mb-2 font-semibold">Key Functions:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
										<li>Revenue accounting and management</li>
										<li>Information systems management</li>
										<li>Reporting and analysis</li>
										<li>Process improvement</li>
									</ul>
									<p className="text-gray-700 mb-2 font-semibold">Deliverables:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Prepare financial reports on revenue performance</li>
										<li>Develop and maintain a reliable database system</li>
										<li>Monthly Revenue leakage Report</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Strategic Planning Division */}
						<div className="bg-gradient-to-r from-primary-50 to-accent-50 p-10 rounded-2xl border-l-4 border-primary mb-10">
							<h3 className="text-2xl font-bold text-primary mb-4">
								STRATEGIC PLANNING DIVISION
							</h3>
							<p className="text-gray-700 leading-relaxed mb-6">
								This Division identifies strategic opportunities, research industry
								trends, handles performance evaluation, assesses risk and develops
								mitigation strategies for the commission. In addition, the division
								evaluates the performance of operators' annual work programs.
							</p>

							<div className="space-y-6">
								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-3">
										Data Management Unit
									</h4>
									<p className="text-gray-700 mb-2 font-semibold">Key Functions:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
										<li>Oversee Commission's commercial data systems and reporting</li>
										<li>Data collection and analysis</li>
										<li>Commercial data management and systems</li>
										<li>Collaborate with external Stakeholders</li>
									</ul>
									<p className="text-gray-700 mb-2 font-semibold">Deliverables:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Preparation of NUPRC Monthly, Mid-Year and Annual reports</li>
										<li>
											Preparation of Nigeria Oil and Gas Industry Annual report (NOGIAR)
										</li>
										<li>
											Maintain Commission Electronic Financial and Operational Data
											Gathering System
										</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-3">
										Budget Administration Unit
									</h4>
									<p className="text-gray-700 mb-2 font-semibold">Key Functions:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
										<li>Development of Commission's annual budget</li>
										<li>Budget performance monitoring and analysis</li>
										<li>Development of inputs to FGN's MTREF/FSP</li>
										<li>Stakeholder engagement</li>
									</ul>
									<p className="text-gray-700 mb-2 font-semibold">Deliverables:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Publishing quarterly budget performance reports</li>
										<li>Annual Cost of Revenue Collection (CORC) Budget</li>
										<li>Annual Commission's Input to FGN's MTREF/FSP</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-3">
										Work Programme Performance & Evaluation Unit
									</h4>
									<p className="text-gray-700 mb-2 font-semibold">Key Functions:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
										<li>Administration of annual work programme</li>
										<li>Performance monitoring and evaluation</li>
										<li>Performance reporting</li>
										<li>Continuous improvement</li>
									</ul>
									<p className="text-gray-700 mb-2 font-semibold">Deliverables:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Annual comprehensive reports on work programme performance</li>
										<li>
											Annual performance reports on progress of work programme activities
										</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-3">
										Strategic Research & Development Unit
									</h4>
									<p className="text-gray-700 mb-2 font-semibold">Key Functions:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
										<li>Strategic research and analysis</li>
										<li>
											Development, monitoring and evaluation of strategic initiatives
										</li>
									</ul>
									<p className="text-gray-700 mb-2 font-semibold">Deliverables:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Bi-annual Strategic initiative implementation Report</li>
										<li>Governance Framework on Research and Projects</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-3">
										Risk Management Unit
									</h4>
									<p className="text-gray-700 mb-2 font-semibold">Key Functions:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
										<li>Risk identification and assessment</li>
										<li>Risk mitigation and control</li>
										<li>Risk reporting and communication</li>
										<li>Risk management framework development</li>
									</ul>
									<p className="text-gray-700 mb-2 font-semibold">Deliverables:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Enterprise Risk Management Policy</li>
										<li>
											Quarterly reports detailing identified risks and mitigation efforts
										</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-3">
										Service Industry & Investment Unit
									</h4>
									<p className="text-gray-700 mb-2 font-semibold">Key Functions:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4 mb-3">
										<li>Oil & Gas market trend analysis</li>
										<li>Investment facilitation and promotion</li>
										<li>Development and implementation of investment policies</li>
										<li>Investment performance evaluation</li>
									</ul>
									<p className="text-gray-700 mb-2 font-semibold">Deliverables:</p>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>
											Quarterly reports identifying potential investment opportunities
										</li>
										<li>
											Quarterly assessment report on service industry investment project
											performance
										</li>
									</ul>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-3">Achievements</h4>
									<ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
										<li>Launched the Annual Work Program and Budget portal</li>
										<li>
											Deployed the Petroleum Resource Intelligence System (PRIS) Portal
										</li>
										<li>
											Seamless transition of Nigerian crude oil pricing function from NNPCL
											to NUPRC
										</li>
										<li>
											Seamless transition of Crude Oil and Gas Curtailment role from NNPCL
											to NUPRC
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
