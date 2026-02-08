import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/ui/logo";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
	return (
		<Card className="w-full bg-secondary-background border-2 border-border shadow-shadow">
			<CardHeader className="space-y-1 flex flex-col items-center text-center">
				{/* Brand Logo */}
				<div className="mb-4">
					<Logo size={80} />
				</div>

				<CardTitle className="text-3xl font-heading">Sign in</CardTitle>
				<CardDescription className="text-base">
					Enter your credentials to access your account.
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" />
				</div>
				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<Label htmlFor="password">Password</Label>
						<Link
							href="#"
							className="text-sm font-medium underline underline-offset-4 hover:text-main">
							Forgot password?
						</Link>
					</div>
					<Input id="password" type="password" />
				</div>
			</CardContent>

			<CardFooter className="flex flex-col gap-4">
				<Button className="w-full font-bold text-md" size="lg">
					Sign In
				</Button>
				<div className="text-center text-sm font-medium">
					Don&apos;t have an account?{" "}
					<Link
						href="/signup"
						className="text-main hover:underline underline-offset-4">
						Sign up
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
}
