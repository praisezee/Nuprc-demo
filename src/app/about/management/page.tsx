import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import { Card, CardBody } from "@/components/ui/Card";
import React from "react";

export default function ManagementPage() {
	const managementTeam = [
		{
			name: "Engr. Gbenga Komolafe",
			role: "Commission Chief Executive",
			image: null,
		},
		{ name: "Executive Commissioner 1", role: "E&S", image: null },
		{
			name: "Executive Commissioner 2",
			role: "Development & Production",
			image: null,
		},
		// Add more placeholders
	];

	return (
		<PublicLayout>
			<HeroSection
				title="Management Team"
				subtitle="Leading the Commission towards excellence"
				backgroundImage="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{managementTeam.map((member, index) => (
							<Card
								key={index}
								className="h-full hover:shadow-xl transition-all group overflow-hidden">
								<div className="h-64 bg-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-primary-50 transition-colors">
									{member.image ? (
										<img
											src={member.image}
											alt={member.name}
											className="w-full h-full object-cover"
										/>
									) : (
										"Photo Placeholder"
									)}
								</div>
								<CardBody className="p-6 text-center border-t border-gray-100">
									<h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
									<p className="text-primary font-medium uppercase text-sm tracking-widest">
										{member.role}
									</p>
								</CardBody>
							</Card>
						))}
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
