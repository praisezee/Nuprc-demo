import { HeroSection } from "@/components/ui";

const GenericPage = ({
	title,
	subtitle,
	content,
}: {
	title: string;
	subtitle?: string;
	content?: string;
}) => {
	return (
		<div className="bg-white dark:bg-gray-900 min-h-screen">
			<HeroSection
				title={title}
				subtitle={subtitle}
			/>

			<div className="container mx-auto px-4 py-16">
				<div className="max-w-4xl mx-auto prose dark:prose-invert">
					{content ? (
						<div dangerouslySetInnerHTML={{ __html: content }} />
					) : (
						<div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-xl">
							<h3 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
								Content Coming Soon
							</h3>
							<p className="text-gray-500 dark:text-gray-400">
								This page is currently under development.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default GenericPage;
