"use client";

import React, { useState, useEffect } from "react";
import PublicLayout from "@/components/public/PublicLayout";
import PageHeader from "@/components/public/PageHeader";
import api from "@/lib/api";
import {
	FaChevronDown,
	FaChevronUp,
	FaQuestionCircle,
	FaSpinner,
} from "react-icons/fa";
import SearchInput from "@/components/ui/SearchInput";

interface FAQ {
	_id: string;
	question: string;
	answer: string;
	category: string;
}

export default function FAQPage() {
	const [faqs, setFaqs] = useState<FAQ[]>([]);
	const [loading, setLoading] = useState(true);
	const [openIndex, setOpenIndex] = useState<number | null>(0);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchFaqs = async () => {
			setLoading(true);
			try {
				const { data } = await api.get("/faq", { params: { isPublished: true } });
				setFaqs(data.data);
			} catch (error) {
				console.error("Failed to fetch FAQs:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchFaqs();
	}, []);

	const toggleAccordion = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const filteredFaqs = faqs.filter(
		(faq) =>
			faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
			faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
			faq.category.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<PublicLayout>
			<PageHeader
				title="Frequently Asked Questions"
				breadcrumb="FAQ"
			/>

			<div className="max-w-3xl mx-auto px-4 py-20">
				{/* Search Bar */}
				<div className="mb-12">
					<SearchInput
						placeholder="Search for answers..."
						onSearch={setSearchTerm}
					/>
				</div>
				{loading ? (
					<div className="flex justify-center py-20">
						<FaSpinner className="animate-spin h-10 w-10 text-primary" />
					</div>
				) : filteredFaqs.length === 0 ? (
					<div className="text-center py-20 bg-gray-50 rounded-xl">
						<FaQuestionCircle className="mx-auto text-4xl text-gray-300 mb-4" />
						<h3 className="text-xl font-bold text-gray-600">
							{searchTerm ? "No results found" : "No questions found"}
						</h3>
					</div>
				) : (
					<div className="space-y-4">
						{filteredFaqs.map((faq, index) => (
							<div
								key={faq._id}
								className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md bg-white">
								<button
									onClick={() => toggleAccordion(index)}
									className={`w-full p-6 text-left flex justify-between items-center transition-colors ${
										openIndex === index
											? "bg-primary/5 text-primary"
											: "bg-white text-gray-800 hover:bg-gray-50"
									}`}>
									<span className="font-bold text-lg flex items-center">
										<FaQuestionCircle
											className={`mr-3 ${
												openIndex === index ? "text-primary" : "text-gray-400"
											}`}
										/>
										{faq.question}
									</span>
									{openIndex === index ? (
										<FaChevronUp />
									) : (
										<FaChevronDown className="text-gray-400" />
									)}
								</button>

								<div
									className={`overflow-hidden transition-all duration-500 ease-in-out ${
										openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
									}`}>
									<div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 mt-4">
										{faq.answer}
									</div>
								</div>
							</div>
						))}
					</div>
				)}

				<div className="mt-16 bg-blue-50 p-8 rounded-xl text-center border border-blue-100">
					<h3 className="text-xl font-bold text-gray-900 mb-2">
						Still have questions?
					</h3>
					<p className="text-gray-600 mb-6">
						Can't find the answer you're looking for? Please contact our support team.
					</p>
					<a
						href="/contact"
						className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-md">
						Contact Us
					</a>
				</div>
			</div>
		</PublicLayout>
	);
}
