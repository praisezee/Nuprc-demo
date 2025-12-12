"use client";

import Link from "next/link";
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaMapMarkerAlt,
	FaPhoneAlt,
	FaEnvelope,
	FaChevronRight,
	FaYoutube,
} from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-gray-900 text-white pt-16 pb-8 border-t-4 border-primary">
			<div className="max-w-7xl mx-auto px-4 md:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
					{/* Column 1: About */}
					<div>
						<div className="flex items-center mb-6">
							<div className="relative shrink-0 h-10 w-10 rounded-full bg-primary/30 flex items-center justify-center text-primary font-bold mr-4 border border-primary/20">
								<Image
									src={logo}
									alt="NUPRC Logo"
									fill
									className="object-contain"
									priority
								/>
							</div>
							<span className="text-xl font-bold">NUPRC</span>
						</div>
						<p className="text-gray-400 text-sm mb-4">
							The Commission&apos;s strategic plan to ensure sustainable value creation
							from Nigeria&apos;s Petroleum Resources for shared prosperity. We are
							committed to ensuring specific technical and commercial regulations in
							the Upstream Oil & Gas Sector.
						</p>
						<div className="flex space-x-4">
							<Link
								href="https://www.facebook.com/nuprchotline"
								className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
								<FaFacebookF size={14} />
							</Link>
							<Link
								href="https://twitter.com/nuprcofficial"
								className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
								<FaTwitter size={14} />
							</Link>
							<Link
								href="https://youtube.com/@nigerianupstream?si=mtpou0aZy8Gq06Ek"
								className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
								<FaYoutube size={14} />
							</Link>
							<Link
								href="http://instagram.com/nuprc_ng"
								className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
								<FaInstagram size={14} />
							</Link>
						</div>
					</div>

					{/* Column 2: Quick Links */}
					<div>
						<h3 className="text-lg font-bold mb-6 text-primary flex items-center">
							<span className="w-8 h-1 bg-primary mr-3 rounded-full"></span>
							Quick Links
						</h3>
						<ul className="space-y-3 text-sm text-gray-400">
							<li>
								<Link
									href="/about/history"
									className="hover:text-white flex items-center transition-colors">
									<FaChevronRight className="text-primary mr-2 text-xs" /> History of
									DDR/DPR/NUPRC
								</Link>
							</li>
							<li>
								<Link
									href="/about/functions"
									className="hover:text-white flex items-center transition-colors">
									<FaChevronRight className="text-primary mr-2 text-xs" /> Functions of
									the Commission
								</Link>
							</li>
							<li>
								<Link
									href="/services/servicom"
									className="hover:text-white flex items-center transition-colors">
									<FaChevronRight className="text-primary mr-2 text-xs" /> SERVICOM
								</Link>
							</li>
							<li>
								<Link
									href="/technical/annual-reports"
									className="hover:text-white flex items-center transition-colors">
									<FaChevronRight className="text-primary mr-2 text-xs" /> Annual Reports
								</Link>
							</li>
							<li>
								<Link
									href="/media/news"
									className="hover:text-white flex items-center transition-colors">
									<FaChevronRight className="text-primary mr-2 text-xs" /> Latest News
								</Link>
							</li>
							<li>
								<Link
									href="/privacy-policy"
									className="hover:text-white flex items-center transition-colors">
									<FaChevronRight className="text-primary mr-2 text-xs" /> Privacy Policy
								</Link>
							</li>
						</ul>
					</div>

					{/* Column 3: Contact Info */}
					<div>
						<h3 className="text-lg font-bold mb-6 text-primary flex items-center">
							<span className="w-8 h-1 bg-primary mr-3 rounded-full"></span>
							Contact Us
						</h3>
						<ul className="space-y-4 text-sm text-gray-400">
							<li className="flex items-start">
								<FaMapMarkerAlt className="text-primary mt-1 mr-3 shrink-0" />
								<span>7, Sylvester Ugoh Street, Jabi, Abuja FCT</span>
							</li>
							<li className="flex items-center">
								<FaPhoneAlt className="text-primary mr-3 shrink-0" />
								<span>+234 (0) 9062022009</span>
							</li>
							<li className="flex items-center">
								<FaPhoneAlt className="text-primary mr-3 shrink-0" />
								<span>+234 (0) 9013331111</span>
							</li>
							<li className="flex items-center">
								<FaEnvelope className="text-primary mr-3 shrink-0" />
								<Link
									href="mailto:info@nuprc.gov.ng"
									className="hover:text-white transition-colors">
									info@nuprc.gov.ng
								</Link>
							</li>
						</ul>
					</div>

					{/* Column 4: Newsletter */}
					<div>
						<h3 className="text-lg font-bold mb-6 text-primary flex items-center">
							<span className="w-8 h-1 bg-primary mr-3 rounded-full"></span>
							Newsletter
						</h3>
						<p className="text-gray-400 text-sm mb-4">
							Subscribe to our newsletter to receive the latest updates and industry
							news.
						</p>
						<form className="flex flex-col space-y-2">
							<input
								type="email"
								placeholder="Your email address"
								className="bg-gray-800 border-none text-white px-4 py-3 rounded focus:ring-2 focus:ring-primary outline-none text-sm"
							/>
							<button
								type="submit"
								className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded transition-colors uppercase text-xs tracking-wider">
								Subscribe
							</button>
						</form>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-700 mt-8 pt-6">
					<div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 gap-4">
						<p>
							© {currentYear} Nigerian Upstream Petroleum Regulatory Commission. All
							rights reserved.
						</p>
						{/* <p className="flex items-center gap-2">
							Powered by{" "}
							<Link
								href="https://apusindustries.vercel.app/"
								target="_blank"
								rel="noopener noreferrer"
								className="font-semibold text-gray-300 hover:text-primary transition-colors">
								Apus Industries Limited
							</Link>
						</p> */}
					</div>
				</div>
			</div>
		</footer>
	);
}
