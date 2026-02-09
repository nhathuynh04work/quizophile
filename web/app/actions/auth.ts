"use server";

import { API_URL } from "@/lib/constants";
import { cookies } from "next/headers";

export interface SignupPayload {
	name: string;
	email: string;
	password: string;
}

export interface LoginPayload {
	email: string;
	password: string;
}

interface AuthResponse {
	access_token: string;
	user?: {
		id: string;
		email: string;
		name: string;
	};
}

export async function signupAction(payload: SignupPayload) {
	try {
		const result = await fetch(`${API_URL}/auth/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!result.ok) {
			const error = await result.json().catch(() => ({ message: "Signup failed" }));
			return {
				success: false,
				error: error.message || "Failed to create account",
			};
		}

		const data: AuthResponse = await result.json();

		if (data.access_token) {
			const cookieStore = await cookies();
			cookieStore.set("access_token", data.access_token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				maxAge: 60 * 60 * 24 * 7, // 7 days
			});
		}

		return {
			success: true,
			data,
		};
	} catch (error) {
		console.error("Signup error:", error);
		return {
			success: false,
			error: "An unexpected error occurred",
		};
	}
}

export async function loginAction(payload: LoginPayload) {
	try {
		const result = await fetch(`${API_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!result.ok) {
			const error = await result.json().catch(() => ({ message: "Login failed" }));
			return {
				success: false,
				error: error.message || "Invalid credentials",
			};
		}

		const data: AuthResponse = await result.json();

		if (data.access_token) {
			const cookieStore = await cookies();
			cookieStore.set("access_token", data.access_token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				maxAge: 60 * 60 * 24 * 7, // 7 days
			});
		}

		return {
			success: true,
			data,
		};
	} catch (error) {
		console.error("Login error:", error);
		return {
			success: false,
			error: "An unexpected error occurred",
		};
	}
}
