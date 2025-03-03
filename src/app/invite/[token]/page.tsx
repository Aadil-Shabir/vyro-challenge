"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function AcceptInvite() {
    const params = useParams();
    const token = params?.token as string;
    const { data: session, isPending } = useSession();
    const [message, setMessage] = useState("Verifying invitation...");
    const router = useRouter();

    useEffect(() => {
        const acceptInvite = async () => {
            const response = await fetch(`/api/invite/${token}`, { method: "POST" });
            const data = await response.json();

            if (response.ok) {
                setMessage("Invitation accepted! Redirecting...");
                setTimeout(() => router.push(`/document/${data.documentId}`), 2000);
            } else {
                setMessage(`Error: ${data.error}`);
            }
        };

        if (!isPending) {
            acceptInvite();
        }

        if (!session) {
            router.push(`/signin?callbackUrl=${encodeURIComponent(window.location.href)}`);
        }
    }, [session]);

    return <p>{message}</p>;
}
