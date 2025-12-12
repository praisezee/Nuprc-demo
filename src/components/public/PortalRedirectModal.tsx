"use client";

import React, { useState } from "react";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";

interface PortalRedirectModalProps {
	isOpen: boolean;
	onClose: () => void;
	targetUrl: string;
	title: string;
}

export default function PortalRedirectModal({
	isOpen,
	onClose,
	targetUrl,
	title,
}: PortalRedirectModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
			<div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-scaleIn">
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
					<FaTimes size={20} />
				</button>

				<div className="text-center mb-6">
					<div className="h-16 w-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
						<FaExternalLinkAlt />
					</div>
					<h3 className="text-xl font-bold text-gray-900 mb-2">
						Leaving NUPRC Website
					</h3>
					<p className="text-gray-600 text-sm">
						You are about to be redirected to the external <strong>{title}</strong>{" "}
						portal.
					</p>
				</div>

				<div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100 break-all text-xs text-gray-500 text-center">
					{targetUrl}
				</div>

				<div className="flex space-x-3">
					<button
						onClick={onClose}
						className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition-colors">
						Cancel
					</button>
					<a
						href={targetUrl}
						target="_blank"
						rel="noopener noreferrer"
						onClick={onClose}
						className="flex-1 py-3 px-4 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors flex items-center justify-center">
						Proceed
					</a>
				</div>
			</div>
		</div>
	);
}
