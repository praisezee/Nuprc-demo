import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import React from "react";
import { FaHardHat, FaLeaf, FaShieldAlt, FaUsers } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Health, Safety, Environment & Community",
	description:
		"Ensuring sustainable and responsible operations in Nigeria's upstream oil and gas industry.",
	openGraph: {
		title: "HSEC Department | NUPRC",
		description: "Health, Safety, Environment & Community regulation.",
		url: "https://nuprc.gov.ng/health-safety",
	},
};

export default function HealthSafetyPage() {
	return (
		<PublicLayout>
			<HeroSection
				title="Health, Safety, Environment & Community"
				subtitle="Ensuring sustainable and responsible operations in the upstream oil and gas industry"
				backgroundImage="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="max-w-6xl mx-auto">
						{/* Core Objectives */}
						<div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 mb-10">
							<h2 className="text-3xl font-bold text-primary mb-6">
								HEALTH, SAFETY, ENVIRONMENT & COMMUNITY DEPARTMENT
							</h2>
							<h3 className="text-2xl font-bold text-gray-800 mb-4">
								Core Objectives/Mandates
							</h3>
							<p className="text-gray-700 leading-relaxed">
								The Health, Safety, Environment, and Community (HSEC) Department plays a
								pivotal role in ensuring sustainable and responsible operations in the
								upstream oil and gas industry. This department is tasked with overseeing
								and managing the environmental, health, safety, and community-related
								aspects of oil and gas operations. This synopsis provides an overview of
								the department's structure and activities, emphasizing its critical
								functions and contributions to industry standards and best practices.
							</p>
						</div>

						{/* Quick Overview Cards */}
						<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
							<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
								<div className="h-14 w-14 bg-primary-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
									<FaHardHat />
								</div>
								<h3 className="font-bold text-lg mb-2 text-primary">Health & Safety</h3>
								<p className="text-gray-600 text-sm">4 Units</p>
							</div>
							<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
								<div className="h-14 w-14 bg-primary-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
									<FaLeaf />
								</div>
								<h3 className="font-bold text-lg mb-2 text-primary">Environment</h3>
								<p className="text-gray-600 text-sm">4 Units</p>
							</div>
							<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
								<div className="h-14 w-14 bg-primary-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
									<FaUsers />
								</div>
								<h3 className="font-bold text-lg mb-2 text-primary">Host Community</h3>
								<p className="text-gray-600 text-sm">3 Units</p>
							</div>
							<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
								<div className="h-14 w-14 bg-primary-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
									<FaShieldAlt />
								</div>
								<h3 className="font-bold text-lg mb-2 text-primary">Compliance</h3>
								<p className="text-gray-600 text-sm">Best Practices</p>
							</div>
						</div>

						{/* Health and Safety Division */}
						<div className="bg-gradient-to-r from-primary-50 to-accent-50 p-10 rounded-2xl border-l-4 border-primary mb-10">
							<h3 className="text-2xl font-bold text-primary mb-4">
								HEALTH AND SAFETY DIVISION
							</h3>
							<p className="text-gray-700 leading-relaxed mb-6">
								The Health and Safety Division consists of four (4) units which work
								together to promote occupational health and safety best practices across
								the upstream oil and gas value chain.
							</p>

							<div className="space-y-6">
								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										1. Occupational Safety & Industrial Health (OSIH)
									</h4>
									<p className="text-gray-700">
										The OSIH unit is charged with ensuring that oil and gas companies
										implement safety procedures to identify and mitigate risks in the
										workplace. It also tracks and investigates accidents and incidents,
										administers offshore safety permits, and conducts periodic safety
										audits.
									</p>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										2. Process Safety
									</h4>
									<p className="text-gray-700">
										The Process Safety unit oversees the safety of operations in the oil
										and gas industry, ensuring that people, systems, and assets are in
										place to operate safely. It conducts technical safety studies, manages
										safety-critical equipment, and implements safety management systems.
									</p>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										3. Laboratory & Oilfield Chemicals Unit
									</h4>
									<p className="text-gray-700">
										This unit ensures quality assurance and control (QA/QC) in upstream
										industry operations by accrediting laboratories, monitoring
										environmental compliance, and regulating the use of oilfield
										chemicals.
									</p>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										4. Safety Standard Development and Coordination
									</h4>
									<p className="text-gray-700">
										The Safety Standards Development & Coordination Unit is dedicated to
										ensuring that local initiatives, programs, policies, and standards
										within the Nigerian upstream oil and gas sector are developed and
										implemented in alignment with both local and international best
										practices, codes, and standards. This unit is responsible for the
										continuous development, implementation, and review of Health, Safety,
										and Environment (HSE) guidelines, policies, procedures, and management
										systems. It also plays a crucial role in the review and harmonization
										of health and safety standards, as well as their application across
										various stages of facility design, construction, operation,
										maintenance, and decommissioning. Additionally, the unit oversees the
										accreditation of Safety and Emergency Training Centers, ensuring they
										meet the competency development needs of the industry.
									</p>
								</div>
							</div>
						</div>

						{/* Environment and Sustainability Division */}
						<div className="bg-gradient-to-r from-primary-50 to-accent-50 p-10 rounded-2xl border-l-4 border-primary mb-10">
							<h3 className="text-2xl font-bold text-primary mb-4">
								ENVIRONMENT AND SUSTAINABILITY DIVISION
							</h3>
							<p className="text-gray-700 leading-relaxed mb-6">
								The Environment and sustainability Division consists of four (4) units
								which work together to entrench environmental and sustainability best
								practices across the upstream oil and gas value chain.
							</p>

							<div className="space-y-6">
								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										1. Industry Waste Management (IWM)
									</h4>
									<p className="text-gray-700">
										The IWM unit is charged with regulating and monitoring the management
										of all hazardous and non-hazardous waste generated in the upstream oil
										and gas industry. The unit seeks to entrench waste management best
										practices by tracking waste from its point of generation to its final
										disposal, issuing permits for waste treatment and discharge, and
										accrediting waste management facilities and service providers.
									</p>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										2. Sustainability (ESG and CCUS)
									</h4>
									<p className="text-gray-700">
										The Sustainability unit coordinates efforts related to climate change
										policy compliance, greenhouse gas emissions tracking, with a strong
										emphasis on mitigating methane emissions and other short-lived climate
										pollutants. This includes monitoring the implementation of Methane
										Leak Detection & Repair (LDAR) programs across all upstream operations
										and development of regulatory frameworks for carbon capture,
										utilization, and storage (CCUS) projects. It also develops
										sustainability reporting guidance and frameworks for evaluating and
										accrediting service providers on emission management technologies.
									</p>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										3. Environmental Remediation
									</h4>
									<p className="text-gray-700">
										This Environmental Remediation unit is charged spearheading the
										pollution prevention and control programs across industry. These
										include oil spill contingency plan (OSCP) review and activation,
										spillage documentation, investigation, cleanup and stakeholder
										engagement, and the coordination of environmental remediation efforts
										for impacted sites. The unit also coordinates annual HSE audits/OSCP
										activation.
									</p>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										4. Project Environmental Management Plan Administration
									</h4>
									<p className="text-gray-700">
										This unit is charged with managing the environmental and
										socio-economic risks associated with upstream oil and gas projects.
										Its core functions include reviewing and approving environmental
										impact assessments, risk registers, and management plans, as well as
										monitoring the implementation of environmental action plans by oil &
										gas operators.
									</p>
								</div>
							</div>
						</div>

						{/* Host Community Division */}
						<div className="bg-gradient-to-r from-primary-50 to-accent-50 p-10 rounded-2xl border-l-4 border-primary">
							<h3 className="text-2xl font-bold text-primary mb-4">
								HOST COMMUNITY DIVISION
							</h3>
							<p className="text-gray-700 leading-relaxed mb-6">
								The Host Community Division consists of three (3) units which work
								together to operationalize, implement and monitor the provisions of the
								Petroleum Industry Act (PIA 2021) with respect to Host Community
								Development Trusts (HCDTs).
							</p>

							<div className="space-y-6">
								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										1. Host Community Development Administration
									</h4>
									<p className="text-gray-700">
										The Host Community Development Administration Unit is charged with
										coordinating the incorporation and operationalization of the various
										Host Community Development Trusts. It provides regulatory guidance for
										the operation of the HCDTs including matters relating to
										pre-qualification of fund managers, audit and reporting, governance,
										fund remittances etc. The unit also manages the HOSTCOMPLY Portal.
									</p>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										2. Community Project Management (CPM)
									</h4>
									<p className="text-gray-700">
										The CPM branch manages the implementation of community development
										projects as outlined in the Petroleum Industry Act (PIA) 2021 and
										ensures transparency and accountability in project execution. The unit
										provides regulatory guidance, approval and consents for matters
										relating to community needs assessment, Community Development Plans
										(CDPs) and sustainability performance monitoring of HCDT projects.
									</p>
								</div>

								<div>
									<h4 className="font-bold text-lg text-gray-800 mb-2">
										3. Host Community Project Review Management
									</h4>
									<p className="text-gray-700">
										The Community Project Review Management unit provides regulatory
										guidance on matters relating to legacy projects migration to HCDT,
										grievance resolution, HCDT project reporting, review and monitoring
										and HCDT Performance Evaluation.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
