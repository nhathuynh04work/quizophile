"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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
import { loginAction } from "@/app/actions/auth";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await loginAction({ email, password });

            if (!result.success) {
                toast.error("Login failed", {
                    description: result.error || "Invalid credentials",
                });
                return;
            }

            toast.success("Welcome back!", {
                description: "You've successfully signed in. Redirecting...",
            });
            router.push("/");
        } catch {
            toast.error("Login failed", {
                description: "An unexpected error occurred",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full bg-secondary-background border-2 border-border shadow-shadow">
            <form onSubmit={handleSubmit}>
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
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                href="#"
                                className="text-sm font-medium underline underline-offset-4 hover:text-main">
                                Forgot password?
                            </Link>
                        </div>
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
                        {isLoading ? "Signing In..." : "Sign In"}
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
            </form>
        </Card>
    );
}
