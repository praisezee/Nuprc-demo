"use client";

// TopBar component
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function TopBar() {
	return (
		<div className="bg-primary-dark text-white py-2 hidden lg:block border-b border-white/10">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center text-xs xl:text-sm font-bold tracking-tight">
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2">
							<FaMapMarkerAlt className="text-accent" />
							<span>No. 7 Sylvester Ugoh Crescent, Jabi, Abuja FCT, Nigeria.</span>
						</div>
					</div>
					<div className="flex items-center gap-6">
						<a
							href="mailto:nuprc@nuprc.gov.ng"
							className="flex items-center gap-2 hover:text-accent transition-colors">
							<FaEnvelope className="text-accent" />
							<span>nuprc@nuprc.gov.ng</span>
						</a>
						<div className="flex items-center gap-2">
							<FaPhoneAlt className="text-accent" />
							<span>+234 (0) 9 460 5000</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
