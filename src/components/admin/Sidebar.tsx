"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "@/lib/constants";
import classNames from "classnames";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import logo from "@/assets/logo.png";

export default function AdminSidebar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(true);

	return (
		<>
			{/* Mobile Toggle */}
			<div className="md:hidden fixed top-4 left-4 z-50">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="p-2 bg-primary text-white rounded-md shadow-lg">
					{isOpen ? <FaTimes /> : <FaBars />}
				</button>
			</div>

			{/* Sidebar */}
			<div
				className={classNames(
					"fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static",
					{
						"-translate-x-full": !isOpen,
						"translate-x-0": isOpen,
					}
				)}>
				<div className="flex flex-col h-full">
					{/* Logo Area */}
					<div className="h-16 flex items-center justify-center gap-3 border-b border-gray-200 px-4">
						<div className="relative w-10 h-10 shrink-0">
							<Image
								src={logo}
								alt="NUPRC Logo"
								fill
								className="object-contain"
							/>
						</div>
						<h1 className="text-lg font-bold text-primary">NUPRC Admin</h1>
					</div>

					{/* Navigation */}
					<nav className="flex-1 overflow-y-auto py-4">
						<ul className="space-y-1 px-2">
							{ADMIN_NAV_ITEMS.map((item) => {
								const isActive = pathname.startsWith(item.path);
								const Icon = item.icon;
								return (
									<li key={item.path}>
										<Link
											href={item.path}
											className={classNames(
												"flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
												{
													"bg-primary/10 text-primary": isActive,
													"text-gray-600 hover:bg-gray-50 hover:text-gray-900": !isActive,
												}
											)}>
											<Icon className="mr-3 h-5 w-5" />
											{item.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>

					{/* User Profile / Logout */}
					<div className="border-t border-gray-200 p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm font-medium text-gray-900">Admin User</p>
								<p className="text-xs text-gray-500">admin@nuprc.gov.ng</p>
							</div>
							<button
								// onClick={handleLogout}
								className="p-2 text-gray-400 hover:text-red-600 transition-colors"
								title="Logout">
								<FaSignOutAlt className="h-5 w-5" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
