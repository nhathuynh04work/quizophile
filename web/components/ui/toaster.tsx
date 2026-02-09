"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
	return (
		<Sonner
			position="top-right"
			expand={false}
			richColors={false}
			toastOptions={{
				unstyled: true,
				classNames: {
					toast:
						"w-full border-2 border-border bg-main shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-4 flex items-center gap-3 rounded-[5px] font-bold",
					title: "text-lg font-bold text-main-foreground",
					description: "text-sm font-medium text-main-foreground/80",
					success:
						"bg-[#00d696] border-border text-main-foreground",
					error: "bg-[#ff4d50] border-border text-main-foreground",
					warning: "bg-[#facc00] border-border text-main-foreground",
					info: "bg-[#0099ff] border-border text-main-foreground",
					closeButton:
						"bg-foreground border-2 border-border !text-background hover:bg-foreground/80 transition-colors rounded-[5px]",
				},
			}}
		/>
	);
}
