"use client";

import PublicLayout from "@/components/public/PublicLayout";
import PageHeader from "@/components/public/PageHeader";
import {
	FaHandshake,
	FaUserTie,
	FaComments,
	FaRegFileAlt,
} from "react-icons/fa";
import { servicom } from "@/assets";
import Image from "next/image";

export default function ServicomPage() {
	return (
		<PublicLayout>
			<PageHeader
				title="SERVICOM"
				breadcrumb="Servicom"
			/>

			<div className="max-w-7xl mx-auto px-4 py-16">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<h2 className="text-3xl font-bold text-primary mb-4">
						Service Compact with All Nigerians
					</h2>
					<p className="text-lg text-gray-600">
						A commitment to provide the public with quality, efficient, and
						transparent service.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
					<div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
						<div className="h-16 w-16 bg-blue-50 text-blue-600 mx-auto rounded-full flex items-center justify-center text-3xl mb-6">
							<FaHandshake />
						</div>
						<h3 className="text-xl font-bold text-primary mb-3">Our Charter</h3>
						<p className="text-gray-600 text-sm">
							We are dedicated to meeting the expectations of our stakeholders through
							timely and professional service delivery.
						</p>
						<a
							href="#"
							className="text-primary text-sm font-bold mt-4 inline-block hover:underline">
							Download Charter
						</a>
					</div>

					<div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
						<div className="h-16 w-16 bg-primary-50 text-primary-600 mx-auto rounded-full flex items-center justify-center text-3xl mb-6">
							<FaUserTie />
						</div>
						<h3 className="text-xl font-bold text-primary mb-3">Customer Care</h3>
						<p className="text-gray-600 text-sm">
							Our dedicated team is available to assist you with inquiries, complaints,
							and feedback regarding our services.
						</p>
						<a
							href="/contact"
							className="text-primary text-sm font-bold mt-4 inline-block hover:underline">
							Contact Support
						</a>
					</div>

					<div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
						<div className="h-16 w-16 bg-orange-50 text-orange-600 mx-auto rounded-full flex items-center justify-center text-3xl mb-6">
							<FaComments />
						</div>
						<h3 className="text-xl font-bold text-primary mb-3">
							Grievance Mechanism
						</h3>
						<p className="text-gray-600 text-sm">
							Report service failures or dissatisfaction. We ensure prompt
							investigation and resolution of all valid complaints.
						</p>
						<a
							href="#"
							className="text-primary text-sm font-bold mt-4 inline-block hover:underline">
							File a Complaint
						</a>
					</div>
				</div>

				{/* Nodal Officer */}
				<div className="bg-gray-50 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center border border-gray-200">
					<div className="md:w-2/3 md:pr-12 mb-8 md:mb-0">
						<h3 className="text-2xl font-bold text-primary mb-4">
							Servicom Nodal Officer
						</h3>
						<p className="text-gray-700 leading-relaxed mb-6">
							For escalated issues that have not been resolved through standard
							channels, please contact the Servicom Nodal Officer directly. We value
							your feedback as it helps us improve our service delivery.
						</p>
						<div className="inline-flex items-center text-gray-800 font-bold">
							<FaRegFileAlt className="mr-2 text-primary" /> servicom@nuprc.gov.ng
						</div>
					</div>
					<div className="md:w-1/3 flex justify-center">
						<Image
							src={servicom}
							alt="Servicom Logo"
							className="rounded-full shadow-lg"
						/>
					</div>
				</div>
			</div>
		</PublicLayout>
	);
}
