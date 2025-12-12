import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import { Card, CardBody } from "@/components/ui/Card";
import React from "react";
import { FaMoneyBillWave, FaCreditCard, FaUniversity } from "react-icons/fa";

export default function PaymentsPage() {
	return (
		<PublicLayout>
			<HeroSection
				title="Payments & TSA"
				subtitle="Guidelines for Remita payments and Treasury Single Account compliance"
				backgroundImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="max-w-4xl mx-auto">
						<div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 mb-10">
							<h2 className="text-2xl font-bold text-primary mb-4 flex items-center">
								<FaUniversity className="text-primary mr-3" />
								TSA Compliance
							</h2>
							<p className="text-gray-600 mb-6 font-medium">
								All payments to the Nigerian Upstream Petroleum Regulatory Commission
								(NUPRC) must be made through the Treasury Single Account (TSA) via the
								Remita Platform.
							</p>
							<p className="text-gray-600 mb-4">
								This ensures transparency and accountability in all financial
								transactions.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<a
								href="https://login.remita.net/remita/onepage/biller/payment.spa"
								target="_blank"
								className="group">
								<Card className="h-full hover:shadow-lg transition-all group-hover:-translate-y-1 border-t-4 border-primary">
									<CardBody className="text-center p-8">
										<div className="h-16 w-16 bg-primary-50 text-primary rounded-full flex items-center justify-center mb-6 text-2xl mx-auto group-hover:bg-primary group-hover:text-white transition-colors">
											<FaMoneyBillWave />
										</div>
										<h3 className="text-xl font-bold text-primary mb-2">
											Remita Payment Portal
										</h3>
										<p className="text-gray-500 mb-4">
											Click to access the official Remita payment page for NUPRC.
										</p>
										<span className="text-primary font-bold uppercase text-sm tracking-wide">
											Pay Now
										</span>
									</CardBody>
								</Card>
							</a>

							<div className="group">
								<Card className="h-full hover:shadow-lg transition-all group-hover:-translate-y-1 border-t-4 border-accent">
									<CardBody className="text-center p-8">
										<div className="h-16 w-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-6 text-2xl mx-auto">
											<FaCreditCard />
										</div>
										<h3 className="text-xl font-bold text-primary mb-2">
											Payment Guidelines
										</h3>
										<p className="text-gray-500 mb-4">
											Download the comprehensive guide on how to generate RRR and make
											payments.
										</p>
										<span className="text-accent font-bold uppercase text-sm tracking-wide">
											Download PDF
										</span>
									</CardBody>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
