import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
	size?: number;
}

export const Logo = ({ size = 64, className, ...props }: LogoProps) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 100 100"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			{...props}>
			<path
				d="M24 24 H74 V74 H24 V24 Z"
				fill="var(--shadow)"
				className="translate-x-2 translate-y-2"
			/>
			<rect
				x="64"
				y="64"
				width="20"
				height="20"
				fill="var(--shadow)"
				className="translate-x-2 translate-y-2"
			/>
			<rect
				x="20"
				y="20"
				width="50"
				height="50"
				fill="var(--chart-1)"
				stroke="var(--border)"
				strokeWidth="3"
			/>
			<rect
				x="35"
				y="35"
				width="20"
				height="20"
				fill="var(--secondary-background)"
				stroke="var(--border)"
				strokeWidth="3"
			/>

			<rect
				x="60"
				y="60"
				width="20"
				height="20"
				fill="var(--chart-3)"
				stroke="var(--border)"
				strokeWidth="3"
			/>
		</svg>
	);
};

export default Logo;
