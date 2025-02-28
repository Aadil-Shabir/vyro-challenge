"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import CardWrapper from "./CardWrapper";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

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
                        router.replace("/editor");
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
