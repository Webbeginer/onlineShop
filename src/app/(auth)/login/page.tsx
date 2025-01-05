"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState("");
    const { data: session, status } = useSession();
    const callbackUrl = searchParams?.get("callbackUrl") || "/";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;
        try {
            const resultForm = await signIn("credentials", {
                email: (form.elements.namedItem("email") as HTMLInputElement).value,
                password: (form.elements.namedItem("password") as HTMLInputElement).value,
                redirect: false,
                callbackUrl: callbackUrl,
            });
            if (!resultForm?.error) {
                setLoading(false);
                form.reset();
                router.push(callbackUrl);
            } else {
                setError("Email or password is incorrect");
                if (resultForm.status === 401) {
                    setError("Email or password is incorrect");
                }
            }
        } catch (error) {
            setError("Something went wrong");
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-cente  bg-[url('/bg-auth.jpg')] bg-cover">
            <div className="w-full h-[450px] mt-[100px] max-w-sm p-4 backdrop-sepia-0 bg-white/30 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 flex flex-col">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Sign In To Your Account</h1>
                <p className="text-1xl text-red-500">{error !== "" && error}</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email" className="text-base mt-4 block">Email</label>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        name="email"
                        className="mt-2 px-2 w-full py-3 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-stone-500 focus:border-stone-500"
                    />
                    <label htmlFor="password" className="text-base mt-4 block">Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        className="mt-2 px-2 w-full py-3 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-stone-500 focus:border-stone-500"
                    />
                    <button
                        type="submit"
                        className="mt-4 mb-2 w-full text-white bg-stone-500 hover:bg-stone-600 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-4 text-center">
                        {loading ? "Loading..." : "Sign In"}
                    </button>
                </form>
                <button
                    type="button"
                    className="w-full text-white bg-stone-500 hover:bg-stone-600 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-4 text-center"
                    onClick={() => signIn("google", { callbackUrl: callbackUrl, redirect: false })}>
                    Sign In With Google
                </button>
                <p className="mt-2 mb-2 text-center">already have an account? <Link href="/register" className="text-stone-500">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default LoginPage;
