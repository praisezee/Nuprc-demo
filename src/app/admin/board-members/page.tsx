"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { FaPlus, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import Image from "next/image";
import toast from "react-hot-toast";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

interface BoardMember {
	_id: string;
	name: string;
	position: string;
	image: string;
	order: number;
}

export default function BoardMembersPage() {
	const [members, setMembers] = useState<BoardMember[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Delete Modal State
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const [isDeleting, setIsDeleting] = useState(false);

	const fetchMembers = async () => {
		try {
			const { data } = await api.get("/board-members");
			setMembers(data.data);
		} catch (err) {
			console.error("Failed to fetch board members:", err);
			setError("Failed to load board members.");
			toast.error("Failed to load board members");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchMembers();
	}, []);

	const confirmDelete = (id: string) => {
		setDeleteId(id);
		setIsDeleteModalOpen(true);
	};

	const handleDelete = async () => {
		if (!deleteId) return;
		setIsDeleting(true);

		try {
			await api.delete(`/board-members/${deleteId}`);
			setMembers(members.filter((m) => m._id !== deleteId));
			toast.success("Board member deleted successfully");
			setIsDeleteModalOpen(false);
		} catch (err) {
			console.error("Failed to delete member:", err);
			toast.error("Failed to delete member");
		} finally {
			setIsDeleting(false);
			setDeleteId(null);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<FaSpinner className="animate-spin h-8 w-8 text-primary" />
			</div>
		);
	}

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-800">Board Members</h1>
				<Link
					href="/admin/board-members/create"
					className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg flex items-center transition-colors">
					<FaPlus className="mr-2" /> Add Member
				</Link>
			</div>

			{error && (
				<div className="p-4 bg-red-100 text-red-700 rounded-lg mb-6">{error}</div>
			)}

			<div className="bg-white rounded-lg shadow overflow-hidden">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Image
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Name
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Position
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Order
							</th>
							<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{members.length === 0 ? (
							<tr>
								<td
									colSpan={5}
									className="px-6 py-4 text-center text-sm text-gray-500">
									No board members found.
								</td>
							</tr>
						) : (
							members.map((member) => (
								<tr key={member._id}>
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="relative h-10 w-10">
											<Image
												src={member.image}
												alt={member.name}
												fill
												className="rounded-full object-cover"
											/>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{member.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{member.position}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{member.order}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<Link
											href={`/admin/board-members/${member._id}`}
											className="text-primary hover:text-primary-dark mr-4">
											<FaEdit className="inline" />
										</Link>
										<button
											onClick={() => confirmDelete(member._id)}
											className="text-red-600 hover:text-red-900">
											<FaTrash className="inline" />
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			<ConfirmationModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleDelete}
				title="Delete Board Member"
				message="Are you sure you want to delete this board member? This action cannot be undone."
				confirmText="Delete Member"
				isLoading={isDeleting}
				isDelete={true}
			/>
		</div>
	);
}
