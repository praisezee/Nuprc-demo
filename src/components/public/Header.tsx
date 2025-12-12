"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/assets/nuprcanim.gif";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const pathname = usePathname();

	const toggleDropdown = (name: string) => {
		setActiveDropdown(activeDropdown === name ? null : name);
	};

	return (
		<header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-primary/10">
			{/* Top Bar (Optional for contact info etc.) - Keeping simple for now but adding green bar top */}
			<div className="h-2 w-full bg-linear-to-r from-primary-dark via-primary to-accent"></div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
				{/* Logo */}
				<Link
					href="/"
					className="flex items-center gap-3 group">
					<div className="relative w-12 h-12 md:w-16 md:h-16 transition-transform group-hover:scale-105">
						<Image
							src={logo}
							alt="NUPRC Logo"
							fill
							className="object-contain"
							priority
						/>
					</div>
					<div className="flex flex-col">
						<span className="font-extrabold text-lg md:text-2xl text-primary tracking-tight leading-none">
							NUPRC
						</span>
						<span className="text-[10px] md:text-xs text-gray-600 font-semibold tracking-wide hidden sm:block">
							NIGERIAN UPSTREAM PETROLEUM REGULATORY COMMISSION
						</span>
					</div>
				</Link>

				{/* Desktop Nav */}
				<nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
					<NavLink
						href="/"
						active={pathname === "/"}>
						HOME
					</NavLink>

					<Dropdown
						title="ABOUT US"
						active={pathname.startsWith("/about-us")}>
						<DropdownLink href="/history">History</DropdownLink>
						<DropdownLink href="/value-statement">Our Value Statements</DropdownLink>
						<DropdownLink href="/about/functions">Functions</DropdownLink>
						<DropdownLink href="/board">Management</DropdownLink>
						<DropdownLink href="/npms">NPMS</DropdownLink>
						<Link
							href="https://nogec.nuprc.gov.ng/"
							target="_blank"
							rel="noopener noreferrer"
							className="block px-4 py-3 text-sm text-gray-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors font-medium">
							NOGEC
						</Link>
					</Dropdown>

					<Dropdown
						title="SERVICES"
						active={pathname.startsWith("/services")}>
						<DropdownLink href="/development-production">
							Development and Production
						</DropdownLink>
						<DropdownLink href="/economic-regulation">
							Economic Planning and Regulation
						</DropdownLink>
						<DropdownLink href="/services/strategic-planning-and-management">
							Strategic Planning and Management
						</DropdownLink>
						<DropdownLink href="/exploration">Exploration and Acreage</DropdownLink>
						<DropdownLink href="/services/corporate-services-and-administration">
							Corporate Services and Administration
						</DropdownLink>
						<DropdownLink href="/health-safety">
							Health, Safety, Environment and Community
						</DropdownLink>
					</Dropdown>

					<NavLink
						href="/guidelines"
						active={pathname === "/guidelines"}>
						GUIDELINES
					</NavLink>

					<Dropdown
						title="MEDIA"
						active={pathname.startsWith("/media")}>
						<DropdownLink href="/media/news">News</DropdownLink>
						<DropdownLink href="/publications">Publications</DropdownLink>
						<DropdownLink href="/media/gallery">Photo Gallery</DropdownLink>
						<DropdownLink href="/media/video-gallery">Video Gallery</DropdownLink>
					</Dropdown>

					<NavLink
						href="/about/faq"
						active={pathname === "/about/faq"}>
						FAQ
					</NavLink>

					<NavLink
						href="/contact"
						active={pathname === "/contact"}>
						CONTACT
					</NavLink>
					<Link
						href="https://www.pebec.gov.ng/reportgov-ng"
						target="_blank"
						onClick={() => setIsMenuOpen(false)}
						className="mt-4 block w-full text-center px-5 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700">
						Reportgov.ng
					</Link>
				</nav>

				{/* Mobile Menu Button */}
				<button
					className="lg:hidden text-gray-700 p-2 focus:outline-none"
					onClick={() => setIsMenuOpen(!isMenuOpen)}>
					{isMenuOpen ? (
						<FaTimes className="w-6 h-6 text-primary" />
					) : (
						<FaBars className="w-6 h-6 text-primary" />
					)}
				</button>
			</div>

			{/* Mobile Nav */}
			{isMenuOpen && (
				<div className="lg:hidden bg-white border-t border-gray-100 max-h-[85vh] overflow-y-auto shadow-xl">
					<div className="flex flex-col p-4 space-y-2">
						<MobileNavLink
							href="/"
							onClick={() => setIsMenuOpen(false)}>
							Home
						</MobileNavLink>

						<MobileDropdown
							title="About Us"
							isOpen={activeDropdown === "about"}
							onToggle={() => toggleDropdown("about")}>
							<MobileDropdownLink
								href="/history"
								onClick={() => setIsMenuOpen(false)}>
								History
							</MobileDropdownLink>
							<MobileDropdownLink
								href="/value-statement"
								onClick={() => setIsMenuOpen(false)}>
								Our Value Statements
							</MobileDropdownLink>
							<MobileDropdownLink
								href="/about/functions"
								onClick={() => setIsMenuOpen(false)}>
								Functions
							</MobileDropdownLink>
							<MobileDropdownLink
								href="/board"
								onClick={() => setIsMenuOpen(false)}>
								Management
							</MobileDropdownLink>
							<MobileDropdownLink
								href="/npms"
								onClick={() => setIsMenuOpen(false)}>
								NPMS
							</MobileDropdownLink>
							<Link
								href="https://nogec.nuprc.gov.ng/"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setIsMenuOpen(false)}
								className="block py-2.5 text-sm text-gray-600 font-medium">
								NOGEC
							</Link>
						</MobileDropdown>

						<MobileDropdown
							title="Services"
							isOpen={activeDropdown === "services"}
							onToggle={() => toggleDropdown("services")}>
							<MobileDropdownLink
								href="/services/development-and-production"
								onClick={() => setIsMenuOpen(false)}>
								Development and Production
							</MobileDropdownLink>
							<MobileDropdownLink
								href="/services/economic-planning-and-regulation"
								onClick={() => setIsMenuOpen(false)}>
								Economic Planning and Regulation
							</MobileDropdownLink>
							<MobileDropdownLink
								href="/services/strategic-planning-and-management"
								onClick={() => setIsMenuOpen(false)}>
								Strategic Planning and Management
							</MobileDropdownLink>
							<MobileDropdownLink
								href="/exploration"
								onClick={() => setIsMenuOpen(false)}>
								Exploration and Acreage
							</MobileDropdownLink>
							<MobileDropdownLink
								href="/services/corporate-services-and-administration"
								onClick={() => setIsMenuOpen(false)}>
								Corporate Services and Administration
							</MobileDropdownLink>
							<MobileDropdownLink
								href="/services/health-safety-environment-and-community"
								onClick={() => setIsMenuOpen(false)}>
								Health, Safety, Environment and Community
							</MobileDropdownLink>
						</MobileDropdown>

						<MobileDropdown
							title="MEDIA"
							isOpen={activeDropdown === "media"}
							onToggle={() => toggleDropdown("media")}>
							<MobileDropdownLink
								href="/media/news"
								onClick={() => setIsMenuOpen(false)}>
								News
							</MobileDropdownLink>
							<MobileDropdownLink
								href="/publications"
								onClick={() => setIsMenuOpen(false)}>
								Publications
							</MobileDropdownLink>
							<MobileDropdownLink
								href="/media/gallery"
								onClick={() => setIsMenuOpen(false)}>
								Photo Gallery
							</MobileDropdownLink>
							<MobileDropdownLink
								href="/media/video-gallery"
								onClick={() => setIsMenuOpen(false)}>
								Video Gallery
							</MobileDropdownLink>
						</MobileDropdown>

						<MobileNavLink
							href="/guidelines"
							onClick={() => setIsMenuOpen(false)}>
							GUIDELINES
						</MobileNavLink>

						<MobileNavLink
							href="/about/faq"
							onClick={() => setIsMenuOpen(false)}>
							FAQ
						</MobileNavLink>

						<MobileNavLink
							href="/contact"
							onClick={() => setIsMenuOpen(false)}>
							CONTACT
						</MobileNavLink>
						<Link
							href="https://www.pebec.gov.ng/reportgov-ng"
							target="_blank"
							onClick={() => setIsMenuOpen(false)}
							className="mt-4 block w-full text-center px-5 py-3 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700">
							Reportgov.ng
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}

function NavLink({
	href,
	active,
	children,
}: {
	href: string;
	active?: boolean;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className={`text-sm font-bold transition-colors uppercase tracking-wide relative group ${
				active ? "text-primary" : "text-gray-700 hover:text-primary"
			}`}>
			{children}
			<span
				className={`absolute -bottom-2 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform group-hover:scale-x-100 ${
					active ? "scale-x-100" : ""
				}`}></span>
		</Link>
	);
}

function Dropdown({
	title,
	active,
	children,
}: {
	title: string;
	active?: boolean;
	children: React.ReactNode;
}) {
	return (
		<div className="relative group">
			<button
				className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide transition-colors ${
					active ? "text-primary" : "text-gray-700 group-hover:text-primary"
				}`}>
				{title}{" "}
				<FaChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
			</button>
			<div className="absolute top-full left-0 mt-3 w-64 bg-white rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 p-2 overflow-hidden z-50">
				{children}
			</div>
		</div>
	);
}

function DropdownLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className="block px-4 py-3 text-sm text-gray-600 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors font-medium">
			{children}
		</Link>
	);
}

function MobileNavLink({
	href,
	onClick,
	children,
}: {
	href: string;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className="block py-3 text-base font-bold text-gray-800 border-b border-gray-50">
			{children}
		</Link>
	);
}

function MobileDropdown({
	title,
	isOpen,
	onToggle,
	children,
}: {
	title: string;
	isOpen: boolean;
	onToggle: () => void;
	children: React.ReactNode;
}) {
	return (
		<div className="border-b border-gray-50">
			<button
				onClick={onToggle}
				className="flex justify-between items-center w-full py-3 text-base font-bold text-gray-800">
				{title}{" "}
				<FaChevronDown
					className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
				/>
			</button>
			<div
				className={`pl-4 bg-gray-50/50 overflow-hidden transition-all duration-300 ${
					isOpen ? "max-h-96" : "max-h-0"
				}`}>
				{children}
			</div>
		</div>
	);
}

function MobileDropdownLink({
	href,
	onClick,
	children,
}: {
	href: string;
	onClick: () => void;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			onClick={onClick}
			className="block py-2.5 text-sm text-gray-600 font-medium">
			{children}
		</Link>
	);
}
