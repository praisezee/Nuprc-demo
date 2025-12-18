import PublicLayout from "@/components/public/PublicLayout";
import { HeroSection } from "@/components/ui";
import { Card, CardBody } from "@/components/ui/Card";
import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
	return (
		<PublicLayout>
			<HeroSection
				title="Contact Us"
				subtitle="Get in touch with our team"
				backgroundImage="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=2000&q=80"
			/>
			<section className="py-20 bg-gray-50">
				<div className="container mx-auto px-4 md:px-8">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
						{/* Contact Info */}
						<div className="space-y-6">
							<Card className="hover:shadow-md transition-shadow">
								<CardBody className="p-6 flex items-start gap-4">
									<div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary text-xl shrink-0">
										<FaMapMarkerAlt />
									</div>
									<div>
										<h3 className="text-lg font-bold text-primary mb-2">Head Office</h3>
										<p className="text-gray-600">
											No. 7 Sylvester Ugoh Crescent,
											<br /> Jabi, Abuja FCT, Nigeria.
										</p>
									</div>
								</CardBody>
							</Card>

							<Card className="hover:shadow-md transition-shadow">
								<CardBody className="p-6 flex items-start gap-4">
									<div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary text-xl shrink-0">
										<FaPhone />
									</div>
									<div>
										<h3 className="text-lg font-bold text-primary mb-2">Phone</h3>
										<p className="text-gray-600">+234 (0) 9 460 5000</p>
									</div>
								</CardBody>
							</Card>

							<Card className="hover:shadow-md transition-shadow">
								<CardBody className="p-6 flex items-start gap-4">
									<div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary text-xl shrink-0">
										<FaEnvelope />
									</div>
									<div>
										<h3 className="text-lg font-bold text-primary mb-2">Email</h3>
										<p className="text-gray-600">nuprc@nuprc.gov.ng</p>
									</div>
								</CardBody>
							</Card>
						</div>

						{/* Contact Form */}
						<div className="lg:col-span-2">
							<div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
								<h2 className="text-2xl font-bold text-primary mb-6">
									Send us a message
								</h2>
								<form className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-sm font-bold text-gray-700 mb-2">
												Name
											</label>
											<input
												type="text"
												className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
												placeholder="Your Name"
											/>
										</div>
										<div>
											<label className="block text-sm font-bold text-gray-700 mb-2">
												Email
											</label>
											<input
												type="email"
												className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
												placeholder="your@email.com"
											/>
										</div>
									</div>
									<div>
										<label className="block text-sm font-bold text-gray-700 mb-2">
											Subject
										</label>
										<input
											type="text"
											className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
											placeholder="How can we help?"
										/>
									</div>
									<div>
										<label className="block text-sm font-bold text-gray-700 mb-2">
											Message
										</label>
										<textarea
											rows={5}
											className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
											placeholder="Your message..."></textarea>
									</div>
									<button
										type="button"
										className="w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">
										Send Message
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Live Map Section */}
			<section className="py-20 bg-white border-t border-gray-100">
				<div className="container mx-auto px-4 md:px-8">
					<div className="mb-10 text-center">
						<h2 className="text-3xl font-bold text-primary mb-4">
							Find Us on the Map
						</h2>
						<p className="text-gray-500 max-w-2xl mx-auto">
							Visit our head office in Abuja. We are conveniently located in the Jabi
							district.
						</p>
					</div>

					<div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.3874553804726!2d7.417096600000001!3d9.0614555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e75b4a0d61043%3A0xc2e5b933997a9626!2sNUPRC%20HQ%20Nigerian%20Upstream%20Petroleum%20Regulatory%20Commission!5e1!3m2!1sen!2sng!4v1766033291699!5m2!1sen!2sng"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen={true}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"></iframe>
					</div>
				</div>
			</section>
		</PublicLayout>
	);
}
