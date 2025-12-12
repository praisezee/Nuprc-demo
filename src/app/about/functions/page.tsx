import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Functions | NUPRC",
	description:
		"NUPRC has the statutory responsibility of ensuring compliance to petroleum laws, regulations and guidelines in the Upstream Oil and Gas Sector.",
	openGraph: {
		title: "Functions | NUPRC",
		description:
			"NUPRC has the statutory responsibility of ensuring compliance to petroleum laws, regulations and guidelines in the Upstream Oil and Gas Sector.",
		url: "https://nuprc.gov.ng/about/functions",
		siteName: "NUPRC",
		type: "website",
	},
};

export default function FunctionsPage() {
	return (
		<PublicLayout>
			<HeroSection
				title="Our Functions"
				subtitle="What we do"
				backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="max-w-5xl mx-auto">
						{/* Introduction */}
						<div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 mb-10">
							<h2 className="text-3xl font-bold text-primary mb-6">What We Do</h2>
							<p className="text-gray-700 leading-relaxed text-lg">
								NUPRC has the statutory responsibility of ensuring compliance to
								petroleum laws, regulations and guidelines in the Upstream Oil and Gas
								Sector. The discharge of these responsibilities involves monitoring of
								operations at drilling sites, producing wells, production platforms and
								flowstations, crude oil export terminals, and all pipelines carrying
								crude oil, natural gas, while carrying out the following functions,
								among others:
							</p>
						</div>

						{/* Functions List */}
						<div className="space-y-6">
							<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
								<div className="flex items-start gap-4">
									<div className="shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg">
										1
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-800 mb-2">
											Supervising Upstream Petroleum Operations
										</h3>
										<p className="text-gray-600 leading-relaxed">
											Supervising all Upstream Petroleum operations being carried out under
											licences and leases in the country.
										</p>
									</div>
								</div>
							</div>

							<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
								<div className="flex items-start gap-4">
									<div className="shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg">
										2
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-800 mb-2">
											Monitoring for National Goals
										</h3>
										<p className="text-gray-600 leading-relaxed">
											Monitoring Upstream Petroleum operations to ensure that are in line
											with national goals and aspirations including those relating to
											Natural Gas Flare elimination & monetization, Domestic Gas Delivery
											Obligations and Domestic crude oil supply obligations.
										</p>
									</div>
								</div>
							</div>

							<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
								<div className="flex items-start gap-4">
									<div className="shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg">
										3
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-800 mb-2">
											Health, Safety & Environmental Regulations
										</h3>
										<p className="text-gray-600 leading-relaxed">
											Ensuring that Health Safety & Environmental regulations conform with
											national and international best oil field practice.
										</p>
									</div>
								</div>
							</div>

							<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
								<div className="flex items-start gap-4">
									<div className="shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg">
										4
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-800 mb-2">
											Maintaining Records
										</h3>
										<p className="text-gray-600 leading-relaxed">
											Maintaining records on upstream petroleum operations, particularly on
											matters relating to petroleum reserves, production/exports, licences
											and leases.
										</p>
									</div>
								</div>
							</div>

							<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
								<div className="flex items-start gap-4">
									<div className="shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg">
										5
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-800 mb-2">
											Advising Government
										</h3>
										<p className="text-gray-600 leading-relaxed">
											Advising Government and relevant Government agencies on technical
											matters and public policies that may have impact on the
											administration and upstream petroleum activities.
										</p>
									</div>
								</div>
							</div>

							<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
								<div className="flex items-start gap-4">
									<div className="shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg">
										6
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-800 mb-2">
											Processing Applications
										</h3>
										<p className="text-gray-600 leading-relaxed">
											Processing upstream petroleum – related applications for leases,
											licences and permits.
										</p>
									</div>
								</div>
							</div>

							<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
								<div className="flex items-start gap-4">
									<div className="shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg">
										7
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-800 mb-2">
											Revenue Collection
										</h3>
										<p className="text-gray-600 leading-relaxed">
											Ensure timely and accurate payments of Rents, Royalties and other
											revenues due to the government from upstream petroleum operations.
										</p>
									</div>
								</div>
							</div>

							<div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
								<div className="flex items-start gap-4">
									<div className="shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-lg">
										8
									</div>
									<div>
										<h3 className="text-xl font-bold text-gray-800 mb-2">
											National Data Repository (NDR)
										</h3>
										<p className="text-gray-600 leading-relaxed">
											Maintain and administer the National Data Repository (NDR).
										</p>
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
