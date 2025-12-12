import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import React from "react";
import { FaLaptopCode, FaDatabase, FaChartLine } from "react-icons/fa";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "NPMS - National Production Monitoring System",
	description:
		"The NPMS is a robust Oil & Gas Production Data Bank providing real-time monitoring of Nigeria's crude oil production and exports.",
	openGraph: {
		title: "NPMS | NUPRC",
		description:
			"National Production Monitoring System for Nigeria's oil and gas sector.",
		url: "https://nuprc.gov.ng/npms",
	},
};

export default function NpmsPage() {
	return (
		<PublicLayout>
			<HeroSection
				title="NPMS"
				subtitle="National Production Monitoring System"
				backgroundImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="max-w-5xl mx-auto">
						{/* Overview */}
						<div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 mb-10">
							<h2 className="text-3xl font-bold text-primary mb-6">Overview</h2>
							<p className="text-gray-700 leading-relaxed mb-4">
								The National Production Monitoring System (NPMS) is a robust Oil & Gas
								Production Data Bank. The objective of the NPMS is basically to provide
								an online platform to accurately monitor national crude oil production
								and exports, through the provision of a system for direct and
								independent acquisition of production data from oil and gas facilities
								in Nigeria to ensure timely and accurate reporting of production figures
								and export data. It replaced the paper-based report. NPMS ensures ready
								production reporting to Federal Inland Revenue Service (FIRS), Nigeria
								Extractive Industry Transparency Initiative (NEITI), Revenue
								Mobilization Allocation and Fiscal Commission (RMAFC) and other
								Agencies.
							</p>
							<p className="text-gray-700 leading-relaxed mb-4">
								NPMS as envisaged has empowered the NUPRC to better determine the
								royalty payable and issue demand notice on companies. In addition, the
								nation has been enabled to better predict the performance of oil and gas
								reservoirs and therefore better production forecasting.
							</p>
							<p className="text-gray-700 leading-relaxed">
								The above objectives and gains had been achieved essentially by
								implementing electronic data transmission at Export Terminals (onshore
								and offshore) by NUPRC personnel, as well as at the offices of the
								Operators. This data is then stored in a robust, secure and centralized
								data base to ensure uniformity, consistency and quality.
							</p>
						</div>

						{/* Key Features */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
							<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
								<div className="h-16 w-16 bg-primary-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
									<FaDatabase />
								</div>
								<h3 className="font-bold text-xl mb-3 text-primary">
									Data Acquisition
								</h3>
								<p className="text-gray-600 text-sm">
									Direct and independent acquisition of production data from oil and gas
									facilities across Nigeria.
								</p>
							</div>
							<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
								<div className="h-16 w-16 bg-primary-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
									<FaChartLine />
								</div>
								<h3 className="font-bold text-xl mb-3 text-primary">
									Real-time Monitoring
								</h3>
								<p className="text-gray-600 text-sm">
									Comprehensive real-time reporting of the nation's daily production
									status to Government.
								</p>
							</div>
							<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
								<div className="h-16 w-16 bg-primary-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
									<FaLaptopCode />
								</div>
								<h3 className="font-bold text-xl mb-3 text-primary">Surveillance</h3>
								<p className="text-gray-600 text-sm">
									Facilities for NUPRC to exercise surveillance, perform production
									monitoring, and utilize data for analysis and forecasting.
								</p>
							</div>
						</div>

						{/* Benefits */}
						<div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 mb-10">
							<h2 className="text-3xl font-bold text-primary mb-6">
								Benefits & Imperatives
							</h2>
							<p className="text-gray-700 leading-relaxed mb-4">
								The system includes facilities for the NUPRC to exercise surveillance,
								perform production monitoring, and to be able to utilize the production
								data for analysis and forecasting. Access to data is also available to
								authorized NUPRC personnel, operators and other relevant stakeholders.
							</p>
							<p className="text-gray-700 leading-relaxed mb-4">
								The imperatives of the NPMS scheme cannot be over-emphasized, especially
								when viewed against the backdrop of persistent calls for a more
								efficient, accurate and robust surveillance of the nation's oil
								production and export capabilities. The underlying strength of the NPMS
								is to further ensure NUPRC's ability to accurately determine the exact
								revenue accruing to Nigeria from the oil and gas sector. A key benefit
								is that it also provides modern and reliable technology for
								fiscalization of crude.
							</p>
							<p className="text-gray-700 leading-relaxed">
								All Oil Producing Companies submit production data through the portal
								which enables the Commission to implement a comprehensive real time
								reporting of the nation's daily production status to Government.
							</p>
						</div>

						{/* Contact Information */}
						<div className="bg-gradient-to-r from-primary-50 to-accent-50 p-10 rounded-2xl border-l-4 border-primary mb-10">
							<h2 className="text-2xl font-bold text-primary mb-6">
								For Further Enquiries
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<p className="font-bold text-gray-800 mb-2">Olabanji Oladunni</p>
									<p className="text-gray-700 text-sm mb-1">Phone: +234 803 304 259</p>
									<p className="text-gray-700 text-sm">
										Email: oladunni.o.m@nuprc.gov.ng
									</p>
								</div>
								<div>
									<p className="font-bold text-gray-800 mb-2">Umar Hassan</p>
									<p className="text-gray-700 text-sm mb-1">Phone: +234 805 649 7125</p>
									<p className="text-gray-700 text-sm">Email: hassan.u.h@nuprc.gov.ng</p>
								</div>
							</div>
						</div>

						{/* Portal Link */}
						<div className="text-center">
							<a
								href="https://npms.nuprc.gov.ng"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30 text-lg">
								Visit NPMS Portal
							</a>
						</div>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
