import HeroPattern from "@/components/auth/hero-pattern";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 font-base">
			{/* Left Side: Shapes Pattern */}
			<div className="hidden lg:block relative h-full max-h-screen overflow-hidden">
				<HeroPattern />
			</div>

			{/* Right Side: Form Container */}
			<div className="flex flex-col items-center justify-center p-8 bg-background text-foreground h-full overflow-y-auto">
				<div className="w-full max-w-md">{children}</div>
			</div>
		</div>
	);
}
