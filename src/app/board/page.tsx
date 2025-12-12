"use client";
import { useEffect, useState } from "react";
import { HeroSection } from "@/components/ui";
import { Card, CardBody } from "@/components/ui/Card";
import api from "@/lib/api"; // Removed buildDataUrl as we use URLs now
import PublicLayout from "@/components/public/PublicLayout";
import Image from "next/image";

interface BoardMember {
	_id: string;
	name: string;
	role: string; // Mapped from 'position' in backend if needed? Backend model says 'position', interface here says 'role'. We should align.
	position: string; // Add position
	bio?: string;
	image?: string; // Add image URL
	avatar?: {
		meta: {
			mimeType: string;
		};
		data: string;
	};
}

const Board = () => {
	const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchBoardMembers = async () => {
			try {
				const { data } = await api.get("/board-members");
				setBoardMembers(data.data);
			} catch (err) {
				console.error("Failed to fetch board members:", err);
				setError("Failed to load board members.");
			} finally {
				setLoading(false);
			}
		};

		fetchBoardMembers();
	}, []);

	// Helper to get image source
	const getImageSrc = (member: BoardMember) => {
		if (member.image) return member.image;
		// Legacy support (though we are moving away from base64)
		if (member.avatar) {
			return `data:${member.avatar?.meta.mimeType};base64,${member.avatar?.data}`;
		}
		return null;
	};

	const getRole = (member: BoardMember) => member.position || member.role;

	return (
		<PublicLayout>
			<HeroSection
				title="Board & Leadership"
				subtitle="Guiding our mission with expertise and integrity"
				backgroundImage="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2000&q=80"
			/>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-16">
				{loading ? (
					<div className="flex justify-center items-center min-h-[400px]">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
					</div>
				) : error ? (
					<div className="text-center text-red-500 py-10">{error}</div>
				) : boardMembers.length === 0 ? (
					<div className="text-center text-gray-500 py-10">
						No board members found.
					</div>
				) : (
					<div className="flex flex-col gap-16">
						{/* Head of Board Section */}
						{(() => {
							const headMember = boardMembers.find((m) => {
								const role = getRole(m)?.toLowerCase() || "";
								return role.includes("chairman") || role.includes("chief executive");
							});
							const otherMembers = boardMembers.filter(
								(m) => m._id !== headMember?._id
							);

							return (
								<>
									{headMember && (
										<div className="w-full max-w-5xl mx-auto mb-8 animate-fadeIn">
											<div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row">
												<div className="md:w-5/12 relative min-h-[400px]">
													{getImageSrc(headMember) ? (
														<Image
															src={getImageSrc(headMember)!}
															alt={headMember.name}
															fill
															className="object-cover"
															sizes="(max-width: 768px) 100vw, 40vw"
														/>
													) : (
														<div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
															<span className="text-gray-400">No Image</span>
														</div>
													)}
												</div>
												<div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
													<div className="mb-6">
														<span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-bold tracking-wider rounded-full mb-3 uppercase">
															{getRole(headMember)}
														</span>
														<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
															{headMember.name}
														</h2>
														<div className="w-20 h-1.5 bg-accent rounded-full mb-6"></div>
														<p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
															{headMember.bio ||
																"Leading the commission with vision and integrity."}
														</p>
													</div>
												</div>
											</div>
										</div>
									)}

									{/* Other Members Grid */}
									{otherMembers.length > 0 && (
										<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
											{otherMembers.map((member) => (
												<div
													key={member._id}
													className="animate-fadeIn">
													<Card className="h-full hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
														<div className="relative aspect-[4/5] overflow-hidden bg-gray-200">
															{getImageSrc(member) ? (
																<Image
																	src={getImageSrc(member)!}
																	alt={member.name}
																	fill
																	className="object-cover transition-transform duration-500 group-hover:scale-110"
																	sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
																/>
															) : (
																<div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 dark:bg-gray-800">
																	No Image
																</div>
															)}
															<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
																<p className="text-white text-sm line-clamp-4">{member.bio}</p>
															</div>
														</div>
														<CardBody className="p-5 text-center bg-white dark:bg-slate-800 border-t border-gray-100 relative z-20">
															<h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
																{member.name}
															</h3>
															<p className="text-primary font-medium uppercase text-xs tracking-wider line-clamp-1">
																{getRole(member)}
															</p>
														</CardBody>
													</Card>
												</div>
											))}
										</div>
									)}
								</>
							);
						})()}
					</div>
				)}
			</div>
		</PublicLayout>
	);
};

export default Board;
