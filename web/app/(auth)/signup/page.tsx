import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/ui/logo";

export default function SignupPage() {
	return (
		<Card className="w-full bg-secondary-background border-2 border-border shadow-shadow">
			<CardHeader className="space-y-1 flex flex-col items-center text-center">
				{/* Brand Logo */}
				<div className="mb-4">
					<Logo size={80} />
				</div>

				<CardTitle className="text-3xl font-heading">
					Create an account
				</CardTitle>
				<CardDescription className="text-base">
					Get started with Quizophile today.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="name">Full Name</Label>
					<Input id="name" placeholder="John Doe" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" />
				</div>
				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input id="password" type="password" />
				</div>
			</CardContent>
			<CardFooter className="flex flex-col gap-4">
				<Button className="w-full font-bold text-md" size="lg">
					Create Account
				</Button>
				<div className="text-center text-sm font-medium">
					Already have an account?{" "}
					<Link
						href="/login"
						className="text-main hover:underline underline-offset-4">
						Sign in
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
}
