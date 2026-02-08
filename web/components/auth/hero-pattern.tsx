"use client";

import Star3 from "@/components/stars/s3";
import Star6 from "@/components/stars/s6";
import Star9 from "@/components/stars/s9";
import Star14 from "@/components/stars/s14";
import Star20 from "@/components/stars/s20";
import Star22 from "@/components/stars/s22";
import Star32 from "@/components/stars/s32";
import Star38 from "@/components/stars/s38";

export default function HeroPattern() {
	const stars = [Star3, Star6, Star9, Star14, Star20, Star22, Star32, Star38];

	const colors = [
		"#FF6B6B",
		"#4ECDC4",
		"#FFE66D",
		"#FF9F1C",
		"#FF006E",
		"#00F5D4",
		"#D90429",
		"#3A86FF",
	];

	const COLUMNS = 6;
	const STARS_PER_COL = 14;
	const STAR_SIZE = 32;

	const columns = Array.from({ length: COLUMNS }, (_, colIndex) => {
		const columnStars = Array.from(
			{ length: STARS_PER_COL },
			(_, itemIndex) => {
				const globalIndex = colIndex * STARS_PER_COL + itemIndex;

				const shapeIndex = (globalIndex * 3 + 7) % stars.length;
				const colorIndex = (globalIndex * 5 + 3) % colors.length;
				const rotation = (globalIndex * 45) % 360;

				return {
					id: `col-${colIndex}-item-${itemIndex}`,
					Star: stars[shapeIndex],
					color: colors[colorIndex],
					rotation,

					zoomDelay: `${(globalIndex % 7) * 0.5}s`,
				};
			},
		);
		return {
			id: `col-${colIndex}`,
			items: columnStars,
			direction: colIndex % 2 === 0 ? "up" : "down",
			duration: 20 + (colIndex % 3) * 5 + "s",
		};
	});

	return (
		<div className="relative h-full w-full overflow-hidden bg-main border-r-2 border-border">
			<style jsx>{`
				/* Marquee Animations */
				@keyframes marquee-up {
					0% {
						transform: translateY(0);
					}
					100% {
						transform: translateY(-50%);
					}
				}
				@keyframes marquee-down {
					0% {
						transform: translateY(-50%);
					}
					100% {
						transform: translateY(0);
					}
				}
				.animate-marquee-up {
					animation: marquee-up linear infinite;
				}
				.animate-marquee-down {
					animation: marquee-down linear infinite;
				}

				/* New Zoom Animation */
				@keyframes zoom-pulse {
					0%,
					100% {
						transform: scale(1);
					}
					50% {
						transform: scale(1.4);
					}
				}
				.animate-zoom-pulse {
					animation: zoom-pulse 3s ease-in-out infinite;
				}
			`}</style>

			<div
				className="absolute inset-0 z-10 opacity-10 pointer-events-none"
				style={{
					backgroundImage:
						"radial-gradient(var(--border) 1px, transparent 1px)",
					backgroundSize: "24px 24px",
				}}
			/>

			<div className="flex flex-row justify-between h-full w-full overflow-hidden gap-4 px-4">
				{columns.map((col) => (
					<div key={col.id} className="relative h-full flex-1 overflow-hidden">
						<div
							className={
								col.direction === "up"
									? "animate-marquee-up"
									: "animate-marquee-down"
							}
							style={{ animationDuration: col.duration }}>
							<div className="flex flex-col gap-8 pb-8">
								{/* Original Set */}
								{col.items.map((item) => (
									<div
										key={item.id}
										className="flex justify-center"
										style={{ transform: `rotate(${item.rotation}deg)` }}>
										{/* Inner wrapper for Zoom Animation */}
										<div
											className="animate-zoom-pulse"
											style={{ animationDelay: item.zoomDelay }}>
											<item.Star
												size={STAR_SIZE}
												color={item.color}
												stroke="var(--border)"
												strokeWidth={2}
											/>
										</div>
									</div>
								))}
								{/* Duplicate Set for Loop */}
								{col.items.map((item) => (
									<div
										key={`${item.id}-dup`}
										className="flex justify-center"
										style={{ transform: `rotate(${item.rotation}deg)` }}>
										<div
											className="animate-zoom-pulse"
											style={{ animationDelay: item.zoomDelay }}>
											<item.Star
												size={STAR_SIZE}
												color={item.color}
												stroke="var(--border)"
												strokeWidth={2}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
