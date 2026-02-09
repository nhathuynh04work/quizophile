"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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
import { signupAction } from "@/app/actions/auth";

export default function SignupPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signupAction({ name, email, password });

            if (!result.success) {
                toast.error("Signup failed", {
                    description: result.error || "Something went wrong",
                });
                return;
            }

            toast.success("Account created!", {
                description: "Welcome to Quizophile! Redirecting...",
            });
            router.push("/");

        } catch {
            toast.error("Signup failed", {
                description: "An unexpected error occurred",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full bg-secondary-background border-2 border-border shadow-shadow">
            <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1 flex flex-col items-center text-center pb-6">
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
                        <Input
                            id="name"
                            name="name"
                            placeholder="John Doe"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            disabled={isLoading}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 mt-6">
                    <Button
                        type="submit"
                        className="w-full font-bold text-md"
                        size="lg"
                        disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Create Account"}
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
            </form>
        </Card>
    );
}
