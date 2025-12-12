import PublicLayout from "@/components/public/PublicLayout";
import React from "react";

export default function PrivacyPolicyPage() {
	return (
		<PublicLayout>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="max-w-4xl mx-auto">
						<h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
						<div className="w-20 h-1 bg-primary rounded-full mb-8"></div>

						<div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 prose prose-lg max-w-none">
							<p className="text-gray-600 mb-6">
								The Nigerian Upstream Petroleum Regulatory Commission (NUPRC) is
								committed to protecting your privacy. This Privacy Policy explains how
								we collect, use, and share your personal information when you visit our
								website or use our services.
							</p>
							<h3>1. Information We Collect</h3>
							<p className="text-gray-600 mb-6">
								We may collect personal information such as your name, email address,
								and phone number when you contact us, subscribe to our newsletter, or
								use our online services.
							</p>
							<h3>2. How We Use Your Information</h3>
							<p className="text-gray-600 mb-6">
								We use your information to provide you with the services you request,
								communicate with you, and improve our website and services.
							</p>
							<h3>3. Data Security</h3>
							<p className="text-gray-600">
								We take appropriate measures to protect your personal information from
								unauthorized access, use, or disclosure.
							</p>
						</div>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
