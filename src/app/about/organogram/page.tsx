import PublicLayout from "@/components/public/PublicLayout";
import React from "react";
import { FaSitemap } from "react-icons/fa";

export default function OrganogramPage() {
	return (
		<PublicLayout>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="max-w-5xl mx-auto text-center">
						<h1 className="text-4xl font-bold text-primary mb-6">Organogram</h1>
						<div className="w-20 h-1 bg-primary mx-auto rounded-full mb-12"></div>

						<div className="bg-white p-12 rounded-xl shadow-md border border-gray-100 flex flex-col items-center justify-center min-h-[400px]">
							<FaSitemap className="text-6xl text-primary-200 mb-6" />
							<h3 className="text-2xl font-bold text-gray-400 mb-4">
								Organizational Structure Chart
							</h3>
							<p className="text-gray-500 max-w-md mx-auto">
								The visual representation of our organizational structure is currently
								being updated to reflect recent administrative changes. Please check
								back soon.
							</p>
						</div>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
