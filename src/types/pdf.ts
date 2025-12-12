export interface HTMLPageFlip {
	pageFlip: () => {
		flipNext: () => void;
		flipPrev: () => void;
	};
}

export interface PdfPageProps {
	pageNumber: number;
	width: number;
	height: number;
}
