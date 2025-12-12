"use client";

import React, { useState, useCallback, useRef, forwardRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { FaChevronLeft, FaChevronRight, FaDownload } from "react-icons/fa";

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfFlipperProps {
	file: string;
	title?: string;
	width?: number;
	height?: number;
	showDownload?: boolean;
}

// Check if we are on client side for window access
const isBrowser = typeof window !== "undefined";

// Page component required by react-pageflip to use forwardRef
const PdfPage = forwardRef<HTMLDivElement, any>((props, ref) => {
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

export default function PdfFlipper({
	file,
	title = "Magazine",
	width: customWidth,
	height: customHeight,
	showDownload = true,
}: PdfFlipperProps) {
	const [numPages, setNumPages] = useState<number>(0);
	const flipBook = useRef<any>(null);

	// Dimensions
	const width =
		customWidth || (isBrowser ? (window.innerWidth < 768 ? 300 : 450) : 450);
	const height =
		customHeight || (isBrowser ? (window.innerWidth < 768 ? 424 : 636) : 636);

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
		<div className="w-full">
			{/* Flipbook Container */}
			<div className="relative flex justify-center items-center min-h-[600px] perspective-1000">
				<Document
					file={file}
					onLoadSuccess={onDocumentLoadSuccess}
					loading={
						<div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-xl">
							<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
							<span className="text-gray-500 font-medium animate-pulse">
								Loading {title}...
							</span>
						</div>
					}
					error={
						<div className="text-center p-8 bg-red-50 rounded-xl border border-red-100 max-w-md mx-auto">
							<p className="text-red-600 font-medium mb-2">Unable to load document</p>
							<a
								href={file}
								download
								className="text-primary hover:underline text-sm font-bold">
								Download PDF directly
							</a>
						</div>
					}>
					{numPages > 0 && (
						// @ts-ignore - types likely missing for this lib in this setup
						<HTMLFlipBook
							width={width}
							height={height}
							size="fixed"
							minWidth={300}
							maxWidth={1000}
							minHeight={400}
							maxHeight={1533}
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

				{/* Navigation Controls (Absolute) */}
				{numPages > 0 && (
					<>
						<button
							onClick={prevFlip}
							className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg hover:bg-primary hover:text-white transition-all transform hover:scale-110 group"
							aria-label="Previous Page">
							<FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
						</button>

						<button
							onClick={nextFlip}
							className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-white/80 backdrop-blur-sm text-gray-800 shadow-lg hover:bg-primary hover:text-white transition-all transform hover:scale-110 group"
							aria-label="Next Page">
							<FaChevronRight className="group-hover:translate-x-1 transition-transform" />
						</button>
					</>
				)}
			</div>

			{/* Footer Controls */}
			{showDownload && (
				<div className="flex justify-center items-center mt-10 space-x-6">
					<a
						href={file}
						download
						className="flex items-center px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-bold shadow-sm hover:shadow-md hover:bg-gray-50 transition-all group">
						<FaDownload className="mr-2 text-primary group-hover:scale-110 transition-transform" />
						Download PDF
					</a>
				</div>
			)}
		</div>
	);
}
