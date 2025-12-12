import PublicLayout from "@/components/public/PublicLayout";
import React from "react";
import { FaChartBar } from "react-icons/fa";

export default function OilProductionPage() {
	return (
		<PublicLayout>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="max-w-5xl mx-auto">
						<h1 className="text-4xl font-bold text-primary mb-6">
							Oil Production Status Report
						</h1>
						<div className="w-20 h-1 bg-primary rounded-full mb-12"></div>

						<div className="bg-white p-12 rounded-xl shadow-md border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
							<FaChartBar className="text-6xl text-primary-200 mb-6" />
							<h3 className="text-2xl font-bold text-gray-400 mb-4">
								Production Data Dashboard
							</h3>
							<p className="text-gray-500 max-w-md mx-auto text-center">
								The daily oil production status reports and interactive charts are being
								integrated into this section. Please check back for real-time data
								updates.
							</p>
							<div className="mt-8">
								<span className="inline-block bg-primary-50 text-primary-700 px-4 py-2 rounded-lg font-medium border border-primary-200">
									Coming Soon
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
