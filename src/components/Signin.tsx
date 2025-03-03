"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import CardWrapper from "./CardWrapper";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const SignIn = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isPending) return;

        if (session?.user) {
            router.replace(callbackUrl);
        }
    }, [session, isPending, router, callbackUrl]);

    useEffect(() => {
        setError("");
        setSuccess("");
        setLoading(false);
    }, []);

    const googleSignIn = async () => {
        try {
            await signIn.social(
                {
                    provider: "google",
                    callbackURL: callbackUrl,
                },
                {
                    onResponse: () => {
                        setLoading(false);
                    },
                    onRequest: () => {
                        setSuccess("");
                        setError("");
                        setLoading(true);
                    },
                    onSuccess: () => {
                        setSuccess("Your are loggedIn successfully");
                        router.replace(callbackUrl);
                    },
                    onError: (ctx) => {
                        setError(ctx.error.message);
                    },
                }
            );
        } catch (error: unknown) {
            console.error(error);
            setError("Something went wrong");
        }
    };

    return (
        <CardWrapper cardTitle="Sign In" cardDescription="Enter your email below to login to your account">
            <div className="flex gap-y-2 flex-col">
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button variant={"outline"} onClick={googleSignIn} disabled={loading}>
                    <FcGoogle />
                    Sign in with Google
                </Button>
            </div>
        </CardWrapper>
    );
};

export default SignIn;
