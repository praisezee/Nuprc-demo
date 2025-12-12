"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import api, { uploadFile } from "@/lib/api";
import {
	FaArrowLeft,
	FaSave,
	FaSpinner,
	FaCloudUploadAlt,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

export default function EditBoardMemberPage() {
	const router = useRouter();
	const params = useParams();
	const { id } = params;

	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string>("");
	const [formData, setFormData] = useState({
		name: "",
		position: "",
		image: "",
		bio: "",
		order: 0,
	});

	useEffect(() => {
		const fetchMember = async () => {
			try {
				const { data } = await api.get(`/board-members/${id}`);
				setFormData(data.data);
				if (data.data.image) {
					setPreviewUrl(data.data.image);
				}
			} catch (error) {
				console.error("Failed to fetch member:", error);
				toast.error("Failed to load member details");
				router.push("/admin/board-members");
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchMember();
		}
	}, [id, router]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			setFile(selectedFile);
			setPreviewUrl(URL.createObjectURL(selectedFile));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);

		try {
			let imageUrl = formData.image;

			if (file) {
				imageUrl = await uploadFile(file, "nuprc_board");
			}

			await api.put(`/board-members/${id}`, { ...formData, image: imageUrl });
			toast.success("Board member updated successfully");
			router.push("/admin/board-members");
		} catch (error) {
			console.error("Failed to update member:", error);
			toast.error("Failed to update board member");
		} finally {
			setSaving(false);
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
			<div className="flex items-center mb-6">
				<Link
					href="/admin/board-members"
					className="mr-3 text-gray-600 hover:text-gray-900">
					<FaArrowLeft />
				</Link>
				<h1 className="text-2xl font-bold text-gray-800">Edit Board Member</h1>
			</div>

			<div className="bg-white rounded-lg shadow p-6">
				<form
					onSubmit={handleSubmit}
					className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Name */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Name
							</label>
							<input
								type="text"
								required
								value={formData.name}
								onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							/>
						</div>

						{/* Position */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Position
							</label>
							<input
								type="text"
								required
								value={formData.position}
								onChange={(e) => setFormData({ ...formData, position: e.target.value })}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							/>
						</div>

						{/* Image Upload */}
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Profile Image
							</label>
							<div className="flex items-center gap-6">
								<div className="relative w-32 h-32 bg-gray-100 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center">
									{previewUrl ? (
										<Image
											src={previewUrl}
											alt="Preview"
											fill
											className="object-cover"
										/>
									) : (
										<span className="text-gray-400 text-xs text-center px-2">
											No image selected
										</span>
									)}
								</div>
								<div className="flex-1">
									<label className="cursor-pointer bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg inline-flex items-center transition-colors shadow-sm">
										<FaCloudUploadAlt className="mr-2 text-primary" />
										Choose File
										<input
											type="file"
											accept="image/*"
											className="hidden"
											onChange={handleFileChange}
										/>
									</label>
									<p className="text-sm text-gray-500 mt-2">
										Recommended: Square PNG/JPG, max 2MB. Image will be compressed
										automatically.
									</p>
									{/* Fallback URL input */}
									<div className="mt-2">
										<input
											type="url"
											value={formData.image}
											onChange={(e) => setFormData({ ...formData, image: e.target.value })}
											placeholder="Or enter image URL directly..."
											className="w-full text-sm px-3 py-1.5 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary outline-none"
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Order */}
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Order (Sort Priority)
							</label>
							<input
								type="number"
								value={formData.order}
								onChange={(e) =>
									setFormData({
										...formData,
										order: parseInt(e.target.value) || 0,
									})
								}
								className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							/>
						</div>
					</div>

					{/* Bio */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Bio
						</label>
						<textarea
							rows={4}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
							value={formData.bio}
							onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
						/>
					</div>

					{/* Submit */}
					<div className="flex justify-end pt-4">
						<button
							type="submit"
							disabled={saving}
							className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg flex items-center transition-colors shadow-sm disabled:opacity-50">
							<FaSave className="mr-2" />
							{saving ? "Updating..." : "Update Member"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
