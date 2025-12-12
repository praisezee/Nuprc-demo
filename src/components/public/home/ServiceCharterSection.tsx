import { useState, useCallback, useRef, forwardRef } from "react";
import {
	FaNewspaper,
	FaThumbsUp,
	FaLowVision,
	FaChevronLeft,
	FaChevronRight,
	FaDownload,
} from "react-icons/fa";
import Image from "next/image";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { HTMLPageFlip, PdfPageProps } from "@/types/pdf";

// Default PDF file path
const DEFAULT_PDF_FILE = "/pdfs/2025-NURPC-Integrated-Charter-printed.pdf";

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type TabType = "mission" | "vision";

// Check if we are on client side for window access
const isBrowser = typeof window !== "undefined";

// Page component required by react-pageflip to use forwardRef
const PdfPage = forwardRef<HTMLDivElement, PdfPageProps>((props, ref) => {
	return (
		<div
			className="bg-white shadow-sm border-r border-gray-100 h-full overflow-hidden"
			ref={ref}>
			<Page
				pageNumber={props.pageNumber}
				width={props.width}
				height={props.height}
				className="h-full w-full"
				renderTextLayer={false}
				renderAnnotationLayer={false}
				scale={1}
			/>
			<div className="absolute bottom-4 right-4 text-xs text-gray-400 font-mono">
				{props.pageNumber}
			</div>
		</div>
	);
});

PdfPage.displayName = "PdfPage";

interface ServiceCharterSectionProps {
	file?: string;
}

export default function ServiceCharterSection({
	file = DEFAULT_PDF_FILE,
}: ServiceCharterSectionProps) {
	const [activeTab, setActiveTab] = useState<TabType>("mission");
	const [numPages, setNumPages] = useState<number>(0);
	const flipBook = useRef<HTMLPageFlip>(null);

	// Dimensions for PDF
	const width = isBrowser ? (window.innerWidth < 768 ? 250 : 350) : 350;
	const height = isBrowser ? (window.innerWidth < 768 ? 353 : 495) : 495;

	const onDocumentLoadSuccess = useCallback(
		({ numPages }: { numPages: number }) => {
			setNumPages(numPages);
		},
		[]
	);

	const nextFlip = () => {
		flipBook.current?.pageFlip()?.flipNext();
	};

	const prevFlip = () => {
		flipBook.current?.pageFlip()?.flipPrev();
	};

	return (
		<section className="py-24 bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
					{/* Left Column - PDF Flipper */}
					<div className="lg:col-span-8">
						<div className="mb-8">
							<div className="flex items-center gap-3 mb-4">
								<div className="p-3 bg-primary/10 rounded-lg">
									<FaNewspaper className="text-2xl text-primary" />
								</div>
								<h3 className="text-3xl font-bold text-gray-900">
									NUPRC – Service Charter
								</h3>
							</div>
						</div>

						{/* PDF Flipper */}
						<div className="bg-white rounded-2xl shadow-xl p-6">
							<div className="relative flex justify-center items-center min-h-[500px]">
								<Document
									file={file}
									onLoadSuccess={onDocumentLoadSuccess}
									loading={
										<div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl">
											<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
											<span className="text-gray-500 font-medium animate-pulse">
												Loading Service Charter...
											</span>
										</div>
									}
									error={
										<div className="text-center p-8 bg-red-50 rounded-xl border border-red-100 max-w-md mx-auto">
											<p className="text-red-600 font-medium mb-2">
												Unable to load document
											</p>
											<a
												href={file}
												download
												className="text-primary hover:underline text-sm font-bold">
												Download PDF directly
											</a>
										</div>
									}>
									{numPages > 0 && (
										// eslint-disable-next-line @typescript-eslint/ban-ts-comment
										// @ts-ignore - types likely missing for this lib in this setup
										<HTMLFlipBook
											width={width}
											height={height}
											size="fixed"
											minWidth={250}
											maxWidth={800}
											minHeight={300}
											maxHeight={1200}
											maxShadowOpacity={0.5}
											showCover={true}
											mobileScrollSupport={true}
											className="shadow-2xl mx-auto"
											ref={flipBook}>
											{Array.from(new Array(numPages), (el, index) => (
												<PdfPage
													key={index}
													pageNumber={index + 1}
													width={width}
													height={height}
												/>
											))}
										</HTMLFlipBook>
									)}
								</Document>

								{/* Navigation Controls */}
								{numPages > 0 && (
									<>
										<button
											onClick={prevFlip}
											className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg hover:bg-primary hover:text-white transition-all transform hover:scale-110 group"
											aria-label="Previous Page">
											<FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
										</button>

										<button
											onClick={nextFlip}
											className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg hover:bg-primary hover:text-white transition-all transform hover:scale-110 group"
											aria-label="Next Page">
											<FaChevronRight className="group-hover:translate-x-1 transition-transform" />
										</button>
									</>
								)}
							</div>

							{/* Download Button */}
							<div className="flex justify-center items-center mt-6">
								<a
									href={file}
									download
									className="flex items-center px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-bold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all group">
									<FaDownload className="mr-2 text-primary group-hover:scale-110 transition-transform" />
									Download PDF
								</a>
							</div>
						</div>
					</div>

					{/* Right Column - Mission & Vision Tabs */}
					<div className="lg:col-span-4">
						<div className="sticky top-24">
							{/* Tab Navigation */}
							<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
								<div className="flex border-b border-gray-200">
									<button
										onClick={() => setActiveTab("mission")}
										className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-bold transition-all ${
											activeTab === "mission"
												? "bg-primary text-white"
												: "bg-gray-50 text-gray-600 hover:bg-gray-100"
										}`}>
										<FaThumbsUp className="text-lg" />
										<span>Our Mission</span>
									</button>
									<button
										onClick={() => setActiveTab("vision")}
										className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-bold transition-all ${
											activeTab === "vision"
												? "bg-primary text-white"
												: "bg-gray-50 text-gray-600 hover:bg-gray-100"
										}`}>
										<FaLowVision className="text-lg" />
										<span>Our Vision</span>
									</button>
								</div>

								{/* Tab Content */}
								<div className="p-6">
									{/* Mission Tab */}
									{activeTab === "mission" && (
										<div className="animate-fadeIn">
											<h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
												<FaThumbsUp className="text-primary" />
												Our Mission
											</h4>
											<p className="text-gray-700 leading-relaxed mb-6">
												Promoting sustainable value creation from Nigeria&apos;s Petroleum
												Resources for shared prosperity.
											</p>
											<div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg group">
												<Image
													src="/wp-content/uploads/2021/10/Barrel-no-DPR-44-Copy.png"
													alt="NUPRC Head Office"
													fill
													className="object-cover transition-transform duration-500 group-hover:scale-110"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
											</div>
										</div>
									)}

									{/* Vision Tab */}
									{activeTab === "vision" && (
										<div className="animate-fadeIn">
											<h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
												<FaLowVision className="text-primary" />
												Our Vision
											</h4>
											<p className="text-gray-700 leading-relaxed">
												Be Africa&apos;s leading Regulator.
											</p>
										</div>
									)}
								</div>
							</div>

							{/* Additional Info Card */}
							<div className="mt-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10">
								<h5 className="font-bold text-gray-900 mb-2">
									About the Service Charter
								</h5>
								<p className="text-sm text-gray-600 leading-relaxed">
									Our Service Charter outlines our commitment to excellence,
									transparency, and accountability in regulating Nigeria&apos;s upstream
									petroleum sector.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
