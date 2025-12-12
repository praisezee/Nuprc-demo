import PublicLayout from "@/components/public/PublicLayout";

export default function StrategicPlanningManagementPage() {
	return (
		<PublicLayout>
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
						Strategic Planning and Management
					</h1>
					<p className="text-xl text-gray-600">
						Coordinating strategic initiatives and organizational development
					</p>
				</div>

				<div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
					<section>
						<h2 className="text-3xl font-bold text-primary mb-4">Overview</h2>
						<p className="text-gray-700 leading-relaxed text-lg">
							The Strategic Planning and Management division is responsible for
							coordinating the Commission's strategic initiatives, ensuring alignment
							with national petroleum policy objectives, and driving organizational
							excellence.
						</p>
					</section>

					<section>
						<h2 className="text-3xl font-bold text-primary mb-4">
							Key Responsibilities
						</h2>
						<div className="space-y-4">
							<div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-xl border-l-4 border-primary">
								<h3 className="text-xl font-bold text-gray-800 mb-2">
									Strategic Planning
								</h3>
								<p className="text-gray-700">
									Developing and implementing strategic plans that align with national
									petroleum policy and industry best practices.
								</p>
							</div>
							<div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-xl border-l-4 border-primary">
								<h3 className="text-xl font-bold text-gray-800 mb-2">
									Performance Management
								</h3>
								<p className="text-gray-700">
									Monitoring and evaluating organizational performance against strategic
									objectives and KPIs.
								</p>
							</div>
							<div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-xl border-l-4 border-primary">
								<h3 className="text-xl font-bold text-gray-800 mb-2">
									Policy Development
								</h3>
								<p className="text-gray-700">
									Contributing to the development of petroleum policies and regulatory
									frameworks.
								</p>
							</div>
							<div className="bg-gradient-to-r from-primary-50 to-accent-50 p-6 rounded-xl border-l-4 border-primary">
								<h3 className="text-xl font-bold text-gray-800 mb-2">
									Stakeholder Engagement
								</h3>
								<p className="text-gray-700">
									Managing relationships with key stakeholders and coordinating
									inter-departmental initiatives.
								</p>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
		</PublicLayout>
	);
}
